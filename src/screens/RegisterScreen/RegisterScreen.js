// src/components/Registration.js
import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { registerURL } from "../../constants/urls";
import "./Register.css";

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
    license_plate: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if all fields are filled
    for (const key in formData) {
      if (formData[key] === "") {
        setToastMessage("Please fill in all fields.");
        setShowToast(true);
        setLoading(false);
        return;
      }
    }

    // Make a POST request to your API (replace with actual API endpoint)
    try {
      const response = await fetch(registerURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        navigate("/");
      } else {
        const data = await response.json();
        setToastMessage(data.error || "Registration failed.");
        setShowToast(true);
      }
    } catch (error) {
      setToastMessage("An error occurred. Please try again later.");
      setShowToast(true);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <div className="background-image"></div>
      <Container className="registration-container">
        <Row>
          <Col className="registration-form">
            <h1>Automatic Car Parking</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="full_name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="license_plate">
                <Form.Label>License Plate</Form.Label>
                <Form.Control
                  type="text"
                  name="license_plate"
                  value={formData.license_plate}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button className="mt-3" variant="primary" type="submit" disabled={loading}>
                {loading ? "Loading..." : "Submit"}
              </Button>
            </Form>
          </Col>
        </Row>

        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          className="registration-toast"
        >
          <Toast.Header>
            <strong className="mr-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </Container>
    </div>
  );
};

export default Registration;
