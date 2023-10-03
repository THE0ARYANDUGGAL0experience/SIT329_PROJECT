import React, { useState, useEffect } from "react";
import { Accordion, Card, Spinner } from "react-bootstrap";
import { userDetailsURL } from "../../constants/urls";
import { useNavigate } from "react-router-dom";

const UserSection = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(userDetailsURL, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status === 200) {
        var user = await response.json();
        setUserData(user);
      } else {
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      navigate("/");
    }
    setLoading(false);
  };

  // Simulate API call
  useEffect(() => {
    // Your API call logic here

    // Simulating API call completion after 2 seconds
    getUserData();
  }, []);

  return (
    <div className="p-3">
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <div>
          <h1 style={{color: 'white'}}>Welcome, <span style={{textTransform: 'capitalize'}}>{userData.full_name}</span></h1>
          <Accordion>
            <Card>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Details</Accordion.Header>
                <Accordion.Body>
                  <Card.Body>
                    <p>License Plate: <span style={{color: 'orangered'}}>{userData.license_plate}</span></p>
                    <p>Email: <span style={{color: 'orangered'}}>{userData.email}</span></p>
                  </Card.Body>
                </Accordion.Body>
              </Accordion.Item>
            </Card>
          </Accordion>
        </div>
      )}
    </div>
  );
};

export default UserSection;
