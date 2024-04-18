import React, { useContext } from 'react'
import {FaTelegramPlane, FaWhatsapp} from "react-icons/fa"
import { MyContext } from '@/context/MyProvider'
import { useRouter } from 'next/router'


export default function BroadcastType() {
    const router = useRouter()
    const context = useContext(MyContext)

    const handlerRedirect = (url) => {
        router.push(url)
        localStorage.setItem("view", 3)
        context.setData({...context, view:3})
    }
    
  return (
    <div className={`${localStorage.getItem("view") == 2 ? "fixed top-0 left-0 w-screen h-screen z-20 xl:z-0 xl:relative xl:w-1/6":"hidden"} bg-white pt-16`}>
        <label className="px-3 text-xs text-zinc-500 uppercase dark:text-zinc-400">Broadcast</label>

        <div className="space-y-2 mt-2">
            <button onClick={() => handlerRedirect("/usr/broadcast/telegram")} className="w-full hover:bg-zinc-100 transition-all duration-300 py-2 px-3 flex gap-2 cursor-pointer relative items-center">
                {/* <FaTelegramPlane className="text-blue-500 text-xl" /> */}
                <h1>Recepient List</h1>
            </button>
            <button onClick={() => handlerRedirect("/usr/broadcast/telegram")} className="w-full hover:bg-zinc-100 transition-all duration-300 py-2 px-3 flex gap-2 cursor-pointer relative items-center">
                {/* <FaTelegramPlane className="text-blue-500 text-xl" /> */}
                <h1>Template Message</h1>
            </button>
            <button onClick={() => handlerRedirect("/usr/broadcast/telegram")} className="w-full hover:bg-zinc-100 transition-all duration-300 py-2 px-3 flex gap-2 cursor-pointer relative items-center">
                {/* <FaTelegramPlane className="text-blue-500 text-xl" /> */}
                <h1>HSM Template</h1>
            </button>
            <button onClick={() => handlerRedirect("/usr/broadcast/telegram")} className="w-full hover:bg-zinc-100 transition-all duration-300 py-2 px-3 flex gap-2 cursor-pointer relative items-center">
                {/* <FaTelegramPlane className="text-blue-500 text-xl" /> */}
                <h1>Campaign</h1>
            </button>
        </div>
    </div>
  )
}
