import React, { useState } from "react";
import LoginForm from "../components/loginForm"; 
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate(); 

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch("http://localhost:8080/api/users?action=login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); 
        navigate("/"); 
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.msg || "Login failed. Please try again."); 
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again."); 
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
       <div>
        <LoginForm onLogin={handleLogin} />
        {errorMessage && <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
