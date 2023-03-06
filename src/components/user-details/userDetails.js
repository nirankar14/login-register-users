import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import Table from "react-bootstrap/Table";
import { FaArrowsAltV } from "react-icons/fa";
import {
  BsSearch,
  BsFunnel,
  BsPlusLg,
  BsThreeDotsVertical,
  BsPersonCircle
} from "react-icons/bs";

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
    // document.body.style.opacity = 0.5;

    setSelectedUser(user);
  };
  const handleCloseClick = () => {
    setChangeStyle(false);
    setSelectedUser(null);
  };

  const result = usersData.slice(0, 5).map(user => (
    <tr
      key={user.id}
      onClick={() => handleClick(user)}
      className="table-row-body align-middle"
    >
      {/* <td>{user.id}</td> */}
      <td>
        <div className="d-flex align-items-center">
          <img
            className="rounded-circle me-3"
            src={user.image}
            alt={user.firstName}
            style={{ width: "50px", height: "50px", backgroundColor: "aqua" }}
          />
          {user.firstName + " " + user.lastName}
        </div>
      </td>
      <td>{user.gender}</td>
      <td>
        <div className="float-start">{user.email}</div>
      </td>
    </tr>
  ));

  const showSidePanel = (
    <div className={`user-details-container ${selectedUser ? "open" : ""}`}>
      <div className="col-lg-2 text-start">
        <button
          type="button"
          className="btn-close close-btn"
          aria-label="Close"
          onClick={handleCloseClick}
        ></button>
      </div>

      {selectedUser && (
        <div className="container">
          <div className="row user-details-panel d-flex my-3 mx-3">
            <div className="col-lg-8 my-2">
              <h2>User Details</h2>
            </div>
            <div className="col-lg-4 my-2 text-end threeDots-icon">
              <BsThreeDotsVertical />
            </div>
          </div>
          <div className="row mx-2">
            <div className="col-lg-12 d-flex align-items-center ">
              <img
                src={selectedUser.image}
                className="img-side-panel"
                alt="User"
              />
              <div className="ms-4 user-name-id">
                <span className="">
                  <span className="user-name">
                    {selectedUser.firstName + " " + selectedUser.lastName}
                  </span>
                  <br />
                  <span className="user-id">User id: {selectedUser.id}</span>
                </span>
                <div className="active text-wrap">Active</div>
              </div>
            </div>
            <div className="col-lg-8"></div>
          </div>
          <hr className="border border-2 opacity-50" />
          <div className="row mx-2">
            <div className="col-lg-12 my-2">
              <h4>
                <BsPersonCircle className="mx-2 mb-1 personIcon" />
                Basic & account details
              </h4>
            </div>
            <div className="col-lg-12">
              <span className="basic-details">
                {selectedUser.firstName + " " + selectedUser.lastName} <br />
              </span>
              <label htmlFor="" className="basic-details-fName">
                Full name:
              </label>
            </div>
            <div className="col-lg-12 my-2">
              <span className="basic-details">
                {selectedUser.email} <br />
              </span>
              <label htmlFor="" className="basic-details-fName">
                Email:
              </label>
            </div>
            <div className="col-lg-12 my-2">
              <span className="basic-details">
                {selectedUser.birthDate} <br />
              </span>
              <label htmlFor="" className="basic-details-fName">
                Birth Day:
              </label>
            </div>
            <div className="col-lg-12 my-2">
              <span className="basic-details">
                {selectedUser.bloodGroup} <br />
              </span>
              <label htmlFor="" className="basic-details-fName">
                Blood Group:
              </label>
            </div>
            <div className="col-lg-12 my-2">
              <span className="basic-details text-capitalize">
                {selectedUser.gender} <br />
              </span>
              <label htmlFor="" className="basic-details-fName">
                Gender:
              </label>
            </div>
          </div>
          <hr className="border border-2 opacity-50" />
          <div className="row mx-2">
            <div className="col-lg-12">
              <label htmlFor="">
                <h4>Address</h4>
              </label>
              <br />
              <span className="basic-details text-capitalize">
                {selectedUser.address.address} <br />
                {selectedUser.address.city}, {selectedUser.address.state} <br />
                {selectedUser.address.postalCode}
              </span>
            </div>
          </div>
          <br />
          <br />
        </div>
      )}
    </div>
  );

  return (
    <div>
      <div
        className={`container-fluid ${
          changeStyle ? "bg-color" : "no-bg-color"
        }`}
      >
        {loggedInUser ? (
          <div className="container">
            <div className="row">
              <div className="col-lg-12 mb-4">
                <button
                  className="btn btn-warning float-end m-1"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <h2> You are not logged in yet!!!!</h2>
        )}
        <div className="container">
          <div className="row height d-flex">
            <div className="col-lg-4 user-details">
              <h2>Users</h2>
              <p>Here are all the users for this project.</p>
            </div>
            <div className="col-lg-8 d-flex justify-content-end">
              <div className="add-user">
                <button className="add-user-btn">
                  <BsPlusLg className="add-icon" />
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row height d-flex">
            <div className="col-lg-4 mb-4">
              <div className="search">
                <BsSearch className="search-icon" />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="col-lg-4 mb-4 position-relative">
              <BsFunnel
                className="position-absolute"
                style={{ top: "16px", bottom: "16px" }}
              />{" "}
              <span className="position-absolute mx-4 filter">Filter</span>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-6">
              <Table hover className="table-row">
                <thead>
                  <tr className="table-row-head ">
                    {/* <th>#</th> */}
                    <th scope="col" className="float-start">
                      Name
                      <FaArrowsAltV />
                    </th>
                    <th scope="col">
                      Gender <FaArrowsAltV />
                    </th>
                    <th scope="col" className="float-start">
                      Email <FaArrowsAltV />
                    </th>
                  </tr>
                </thead>
                <tbody>{result}</tbody>
              </Table>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 pagination">Showing 1-5 of 5</div>
          </div>
        </div>
      </div>
      {setChangeStyle ? showSidePanel : <div></div>}
    </div>
  );
}

export default UserDetails;
