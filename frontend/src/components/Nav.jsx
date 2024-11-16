import React from 'react'
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <>
   <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <Link to="/" className="nav-link active" role="tab" aria-controls="home" aria-selected="true">
            About
          </Link>
        </li>
        <li className="nav-item" role="presentation">
          <Link to="/review" className="nav-link" role="tab" aria-controls="profile" aria-selected="false">
            Reviews
          </Link>
        </li>
      </ul>
  <div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">...</div>
    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
    <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
  </div>
  </>
  )
}

export default Nav