import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LoginScreen.css";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
    
    <nav class="navbar navbar-light bg-dark">
          <Link to="/login" style={{textDecoration: 'none' }}><span style={{color:"white"}}>MERN Login System</span></Link>
    </nav>
    
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen__form">
        <h3 className="login-screen__title"><b>Login</b></h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password:{" "}

          </label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>


        <div style={{float:'left'}}>
            <span className="login-screen__subtext">
                Don't have an account? <Link style={{textDecoration:'none'}} to="/register">Register</Link>
            </span>
        </div>
        
        <div style={{float:'right'}}>
            <Link style={{textDecoration:'none'}} to="/forgotpassword" className="login-screen__forgotpassword">
                Forgot Password?
            </Link>
        </div>

      </form>
    </div>
  
    </>
  );
};

export default LoginScreen;