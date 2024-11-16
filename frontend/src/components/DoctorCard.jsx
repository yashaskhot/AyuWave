// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate  } from "react-router-dom";

// function DoctorCard(props) {
//   const navigate = useNavigate();   

//   const handleBookAppointmentClick = () => {
//     navigate("/doctorinfo");
//   };
//   return (
//     <div className="dt-card border border-1 rounded-5 p-3">
//       <img src={props.img} alt={props.name} className="dt-card-img" />
//       <p className="dt-card-name">{props.name}</p>
//       <p className="dt-card-title">{props.title}</p>
//       <div className="dt-card-desc">
//         <h2>+{props.patient} patients</h2>
//         <p>At {props.hospital} hospital</p>
//       </div>
//       <div className="d-flex flex-row review">
//         <div>
//       <p className="dt-card-stars">
//         <FontAwesomeIcon
//           icon={faStar}
//           style={{ color: "#F7BB50", paddingRight: "6px" }}
//         />
//         {props.stars}
//         <span className="dt-card-reviews"> ({props.reviews}+ Reviews)</span>
//       </p>
//       </div>
//       <div>
//       <button class="btn btn-primary rounded-5"  onClick={handleBookAppointmentClick} type="submit">→</button>
//       </div>
//       </div>
//     </div>
//   );
// }

// export default DoctorCard;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function DoctorCard(props) {
  const navigate = useNavigate();

  const handleBookAppointmentClick = () => {
    navigate(`/doctorinfo`);
  };

  return (
    <div className="dt-card border border-1 rounded-5 p-3">
      <img src={props.photo} alt={props.name} className="dt-card-img" />
      <p className="dt-card-name">{props.name}</p>
      <p className="dt-card-title">{props.specialization}</p>
      <div className="dt-card-desc">
        {/* ... (existing code) */}
      </div>
      <div className="d-flex flex-row review">
        <div>
          <p className="dt-card-stars">
            <FontAwesomeIcon
              icon={faStar}
              style={{ color: "#F7BB50", paddingRight: "6px" }}
            />
            {props.stars}
            <span className="dt-card-reviews"> ({props.reviews}+ Reviews)</span>
          </p>
        </div>

        <button
          className="btn btn-primary rounded-5"
          onClick={handleBookAppointmentClick}
          type="submit"
        >
          →
        </button>
      </div>
    </div>
  );
}

export default DoctorCard;
