import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/LogInPage.css';
import Cookies from "js-cookie";

function LoginPage() {
  const [data, setdata] = useState({
      email: "",
      password: ""
    })
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleonchange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,


    }))
  }
  const [isLoading, setIsLoading] = useState(false)
  const handleLogin = async (e) => {
    e.preventDefault();
    
    setIsLoading(true); // Show loader while awaiting API response

    try {
        const dataResponse = await fetch("https://ott-backend-1-server.onrender.com", {
            method:"POST",
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data),
        });

        const dataApi = await dataResponse.json();

        if (dataApi.success) {
            Cookies.set("token", dataApi.data);
            console.log(dataApi.message);
            navigate("/dashboard"); 
        } else {
          console.log(dataApi.message); 
        }
    } catch (error) {
      console.log("Something went wrong, please try again.");
    } finally {
        setIsLoading(false); 
    }
};

  return (
    <div className="login-container">
  <form onSubmit={handleLogin} className="login-form">
    <h2 className="form-title">Welcome Back</h2>
    <p className="form-subtitle">Please login to your account</p>

    <div className="input-group">
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={data.email}
        placeholder="Enter your email"
        
        onChange={handleonchange}
        required
      />
    </div>

    <div className="input-group">
      <label>Password</label>
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={data.password}
        onChange={handleonchange}
        required
      />
    </div>

    <button type="submit" className="btn">
      Login
    </button>

    {error && <p className="error-message">{error}</p>}

    <p className="signup-link">
      Don't have an account? <a href="/register">Sign up</a>
    </p>
  </form>
</div>

  );
}

export default LoginPage;
