import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StatInfo from './components/StatInfo.jsx';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Home from './pages/Home.jsx';
import Legal from './pages/Legal';
import Appointment from './pages/Appointment';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Doctors from './Components/Doctors';
import DoctorInfo from './components/DoctorInfo.jsx';
import Reviews from './Components/Reviews';
import RoomFront from './pages/room/room_front.jsx';
import Room from './pages/room/Room';
import SchemeData from './pages/pwd/SchemeData.jsx';
import Dashboard from './pages/dashboard/dashboard';
import Map from './pages/Map.jsx';
import Schemepwd from './pages/pwd/SchemeData';
import Homepwd from './pages/pwd/Home';
import ReportScan from './pages/ReportScan.jsx';
import Product from './pages/Product.jsx';
import ChatPage from './pages/Chatpage.jsx';
import Survey from './pages/Survey.jsx';
import Reference from './pages/Reference.jsx';
import BookAppointment from './components/BookAppointment.jsx';
import Reports from './components/Reports.jsx';
import Exercise from './components/Exercise.jsx';
import UserForm from './pages/UserForm.jsx';
import MedAssist from "./components/chatBot.jsx";
import DietPlan from "./pages/DietPlan.jsx";
import Navbar from './components/Navbar.jsx';

const App = () => {
  return (
    <Router>
      <div className='App'>
      <Routes>
        <Route eaxt path="/login" element={<Login/>} />
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/userform" element={<UserForm/>} />
        <Route path="/legal" element={<Legal/>} />
        <Route path="/appointment" element={<Appointment/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="*" element={<NotFound />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/maps" element={<Map/>} />  
        <Route path="/doctorinfo/:id" element={<DoctorInfo />} />
        <Route path="/doctorinfo" element={<StatInfo />} />
        <Route path="/room_front" element={<RoomFront />} />
        <Route path="/room/:roomID" element={<Room />} />
        <Route path="/scheme" element={<SchemeData/>} />
        <Route path="/dashboard" element={<Dashboard/>} />   
        <Route path="/pwdhome" element={<Homepwd/>} />
        <Route path="/pwdscheme" element={<Schemepwd/>} />     
        <Route path="/reportscan" element={<ReportScan/>} />     
        <Route path="/product" element={<Product/>} />     
        <Route path="/chat/:userId" element={<ChatPage/>} />     
        <Route path="/survey" element={<Survey/>} />   
        <Route path="/Reference" element={<Reference/>} />  
        <Route path="/doctors/book" element={<BookAppointment/>} />  
        <Route path="/profile" element={<Reports/>} />  
        <Route path="/plans" element={<Exercise/>} />  
        <Route path="/medassist" element={<MedAssist/>} />  
        <Route path="/dietplan" element={<DietPlan/>} />  
        {/* <Route path="/Dashboard" element={<Dashboard />} />     */}

      </Routes>
      <ToastContainer/>
      </div>
    </Router>
  );
};

// Create a wrapper component to extract route parameters
const DoctorDetailWrapper = () => {
  const { id } = useParams(); // Extract the doctorId from the route parameters
  console.log('Extracted doctorId:', id);
  return <DoctorDetail doctorId={id} />;
};

export default App;
