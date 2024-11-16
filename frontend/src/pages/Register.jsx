import React, { useState } from 'react';

const Register = () => {
  const [selectedRole, setSelectedRole] = useState("patient");

  const handleRoleSelection = (event) => {
    console.log(event)
    setSelectedRole(event);
    console.log(selectedRole)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      role: selectedRole,
    };
    
  
    try {
      const response = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      console.log(data.message || 'User registered successfully');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
      <div className="container">
        <div className="card login-card">
          <div className="row no-gutters">
            <div className="col-md-5">
              <img src="https://thumbs.dreamstime.com/b/indian-doctor-mature-male-medical-standing-isolated-white-background-handsome-model-portrait-31871541.jpg" alt="login" className="login-card-img" />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <div className="brand-wrapper">
                  <img src="https://cdn.logo.com/hotlink-ok/logo-social.png" alt="logo" className="logo" />
                </div>
                <p className="login-card-description">Create your account</p>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username" className="sr-only">Name</label>
                  <input 
                    type="text" 
                    name="username" 
                    id="username" 
                    className="form-control" 
                    placeholder="Enter your Name" 
                    required 
                  />
                </div>

                  <div className="form-group">
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input type="email" name="email" id="email" className="form-control" placeholder="Email address" required />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input type="password" name="password" id="password" className="form-control" placeholder="Create Password" required />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" className="form-control" placeholder="Confirm Password" required />
                  </div>
                  <div className="form-group mb-4">
                    <label className="sr-only">Role</label>
                    <div>
                      <div className="form-check">
                        <input 
                          type="radio" 
                          className="form-check-input" 
                          id="doctor" 
                          name="role" 
                          value="Doctor" 
                          checked={selectedRole === 'Doctor'} 
                          onChange={handleRoleSelection} 
                        />
                        <label className="form-check-label" htmlFor="doctor">Doctor</label>
                      </div>
                      <div className="form-check">
                        <input 
                          type="radio" 
                          className="form-check-input" 
                          id="patient" 
                          name="role" 
                          value="Patient" 
                          checked={selectedRole === 'Patient'} 
                          onChange={handleRoleSelection} 
                        />
                        <label className="form-check-label" htmlFor="patient">Patient</label>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-block login-btn mb-4">Sign Up</button>
                </form>
                <p className="login-card-footer-text">Back to login? <a href="./login" className="text-reset">Login</a></p>
                <nav className="login-card-footer-nav">
                  <a href="#!">Terms of use.</a>
                  <a href="#!">Privacy policy</a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
