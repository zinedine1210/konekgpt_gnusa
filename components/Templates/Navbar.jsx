import { MyContext } from "@/context/MyProvider"
import AuthRepository from "@/repositories/AuthRepository"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useRef, useState } from "react"
import { BsMoonFill, BsSunFill } from "react-icons/bs"
import { FaChevronLeft } from "react-icons/fa"
import Swal from "sweetalert2"

export default function Navbar() {
    const context = useContext(MyContext)
    const dropRef = useRef(null)
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const { theme, setTheme } = useTheme("light")

    const handleOutsideClick = (event) => {
        if (dropRef.current && !dropRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    // function openFullscreen() {
    //     var elem = document.documentElement
    //     if (elem.requestFullscreen) {
    //       elem.requestFullscreen();
    //     } else if (elem.webkitRequestFullscreen) { /* Safari */
    //       elem.webkitRequestFullscreen();
    //     } else if (elem.msRequestFullscreen) { /* IE11 */
    //       elem.msRequestFullscreen();
    //     }
    // }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handlerLogout = async () => {
        const result = await AuthRepository.postLogout({XA:JSON.parse(localStorage.getItem("XA"))})
        if(result?.status == 0 || result?.status == -1){
            localStorage.clear()
            Swal.fire(
                "info",
                "Logout"
            )
            router.push("/")
        }
    }

    const handlerRedirect = () => {
        if(localStorage.getItem("view") == 1){
            return false
        }
        const resView = Number(localStorage.getItem("view")) - 1
        localStorage.setItem("view", resView)
        context.setData({...context.data, minimize: false})
    }

  return (
    <nav className="absolute z-50 w-full bg-lightPrimary shadow-md dark:shadow-darkSecondary dark:bg-darkPrimary">
        <div className="px-3 xl:px-6 py-2 mx-auto">
            <div className="lg:flex lg:items-center lg:justify-between">
                <div className="flex items-center justify-between w-full">
                    <button onClick={() => handlerRedirect()} className={`flex gap-1`}>
                        {/* <img src="/images/logo.png" alt="" className="w-5"/> */}
                        <div className="flex items-center gap-2">
                            {localStorage.getItem("view") > 1 ? <FaChevronLeft className="text-xl text-zinc-300 xl:hidden"/>:""}
                            <span className="font-extrabold text-white text-3xl xl:text-4xl block">Konek</span>
                        </div>
                        <p className="self-end text-xs font-extrabold uppercase mb-1 text-white">Gpt</p>
                    </button>
                    <div className="flex items-center">
                        {/* <button onClick={openFullscreen()}>
                            ahsahsa
                        </button> */}
                        <button onClick={() => setTheme(theme == "light" ? "dark":"light")}>
                            {
                                theme == "light" ?
                                    <BsSunFill className='text-yellow-300 text-xl'/>
                                :   <BsMoonFill className='text-blue-300 text-xl'/>
                            }
                        </button>
                        <button className="mx-0 xl:mx-4 text-white transition-colors duration-300 transform lg:block dark:text-zinc-200 hover:text-zinc-700 dark:hover:text-zinc-400 focus:text-zinc-700 dark:focus:text-zinc-400 focus:outline-none" aria-label="show notifications">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>

                        <div ref={dropRef} className="relative hidden xl:block">
                            <button type="button" onClick={() => setOpen(!open)} className="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
                                <h1 className="hidden xl:block text-sm text-white rounded-md mr-1 font-semibold font-sans">{JSON.parse(localStorage.getItem("auth"))?.data?.username}</h1>
                                <div className="w-8 h-8 overflow-hidden border-2 border-white rounded-full">
                                    <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" className="object-cover w-full h-full" alt="avatar"/>
                                </div>
                            </button>

                            <div className={`${open ? "visible translate-y-0 opacity-100":"opacity-0 invisible translate-y-5"} rounded-md max-h-52 overflow-y-auto shadow-md z-20 w-32 transition-all duration-300 absolute backdrop-blur-md top-full right-0 mt-1`}>
                                <Link href={"/usr/profile"}>
                                    <button className="py-2 px-4 w-full block text-start text-sm transition-colors duration-300 hover:bg-blue-100">Profile</button>
                                </Link>
                                <button onClick={() => handlerLogout()} className="py-2 px-4 w-full block text-start text-sm transition-colors duration-300 hover:bg-red-100">Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}
