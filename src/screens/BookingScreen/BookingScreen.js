import React from 'react'
import { Container } from 'react-bootstrap'
import BookSection from '../../components/BookSection/BookSection'
import NavigationBar from '../../components/NavigationBar/NavigationBar'

function BookingScreen() {
  return (
    <div>
      <div className="background-image"></div>
      <Container fluid>
        <NavigationBar />
        <BookSection />
      </Container>
    </div>
  )
}

export default BookingScreen
