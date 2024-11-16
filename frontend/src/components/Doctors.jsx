// import React from "react";
// import DoctorCard from "./DoctorCard";
// import profile1 from "../Assets/profile-1.png";
// import profile2 from "../Assets/profile-2.png";
// import profile3 from "../Assets/profile-3.png";
// import profile4 from "../Assets/profile-4.png";
// import "../Styles/Doctors.css";

// function Doctors() {
//   return (
//     <div className="doctor-section " id="doctors">
//       <div className="dt-title-content">
//         <h3 className="dt-title">
//           <span>Meet Our Doctors</span>
//         </h3>

//         <p className="dt-description m-10">
//           Meet our exceptional team of specialist doctors, dedicated to
//           providing top-notch healthcare services at Health Plus. Trust in their
//           knowledge and experience to lead you towards a healthier and happier
//           life.
//         </p>
//       </div>

//       <div className="dt-cards-content">
//         <DoctorCard
//           img={profile1}
//           name="Dr. Kathryn Murphy"
//           title="General Surgeons"
//           patient="500"
//           hospital="Flex"
//           stars="4.9"
//           reviews="1800"
//         />
//         <DoctorCard
//           img={profile2}
//           name="Dr. Jacob Jones"
//           title="Hematologists"
//           patient="900"
//           hospital="Flex1"
//           stars="4.8"
//           reviews="700"
//         />
//         <DoctorCard
//           img={profile3}
//           name="Dr. Jenny Wilson"
//           title="Endocrinologists"
//           patient="200"
//           hospital="Flex2"
//           stars="4.7"
//           reviews="450"
//         />
//         <DoctorCard
//           img={profile4}
//           name="Dr. Albert Flores"
//           title="Hematologists"
//           patient="350"
//           hospital="Flex3"
//           stars="4.8"
//           reviews="500"
//         />
//       </div>
//     </div>
//   );
// }

// export default Doctors;
import React, { useEffect, useState } from "react";
import DoctorCard from "./DoctorCard";
import axios from "axios";
import "../Styles/Doctors.css";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/doctors"); // Update the API endpoint
        setDoctors(response.data.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="doctor-section " id="doctors">
      <div className="dt-title-content">
        {/* ... (existing code) */}
      </div>

      <div className="dt-cards-content">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor._id} // Make sure each component has a unique key
            id={doctor._id}
            name={doctor.name}
            specialization={doctor.specialization}
            photo={doctor.photo}
            patient="500" // You can pass other data if needed
            hospital="Flex"
            stars="4.9"
            reviews="1800"
          />
        ))}
      </div>
    </div>
  );
}

export default Doctors;
