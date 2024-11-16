import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const ReportScan = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');
  const [extractedData, setExtractedData] = useState(null);
  const [cookies] = useCookies(['authToken']);
  const [percentage, setPercentage] = useState('50%');
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.authToken) {
      console.log('User is not authenticated.');
    }
  }, [cookies.authToken]);

  const handleReportUpload = async (e) => {
    const authToken = cookies.authToken;
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/Scan-repo',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: authToken,
          },
        }
      );

      if (response.status === 200) {
        const { name, gender, age, certificate_number, disability_type } = response.data;

        setExtractedData({
          name,
          gender,
          age,
          certificate_number,
          disability_type,
        });

        const studentProfileData = {
          user: cookies.authToken.userId,
          age,
          certificate_number,
          disability_type,
          percentage,
        };

        const headers = { Authorization: `Bearer ${cookies.authToken}` };
        const studentProfileResponse = await axios.post(
          'http://localhost:8000/api/student-profile',
          studentProfileData,
          { headers }
        );

        if (studentProfileResponse.status === 201) {
          console.log('StudentProfile created successfully.');
          // Navigate to the student dashboard upon successful upload
        } else {
          console.error('Error creating StudentProfile.');
        }
      } else {
        console.error('Error uploading Report:', response.data);
      }
    } catch (error) {
      console.error('Error uploading Report:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="container">
      <h1 className="text-center">Upload PWD Certificate</h1>
      <div className="bg-primary text-white p-5" style={{ height: "370px", borderRadius:"20px" }}>
        <h3 className="text-center">Choose the files you want to upload</h3>
        <div className="form-group d-flex flex-column align-items-center">
          <input
            type="text"
            className="form-control"
            value={image ? image.name : 'No file selected'}
            readOnly
            style={{ fontSize: '14px', maxWidth: '200px',marginBottom:'20px' }}
            placeholder="Choose a file..."
          />
          <div className="d-flex justify-content-center">
            <div className="input-group">
              <label className="input-group-btn">
                <span className="btn btn-default btn-choose text-white border">
                  Choose File
                  <input
                    type="file"
                    accept=".pdf, .doc, .docx"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      handleFileChange(e);
                      handleReportUpload(e);
                    }}
                  />
                </span>
              </label>
              <button
                className="btn btn-warning btn-reset ml-2" style={{marginTop:"-8px", marginLeft:"5px"}}
                type="button"
                onClick={() => setImage(null)}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        {extractedData && (
        <div className="mt-4 text-center">
          <h3>Extracted Data:</h3>
          <ul>
            <li>Name: {extractedData.name}</li>
            <li>Gender: {extractedData.gender}</li>
            <li>Age: {extractedData.age}</li>
            <li>Certificate Number: {extractedData.certificate_number}</li>
            <li>Disability Type: {extractedData.disability_type}</li>
          </ul>
        </div>
      )}
      </div>
      
    </div>
  );
};

export default ReportScan;
