import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/heading.css'
import { useCookies } from 'react-cookie';
import axios from 'axios';


const extractUser = (authToken) => {
  try {
    // Decode the JWT token
    const tokenPayload = JSON.parse(atob(authToken.split(".")[1]));

    // Extract the user role from the decoded token payload
    return tokenPayload.id || ""; // Replace with the actual key used in your token payload
  } catch (error) {
    console.error("Error extracting user role from authToken:", error);
    return "";
  }
};


export default function Survey() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['authToken']);
  const authToken = cookies.authToken || "";
  const userId = extractUser(authToken);

  useEffect(() => {
    if (!cookies.authToken) {
      console.log('User is not authenticated.');
    }
  }, [cookies.authToken]);
  

  const [credentials, setCredentials] = useState({
    age: '',
    ongoing_prescrip: '',
    height: '',
    weight: '',
    medical_conditions: '',
    allergies: '',
    medications: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    const Bmi = credentials.weight*10000 / (credentials.height*credentials.height);
    const authToken = cookies.authToken;
    const UserData = {
      id: userId,
      age : credentials.age,
      height: credentials.height,
      weight: credentials.weight,
      medical_conditions: credentials.medical_conditions,
      allergies: credentials.allergies,
      ongoing_medications: credentials.ongoing_prescrip,
      BMI: Bmi
    };
    const headers = { Authorization: `Bearer ${cookies.authToken}` };
    const xyz = await axios.put(`http://localhost:8000/api/users/${userId}`, UserData, { headers });
    console.log('User updated successfully:');
    navigate('/UserForm');
    return xyz;
  };

  const onChanges = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div style={{
      backgroundImage: 'url("https://img.freepik.com/free-vector/clean-medical-background-vector_53876-143675.jpg?t=st=1729879767~exp=1729883367~hmac=803f7fa2784c1fdd45e7c30f98b9ff565deaa3f9e918f1483c255d2d9ec65844&w=360")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '750px',
      display: 'flex',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div className='container p-5 rounded-3' style={{ backgroundColor: '#ffffff' }}>
        {/* <div className='row col-12 text-center '>
          <h3>Health Survey Form</h3>
        </div> */}
        <div class="eleven">
  <h1>Medical Record</h1>
</div>

        <form className="row g-3 mt-6" method='POST' onSubmit={handleSubmit}>
          {/* <div className="col-md-6">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" name='username' value={credentials.username} onChange={onChanges} />
          </div> */}
          <div className="col-md-6">
            <label className="form-label">Age</label>
            <input type="number" className="form-control" name='age' value={credentials.age} onChange={onChanges} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Height (cm)</label>
            <input type="number" className="form-control" name='height' value={credentials.height} onChange={onChanges} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Weight (kg)</label>
            <input type="number" className="form-control" name='weight' value={credentials.weight} onChange={onChanges} />
          </div>
          <div className="col-12">
            <label className="form-label">Medical Conditions</label>
            <input type="text" className="form-control" placeholder="List any medical conditions" name='medical_conditions' value={credentials.medical_conditions} onChange={onChanges} />
          </div>
          <div className="col-12">
            <label className="form-label">Ongoing Prescription</label>
            <input type="text" className="form-control" placeholder="Separate names by ','" name='ongoing_prescrip' value={credentials.ongoing_prescrip} onChange={onChanges} />
          </div>
         
          <div className="col-12">
            <label className="form-label">Allergies</label>
            <input type="text" className="form-control" placeholder="List any allergies" name='allergies' value={credentials.allergies} onChange={onChanges} />
          </div>
        
          <div className="col-12" style={{ textAlign: 'center' }}>
            <button type="submit" className="btn btn-outline-primary w-50">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
