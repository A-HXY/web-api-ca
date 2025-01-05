import React, { useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSignup = async () => {
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
          navigate("/login"); 
        }, 2000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.msg || "Signup failed. Please try again.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setErrorMessage("An error occurred. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Signup
      </Typography>
      <TextField
        label="Username"
        name="username"
        variant="outlined"
        value={credentials.username}
        onChange={handleInputChange}
        style={{ marginBottom: "20px", width: "300px" }}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        value={credentials.password}
        onChange={handleInputChange}
        style={{ marginBottom: "20px", width: "300px" }}
      />
      <Button
        onClick={handleSignup}
        variant="contained"
        color="primary"
        style={{ padding: "10px 20px" }}
      >
        Signup
      </Button>
      {errorMessage && (
        <Alert severity="error" style={{ marginTop: "20px", width: "300px" }}>
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" style={{ marginTop: "20px", width: "300px" }}>
          {successMessage}
        </Alert>
      )}
    </Container>
  );
};

export default SignupForm;
