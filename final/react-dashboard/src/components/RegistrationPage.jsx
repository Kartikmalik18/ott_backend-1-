import React, { useState } from "react";
import axios from "axios";
import '../styles/RegistrationPage.css';
import { useNavigate } from "react-router-dom";
function RegistrationPage() {
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handleonchange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,


    }))

  }
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();

    setIsLoading(true); // Show loader
    try {
      const dataResponse = await fetch("http://localhost:5000/api/signup", {
        method: 'POST',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        console.log(dataApi.message);
        navigate("/login");
      } else {
        console.log(dataApi.message);
      }
    } catch (error) {
      console.log("Something went wrong! Please try again.");
    } finally {
      setIsLoading(false); // Hide loader
    }

  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <h2>Sign Up</h2>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value = {data.name}
            onChange={handleonchange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value = {data.email}
            onChange={handleonchange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value = {data.password}
            onChange={handleonchange}
            required
          />
        </div>
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default RegistrationPage;
