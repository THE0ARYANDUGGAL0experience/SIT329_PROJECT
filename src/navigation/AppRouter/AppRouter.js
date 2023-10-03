import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import LoginScreen from "../../screens/LoginScreen/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen/RegisterScreen";
import BookingScreen from "../../screens/BookingScreen/BookingScreen";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/book" element={<BookingScreen />} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
