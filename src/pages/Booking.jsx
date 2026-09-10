import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import QRCode from "react-qr-code";
import { TicketMinus } from "lucide-react";
import { Contact } from "lucide-react";

export default function Booking() {
    const {bookingId} = useParams();
    const [bookingDetails,setBookingDetails] = useState(null)

    useEffect(()=>{
        const fetchBookingDetails = async () =>{
            try {
                const {data} = await axios.get(`${import.meta.env.VITE_FIREBASE_URI}/bookings/${bookingId}.json`);
                setBookingDetails(data);
            } catch (error) {
                console.log(error);     
            }
         }
         fetchBookingDetails();
         console.log("1234");
         
    },[bookingId])

    if (!bookingDetails) {
        return <div className="min-h-screen flex items-center justify-center">Loading booking details...</div>
    }

  return (
    <div className="">
        <p className="w-sm mx-auto my-4 mt-10 px-4 text-2xl font-bold">E-Ticket</p>
        <div className="bg-white w-sm mx-auto mb-20 p-5 rounded-2xl shadow-lg  pb-10 relative ">
            <div className="flex gap-4">
                <img src={bookingDetails.movieUrl} className="h-26 w-auto rounded" alt="" />
                <div className="">
                    <p className="font-bold">{bookingDetails.movieTitle} {"("}{bookingDetails.movieCert}{")"}</p>
                    <p className="text-neutral-500 text-sm mt-1">{new Date(bookingDetails.showDate).toDateString()}</p>
                    <p className="text-neutral-500 text-sm mt-1">PVR: Centrio, Dehradun</p>
                    <p className="text-neutral-500 text-sm mt-1 capitalize font-medium">User Name: {bookingDetails.userName}</p>
                    <p className="text-neutral-500 text-sm mt-1 capitalize font-medium">User Email: {bookingDetails.userEmail.lowercase()}</p>
                </div>
            </div>
            <div className="relative my-8 ">
                <div className="absolute right-full h-10 w-10 rounded-full bg-[#F2F5F9] -translate-y-1/2"/>
                <div className="absolute left-full h-10 w-10 rounded-full bg-[#F2F5F9] -translate-y-1/2"/>
                <div className="border-b border-neutral-200 shadow "/>
            </div>
            <div className="rounded-xl bg-[#F2F5F9] p-4 px-6 flex gap-2 items-center">
                <div className="h-20 w-20 rounded-xl shadow">
                    <QRCode style={{ height: "auto", maxWidth: "100%", width: "100%" }} value="enjoy your movie"/>
                </div>
                <div className="flex flex-col justify-center items-center grow ">
                    <p className="text-neutral-500 text-sm">{bookingDetails.seats.length} Ticket{"("}s{")"}</p>
                    <p className="text-black text-xl mt-4 font-bold">{bookingDetails.seats.length} AUDI 1</p>
                    <p className="text-neutral-500 text-xs ">{bookingDetails.seats.join(", ")}</p>
                    <p className="text-black text-xs mt-4 font-bold line-clamp-2 text-center px-1" title={bookingId}>BOOKING ID: <br /> <span className="text-neutral-500">{bookingId}</span></p>
                </div>
            </div>
            <p className="my-6 text-center text-xs text-neutral-400 px-4">
                A confirmation of the booking will be sent 15 minutes before via email/sms/whatsapp
            </p>
            <div className="my-6 flex justify-evenly gap-4 text-neutral-400 text-xs px-4">
                <div className="text-center flex flex-col justify-center items-center">
                    <TicketMinus className="h-5 w-5 mb-1 "/>
                    <p>Cancel Ticket</p>
                </div>
                <div className="text-center flex flex-col justify-center items-center">
                    <Contact className="h-5 w-5 mb-1 "/>
                    <p>Contact Support</p>
                </div>
            </div>
            <div className="absolute py-2 px-8 bg-neutral-100 w-full text-black flex justify-between items-center bottom-0 left-0 rounded-b-xl text-xs">
                <p>Total:</p>
                <p>₹{bookingDetails.totalPrice}</p>
            </div>
        </div>
    </div>
  )
}
