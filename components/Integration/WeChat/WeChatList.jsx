import { useEffect, useState } from "react"
import { BsWechat } from "react-icons/bs";
import {FaPowerOff, FaTelegram, FaTelegramPlane} from "react-icons/fa"
import { IoLogoWechat } from "react-icons/io5";


export default function WeChatList() {
    const [data, setData] = useState(null)

    useEffect(() => {
        if(!data){
            setTimeout(() => {
                setData(5)
            }, 5000);
        }
    }, [data])
  return (
    <>
        <div className="w-full bg-green-100 dark:bg-green-900 px-2 xl:px-5 py-5 xl:py-10 flex items-center gap-5">
            <BsWechat className="text-green-500 text-9xl"/>
            <div>
                <h1 className="text-xl mb-3">WeChat</h1>
                <p className="text-zinc-500 dark:text-zinc-300">Connect your WeChat communicating with your customers.</p>
            </div>
        </div>
        <div className="xl:flex mx-2 xl:mx-5 gap-5">
            <div className="w-full xl:w-1/2 h-full py-5 space-y-2">
                {
                    data ? data > 0 ? new Array(data).fill("mantap").map((load, key) => {
                        return (
                            <div key={key} className="border-2 border-zinc-300 p-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                <IoLogoWechat className="text-green-500 text-xl"/>
                                <h1 className="text-zinc-600 font-bold">Anonymous Bot</h1>
                                </div>
                                <button title="Disconnect">
                                <FaPowerOff className="text-red-500"/>
                                </button>
                            </div>
                        )
                    })
                    :"Nothing data":
                        new Array(5).fill("mantap").map((load, key) => {
                            return (
                                <div key={key} className='w-full xl:w-1/2 h-16 bg-zinc-300 animate-pulse'></div>
                            )
                        })
                }
            </div>
            <div className="w-full xl:w-1/2 bg-white dark:bg-darkPrimary xl:-mt-32 rounded-md p-5 shadow-md h-full">
                <h1 className="text-xl mb-5">Telegram Channel Integration</h1>
                <p className="text-sm text-zinc-500">You can only connect with telegram bots, if you use personal telegram it won't work.</p>
                <ul className="my-2 space-y-1">
                    <li className="flex gap-2">
                    <span className="bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-sm font-bold">1</span>
                    <p className="text-sm text-zinc-500 w-full ">Lorem ipsum dolor sit amet, consectetur</p>
                    </li>
                    <li className="flex gap-2">
                    <span className="bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-sm font-bold">2</span>
                    <p className="text-sm text-zinc-500 w-full ">Lorem ipsum dolor sit amet, consectetur</p>
                    </li>
                    <li className="flex gap-2">
                    <span className="bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-sm font-bold">3</span>
                    <p className="text-sm text-zinc-500 w-full ">Lorem ipsum dolor sit amet, consectetur</p>
                    </li>
                    <li className="flex gap-2">
                    <span className="bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-sm font-bold">4</span>
                    <p className="text-sm text-zinc-500 w-full ">Lorem ipsum dolor sit amet, consectetur</p>
                    </li>
                    <li className="flex gap-2">
                    <span className="bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-sm font-bold">5</span>
                    <p className="text-sm text-zinc-500 w-full ">Lorem ipsum dolor sit amet, consectetur</p>
                    </li>
                    <li className="flex gap-2">
                    <span className="bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-sm font-bold">6</span>
                    <p className="text-sm text-zinc-500 w-full ">Lorem ipsum dolor sit amet, consectetur</p>
                    </li>
                </ul>
            </div>
        </div>
    </>
  )
}
