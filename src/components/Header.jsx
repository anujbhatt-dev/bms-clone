import { Show, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/react";
import { ChevronDown } from "lucide-react";
import { Search } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/slices/authSlice";
import { Link } from "react-router-dom";

export default function Header() {
  const {isLoaded,isSignedIn, user} = useUser()
  const dispatch = useDispatch();

  useEffect(()=>{
     if (isSignedIn) {
        dispatch(login());
      } else {
        dispatch(logout());
      }
  },[isSignedIn,dispatch])

  return (
    <div className="bg-white p-4 sm:px-30 flex justify-between gap-4 border-b border-neutral-200">
      <div className="flex items-center gap-4">
        <Link className="" to="/">
        <img className="h-10 " src="/logo.png" alt="" />
        </Link>
        <div className="border p-2 border-black/10  min-w-xl relative hidden sm:flex gap-2 items-center px-2 rounded" >
            <Search className="h-5 w-auto text-neutral-500"/>
            <input type="text" className="border-none outline-0 grow placeholder:text-neutral-400 text-sm" placeholder="Search for a movie..." />
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="sm:flex gap-2 items-center px-2 hidden" >
            <p className="text-sm">Dehradun</p>
            <ChevronDown className="h-4 w-4"/>
        </div>
        <Show when={"signed-out"}>
            <SignInButton className="bg-btn-primary p-2 px-4 rounded-lg text-white border border-transparent cursor-pointer"/>
            <SignUpButton className="text-btn-primary p-2 px-4 rounded-lg border-btn-primary border cursor-pointer"/>
        </Show>
        <Show when={"signed-in"}>
          <div className="flex gap-2 items-center">
            <UserButton/>
            <p className="text-sm capitalize">Hi, {isLoaded && isSignedIn && user.fullName}</p>
          </div>
        </Show>
      </div>
    </div>
  )
}
