import React from 'react';
import DoctorCard from './DoctorCard';
import profile1 from '../Assets/profile-1.png';
import profile2 from '../Assets/profile-2.png';
import profile3 from '../Assets/profile-3.png';
import profile4 from '../Assets/profile-4.png';
import '../Styles/DoctorInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Menu from './Menu';
import Nav from './Nav';
import Navbar from './Navbar';

const DoctorInfo = () => {

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

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <div className="row col-12">
        <div className="row col-lg-8 col-12">
          <div className="col-12 col-lg-5 left-col col-sm-12 pr-1">
            <img src={profile1} alt="Doctor's Profile" />
            <p>General Surgeon</p>
          </div>
          <div className="col-12 col-lg-7 pl-1">
            <h1 className="h2">Dr. Charu Yadav</h1>
            <h2 className="h6">
              {renderRatingStars(4.8)} (272)
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, alias!Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Dicta, alias!Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dicta, alias!Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Dicta, alias!
            </p>
          </div>
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                class="nav-link active"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                About
              </button>
              <button
                class="nav-link"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                Review
              </button>
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
              <h1>
                About of <span className="text-success"> Dr. Charu Yadav </span>
              </h1>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore voluptas totam
                repudiandae eaque commodi, perferendis corrupti quidem deleniti quisquam alias earum
                illum exercitationem corporis in quia sit iusto. Iusto, id. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Enim quas eum velit iusto id similique nemo modi, et ea
                minus deserunt ullam quae architecto nulla esse itaque aliquam libero eligendi.
              </p>
              <h2>Education</h2>
              <p>PHD in Gynaecology</p>
            </div>
            <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
              <h1>Reviews</h1>
              <div class="review-list">
        <ul>
            <li>
                <div class="d-flex flex-column">
                  
                    <div class="right">
                        <h4>
                            Askbootstrap
                            <span class="gig-rating text-body-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15">
                                    <path
                                        fill="currentColor"
                                        d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                                    ></path>
                                </svg>
                                5.0
                            </span>
                        </h4>
                        <div class="country d-flex align-items-center">
                            <span>
                                <img class="country-flag img-fluid" src="https://bootdey.com/img/Content/avatar/avatar6.png" />
                            </span>
                            <div class="country-name font-accent">India</div>
                        </div>
                        <div class="review-description">
                            <p>
                                The process was smooth, after providing the required info, Pragyesh sent me an outstanding packet of wireframes. Thank you a lot!
                            </p>
                        </div>
                        <span class="publish py-3 d-inline-block w-100">Published 4 weeks ago</span>
                        <div class="helpful-thumbs">
                            {/* <div class="helpful-thumb text-body-2">
                               
                            <FontAwesomeIcon icon={faThumbsUp}/>
                                <span class="thumb-title">Helpful{' '} </span>
                            </div>
                            <div class="helpful-thumb text-body-2 ml-3">
                                <span class="fit-icon thumbs-icon">
                                <FontAwesomeIcon icon={faThumbsDown}/>
                                </span>
                                <span class="thumb-title"> Not Helpful</span>
                            </div> */}
                        </div>
                      
                    </div>
                    <div class="right">
                        <h4>
                            Askbootstrap
                            <span class="gig-rating text-body-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15">
                                    <path
                                        fill="currentColor"
                                        d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                                    ></path>
                                </svg>
                                5.0
                            </span>
                        </h4>
                        <div class="country d-flex align-items-center">
                            <span>
                                <img class="country-flag img-fluid" src="https://bootdey.com/img/Content/avatar/avatar6.png" />
                            </span>
                            <div class="country-name font-accent">India</div>
                        </div>
                        <div class="review-description">
                            <p>
                                The process was smooth, after providing the required info, Pragyesh sent me an outstanding packet of wireframes. Thank you a lot!
                            </p>
                        </div>
                        <span class="publish py-3 d-inline-block w-100">Published 4 weeks ago</span>
                        <div class="helpful-thumbs">
                            {/* <div class="helpful-thumb text-body-2">
                               
                            <FontAwesomeIcon icon={faThumbsUp}/>
                                <span class="thumb-title">Helpful{' '} </span>
                            </div>
                            <div class="helpful-thumb text-body-2 ml-3">
                                <span class="fit-icon thumbs-icon">
                                <FontAwesomeIcon icon={faThumbsDown}/>
                                </span>
                                <span class="thumb-title"> Not Helpful</span>
                            </div> */}
                        </div>
                      
                    </div>
                </div>
            </li>
        </ul>
    </div>
              
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-12 right d-flex flex-column m-lg-1">
          <div className="d-flex justify-content-around">
            <div className="right-left justify-content-arounds">
              <h1 className="price">Ticket Price:</h1>
              <h2 className="">Available Time Slots</h2>
            </div>
            <div className="right-right">
              <h1 className="amount">Rs.200</h1>
              <h2 className="blank"></h2>
            </div>
          </div>
          <div className="slots d-flex justify-content-around">
            <div>
              <p>Sunday</p>
              <p>Monday</p>
              <p>Tuesday</p>
              <p>Wednesday</p>
            </div>
            <div>
              <p>4:00 PM - 9:30 PM</p>
              <p>4:00 PM - 9:30 PM</p>
              <p>4:00 PM - 9:30 PM</p>
              <p>4:00 PM - 9:30 PM</p>
            </div>
          </div>
          <div className="center-button">
            <button className=" btn btn-primary">Book Appointment Now</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default DoctorInfo;