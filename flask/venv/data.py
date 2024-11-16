import re
from typing import Dict, Any

def extract_medical_report_info(text) -> Dict[str, Any]:
    """
    Extract key information from medical test report text.
    
    Args:
        text (str): The OCR-extracted text from the medical report
        
    Returns:
        Dict[str, Any]: Dictionary containing extracted information
    """
    patterns = {
        # Registration and Basic Info
        "reg_no": r"Reg\. No\.\s*:\s*(\d+)",
        "reg_date": r"Reg\. Date\s*:\s*([0-9-]+\s+[0-9:]+)",
        "collected_on": r"Collected On\s*:\s*([0-9-]+\s+[0-9:]+)",
        "approved_on": r"Approved On\s*:\s*([0-9-]+\s+[0-9:]+)",
        
        # Patient Information
        "name": r"Name\s*:\s*([^\n]+)",
        "gender_age": r"Gender/Age\s*:\s*([^\n]+)",
        "ref_no": r"Ref\. No\s*:\s*([^\n]*)",
        "ref_by": r"Ref\. By\s*:\s*([^\n]+)",
        "tele_no": r"Tele No\.\s*:\s*(\d+)",
        
        # Test Results
        "hemoglobin": r"Hemoglobin.*?(\d+\.?\d*)\s*g/dL",
        "rbc_count": r"RBC Count.*?(\d+\.?\d*)\s*X",
        "wbc_count": r"WBC Count.*?(\d+)\s*/cmm",
        "platelet_count": r"Platelet Count.*?(\d+)\s*/cmm",
        
        # Differential Counts
        "neutrophils": r"Neutrophils\s+(\d+)\s+%",
        "lymphocytes": r"Lymphocytes\s+(\d+)\s+%",
        "monocytes": r"Monocytes\s+(\d+)\s+%",
        "eosinophils": r"Eosinophils\s+(\d+)\s+%",
        "basophils": r"Basophils\s+(\d+)\s+%"
    }
    
    extracted_data = {}
    
    # Extract basic information
    for key, pattern in patterns.items():
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            extracted_data[key] = match.group(1).strip()
            
    # Post-process some fields
    if 'gender_age' in extracted_data:
        try:
            gender, age = extracted_data['gender_age'].split('/')
            extracted_data['gender'] = gender.strip()
            extracted_data['age'] = age.strip()
            del extracted_data['gender_age']
        except ValueError:
            pass
            
    # Add test metadata
    extracted_data['test_type'] = "Complete Blood Count"
    extracted_data['specimen'] = "EDTA blood"
    
    # Extract all blood count values with their units and reference intervals
    def extract_test_values(text: str) -> Dict[str, Dict[str, str]]:
        test_pattern = r"([A-Za-z\s()]+?)\s+([\d.]+)\s+([^\s]+)\s+([\d.-]+\s*-\s*[\d.]+)"
        tests = {}
        for match in re.finditer(test_pattern, text):
            test_name = match.group(1).strip()
            tests[test_name] = {
                'value': match.group(2),
                'unit': match.group(3),
                'reference_interval': match.group(4)
            }
        return tests
    
    extracted_data['test_values'] = extract_test_values(text)
    
    return extracted_data

# Function to format the extracted data for display
def format_report(data: Dict[str, Any]) -> str:
    """
    Format the extracted data into a readable string
    
    Args:
        data (Dict[str, Any]): The extracted medical report data
        
    Returns:
        str: Formatted string of the report data
    """
    output = []
    output.append("=== Medical Report Summary ===\n")
    
    # Basic Information
    output.append("Registration Information:")
    output.append(f"Reg No: {data.get('reg_no', 'N/A')}")
    output.append(f"Reg Date: {data.get('reg_date', 'N/A')}")
    output.append(f"Collected On: {data.get('collected_on', 'N/A')}")
    output.append(f"Approved On: {data.get('approved_on', 'N/A')}\n")
    
    # Patient Information
    output.append("Patient Information:")
    output.append(f"Name: {data.get('name', 'N/A')}")
    output.append(f"Gender: {data.get('gender', 'N/A')}")
    output.append(f"Age: {data.get('age', 'N/A')}")
    output.append(f"Ref By: {data.get('ref_by', 'N/A')}")
    output.append(f"Telephone: {data.get('tele_no', 'N/A')}\n")
    
    # Test Results
    if 'test_values' in data:
        output.append("Test Results:")
        for test_name, details in data['test_values'].items():
            output.append(f"{test_name}:")
            output.append(f"  Value: {details['value']} {details['unit']}")
            output.append(f"  Reference Interval: {details['reference_interval']}")
            
    return "\n".join(output)

# Example usage:
# text = "[OCR extracted text goes here]"
# extracted_data = extract_medical_report_info(text)
# formatted_report = format_report(extracted_data)
# print(formatted_report)