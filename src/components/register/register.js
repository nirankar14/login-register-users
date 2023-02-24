import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../images/bg4.jpeg";
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
      <div className="row">
        <div className="col-md-6 p-5">
          <div className="card">
            <div className="card-body">
              <h2>Registration</h2>
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
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </form>
            </div>
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
