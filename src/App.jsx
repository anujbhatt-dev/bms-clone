import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Movie from "./pages/Movie"
import Footer from "./components/Footer"
import Header from "./components/Header"
import BuyTicket from "./pages/BuyTicket"
import Booking from "./pages/Booking"


function App() {
  
  return (
   <div className="overflow-x-hidden">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/movies/:movieSlug" element={<Movie/>}/>
        <Route path="/buy-ticket/:movieSlug" element={<BuyTicket/>}/>
        <Route path="/bookings/:bookingId" element={<Booking/>}/>
      </Routes>
      <Footer/>
   </div>
  )
}

export default App
