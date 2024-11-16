import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css';
import LoginComp from '../Components/LoginComp';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cookies, setCookie] = useCookies(['authToken']);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setError('');
      // Send login request to the server
      const response = await axios.post(
        'http://localhost:8000/api/auth/login', // Replace with your server login endpoint
        { email, password }
      );

      // Extract the token from the response
      const { token } = response.data;

      // Store the token in cookies
      setCookie('authToken', token, { path: '/' });

      navigate('/survey');
    } catch (error) {
      // Handle login errors
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
      <div className="container">
        <div className="card login-card">
          <div className="row no-gutters">
            <div className="col-md-5">
              <img
                src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?cs=srgb&dl=pexels-thirdman-5327585.jpg&fm=jpg"
                alt="login"
                className="login-card-img"
              />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <div className="brand-wrapper">
                  <img
                    src="https://cdn.logo.com/hotlink-ok/logo-social.png"
                    alt="logo"
                    className="logo"
                  />
                </div>
                <p className="login-card-description">Sign into your account</p>
                <form>
                  <div className="form-group">
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="Email address"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      placeholder="***********"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-block login-btn mb-4"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </form>
                {error && <p className="text-danger">{error}</p>}
                <a href="#!" className="forgot-password-link">
                  Forgot password?
                </a>
                <p className="login-card-footer-text">
                  Don't have an account?{' '}
                  <a href="./register" className="text-reset">
                    Register here
                  </a>
                </p>
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
};

export default Login;
