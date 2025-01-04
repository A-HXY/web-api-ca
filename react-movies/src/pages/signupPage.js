import React, { useState } from "react";
import SignupForm from "../components/signupForm"; 
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const [errorMessage, setErrorMessage] = useState(""); 
    const [successMessage, setSuccessMessage] = useState(""); 
    const navigate = useNavigate();  

    const handleSignup = async (credentials) => {
        try {
          const response = await fetch("http://localhost:8080/api/users?action=register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });

          if (response.ok) {
            setSuccessMessage("Account created successfully! Redirecting to login...");
            setErrorMessage(""); 
            setTimeout(() => {
              history.push("/login"); 
            }, 2000); 
          } else {
            const errorData = await response.json();
            setErrorMessage(errorData.msg || "Signup failed. Please try again."); 
            setSuccessMessage(""); 
          }
        } catch (error) {
          setErrorMessage("An error occurred. Please try again."); 
          setSuccessMessage(""); 
        }
      };
    
      return (
        <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div>
            <SignupForm onSignup={handleSignup} />
            {errorMessage && <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>}
          </div>
        </div>
      );
    };
    
    export default SignupPage;