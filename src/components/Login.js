import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();
  const errorHandler = (err) => {
    setError(err.message);
    {
      alert(error);
    }
  };
  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        history.push("/home");
      })
      .catch(errorHandler);
  };
  const signUpLoginPageHandler = (e) => {
    e.preventDefault();
    history.push("/signup");
  };
  return (
    <div className="big-login-page-handler">
      <div className="login-page-handler">
        <div className="form">
          <h1 className="login-page-title">Log in</h1>

          <form onSubmit={login} className="add-login-form">
            <div className="login-form-controls">
              <input
                type="email"
                value={email}
                required
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="text-input-login"
              />
              <input
                type="password"
                value={password}
                required
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="text-input-login"
              />
              <div className="button-wrapper">
                <button className="login-button" type="submit">
                  Login
                </button>
                <p className="paragraph">Need an account?</p>{" "}
                <button
                  onClick={signUpLoginPageHandler}
                  className="login-button-two"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
