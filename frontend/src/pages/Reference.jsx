import React, { useState } from "react";
import ImageUpload from "../Components/ImageUpload";
import Button from "react-bootstrap/Button";
// import "../Components/Reference.css";
import { useNavigate } from "react-router-dom";
import Chatgpt from "../components/chatBot.jsx";
// import Voicegpt from "../Components/Voicegpt";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Navbar from "../Components/Navbar";
import axios from "axios";

function Reference() {
  const navigate = useNavigate();

  const [SurData, setSurData] = useState([]);
  // const [searchType, setSearchType] = useState('medicineName');
  // const handleSearchTypeChange = (e) => {
  //   setSearchType(e.target.value);
  // };

  const handleClick = () => {
    navigate("/room_front");
  };

  const handleLoad = async () => {
    // alert("Loading...");
    // console.log(localStorage.getItem('username'));

    const u_name = localStorage.getItem("username");
    try {
      const res = await axios.post("http://localhost:8000/api/userSurveyData", {
        username: u_name,
      });

      // Replace line breaks with HTML line breaks for formatting
      // const formattedResponse = res.data.replace(/\n/g, '<br/>');
      // console.log(formattedResponse);
      // setResponse(formattedResponse);
      SurData.push({ name: u_name });
      SurData.push({ Age: res.data.surveyData.Age });
      SurData.push({ ongoing_prescrip: res.data.surveyData.ongoing_prescrip });

      // console.log(res.data);
      // console.log(res.data.surveyData.ongoing_prescrip);
      console.log(SurData[1]);
      setSurData([...SurData]);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const renderTooltip = (props) => (
    <Tooltip id="tooltip" {...props}>
      Expert Assistance
    </Tooltip>
  );

  return (
    <div style={{backgroundColor:"#f5f5dca3",paddingBottom: "1px"}}>
      {/* <Navbar /> */}

      <div className="container" onLoad={handleLoad} style={{marginBottom: "131px"}}>
        <Chatgpt />
        <div className="fixed-chat-icon2">w
         
        </div>
        <div class="row text-center">
          <table class="table caption-top">
            <caption className="col-8">Your Survey details:</caption>

            <tbody>
              <tr>
                <td>Name</td>
                <td>Age</td>
                <td>Dietary</td>
                <td>Ongoing Prescription</td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <p> {SurData[0] && SurData[0].name}</p>{" "}
                </td>
                <td>
                  <p> {SurData[1] && SurData[1].Age} </p>{" "}
                </td>
                <td>Jain</td>
                <td>
                  <p> {SurData[2] && SurData[2].ongoing_prescrip} </p>{" "}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <ImageUpload age={SurData[1] && SurData[1].Age} ongPresc={SurData[2] && SurData[2].ongoing_prescrip} />

        {/* <Voicegpt /> */}
      </div>
    </div>
  );
}

export default Reference;