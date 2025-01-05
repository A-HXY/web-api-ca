import React, { useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = async () => {
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
            sessionStorage.setItem("sessionId", data.token); 
            sessionStorage.setItem("username", credentials.username);
            setIsAuthenticated(true);
            setErrorMessage("");
            navigate("/"); 
          } else {
            const errorData = await response.json();
            setErrorMessage(errorData.msg || "Login failed. Please try again.");
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Error logging in:", error);
          setErrorMessage("An error occurred. Please try again.");
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
        Login
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
        onClick={handleLogin}
        variant="contained"
        color="primary"
        style={{ padding: "10px 20px" }}
      >
        Login
      </Button>
      {errorMessage && (
        <Alert severity="error" style={{ marginTop: "20px", width: "300px" }}>
          {errorMessage}
        </Alert>
      )}
      {isAuthenticated && (
        <Alert severity="success" style={{ marginTop: "20px", width: "300px" }}>
          Logged in successfully!
        </Alert>
      )}
    </Container>
  );
};

export default LoginForm;
