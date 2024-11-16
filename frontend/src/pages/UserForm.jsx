// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useCookies } from 'react-cookie';
// import { useNavigate } from 'react-router-dom';
// import '../Styles/userform.css';

// const extractUser = (authToken) => {
//   try {
//     // Decode the JWT token
//     const tokenPayload = JSON.parse(atob(authToken.split(".")[1]));

//     // Extract the user role from the decoded token payload
//     return tokenPayload.id || ""; // Replace with the actual key used in your token payload
//   } catch (error) {
//     console.error("Error extracting user role from authToken:", error);
//     return "";
//   }
// };

// const UserDataScan = () => {
//   const [image, setImage] = useState(null);
//   const [extractedDataHTML, setExtractedDataHTML] = useState(''); // Add state for HTML content
//   const [cookies] = useCookies(['authToken']);
//   const authToken = cookies.authToken || "";
//   const navigate = useNavigate();
//   const userId = extractUser(authToken);

//   useEffect(() => {
//     if (!cookies.authToken) {
//       console.log('User is not authenticated.');
//     }
//   }, [cookies.authToken]);

//   console.log(userId);

//   const handleReportUpload = async (e) => {
//     const authToken = cookies.authToken;
//     const formData = new FormData();
//     formData.append('image', e.target.files[0]);

//     try {
//       const response = await axios.post(
//         'http://localhost:5000/api/Scan-userdata',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: authToken,
//           },
//         }
//       );

//       if (response.status === 200) {
//         console.log(response.data)
//         const {
//           name,
//           gender,
//           age,
//           rbc_count,
//           hemoglobin
//         } = response.data;
//         const ageNumber = age.split(" ")[0];
//         const formattedName = name.split(" ").slice(0, 2).join(" ");

//         // Use setExtractedDataHTML to update the HTML content
//         setExtractedDataHTML(`
//           <div>
//             <h3 class="text-success">Extracted Data:</h3>
//             <p><strong>Name:</strong> ${formattedName}</p>
//             <p><strong>Gender:</strong> ${gender}</p>
//             <p><strong>Age:</strong> ${ageNumber}</p>
//             <p><strong>hemoglobin</strong> ${hemoglobin}</p>
//             <p><strong>rbc_count</strong> ${rbc_count}</p>
            

//           </div>
//         `);

//         const ProfileData = {
//           id: userId,
//           gender: gender,
//           age: ageNumber,
//           history: JSON.stringify(response.data)
//         };

//         const headers = { Authorization: `Bearer ${cookies.authToken}` };
//         const xyz = await axios.put(`http://localhost:8000/api/users/${userId}`, ProfileData, { headers });

//         console.log('User updated successfully:');
//         setTimeout(() => {
//           navigate('/profile');
//         }, 3000);
//         return xyz;

//       } else {
//         console.error('Error uploading Report:', xyz.data);
//       }
//     } catch (error) {
//       console.error('Error uploading Report:', error);
//     }
//   };


//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   };

//   return (
//     <div className="container my-2">
//       <h1 className="text-center mb-4" style={{ color: "#454cad" }}>Upload Any Report or Personal Document</h1>
//       <div className="shadow p-5 rounded" style={{ height: "auto", backgroundColor: "rgb(247 247 247)" }}>
//         <img style={{ width: "100%" }} src="https://img.freepik.com/free-vector/upload-concept-illustration_114360-1205.jpg?semt=ais_hybrid" alt="Upload illustration" />
//         <div className="form-group d-flex flex-column align-items-center">
//           <input
//             type="text"
//             className="form-control text-center"
//             value={image ? image.name : 'No file selected'}
//             readOnly
//             style={{ fontSize: '14px', maxWidth: '300px', marginBottom: '20px', border: '2px solid #007bff' }}
//             placeholder="Choose a file..."
//           />
//           <div className="d-flex justify-content-center">
//             <label className="input-group-btn">
//               <span className="btn btn-primary btn-choose text-white border rounded">
//                 Choose File
//                 <input
//                   type="file"
//                   accept=".pdf, .doc, .docx, .jpeg, .jpg, .png"
//                   style={{ display: 'none' }}
//                   onChange={(e) => {
//                     handleFileChange(e);
//                     handleReportUpload(e);
//                   }}
//                 />
//               </span>
//               <button
//                 className="btn btn-danger btn-reset ml-2"
//                 type="button"
//                 onClick={() => setImage(null)}
//               >
//                 Reset
//               </button>
//             </label>
//           </div>
//         </div>
//         {extractedDataHTML && (
//           <div
//             className="mt-4 text-center"
//             dangerouslySetInnerHTML={{ __html: extractedDataHTML }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserDataScan;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import '../Styles/userform.css';
import Navbar from '../components/Navbar.jsx';

const extractUser = (authToken) => {
  try {
    const tokenPayload = JSON.parse(atob(authToken.split(".")[1]));
    return tokenPayload.id || "";
  } catch (error) {
    console.error("Error extracting user ID from authToken:", error);
    return "";
  }
};

const UserDataScan = () => {
  const [image, setImage] = useState(null);
  const [extractedDataHTML, setExtractedDataHTML] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [cookies] = useCookies(['authToken']);
  const authToken = cookies.authToken || "";
  const navigate = useNavigate();
  const userId = extractUser(authToken);

  useEffect(() => {
    if (!cookies.authToken) {
      console.log('User is not authenticated.');
    }
  }, [cookies.authToken]);

  const handleReportUpload = async (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    const formData = new FormData();
    formData.append('image', selectedFile);
    const fileData = new FormData();
    fileData.append("file", selectedFile);

    try {
      // Upload to server
      const pinataResponse = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", fileData, {
        headers: {
          pinata_api_key: "36086c185959ce576eb3",
          pinata_secret_api_key: "51111578aaafc9229288098226e4b69ca7b245ff85eae502b6195e389d46c27a",
          "Content-Type": "multipart/form-data",
        },
      });

      const serverResponse = await axios.post(
        'http://localhost:5000/api/Scan-userdata',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: authToken,
          },
        }
      );

      if (serverResponse.status === 200) {
        const { name, gender, age, rbc_count, hemoglobin } = serverResponse.data;
        const ageNumber = age.split(" ")[0];
        const formattedName = name.split(" ").slice(0, 2).join(" ");
        setExtractedDataHTML(`
          <div>
            <h3 class="text-success">Extracted Data:</h3>
            <p><strong>Name:</strong> ${formattedName}</p>
            <p><strong>Gender:</strong> ${gender}</p>
            <p><strong>Age:</strong> ${ageNumber}</p>
            <p><strong>Hemoglobin:</strong> ${hemoglobin}</p>
            <p><strong>RBC Count:</strong> ${rbc_count}</p>
          </div>
        `);

        const ProfileData = {
          id: userId,
          gender,
          age: ageNumber,
          history: JSON.stringify(serverResponse.data),
        };

        const headers = { Authorization: `Bearer ${cookies.authToken}` };
        await axios.put(`http://localhost:8000/api/users/${userId}`, ProfileData, { headers });

        // Upload to Pinata
        

        const newFileUrl = `https://gateway.pinata.cloud/ipfs/${pinataResponse.data.IpfsHash}`;
        setFileUrl(newFileUrl);
        console.log('File uploaded to IPFS:', newFileUrl);

        setTimeout(() => {
          navigate('/profile');
        }, 3000);

      } else {
        console.error('Error uploading report:', serverResponse.data);
      }
    } catch (error) {
      console.error('Error uploading report:', error);
    }
  };

  return (
    <>
    <Navbar />
    <div className="container my-2">
      <h1 className="text-center mb-4" style={{ color: "#454cad" }}>Upload Any Report or Personal Document</h1>
      <div className="shadow p-5 rounded" style={{ backgroundColor: "rgb(247, 247, 247)" }}>
        <img style={{ width: "100%" }} src="https://img.freepik.com/free-vector/upload-concept-illustration_114360-1205.jpg" alt="Upload illustration" />
        <div className="form-group d-flex flex-column align-items-center">
          <input
            type="text"
            className="form-control text-center"
            value={image ? image.name : 'No file selected'}
            readOnly
            style={{ fontSize: '14px', maxWidth: '300px', marginBottom: '20px', border: '2px solid #007bff' }}
            placeholder="Choose a file..."
          />
          <div className="d-flex justify-content-center">
            <label className="input-group-btn">
              <span className="btn btn-primary btn-choose text-white border rounded">
                Choose File
                <input
                  type="file"
                  accept=".pdf, .doc, .docx, .jpeg, .jpg, .png"
                  style={{ display: 'none' }}
                  onChange={handleReportUpload}
                />
              </span>
              <button
                className="btn btn-danger btn-reset ml-2"
                type="button"
                onClick={() => setImage(null)}
              >
                Reset
              </button>
            </label>
          </div>
        </div>
        {extractedDataHTML && (
          <div className="mt-4 text-center" dangerouslySetInnerHTML={{ __html: extractedDataHTML }} />
        )}
        {fileUrl && (
          <div className="mt-4 text-center">
            <p><strong>IPFS Link:</strong> <a href={fileUrl} target="_blank" rel="noopener noreferrer">{fileUrl}</a></p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default UserDataScan;
