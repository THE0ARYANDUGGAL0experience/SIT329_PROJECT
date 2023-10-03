import React, { useState, useEffect } from "react";
import { Button, Modal, Spinner, Toast } from "react-bootstrap";
import "./BookSection.css";
import {
  createBookingURL,
  parkingListURL,
  userDetailsURL,
} from "../../constants/urls";
import { useNavigate } from "react-router-dom";

const BookSection = () => {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [selectedSpots, setSelectedSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bookFrom, setBookFrom] = useState(new Date().toUTCString());
  const [bookTo, setBookTo] = useState(new Date().toUTCString());
  const [bookingLoading, setBookingLoading] = useState(false);
  const navigate = useNavigate();

  // Simulate API call to get parking spot data
  useEffect(() => {
    // Your API call logic here to fetch parking spot data
    // For simplicity, we'll use dummy data
    const fetchData = async () => {
      try {
        // Simulated data
        const response = await fetch(parkingListURL);
        if (response.status === 200) {
          var data = await response.json();
        } else {
          navigate("/");
        }
        setParkingSpots(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSpotClick = (spotId) => {
    if (parkingSpots[spotId - 1].current_state === "Free") {
      const updatedSelectedSpots = selectedSpots.includes(spotId)
        ? selectedSpots.filter((spot) => spot !== spotId)
        : [...selectedSpots, spotId];

      setSelectedSpots(updatedSelectedSpots);
    }
  };

  const handleBookClick = () => {
    if (selectedSpots.length === 0) {
      setShowToast(true);
    } else {
      setShowModal(true);
    }
  };

  const getUser = async () => {
    const token = sessionStorage.getItem("token");
    const response = await fetch(userDetailsURL, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (response.status === 200) {
      var user = await response.json();
      return user;
    } else {
      return 0;
    }
  };

  const bookSlot = async (slot) => {
    try {
      var user = await getUser();
      if (user !== 0) {
        const response = await fetch(createBookingURL, {
          method: "POST",
          body: JSON.stringify({
            parking: slot,
            user: user.id,
            book_from: bookFrom,
            end_from: bookTo,
            state: "Booked",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          return 1;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    } catch (e) {
      console.log(e);
      return 0;
    }
  };

  const handleBookConfirm = () => {
    setBookingLoading(true);    
    selectedSpots.map(async (item) => {
        var response = await bookSlot(item);        
    })
    setBookingLoading(false);
    setShowModal(false);
    navigate('/home')
  };

  return (
    <div>
      {/* Loading Indicator */}
      {loading && <div>Loading...</div>}

      {/* Bookings Section */}
      <div className="parking-lot">
        {parkingSpots.map((spot) => (
          <div
            key={spot.id}
            onClick={() => handleSpotClick(spot.id)}
            className={`parking-spot ${
              spot.current_state === "Free" && selectedSpots.includes(spot.id)
                ? "selected"
                : spot.current_state
            }`}
          >
            <div className="spot-content">{spot.unique_id}</div>
            <div className="spot-content">{spot.current_state}</div>
          </div>
        ))}
      </div>

      {/* Book Button */}
      <Button onClick={handleBookClick}>Book</Button>

      {/* Toast for spot selection */}
      <Toast show={showToast} onClose={() => setShowToast(false)}>
        <Toast.Header>
          <strong className="mr-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>Please select a parking spot.</Toast.Body>
      </Toast>

      {/* Modal for booking */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Booking Time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Implement modal content here */}
          <div>
            <label>Book From:</label>
            <input
              type="datetime-local"
              value={bookFrom}
              onChange={(e) => setBookFrom(e.target.value)}
            />
          </div>
          <div>
            <label>Book To:</label>
            <input
              type="datetime-local"
              value={bookTo}
              onChange={(e) => setBookTo(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {bookingLoading ? <Spinner variant={'large'} /> : 'Delete'}
          </Button>
          <Button variant="primary" onClick={handleBookConfirm}>
            Book
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookSection;
