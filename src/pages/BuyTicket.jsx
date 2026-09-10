import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getSeatPrice, seats } from "../data";
import { SignInButton, SignUpButton, useUser } from "@clerk/react";

const days = []
for(let i = 0 ; i< 7 ; i++){
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push(d);
}

export default function BuyTicket() {
  const {movieSlug} = useParams();
  const navigate = useNavigate()
  const [selectedDate,setSelectedDate] = useState(0);
  const [selectedSeat,setSelectedSeat] = useState([])
  const [blockedSeats,setBlockedSeats] = useState([])
  const [movie,setMovie] = useState(null)
  const {isLoaded,isSignedIn,user}= useUser()
  const [totalPrice,setTotalPrice] = useState(0);

  useEffect(()=>{
    const fetchmovie = async ()=>{
          try {
            const res = await axios.get(`${import.meta.env.VITE_FIREBASE_URI}/movies.json?orderBy="slug"&equalTo="${(movieSlug)}"`)  
            const data = res.data
            const movie = data ? Object.values(data)[0] : null
            setMovie(movie)
          } catch (error) {
            console.log(error);  
          } 
        }
      fetchmovie()
  },[movieSlug])

  useEffect(()=>{
    const fetchBlockedSeats = async () =>{
        try {
            const blockedSeats = []
            const {data} = await axios.get(`${import.meta.env.VITE_FIREBASE_URI}/bookings.json`)
            const d = new Date();
            d.setDate(d.getDate()+selectedDate)
            const formatedD = d.toLocaleDateString()
            for(let value of Object.values(data)){
                if(formatedD === value.showDate && movie.id === value.movieId) blockedSeats.push(...value.seats); 
            }
            setBlockedSeats(blockedSeats);
        } catch (error) {
            console.log(error);    
        }
    }
    fetchBlockedSeats()
  },[selectedDate,movie])

  const toggleSeat = (seatId,price) => {
    setSelectedSeat(prev => 
        prev.includes(seatId)
        ? prev.filter(id => id !== seatId)  
        : [...prev, seatId]    
    );
    const totalPrice = selectedSeat.reduce((acc, curr) => acc + getSeatPrice(curr), 0);     
    setTotalPrice(totalPrice+price)          
  };

  const handleBooking = () => {
    if(isLoaded && isSignedIn){
        const d = new Date()
        d.setDate(d.getDate()+selectedDate)
        const bookingData = {
            seats:[...selectedSeat],
            movieId:movie.id,
            movieTitle:movie.title,
            bookingId:crypto.randomUUID(),
            userName:user.fullName,
            userEmail:user.primaryEmailAddress.emailAddress,
            showDate:d.toLocaleDateString(),
            movieUrl:movie.portraitUrl,
            totalPrice,
            movieCert:movie.certificate
        }

        axios.post(`${import.meta.env.VITE_FIREBASE_URI}/bookings.json`,bookingData).then((res)=>{
            navigate(`/bookings/${res.data.name}`);
        })
        

    }
  }

  if (movie === undefined) {
    return <div>Movie details loading...</div>
  }

  if (movie === null) {
    return <div>Movie not found.</div>
  }

  return (
    <div className="px-4 sm:px-30 bg-white">
        <div className="py-6 flex gap-4 items-center">
            <img src={movie.portraitUrl} className="h-20 w-auto rounded-lg" alt="" />
            <div>
                <h1 className="text-3xl">
                    {movie.title}
                </h1>
                <div className="flex flex-wrap gap-2 my-2">
                    <p className="px-4 py-0 text-sm border rounded-full">{Math.floor(movie.duration/60)}h{movie.duration%60}m</p>
                    <p className="px-4 py-0 text-sm border rounded-full">{movie.certificate}</p>
                    {
                        movie.genres.map((genre,i)=><p key={i} className="px-4 py-0 text-sm border rounded-full">{genre}</p>)
                    }
                </div>
            </div>
        </div>
        <hr className="relative border-b border-neutral-100 sm:-left-30 sm:w-screen"/>
        <div className="flex gap-3 py-4 overflow-x-auto">
            {days.map((day, i) => (
                <div onClick={()=>setSelectedDate(i)} className={`${selectedDate === i ? "bg-btn-primary text-white" : "bg-transparent text-black"} py-2 px-4 uppercase rounded-lg text-center cursor-pointer transition duration-100`} key={i}>
                    <p className="text-xs">
                        {day.toLocaleDateString('en-US', { weekday: 'short' })}
                    </p>
                    <p className="text-xl font-semibold">
                        {String(day.getDate()).padStart(2, '0')}
                    </p>
                    <p className="text-xs">
                        {day.toLocaleDateString('en-US', { month: 'short' })}
                    </p>
                </div>
            ))}
        </div>
        <hr className="relative border-b border-neutral-100 sm:-left-30 sm:w-screen"/>
        <div className="text-center py-4 max-w-xl">
            <div className="my-4 text-center text-neutral-500 flex flex-col justify-center items-center gap-2 ">
                <p className="text-xs">All eyes this way</p>
                <img src="/screen.png" className="h-10 w-80 rotate-180 origin-center" alt="" />
            </div>
            
            <div className="grid grid-cols-13 gap-1 sm:gap-2 text-sm">
                <div className="flex flex-col gap-1 sm:gap-2  text-neutral-400">
                    {Array.from({ length: 8 }, (_, i) => (
                        <p className="flex justify-center items-center h-8" key={i}>{String.fromCharCode(65 + i)}</p>
                    ))}
                </div>
                <div className="grid grid-cols-12 col-span-12 text-[8px] sm:text-[10px] gap-1 sm:gap-2">
                    {seats.map(seat=><p onClick={()=>{!blockedSeats.includes(seat.id) && toggleSeat(seat.id,seat.price)}} className={`flex justify-center items-center p-1  cursor-pointer transition duration-75 border rounded-lg border-green-600 ${blockedSeats.includes(seat.id) ? "bg-neutral-400 border-neutral-600" : selectedSeat.includes(seat.id)?"bg-green-400":"bg-green-100 hover:bg-green-300"}`} key={seat.id}>{seat.id}</p>)}
                </div>
            </div>
            <div className="grid grid-cols-13 gap-1 sm:gap-2 text-neutral-400 text-sm">
                {Array.from({ length: 13 }, (_, i) => (
                    i !== 0 
                        ? <p className="flex justify-center items-center h-8" key={i}>{i}</p> 
                        : <p className="flex justify-center items-center h-8" key={i}/>
                ))}
            </div>
        </div>
        <div className="pt-4 sm:pt-10 px-4 pb-10">
            {isLoaded && isSignedIn && (
                selectedSeat.length > 0 ? (
                <div className="flex items-center gap-4 justify-between">
                <button
                    onClick={handleBooking}
                    className="bg-btn-primary w-50 py-3 text-white rounded-lg font-semibold"
                >
                    Book Tickets
                </button>
                <p className="text-neutral-500 text-sm">Total: <strong className="text-2xl text-black font-mono">₹{totalPrice}</strong></p>
                </div>
                ) : (
                <button
                    disabled
                    className="bg-black w-50 py-3 text-white rounded-lg font-semibold"
                >
                    Select a seat
                </button>
                )
            )}

            {isLoaded && !isSignedIn && (
                <div className="flex gap-4 my-6">
                <SignInButton>
                    <button className="bg-btn-primary p-3 px-6 rounded-lg text-white border border-transparent cursor-pointer">
                    Sign In
                    </button>
                </SignInButton>

                <SignUpButton>
                    <button className="text-btn-primary p-3 px-5 rounded-lg border-btn-primary border cursor-pointer">
                    Sign Up
                    </button>
                </SignUpButton>
                </div>
            )}
            </div>
    </div>
  )
}
