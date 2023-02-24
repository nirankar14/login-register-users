import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar";
import Login from "./components/login/login";
import Register from "./components/register/register";
import UserDetails from "./components/user-details/userDetails";
import "./App.css";
import "./components/user-details/styles.css";

function App() {
  return (
    <Router>
      <Navbar />
      {/* <div className="App">Main page</div> */}
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userDetails" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
