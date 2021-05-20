import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css";

import {Link} from 'react-router-dom';

const PrivateScreen = ({history}) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");



  useEffect(() => {

    if(!localStorage.getItem("authToken")) {
        history.push("/");
    }

    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, [history]);

  const logoutHandler = () =>{
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
        <nav class="navbar navbar-light bg-dark">
          <Link to="/login" style={{textDecoration: 'none' }}><span style={{color:"white"}}>MERN Login System</span></Link>
          <Link to="/login" style={{color: "white", textDecoration: 'none' }}>
                <div style={{ float: "right"}}>
                    <button className="btn btn-primary"onClick={logoutHandler}>Logout</button>
                </div>
            </Link>
        </nav>
        <div id="hideMe" style={{background: "#f0dac5", color:"#1c2340", textAlign: "center"}}>
            {privateData}
        </div> 
        <div className="center-screen">
            <h1><b>Welcome!</b></h1><br/><p>Your journey begins from here</p>
        </div>
    </>
    
  );
};

export default PrivateScreen;