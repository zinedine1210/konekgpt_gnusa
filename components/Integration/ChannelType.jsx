import React, { useContext } from 'react'
import {FaTelegramPlane, FaWhatsapp} from "react-icons/fa"
import Link from 'next/link'
import { MyContext } from '@/context/MyProvider'
import { useRouter } from 'next/router'


export default function ChannelType() {
    const router = useRouter()
    const context = useContext(MyContext)

    const handlerRedirect = (url) => {
        router.push(url)
        context.setData({...context, view:3})
    }
    
  return (
    <div className={`${context.view == 2 ? "fixed top-0 left-0 w-screen h-screen z-20":"hidden md:block"} md:z-0 md:relative md:w-1/6 bg-white pt-16`}>
        <label className="px-3 text-xs text-zinc-500 uppercase dark:text-zinc-400">CHANNEL INTEGRATION</label>

        <div className="space-y-2 mt-2">
            {/* <button onClick={() => handlerRedirect("/usr/integration/telegram")} className="w-full hover:bg-zinc-100 transition-all duration-300 py-2 px-3 flex gap-2 cursor-pointer relative items-center">
                <FaTelegramPlane className="text-blue-500 text-xl" />
                <h1>Telegram</h1>
            </button> */}
            {/* <div className="w-full hover:bg-zinc-100 transition-all duration-300 py-2 px-3 flex gap-2 cursor-pointer relative items-center">
                <FaInstagram className="text-purple-800 text-xl" />
                <h1>Instagram</h1>
            </div> */}
            <button onClick={() => handlerRedirect("/usr/integration/whatsapp")} className="w-full hover:bg-zinc-100 transition-all duration-300 py-2 px-3 flex gap-2 cursor-pointer relative items-center">
                <FaWhatsapp className="text-green-500 text-xl" />
                <h1>Whatsapp</h1>
            </button>
            {/* <div className="hover:bg-zinc-100 transition-all duration-300 py-2 px-3 flex gap-2 cursor-pointer relative items-center">
                <FaFacebook className="text-blue-500 text-xl" />
                <h1>Facebook Messenger</h1>
            </div>
            <div className="hover:bg-zinc-100 transition-all duration-300 py-2 px-3 flex gap-2 cursor-pointer relative items-center">
                <FaTwitter className="text-sky-500 text-xl" />
                <h1>Twitter</h1>
            </div>
            <div className="hover:bg-zinc-100 transition-all duration-300 py-2 px-3 flex gap-2 cursor-pointer relative items-center">
                <FaLine className="text-lime-500 text-xl" />
                <h1>Line Messenger</h1>
            </div>
            <div className="hover:bg-zinc-100 transition-all duration-300 py-2 px-3 flex gap-2 cursor-pointer relative items-center">
                <SiGmail className="text-red-500 text-xl" />
                <h1>Email</h1>
            </div> */}
        </div>
    </div>
  )
}
