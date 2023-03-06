import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import backgroundImage from "../../images/login.jpeg";
import logo from "../../images/logo.svg";
import { BsEyeSlash } from "react-icons/bs";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      user => user.email === email && user.password === password
    );
    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.alert("LoggedIn Succesfull!!!");
      navigate("/userDetails");
    }
  };

  return (
    <div className="container-fluid ">
      <div className="row row-col-2">
        <div className="col-md-6 p-0">
          <img src={backgroundImage} className="image" alt="" />
        </div>

        <div className="col-lg-6 login-form ">
          <div className="card-body p-md-5 mx-md-4">
            <img src={logo} alt="" style={{ width: "100%", height: "70px" }} />
            <div className="d-flex justify-content-center mx-2">
              <h3>Welcome</h3>
              <p>Login to Labs Monotoring System</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email ID</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                />
              </div>

              <div className="mb-3 position-relative">
                <label className="form-label">Password</label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                />
                <BsEyeSlash className="password-icon position-absolute " />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-login">
                  Login
                </button>
              </div>
              <div className="float-end  my-2">
                <p>Forgot password?</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
