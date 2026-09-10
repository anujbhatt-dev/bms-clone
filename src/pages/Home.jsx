import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"


export default function Home() {
  const [movies,setMovies] = useState([])

  useEffect(()=>{
    const fetchmovies = async ()=>{
          try {
            const res = await axios.get(`${import.meta.env.VITE_FIREBASE_URI}/movies.json`)  
            console.log(res.data);
                      
            setMovies(res.data)
          } catch (error) {
            console.log(error);  
          } 
        }
      fetchmovies()
  },[])


  return (
    <div className="sm:min-h-screen px-4 sm:px-30 py-4">
        <h2 className="text-2xl font-bold py-2">Recommended Movies</h2>
        <div className="flex gap-2 flex-nowrap overflow-x-auto scrollbar-none snap-mandatory">
          {movies.length == 0 ? <div>Loading...</div> :
            movies.map((movie)=>(
              <Link key={movie.slug} to={`/movies/${movie.slug}`} className="  sm:aspect-3/5 shrink-0 text-black ">
                <img src={movie.portraitUrl} className="h-auto sm:h-[47vh] w-[60vw] sm:w-auto object-cover rounded-lg" alt="" />
                <p className="mt-2 font-semibold line-clamp-1 w-50">{movie.title}</p>
                <p className="mt-1 text-neutral-500">{movie.genres.join("/")}</p>
              </Link>
            ))
          }
        </div>
        <div className="hidden sm:block">
          <img src="bms-banner.avif" className="w-full h-auto my-20"  alt="" />
        </div>
    </div>
  )
}
