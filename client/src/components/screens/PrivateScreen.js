import { useState, useEffect } from "react";
import axios from "axios";


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
        <div style={{background: "lime", color:"Blue"}}>
            {privateData}
        </div>   
        <div  style={{float: 'right'}} >
            <button className="btn btn-primary"onClick={logoutHandler}>
                Logout    
            </button>    
        </div>
 
    </>
    
  );
};

export default PrivateScreen;