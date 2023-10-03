import React from 'react'
import { Container } from 'react-bootstrap'
import NavigationBar from '../../components/NavigationBar/NavigationBar'
import UserSection from '../../components/UserSection/UserSection'
import BookingSection from '../../components/BookingSection/BookingSection'

function HomeScreen() {
  return (
    <div>
      <div className="background-image"></div>
      <Container fluid>
        <NavigationBar />
        <UserSection />
        <BookingSection />
      </Container>
    </div>
  )
}

export default HomeScreen
