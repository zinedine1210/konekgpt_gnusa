import { MyContext } from '@/context/MyProvider'
import WhatsappRepository from '@/repositories/WhatsappRepository'
import { getTimeAgo, getTimeDate } from '@/utils/script'
import _ from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import {FaInstagram, FaTelegramPlane, FaTwitter, FaWhatsapp} from "react-icons/fa"


export default function ChatList() {
    const context = useContext(MyContext)
    const [data, setData] = useState([])

    useEffect(() => {
        if(data.length == 0){
            const getWhatsappList = JSON.parse(localStorage.getItem("whatsappList"))
            if(getWhatsappList){
                const getActiveWhatsappList = getWhatsappList.filter(res => res.active == true)
                if(getActiveWhatsappList.length > 0){
                    let allWhatsappData = []
                    getActiveWhatsappList.forEach(async val => {
                        const result = await WhatsappRepository.getChatList({id:val.id})
                        if(result.success){
                            const value = result.data.slice(0, 20).filter(res => {
                                let bool = false
                                if(res?.messages?.[0]?.message?.message?.conversation){
                                    bool = true
                                }
                                return bool
                            })
                            allWhatsappData = _.sortBy(_.concat(allWhatsappData, value), [o => {
                                return Number(o.messages[0].message.messageTimestamp)
                            }]).reverse().map(obj => ({...obj, parentId:val.id}))
                            setData(allWhatsappData)
                        }
                    });
                }
            }
        }
    }, [])


    const handlerDetailChat = async (value) => {
        const result = await WhatsappRepository.getDetailChat({id:value.parentId, receiverId:value.id})
        if(result.success){
            context.setData({...context, view:3, chatDetail:result.data, chatInfo:value})
        }
    }
    
  return (
    <div className="space-y-2 mt-5 md:mt-2 max-h-screen overflow-auto absolute top-0 left-0 w-full pt-14">
        <label className="block text-sm px-3 md:text-xs text-zinc-500 uppercase dark:text-zinc-400 ">INBOX</label>
        
    {
        data.length > 0 ?
        data.map((item, key) => {
            if(item.hasOwnProperty("messages")){
                if(item.messages[0].message.message.hasOwnProperty("conversation"))
                return (
                    <button key={key} onClick={() => handlerDetailChat(item)} className="text-start w-full hover:bg-zinc-100 transition-all duration-300 border-b p-2 flex gap-2 cursor-pointer relative">
                        <span className="bg-zinc-200 w-8 h-8 rounded-full flex items-center justify-center">
                            <FaWhatsapp className='text-green-500 font-bold text-xl'/>
                        </span>
                        <div>
                            <h1 className="text-[15px] font-bold">{"+" + item.id.split("@")[0]}</h1>
                            {
                                <p className="text-xs text-zinc-500">{item.messages[0].message.message.conversation.length > 20 ? item.messages[0].message.message.conversation.substring(0, 20) + "..." :item.messages[0].message.message.conversation}</p>
                            }
                        </div>
                        <p className="text-[10px] absolute top-2 right-2">{getTimeAgo(Number(item.messages[0].message.messageTimestamp * 1000))}</p>
                        {
                            item.unreadCount ?
                            <span className="rounded-full bg-green-500 w-5 text-sm font-bold flex items-center justify-center h-5 absolute bottom-2 right-2 text-white ">{item.unreadCount}</span>
                            :""
                        }
                        {/* <FaWhatsapp className="text-green-500 absolute bottom-2 right-10" /> */}
                    </button>
                )

            }
        })
        :""
    }
        {/* <button onClick={() => context.setData({...context, view:3})} className="text-start w-full hover:bg-zinc-100 transition-all duration-300 border-b p-2 flex gap-2 cursor-pointer relative">
            <span className="bg-zinc-200 w-8 h-8 rounded-full flex items-center justify-center">M</span>
            <div className="">
            <h1 className="text-[15px] font-bold">Maruba Simangu..</h1>
            <p className="text-xs text-zinc-500">Hallo, thank you for using chatb..</p>
            </div>
            <p className="text-[10px] absolute top-2 right-2">Today at 17.55</p>
            <span className="rounded-full bg-sky-500 w-5 text-sm font-bold flex items-center justify-center h-5 absolute bottom-2 right-2 text-white ">11</span>
            <FaTwitter className="text-sky-500 absolute bottom-2 right-10" />
        </button>
        <button onClick={() => context.setData({...context, view:3})} className="text-start w-full hover:bg-zinc-100 transition-all duration-300 border-b p-2 flex gap-2 cursor-pointer relative">
            <span className="bg-zinc-200 w-8 h-8 rounded-full flex items-center justify-center">Z</span>
            <div className="">
            <h1 className="text-[15px] font-bold">Zinedine Ziddan..</h1>
            <p className="text-xs text-zinc-500">Hallo ges</p>
            </div>
            <p className="text-[10px] absolute top-2 right-2">Today at 17.55</p>
            <span className="rounded-full bg-blue-500 w-5 text-sm font-bold flex items-center justify-center h-5 absolute bottom-2 right-2 text-white ">3</span>
            <FaTelegramPlane className="text-blue-500 absolute bottom-2 right-10" />
        </button>
        <button onClick={() => context.setData({...context, view:3})} className="text-start w-full hover:bg-zinc-100 transition-all duration-300 border-b p-2 flex gap-2 cursor-pointer relative">
            <span className="bg-zinc-200 w-8 h-8 rounded-full flex items-center justify-center">C</span>
            <div className="">
            <h1 className="text-[15px] font-bold">Charly Samosi..</h1>
            <p className="text-xs text-zinc-500">Tolong berikan saya kode http..</p>
            </div>
            <p className="text-[10px] absolute top-2 right-2">Today at 17.55</p>
            <span className="rounded-full bg-red-500 w-5 text-sm font-bold flex items-center justify-center h-5 absolute bottom-2 right-2 text-white ">6</span>
            <FaInstagram className="text-red-500 absolute bottom-2 right-10" />
        </button> */}
    </div>
  )
}
