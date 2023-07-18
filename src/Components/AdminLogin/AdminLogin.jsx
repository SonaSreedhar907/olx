import React, { useState } from "react";
import "./AdminLogin.css";
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const hardcodedEmail = "admin@gmail.com";
  const hardcodedPassword = "admin123";

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === hardcodedEmail && password === hardcodedPassword) {
      navigate("/admin/home");
    } else {
      setErrorMessage("Invalid Credentials");
    }
  };

  return (
    <div>
      <div id="card">
        <div id="card-content">
          <div id="card-title">
            <h2>LOGIN</h2>
            <div className="underline-title"></div>
          </div>
          <form>
            <label htmlFor="user-email" style={{ paddingTop: 13 }}>
              &nbsp;Email :
            </label>
            <input
              id="user-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-content"
              type="email"
              name="email"
              autoComplete="on"
              required
            />
            <div className="form-border"></div>
            <label htmlFor="user-password" style={{ paddingTop: 25 }}>
              &nbsp;Password :
            </label>
            <input
              id="user-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-content"
              type="password"
              name="password"
              required
            />
            <div className="form-border"></div>
            <button
              id="submit-btn"
              style={{}}
              onClick={handleLogin}
              name="submit"
              value="LOGIN"
            >
              Login
            </button>
          </form>
          {errorMessage && <div>{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
