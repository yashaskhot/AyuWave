import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../Styles/DoctorInfo.css';

const DoctorInfo = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FontAwesomeIcon icon={faStar} style={{ color: '#F7BB50' }} key={i} />);
      } else {
        stars.push(<FontAwesomeIcon icon={faStar} key={i} />);
      }
    }
    return stars;
  };

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/doctors/${id}`);
        setDoctor(response.data.data);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchDoctorData();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row col-lg-8 col-12">
          <div className="row col-12">
            {doctor && (
              <>
                <div className="col-12 col-lg-5 left-col col-sm-12 pr-1">
                  <img src={doctor.photo} alt="Doctor's Profile" />
                  <p>{doctor.specialization}</p>
                </div>
                <div className="col-12 col-lg-7 pl-1">
                  <h1 className="h2">{`Dr. ${doctor.name}`}</h1>
                  <h2 className="h6">{renderRatingStars(doctor.averageRating)} ({doctor.totalRating})</h2>
                  <p>{doctor.bio}</p>
                </div>
              </>
            )}
          </div>
          {/* ... (existing code) */}
        </div>
        {/* ... (existing code) */}
      </div>
    </>
  );
};

export default DoctorInfo;
