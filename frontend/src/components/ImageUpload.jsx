// src/components/ImageUpload.js
import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload(props){
  // console.log(props.age);
    const [message, setMessage] = useState("");
    const [submittedMessage, setSubmittedMessage] = useState("");
    const [response , setResponse] = useState("");
    const [response1 , setResponse1] = useState("");

    const [response2 , setResponse2] = useState("");
    const [GPTResponse, setGPTResponse] = useState("");
  
  
    const handleInputChange = (event) => {
      setMessage(event.target.value);
    };
  
    const handleSubmit = async(event) => {
      event.preventDefault();
      setSubmittedMessage(message);
      let fullinput = message;
      let gptprompt = "Give the ayurvedic alternative cure for"+ message+ "with ongoing prescription"+props.ongPresc+"for person with age" + props.age + "and having veg dietary";
  
      try {
          const res = await axios.post('http://localhost:8000/db', { prompt: fullinput });
    
          // Replace line breaks with HTML line breaks for formatting
          const formattedResponse = res.data.mongo1;
  
          setResponse(formattedResponse.Ayurvedic_Cure);
          setResponse1(formattedResponse.
            Allopathic_Medicine
            );
          setResponse2(formattedResponse.Symptom
            );



        } catch (error) {
          console.error('Error:', error);
        }
        
        try {
          const res = await axios.post('http://localhost:8000/gpt', { prompt: gptprompt });
    
          // Replace line breaks with HTML line breaks for formatting
          const gptRes = res.data.replace(/\n/g, '<br/>');
          // console.log(formattedResponse);
          setGPTResponse(gptRes);
        } catch (error) {
          console.error('Error:', error);
        }

  
     // Clear the input field

    };
  
   
  


    const [searchType, setSearchType] = useState('medicineName');

    const handleSearchTypeChange = (e) => {
      setSearchType(e.target.value);
    };


  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('uploadFile', selectedFile);
  
      try {
        const res = await axios.post('http://localhost:8000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        const formattedResponse = res.data.word;
        console.log(res.data.word);

        setResponse(formattedResponse.Ayurvedic_Cure);
          setResponse1(formattedResponse.
            Allopathic_Medicine
            );
          setResponse2(formattedResponse.Symptom
            );



        // console.log(formattedResponse1); // Assuming your server responds with the file path
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('No file selected');
    }
  };


  return (
    <div>
      {/* <h2>Image Upload</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button> */}

      <div>
      <label htmlFor="searchType">Search Type:</label>
      <select id="searchType" class="form-control" value={searchType} onChange={handleSearchTypeChange}>
        <option value="medicineName">Search via Medicine Name</option>
        <option value="symptomName">Search via Symptom Name</option>
        <option value="uploadImage">Upload Image of Medicine</option>
      </select>

      <div id="inputFields" style={{marginTop: '26px'}}>
        {searchType === 'medicineName' && (
          <div class="row col-12 my-2">
            <label >Medicine Name:"Antihistamines","Sleeping Pills","Probiotics"</label>
            <div class="col-lg-11 col-12">
            <input type="text" class="form-control" id="medicineName" name="medicineName" value={message} onChange={handleInputChange} placeholder='Enter medicine name' />

            </div>
            <div  class="col-lg-1 col-12">

            <button class="btn btn-outline-warning" onClick={handleSubmit}>Search</button> 
            </div>
          </div>
        )}

        {searchType === 'symptomName' && (
          
            <div class="row col-12 my-2">

            <label htmlFor="symptomName">Symptom Name:"Stomachache","Insomnia","Digestive Issues"</label>
            <div class="col-lg-11 col-12">
            <input type="text" class="form-control" id="symptomName" name="symptomName" value={message} onChange={handleInputChange} placeholder='Enter symptom name'/>
            </div>
            <div  class="col-lg-1 col-12">

            <button class="btn btn-outline-warning" onClick={handleSubmit}>Search</button> 
            </div>
          </div>
        )}

        {searchType === 'uploadImage' && (
          
            <div class="row col-12 my-2">

            <label htmlFor="imageUpload">Upload Image:</label>
            <div class="col-lg-11 col-12">
            <input type="file" class="form-control" id="imageUpload" name="imageUpload"  onChange={handleFileChange}/>
            </div>
            <div  class="col-lg-1 col-12">

            <button class="btn btn-outline-warning" onClick={handleUpload}>Upload</button> 
            </div>
          </div>
        )}
      </div>
     
    </div>
    <p><h5>Symptom Name:</h5>{response2}<br/><h5>Allopathic Medicine:</h5>{response1}<br/><h5>Ayurvedic Cure:</h5>{response}</p>
    {/* <h2>{response3}</h2> */}
  
      {response && (
        <div>
          <h5>Brief:</h5>
          {/* /* Use dangerouslySetInnerHTML to render HTML * */}
          <p  className=" col-11" style={{ marginTop:"-15px"}} dangerouslySetInnerHTML={{ __html: GPTResponse }} />
        </div>
      )}
      </div>

  );
};

export default ImageUpload;
