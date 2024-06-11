import React from "react";
import { Link } from "react-router-dom";

import "./Signup.css";

const Signup = () => {
  return (
    <div className="signup-container">
      <main className="main-container">
        <div className="main-logo--container">
          <img src="/LinkedIn-logo.png" className="main-logo" />
        </div>
        <h1 className="main-title">Make the most of your professional life</h1>
        <section className="consent-signup-container">
          <div className="container">
            <h2 className="main-subtitle">Join LinkedIn</h2>
            <p className="consent-understanding">
              To create a LinkedIn account, you must understand how LinkedIn
              processes your personal information by selecting learn more for
              eact item listed.
            </p>
            <div>
              <input type="checkbox" className="agree-all-terms" />
              <label for="agree-all-terms" className="agree-all-terms--label">
                Agree to all terms
              </label>
              <div className="term1-term2--container">
                <div className="agree-term1">
                  <input type="checkbox" />
                  <label>
                    We collect and use personal information{" "}
                    <span className="hightlight">Learn more</span>
                  </label>
                </div>
                <div className="agree-term2">
                  <input type="checkbox" className="agree-term2" />
                  <label for="agree-term2">
                    We share personal infromation with third parties to provide
                    out services. <span className="hightlight">Learn more</span>
                  </label>
                </div>
              </div>
            </div>
            <p className="further-information">
              Futher information is available in out{" "}
              <span className="hightlight">Korea Privacy Addendum.</span>
            </p>

            <section className="form-container">
              <form className="email-password-form">
                <div className="email-container">
                  <label>Email</label>
                  <input type="email" className="email"></input>
                </div>
                <div className="password-container">
                  <label>Password(6+ characters)</label>
                  <input type="password" className="password"></input>
                </div>
                <p className="bottom-agree">
                  By clicking Agree & Join, you agree to the LinkedIn{" "}
                  <span className="hightlight">
                    User Agreement, Privacy Policy, and Cookie Policy
                  </span>
                </p>
                <button className="agree-join--button">Agree & Join</button>
              </form>
            </section>
            <div className="google-login-button--container">
              <span className="or-span">or</span>
              <button className="google-login-button">
                Continue with Google
              </button>
            </div>
            <p className="already">
              Already on LinkedIn? <Link>Sign In</Link>
            </p>
          </div>
        </section>
        <p className="bottom-get-help">
          Looking to create a page for a business? Get help
        </p>
      </main>
    </div>
  );
};

export default Signup;
