import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  const register = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert("Please create a longer password");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => history.push("/home"))
        .catch((err) => alert(err.message));

      setEmail("");
      setPassword("");
    }
  };
  const goToLogin = (e) => {
    e.preventDefault();
    history.push("/");
  };
  return (
    <div className="big-login-page-handler">
      <div className="login-page-handler">
        <div className="form">
          <h1 className="login-page-title">Sign Up</h1>

          <form onSubmit={register} name="add-login-form">
            <div className="login-form-controls">
              <input
                type="email"
                value={email}
                className="text-input-login"
                placeholder="Enter your email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                value={password}
                className="text-input-login"
                required
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="button-wrapper">
                <button type="submit" className="login-button">
                  Sign Up
                </button>
                <p className="paragraph"> Already have an account? </p>
                <button onClick={goToLogin} className="login-button-two">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
