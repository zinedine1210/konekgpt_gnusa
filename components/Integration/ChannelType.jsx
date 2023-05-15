import React from 'react'
import {FaCaretRight, FaChevronRight, FaFacebook, FaInstagram, FaLine, FaPowerOff, FaTelegram, FaTelegramPlane, FaTwitter, FaWhatsapp} from "react-icons/fa"
import {AiOutlineClose} from "react-icons/ai"
import {HiOutlineArrowSmRight} from "react-icons/hi"
import {SiGmail} from "react-icons/si"
import Link from 'next/link'


export default function ChannelType() {
  return (
    <div className="w-1/6 bg-white pt-16">
        <label class="px-3 text-xs text-zinc-500 uppercase dark:text-zinc-400">CHANNEL INTEGRATION</label>

        <div className="space-y-2 mt-2">
            <Link href={"/usr/integration/telegram"}>
                <div className="hover:bg-zinc-100 transition-all duration-300 py-2 px-3 flex gap-2 cursor-pointer relative items-center">
                    <FaTelegramPlane className="text-blue-500 text-xl" />
                    <h1>Telegram</h1>
                </div>
            </Link>
            {/* <div className="hover:bg-zinc-100 transition-all duration-300 py-2 px-3 flex gap-2 cursor-pointer relative items-center">
                <FaInstagram className="text-purple-800 text-xl" />
                <h1>Instagram</h1>
            </div> */}
            <Link href={"/usr/integration/whatsapp"}>
                <div className="hover:bg-zinc-100 transition-all duration-300 py-2 px-3 flex gap-2 cursor-pointer relative items-center">
                    <FaWhatsapp className="text-green-500 text-xl" />
                    <h1>Whatsapp</h1>
                </div>
            </Link>
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
