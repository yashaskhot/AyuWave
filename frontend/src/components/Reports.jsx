import React from 'react';
import Navbar from './Navbar.jsx';
import { Card, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faWeight, faTint, faFile } from '@fortawesome/free-solid-svg-icons';
import '../Styles/Reports.css';
import '../Styles/Heading.css';
import MedAssist from "./chatBot";

const Report = () => {
  return (
    <div className='p-2' style={{ fontFamily: 'Arial, sans-serif', overflow: 'hidden' }}>
       
      <Navbar />
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
      <div>
        <div className="one">
          <h1>Reports</h1>
        </div>
      </div>
      <div className="container-fluid report-grid">
        {/* Heart Rate Section */}
        <div className="grid-item">
          <h5 className="font-weight-bold">Heart Rate</h5>
          <Card className="p-3 mb-3 card-hover">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <FontAwesomeIcon icon={faHeartbeat} size="2x" style={{ paddingRight: '10px' }} className="text-danger" />
              </div>
              <div className="text-right">
                <h4 className="font-weight-bold mb-0" style={{ fontSize: '2rem' }}>96</h4>
                <small className="text-muted">bpm</small>
              </div>
            </div>
          </Card>
        </div>
        {/* Blood Group Section */}
        <div className="grid-item">
          <h5 className="font-weight-bold">Blood group</h5>
          <Card className="p-3 mb-3 card-hover">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <FontAwesomeIcon icon={faWeight} size="2x" style={{ paddingRight: '10px' }} className="text-danger" />
              </div>
              <div className="text-right">
                <h4 className="font-weight-bold mb-0" style={{ fontSize: '2rem' }}>B+</h4>
              </div>
            </div>
          </Card>
        </div>
        {/* Weight Section */}
        <div className="grid-item">
          <h5 className="font-weight-bold">Weight</h5>
          <Card className="p-3 mb-3 card-hover">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <FontAwesomeIcon icon={faTint} size="2x" style={{ paddingRight: '10px' }} className="text-danger" />
              </div>
              <div className="text-right">
                <h4 className="font-weight-bold mb-0" style={{ fontSize: '2rem' }}>70</h4>
                <small className="text-muted">kg</small>
              </div>
            </div>
          </Card>
        </div>
        {/* Blood Group Section (Duplicate for the grid) */}
        <div className="grid-item">
          <h5 className="font-weight-bold">BMI</h5>
          <Card className="p-3 mb-3 card-hover">
            <div className="d-flex justify-content-between align-items-center">
              {/* <div>
                <FontAwesomeIcon icon={faHeartbeat} size="2x" style={{ paddingRight: '10px' }} className="text-danger" />
              </div> */}
              <div className="text-right">
                <h4 className="font-weight-bold mb-0" style={{ fontSize: '2rem' }}>19</h4>
                <small className="text-muted">bpm</small>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Latest Reports Section */}
      <div className="report-container">
        <div className="one">
          <h1>Latest Reports</h1>
        </div>
        <div className="list-group report-list">
          <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <FontAwesomeIcon icon={faFile} size="2x" className="text-primary" />
            General Health <span className="badge badge-primary badge-pill">2 days ago</span>
          </a>
          <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <FontAwesomeIcon icon={faFile} size="2x" className="text-secondary" />
            Diabetes <span className="badge badge-primary badge-pill">4 days ago</span>
          </a>
        </div>
      </div>
      <MedAssist/>

      {/* Footer Navbar */}
      {/* <Navbar fixed="bottom" bg="light" variant="light" className="justify-content-around">
        <Nav>
          <Nav.Link href="#home">
            <FontAwesomeIcon icon={faHome} size="lg" className="text-muted" />
          </Nav.Link>
          <Nav.Link href="#user">
            <FontAwesomeIcon icon={faUser} size="lg" className="text-muted" />
          </Nav.Link>
          <Nav.Link href="#reports">
            <FontAwesomeIcon icon={faChartLine} size="lg" className="text-muted" />
          </Nav.Link>
        </Nav>
      </Navbar> */}
     
    </div>
    
  );
};


export default Report;
