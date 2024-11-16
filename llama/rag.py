from flask import Flask, request, jsonify
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings.sentence_transformer import SentenceTransformerEmbeddings
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain.chains import RetrievalQA
from langchain_community.llms import Ollama
from typing import List
from flask_cors import CORS
from serpapi import GoogleSearch 
import os
import tempfile
from math import ceil

app = Flask(__name__)
CORS(app)

PERSISTENT_DIR = "chroma_db"  # Directory to persist FAISS data
SERP_API_KEY = "YOUR_SERP_API_KEY" 
# Initialize embedding function and vector store
embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
db = Chroma(persist_directory=PERSISTENT_DIR, embedding_function=embedding_function)

# Initialize the Llama model with Ollama
llm = Ollama(model="llama3.2")

def process_pdf(pdf_path: str):
    loader = PyPDFLoader(pdf_path)
    documents = loader.load()

    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    docs = text_splitter.split_documents(documents)

    # Set batch size for FAISS
    batch_size = 150
    num_batches = ceil(len(docs) / batch_size)

    # Add documents in batches
    for i in range(num_batches):
        batch_docs = docs[i * batch_size: (i + 1) * batch_size]
        db.add_documents(batch_docs)
    db.persist()

@app.route('/process_pdf', methods=['POST'])
def process_pdf_endpoint():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save the file temporarily
    with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
        file.save(tmp_file.name)
        tmp_pdf_path = tmp_file.name
    
    # Process the PDF
    process_pdf(tmp_pdf_path)
    
    return jsonify({"message": "PDF processed and data added to the database successfully"})

def fetch_yoga_video_links(yoga_exercises: List[str]) -> dict:
    """Fetch YouTube video links for each yoga exercise using SerpAPI."""
    video_links = {}
    for exercise in yoga_exercises:
        search_query = f"{exercise} yoga tutorial"
        params = {
            "engine": "youtube",     # Specifies YouTube search
            "search_query": search_query,
            "api_key": SERP_API_KEY
        }
        search = GoogleSearch(params)
        results = search.get_dict()

        # Get top video link
        if "video_results" in results:
            video_links[exercise] = results["video_results"][0]["link"]  # Fetch the top result link
    return video_links

def get_symptoms_from_query(query: str) -> str:
    """Extract health issues or symptoms from the user query."""
    response = llm.invoke(f"Identify the health issue from the symptoms in the following query: {query}")
    return response  # Directly return the response as a string

@app.route('/query', methods=['POST'])
def query_document():
    data = request.json
    query = data.get('query')

    if not query:
        return jsonify({"error": "Query not provided"}), 400

    # Step 1: Extract symptoms from the query
    issue = get_symptoms_from_query(query)
    
    # Step 2: Use symptoms to query the vector store
    search_results = db.similarity_search(issue)
    context = [doc.page_content for doc in search_results]

    # Step 3: Generate final response using symptoms and context
    final_response = get_final_response(issue, context)
    
    return jsonify({"response": final_response})

def get_final_response(query: str, context: List[str]) -> str:
    context_text = " ".join(context)
    prompt = (
        f"Based on the potential condition: {query}\n\n"
        f"Context from relevant sources:\n{context_text}\n\n"
        "Provide Ayurvedic Remedies:\n"
        "1. Remedy 1: Brief description\n"
        "2. Remedy 2: Brief description\n"
        "3. Remedy 3: Brief description"
    )
    print(prompt)
    response = llm.invoke(prompt)
    return response  # Directly return the response as a string

def get_patient_plan(history: str) -> str:
    """Extract significant conditions and patient details from the history, then retrieve a plan from Chroma."""
    # Step 1: Identify conditions and patient parameters
    prompt = (
        f"Given the following medical history:\n{history}\n\n"
        "Identify significant medical conditions and extract relevant patient parameters "
        "(height, weight, BMI, age, gender). Format response as:\n"
        "Conditions: [List of conditions]\n"
        "Parameters: Height - X, Weight - Y, BMI - Z, Age - A, Gender - G"
    )
    response = llm.invoke(prompt)
    
    # Step 2: Use identified conditions to query vector store for yoga/exercise plans
    conditions_summary = response  # Directly use response for now
    search_results = db.similarity_search(conditions_summary)
    context = [doc.page_content for doc in search_results]

    # Step 3: Generate final personalized plan
    final_prompt = (
        f"Based on the patient's medical conditions and parameters:\n{conditions_summary}\n\n"
        f"Context from relevant sources:\n{context}\n\n"
        "Provide a personalized yoga and exercise names give their names in English only and nothing else"
        
    )
    plan_response = llm.invoke(final_prompt)
    return plan_response

def get_dietary_plan(history: str) -> str:
    """Generate a dietary plan based on the user's medical history and parameters."""
    # Step 1: Identify conditions and parameters
    prompt = (
        f"Given the following medical history:\n{history}\n\n"
        "Identify significant medical conditions and extract relevant patient parameters and allergies"
        "(height, weight, BMI, age, gender). Format response as:\n"
        "Conditions: [List of conditions]\n"
        "Parameters: Height - X, Weight - Y, BMI - Z, Age - A, Gender - G"
    )
    response = llm.invoke(prompt)
    
    # Step 2: Use conditions to query for dietary recommendations
    conditions_summary = response  # Directly use response for now
    search_results = db.similarity_search(conditions_summary)
    context = [doc.page_content for doc in search_results]

    # Step 3: Generate a dietary plan based on conditions, parameters, and context
    final_prompt = (
        f"Based on the patient's medical conditions and parameters:\n{conditions_summary}\n\n"
        f"Context from relevant sources:\n{context}\n\n"
        "Provide a personalized dietary plan that includes recommended foods and meals. give response in short in specified format as:\n"
        "Breakfast: [Meal 1, 2, 3]\n"
        "Lunch: [Meal 1, 2, 3]\n"
        "Dinner: [Meal 1, 2, 3]\n"
        "Snacks: [Snack 1,2,3]"
    )
    print(final_prompt)
    dietary_response = llm.invoke(final_prompt)
    return dietary_response

@app.route('/patient_plan', methods=['POST'])
def patient_plan_endpoint():
    data = request.json
    history = data.get('history')

    if not history:
        return jsonify({"error": "Medical history not provided"}), 400

    # Generate patient plan
    plan = get_patient_plan(history)
    
    return jsonify({"plan": plan})

@app.route('/dietary_plan', methods=['POST'])
def dietary_plan_endpoint():
    data = request.json
    history = data.get('history')

    if not history:
        return jsonify({"error": "Medical history not provided"}), 400

    # Generate dietary plan
    dietary_plan = get_dietary_plan(history)
    
    return jsonify({"dietary_plan": dietary_plan})

if __name__ == '__main__':
    app.run(debug=True, port=8080)
