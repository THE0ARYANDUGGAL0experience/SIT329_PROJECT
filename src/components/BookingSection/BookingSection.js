import React, { useState, useEffect } from "react";
import { Button, Card, Modal, Spinner } from "react-bootstrap";
import { bookingDeleteURL, bookingDetailsURL, userDetailsURL } from "../../constants/urls";
import { useNavigate } from "react-router-dom";

const BookingSection = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteClick = (booking) => {    
    setBookingToDelete(booking);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);    
    try{
      const response = await fetch(`${bookingDeleteURL}/${bookingToDelete.id}`,{
        method: 'DELETE',
      })
      if(response.status === 204){
        getBookingsData();
      }else{
        alert("Something went wrong");
      }
    }catch(e){
      console.log(e)
    }        

    // Close the modal
    setDeleteLoading(false);
    setShowModal(false);
  };

  const getBookingsData = async () => {
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
        var { email } = await response.json();
        const bookingsResponse = await fetch(`${bookingDetailsURL}/${email}`, {
          method: "GET",
        });

        if (bookingsResponse.status === 200) {
          var _bookings = await bookingsResponse.json();
          setBookings(_bookings);
        } else {
          navigate("/");
        }
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
    getBookingsData();
  }, []);

  return (
    <div className="p-3">
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <div>
          <h3 style={{ color: "white" }} className="mb-3">Upcoming Bookings</h3>
          {bookings.map(
            (booking, index) =>
              !booking.is_booking_complete && (
                <Card key={index} className="mb-3">
                  <Card.Header>
                    Parking ID:{" "}
                    <span style={{ color: "orangered" }}>
                      {booking.parking_space.unique_id}
                    </span>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>
                      Booked on{" "}
                      <span style={{ color: "orangered" }}>{new Date(booking.when).toLocaleString()}{" "}</span>
                    </Card.Title>
                    <Card.Text>
                      Booked from {new Date(booking.book_from).toLocaleString()}{" "}
                      to {new Date(booking.end_from).toLocaleString()}
                    </Card.Text>
                    <Button
                      variant={"danger"}
                      onClick={() => handleDeleteClick(booking)}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              )
          )}

          <h3 style={{ color: "white" }}>Completed Bookings</h3>
          {bookings.map(
            (booking, index) =>
              booking.is_booking_complete && (
                <Card key={index} className="mb-3">
                  <Card.Header>
                    Parking ID:{" "}
                    <span style={{ color: "orangered" }}>
                      {booking.parking_space.unique_id}
                    </span>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>
                      Booked on{" "}
                      <span style={{ color: "orangered" }}>{new Date(booking.when).toLocaleString()}{" "}</span>
                    </Card.Title>
                    <Card.Text>
                      Booked from {new Date(booking.book_from).toLocaleString()}{" "}
                      to {new Date(booking.end_from).toLocaleString()}
                    </Card.Text>                    
                  </Card.Body>
                </Card>
              )
          )}
        </div>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the booking?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            {deleteLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Delete"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookingSection;
