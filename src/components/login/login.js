import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import backgroundImage from "../../images/bg1.jpeg";

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
    <div
      className="container-fluid container-bg "
      // style={{
      //   backgroundImage: 'url("https://wallpapercave.com/wp/wp9764009.jpg")'
      // }}
    >
      <div className="row">
        <div className="col-md-6 p-0">
          <img src={backgroundImage} className="image" alt="" />
        </div>
        <div className="col-md-6 p-5">
          <div className="card">
            <div className="card-body">
              <h2>Login form</h2>
              <form onSubmit={handleSubmit}>
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
          {/* <form onSubmit={handleSubmit}>
            <label htmlFor="">
              Email:
              <input
                required
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </label>
            <br />
            <label htmlFor="">
              Password:
              <input
                required
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </label>
            <br />
            <button type="submit">Login</button>
          </form> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
