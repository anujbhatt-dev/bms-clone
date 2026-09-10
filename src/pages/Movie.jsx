import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { offers } from "../data"
import { Banknote } from "lucide-react"
import { Star } from "lucide-react"

export default function Movie() {
  const {movieSlug} = useParams()
  const [movie,setMovie] = useState(null)
  useEffect(()=>{
    const fetchmovie = async ()=>{
          try {
            const res = await axios.get(`${import.meta.env.VITE_FIREBASE_URI}/movies.json?orderBy="slug"&equalTo="${(movieSlug)}"`)  
            console.log(res.data);
            const data = res.data
            const movie = data ? Object.values(data)[0] : null
            setMovie(movie)
          } catch (error) {
            console.log(error);  
          } 
        }
      fetchmovie()
  },[movieSlug])

  if (movie === undefined) {
    return <div>Movie details loading...</div>
  }
  if (movie === null) {
    return <div>Movie not found.</div>
  }
  return (
    <>
    <div className="w-screen relative">
      <img className="h-[40vh] w-full sm:w-full sm:h-[64vh] object-cover" src={movie.bannerUrl} alt="" />
      <div className="w-full h-full absolute inset-0 gradient "/>
      <div className="absolute inset-0 py-14 px-4 sm:px-30 flex gap-8 text-white items-center">
          <img src={movie.portraitUrl} className="hidden sm:flex h-full w-auto rounded-lg" alt="" />
          <div className="flex flex-col  gap-5">
            <h2 className="text-4xl font-bold">{movie.title}</h2>
            <div className="flex gap-4 text-lg">
              <Star  className="h-6 w-6 text-pink-800 fill-pink-800 stroke-2"/>
              <p className="font-semibold">{movie.rating}/10</p>
              <p>{"("}{movie.votes/1000}k+ votes{")"}</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 text-lg flex-wrap">
              <p >{Math.floor(movie.duration/60)}h{movie.duration%60}m</p>
              <div className="h-1 w-1 rounded-full bg-white"/>
              <p>{movie.genres.join(", ") || ""}</p>
              <div className="h-1 w-1 rounded-full bg-white"/>
              <p>{movie.certificate}</p>
              <div className="h-1 w-1 rounded-full bg-white"/>
              <p>{movie.releaseDate}</p>
            </div>
            <p className="flex gap-4 ">{movie.languages.map(language=><span className="inline-block py-1 px-2 bg-neutral-600 text-sm rounded-sm">{language}</span>)}</p>
            <Link to={`/buy-ticket/${movie.slug}`} className="bg-btn-primary p-3 px-6 rounded-lg w-55 text-center">
                Book Tickets
            </Link>
          </div>

      </div>
    </div>
      <div className="px-4 sm:px-30 py-10 max-w-5xl">
        <h2 className="my-6 text-2xl font-semibold">
          About the movie
        </h2>
        <p className="my-6 text-neutral-500">
          {movie.desc}
        </p>
        <h2 className="my-6 mt-10 text-2xl font-semibold">
          Top offer for you
        </h2>
        <div className="relative">
          <div className="h-full w-30 bg-linear-90 from-transparent to-[#F2F5F9] absolute top-0 right-0"/>
          <div className="flex gap-4 overflow-scroll scrollbar-none flex-nowrap">
          {
            offers.map(offer=>(
              <div key={offer.split(" ").join("")} className="py-2 px-6 bg-amber-100 border border-dashed border-amber-600 rounded-lg w-[calc(50%-16px)] shrink-0 flex gap-2">
                <Banknote className="text-red-500 stroke-2 w-10"/>
                <div>
                <p className="line-clamp-1">{offer}</p>
                <p className="text-sm text-neutral-500 mt-1">Tap to view details</p>
                </div>
              </div>
            ))
          }
          </div>
        </div>
        <h2 className="my-6 mt-10 text-2xl font-semibold">
          Cast
        </h2>
        <div className="relative">
          <div className="h-full w-30 bg-linear-90 from-transparent to-[#F2F5F9] absolute top-0 right-0"/>
          <div className="flex gap-8 overflow-scroll scrollbar-none flex-nowrap">
          {
            movie.cast.map(castMember=>(
              <div key={castMember.name.split(" ").join("")} className="rounded-lg shrink-0 w-30 flex flex-col gap-3">
                <img src={`${castMember.imgUrl}` || `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRckoYfa3-0Qrwtn_hS0Ar86m-ykQEm_jQ3FmHLTXsjsw&s=10`} alt="" className="h-30 w-30 rounded-lg object-cover"/>
                <div>
                  <p className="line-clamp-1">{castMember.name}</p>
                  <p className="text-sm text-neutral-500 mt-1">as {castMember.role}</p>
                </div>
              </div>
            ))
          }
          </div>
        </div>
      </div>
    </>
  )
}
