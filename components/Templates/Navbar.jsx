import { MyContext } from "@/context/MyProvider"
import { useContext } from "react"
import { FaChevronLeft } from "react-icons/fa"

export default function Navbar() {
    const context = useContext(MyContext)
  return (
    <nav className="absolute z-50 w-full bg-lightPrimary shadow-md dark:bg-zinc-800">
        <div className="px-3 md:px-6 py-2 mx-auto">
            <div className="lg:flex lg:items-center lg:justify-between">
                <div className="flex items-center justify-between w-full">
                    <button onClick={() => context.setData({...context, view:context.view - 1})} className={`flex gap-1`}>
                        <div className="flex items-center gap-2">
                            {context.view > 1 ? <FaChevronLeft className="text-xl text-gray-500 md:hidden"/>:""}
                            <span className="font-extrabold text-white text-3xl md:text-4xl block">Konek</span>
                        </div>
                        <p className="self-end text-xs font-extrabold uppercase mb-1 text-white">Gpt</p>
                    </button>

                    <div className="flex items-center">
                        <button className="mx-4 text-zinc-600 transition-colors duration-300 transform lg:block dark:text-zinc-200 hover:text-zinc-700 dark:hover:text-zinc-400 focus:text-zinc-700 dark:focus:text-zinc-400 focus:outline-none" aria-label="show notifications">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>

                        <button type="button" className="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
                            <div className="w-8 h-8 overflow-hidden border-2 border-zinc-400 rounded-full">
                                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" className="object-cover w-full h-full" alt="avatar"/>
                            </div>
                        </button>
                        {/* <button type="button" className="text-zinc-500 dark:text-zinc-200 hover:text-zinc-600 dark:hover:text-zinc-400 focus:outline-none focus:text-zinc-600 dark:focus:text-zinc-400" aria-label="toggle menu">
                            <svg x-show="!isOpen" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" />
                            </svg>
                    
                            <svg x-show="isOpen" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}
