import React, { useState } from 'react';
import './Login.css'; 
import { FaUserDoctor } from "react-icons/fa6";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [forgotPasswordClicked, setForgotPasswordClicked] = useState(false);

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const toggleForgotPassword = () => {
    setForgotPasswordClicked(!forgotPasswordClicked);
  };

  return (
    <div className={`container ${isSignUp ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form className={`sign-in-form ${isSignUp ? '' : 'active'}`}>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <a href='#' onClick={toggleForgotPassword}>Forgot Password</a>
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </form>
          <form className={`sign-up-form ${isSignUp ? 'active' : ''}`}>
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" className="btn" value="Sign up" />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </form>
        </div>
      </div>
      
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <FaUserDoctor size="3em" />
            <h2>MR.MARUTHUVAR</h2>
            <br></br>
            <button className="btn transparent" onClick={toggleSignUp}>
              Sign up
            </button>
          </div>
        </div>
        <div className="panel right-panel">
          <div className="content">
            <FaUserDoctor size="3em"/>
            <h2>STAY SAFE WITH GOOD HEALTH</h2>
            <br></br>
            <button className="btn transparent" onClick={toggleSignUp}>
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
      {forgotPasswordClicked && (
        <div className="forgot-password">
          <p>Forgot your password?</p>
          <p>No worries! Please contact support.</p>
          <button onClick={toggleForgotPassword}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Login;
