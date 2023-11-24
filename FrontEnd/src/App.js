import {
  BrowserRouter,
  Route,
  Routes,
  redirect,
  useNavigate,
} from "react-router-dom";
import { Dashboard, HomeLandinPage, Login } from "./pages";

import jwt_decode from "jwt-decode";
import SignUp from "./pages/Landing/Pages/SignUp";
import BookingPage from "./pages/Landing/Pages/Booking";

function App() {
  // const isLogged = localStorage.getItem("token") === null;

  function checkTokenValidity() {
    // let token;
    if (localStorage.getItem("token") === null) {
      redirect("/login");
      return;
    }
    const token = localStorage.getItem("token");

    try {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000; // Convert current time to seconds

      // If the token expiration time is less than the current time, it is expired
      if (decodedToken.exp < currentTime) {
        localStorage.setItem("token", null);
        // Token is expired
        return false;
      }

      // Otherwise, the token is valid
      return true;
    } catch (error) {
      // An error occurred while decoding the token, meaning it is invalid
      console.log(error);
      redirect("/login");
      return false;
    }
  }

  const tokenIsValid = checkTokenValidity();
  console.log(tokenIsValid);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/booking/:doctorId" element={<BookingPage />} />
        <Route path="/landing" element={<HomeLandinPage />} />
        {tokenIsValid ? (
          <Route path="/*" element={<Dashboard />} />
        ) : (
          <Route path="/*" element={<HomeLandinPage />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
