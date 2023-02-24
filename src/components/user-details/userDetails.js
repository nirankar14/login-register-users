import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
function UserDetails() {
  const [changeStyle, setChangeStyle] = useState(false);
  const [usersData, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://dummyjson.com/users");
      const data = JSON.stringify(response.data);
      const finalData = JSON.parse(data);
      // console.log("data--->", data);
      setUsers(finalData.users);
    };
    fetchData();
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(loggedInUser);
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/login");
  };

  const handleClick = user => {
    setChangeStyle(true);

    setSelectedUser(user);
  };
  const handleCloseClick = () => {
    setChangeStyle(false);
    setSelectedUser(null);
  };

  const result = usersData.map(user => (
    <tr key={user.id} onClick={() => handleClick(user)}>
      <td>{user.id}</td>
      <td>
        <img
          src={user.image}
          alt={user.firstName}
          style={{ width: "50px", height: "50px" }}
        />
      </td>
      <td>{user.firstName + " " + user.lastName}</td>
      <td>{user.gender}</td>
      <td>{user.email}</td>
    </tr>
  ));

  return (
    <div
      className={`container-fluid ${changeStyle ? "bg-color" : "no-bg-color"}`}
    >
      {loggedInUser ? (
        <div>
          {/* <div className=""> */}
          <button
            className="btn btn-warning float-end m-1"
            onClick={handleLogout}
          >
            Logout
          </button>
          {/* </div> */}
          <h3 className="d-flex justify-content-center heading m-2">
            Welcome:{" "}
            <span className="username ">
              <h3>{loggedInUser.email}</h3>
            </span>
          </h3>
          <h4 className="d-flex justify-content-center heading">
            UserDetails Page
          </h4>
        </div>
      ) : (
        <h2> You are not logged in yet!!!!</h2>
      )}
      <h2>Users:</h2>
      <ul>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>{result}</tbody>
        </Table>
      </ul>
      <div className={`user-details-container ${selectedUser ? "open" : ""}`}>
        {selectedUser && (
          <div className="user-details-panel">
            <div className="card border-info mb-3">
              <div className="card-header">User Details</div>
              <img
                src={selectedUser.image}
                className="card-img-top"
                alt="User"
              ></img>
              <div className="card-body">
                <h4
                  className="card-title badge bg-primary text-wrap"
                  style={{ width: "3rem" }}
                >
                  ID: {selectedUser.id}
                </h4>
                <hr />
                <div className="card-title">
                  <h4 className="fw-bold">
                    Name: {selectedUser.firstName + " " + selectedUser.lastName}
                  </h4>
                </div>
                <div className="card-title">
                  <h4 className="fw-bold">Email: {selectedUser.email}</h4>
                </div>
                <div className="card-title">
                  <h4 className="fw-bold">Gender: {selectedUser.gender} </h4>
                </div>
                <div className="card-title">
                  <h4 className="fw-bold">Bithday: {selectedUser.birthDate}</h4>
                </div>
                <hr />
                <address>
                  <div className="card-title">
                    <h4 className="fw-bold">Address:</h4>
                  </div>
                  {selectedUser.address.address} <br />
                  {selectedUser.address.city}
                </address>
              </div>
            </div>
            <button className="close-btn" onClick={handleCloseClick}>
              X
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDetails;
