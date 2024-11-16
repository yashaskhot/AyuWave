import React, { useState } from 'react';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal'; // Import the modal library
import '../Styles/Exercise.css';
import { useCookies } from 'react-cookie';
import '../Styles/Heading.css';
import axios from 'axios';

const extractUser = (authToken) => {
  try {
    const tokenPayload = JSON.parse(atob(authToken.split(".")[1]));
    return tokenPayload.id || "";
  } catch (error) {
    console.error("Error extracting user role from authToken:", error);
    return "";
  }
};

// Set the app element for accessibility
Modal.setAppElement('#root');

function ExerciseApp() {
  const [exePlan, setExePlan] = useState([]);
  const [user, setUser] = useState(null);
  const [cookies] = useCookies(['authToken']);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isPlanGenerated, setIsPlanGenerated] = useState(false);
  const [videoId, setVideoId] = useState('');
  const authToken = cookies.authToken || "";
  const userId = extractUser(authToken);


  const fetchUser = async (userId) => {
    try {

      const headers = { Authorization: `Bearer ${cookies.authToken}` };
      const response = await axios.get(`http://localhost:8000/api/users/${userId}`, { headers });
      setUser(response.data); // assuming `data` contains the user details
      const userHistory = response.data.data.history; // Extract user's history
      console.log(userHistory)
      await sendUserHistory(userHistory); // Send user history
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const sendUserHistory = async (userHistory) => {
    try {
      const response = await axios.post('http://localhost:8080/patient_plan', {history: userHistory});
      console.log("User history sent successfully");

      // Assuming the response contains the plan plan data
      setExePlan(response.data.plan); // Update plan plan state
      setIsPlanGenerated(true); 

    } catch (err) {
      console.error("Error sending user history:", err);
    }
  };

  const handleOpen = (id) => {
    setVideoId(id);
    setModalIsOpen(true);
  };

  const handleClose = () => {
    setModalIsOpen(false);
    setVideoId('');
  };

  return (
    <div 
      className="app-container" 
      style={{
        overflow: 'hidden',
        backgroundImage: 'url(https://img.freepik.com/free-vector/clean-medical-background-vector_53876-143675.jpg?w=360&t=st=1710011685~exp=1710012285~hmac=0cc9c334d5994de3406dbec37f36a8d73f41984909c83948e73ba587ae6d4dfb)'
      }}
    >
      <div
        style={{
          backgroundImage: 'url(https://img.freepik.com/free-vector/clean-medical-background-vector_53876-166663.jpg?t=st=1729883089~exp=1729886689~hmac=ec7df107b18809a8b7dc457c990b6e7acee74367dfe2075d76401e07628e656f&w=360)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.6,
          zIndex: -1
        }}
      />
      <header className="header">
        <Navbar/>
      </header>

      <main className="main-content">
        {/* Featured Exercise Card */}
        <div className="featured-exercise">
          <div className="exercise-info">
            <h3>Back flexion exercise</h3>
            <PlayButton />
          </div>
          <div className="exercise-illustration">
            <img 
              src="https://th.bing.com/th/id/OIP.Q76a8HqCVd9-T985-9DMAgHaHR?rs=1&pid=ImgDetMain" 
              alt="Exercise" 
              className="exercise-img"
            />
          </div>
        </div>

        {/* Continue Flows Section */}
        <section className="flows-section">
          <div className="five" style={{ fontSize: '18px' }}>
            <h1>Daily practice</h1>
          </div>
          <div className="continue-flows">
            {flows.map(flow => (
              <ContinueFlowCard 
                key={flow.id} 
                title={flow.title} 
                duration={flow.duration} 
                progress={flow.progress} 
                image={flow.image} 
              />
            ))}
          </div>
        </section>

        <section>
        {!isPlanGenerated && (
        <button class="form-control my-2" onClick={() => fetchUser(userId)}>Generate Personalized Plan</button>
        )}
        <div className="space-y-4">
            {exePlan.length > 0 ? (
              <div className="border rounded-md p-4 bg-white shadow-lg">
                {exePlan.split('\n').map((line, index) => (
                  <div key={index} className="my-1 text-gray-800">{line}</div>
                ))}
              </div>
            ) : (
              <div className="text-gray-600">No meal plan available.</div>
            )}
          </div>
              
        </section>

      </main>

      {/* Modal for Video */}
      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={handleClose} 
        contentLabel="Video Modal"
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)' },
          content: { 
            top: '50%', 
            left: '50%', 
            right: 'auto', 
            bottom: 'auto', 
            marginRight: '-50%', 
            transform: 'translate(-50%, -50%)',
            width: '90%', // Set width for mobile
            height: '80%', // Set height for mobile
          }
        }}
      >
        <button onClick={handleClose} style={{ margin: '10px', padding: '5px 10px' }}>Close</button>
        <iframe 
          width="100%" 
          height="100%" 
          src={`https://www.youtube.com/embed/${videoId}`} 
          title="YouTube Video" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </Modal>
    </div>
  );
}

// FlowCard Component
const FlowCard = ({ title, duration, videoUrl, bgColor, onOpen }) => {
  const videoId = videoUrl.split('/').pop(); // Extract video ID from the URL
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`; // Thumbnail URL

  return (
    <div 
      className="flow-card" 
      style={{ backgroundColor: bgColor }} 
      onClick={() => onOpen(videoId)} // Pass the video ID to the handler
    >
      <div className="flow-content" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={thumbnailUrl} alt="Video Thumbnail" className="video-thumbnail" style={{ width: '100px', marginRight: '10px' }} /> {/* Video Thumbnail */}
        <div className="flow-info" style={{ flexGrow: 1 }}>
          <h3>{title}</h3>
          <p>{duration}</p>
        </div>
      </div>
    </div>
  );
};

// ContinueFlowCard Component
const ContinueFlowCard = ({ title, duration, progress, image }) => (
  <div className="continue-flow-card">
    <div className="flow-content">
      <img src={image} alt={title} className="flow-img" />
      <div className="flow-info">
        <h3>{title}</h3>
        <p>{duration}</p>
        <PlayButton style={{ marginTop: '10px' }} /> 
      </div>
    </div>
    <div className="progress-bar">
      <div 
        className="progress" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>
);

// Component for Play Button
const PlayButton = () => (
  <button className="play-button">
    <FontAwesomeIcon icon={faPlayCircle} />
  </button>
);

const flows1 = [
  {
    id: 1,
    title: 'Cardio Yoga',
    duration: '25 minutes',
    videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_1',
  },
  {
    id: 2,
    title: 'Core Blast',
    duration: '12 minutes',
    videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_2', 
  },
];

const flows = [
  { 
    id: 1, 
    title: 'Cardio Yoga', 
    duration: '25 minutes', 
    progress: 75, 
    image: 'https://png.pngtree.com/png-vector/20230421/ourmid/pngtree-yoga-day-healthy-girl-orange-png-image_6718265.png' 
  },
  { 
    id: 2, 
    title: 'Core Blast', 
    duration: '12 minutes', 
    progress: 30, 
    image: 'https://th.bing.com/th/id/OIP.7El58zXRVsTZSb93SNaaJwHaHa?w=900&h=900&rs=1&pid=ImgDetMain' 
  }
];

export default ExerciseApp;
