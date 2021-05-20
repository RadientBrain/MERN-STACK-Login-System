import { useState } from "react";
import axios from "axios";
import "./ForgotPasswordScreen.css";
import {Link} from "react-router-dom";


const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
    <nav class="navbar navbar-light bg-dark">
      <Link to="/login" style={{textDecoration: 'none' }}><span style={{color:"white"}}>MERN Login System</span></Link>
      <Link to="/login" style={{color: "white", textDecoration: 'none' }}>
                <div style={{ float: "right"}}>
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
      </Link>
    </nav>
    <div className="forgotpassword-screen">
      <form
        onSubmit={forgotPasswordHandler}
        className="forgotpassword-screen__form"
      >
        <h3 className="forgotpassword-screen__title"><b>Forgot Password</b></h3>
        {error && <span className="error-message">{error}</span>}
        {success && <span className="success-message">{success}</span>}
        <div className="form-group">
          <p className="forgotpassword-screen__subtext">
            Please enter the email address you registered your account with. We
            will send you reset password confirmation to this email
          </p>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Send Email
        </button>
      </form>
    </div>
    </>
  );
};

export default ForgotPasswordScreen;