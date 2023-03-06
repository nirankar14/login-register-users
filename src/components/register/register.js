import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../images/login.jpeg";
import logo from "../../images/logo.svg";
import "./register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    window.alert("User Registered!!!");
    navigate("/login");
  };
  return (
    <div className="container-fluid">
      <div className="row row-col-2">
        <div className="col-lg-6 p-5 register-form">
          <div className="card-body p-md-5 mx-md-4">
            <img src={logo} alt="" style={{ width: "100%", height: "70px" }} />
            <div className="d-flex justify-content-center mx-2">
              <h3>Welcome</h3>
              <p>Register yourself in order to view Labs Monotoring System</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Username
                </label>
                <input
                  className="form-control"
                  required
                  type="text"
                  value={username}
                  onChange={event => setUsername(event.target.username)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-login">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-6 p-0">
          <img src={backgroundImage} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Register;
