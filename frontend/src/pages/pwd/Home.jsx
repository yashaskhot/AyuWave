import React from "react";
import { useEffect } from "react";
import Navbar from "../../Components/Navbar";
import Hero from "../../Components/Hero";
import Info from "../../Components/Info";
import About from "../../Components/About";
import BookAppointment from "../../Components/BookAppointment";
import Reviews from "../../Components/Reviews";
import Doctors from "../../Components/Doctors";
import Footer from "../../Components/Footer";
import alanBtn from '@alan-ai/alan-sdk-web';
// import ChatGPT from "../../Components/chatGptUI";

function Home() {
  useEffect(() => {
    alanBtn({
        key: '04b3331df09aff384c669193e471d13d2e956eca572e1d8b807a3e2338fdd0dc/stage',
        onCommand: (commandData) => {
          if (commandData.command === 'go:back') {
            // Call the client code that will react to the received command
          }
        }
    });
  }, []);

  // Function to convert text to speech
  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  useEffect(() => {
    // Speak welcome message when the component loads
    speak("Welcome to our website. Explore the amazing features and content available. Do Find your Doctor and make an Appointments. ")
speak("Talk to online doctors and get medical advice, online prescriptions, refills and medical notes within minutes. On-demand healthcare services at your fingertips.");
speak("What We Do. We bring healthcare to your convenience, offering a comprehensive range of on-demand medical services tailored to your needs. Our platform allows you to connect with experienced online doctors who provide expert medical advice, issue online prescriptions, and offer quick refills whenever you require them.")
speak("Emergency Care. Our Emergency Care service is designed to be your reliable support in critical situations. Whether it's a sudden illness, injury, or any medical concern that requires immediate attention, our team of dedicated healthcare professionals is available 24/7 to provide prompt and efficient care.")
speak("Heart Disease. Our team of experienced cardiologists and medical experts use state-of-the-art technology to assess your cardiovascular health and design personalized treatment plans. From comprehensive screenings to advanced interventions, we are committed to helping you maintain a healthy heart and lead a fulfilling life.")
  }, []);

  return (
    <div className="home-section">
      <Navbar />
      <Hero />
      <Info />
      <About />
      <BookAppointment />
      <Reviews />
      <Doctors />
      
      <Footer />
    </div>
  );
}

export default Home;
