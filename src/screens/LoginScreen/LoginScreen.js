import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Toast } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css"; // Import custom CSS file
import { loginURL } from "../../constants/urls";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setToastMessage("Please fill in both fields.");
      setShowToast(true);
      return;
    }

    setLoading(true);

    // Simulate API call with a delay (replace with actual API call)
    try {
      const response = await fetch(loginURL, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {          
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // Successful login, store token in session (replace with actual token handling)
        var {token} = await response.json()
        console.log(token)
        sessionStorage.setItem("token", token);
        navigate('/home')
      } else {
        setToastMessage("Wrong username or password.");
        setShowToast(true);
      }
    } catch (error) {
      console.error("API call failed:", error);
      setToastMessage("An error occurred during login.");
      setShowToast(true);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="background-image"></div>
      <Container className="login-container">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
          }}
        >
          <Toast.Header>
            <strong className="mr-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>

        <div className="login-form">
          <Form onSubmit={handleSubmit}>
            <h1 className="heading">Automatic Car Parking</h1>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              className="mt-3"
              variant="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
