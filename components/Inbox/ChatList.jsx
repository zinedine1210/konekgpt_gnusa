import { MyContext } from '@/context/MyProvider'
import WhatsappRepository from '@/repositories/WhatsappRepository'
import _ from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import WhatsappChat from './WhatsappChat'
import Swal from 'sweetalert2'


export default function ChatList() {
    const context = useContext(MyContext)

    useEffect(() => {
        if(context.allChatList.length == 0){
            const getWhatsappList = JSON.parse(localStorage.getItem("whatsappList"))
            if(getWhatsappList){
                const getActiveWhatsappList = getWhatsappList.filter(res => res.active == true)
                if(getActiveWhatsappList.length > 0){
                    let allWhatsappData = []
                    getActiveWhatsappList.forEach(async val => {
                        const result = await WhatsappRepository.getChatList({id:val.id})
                        // console.log("datalist", result.data);
                        if(result.success){
                            const value = result.data.filter(res => {
                                if(!res?.messages?.[0]){
                                    return false
                                }
                                // if(!res?.messages?.[0]?.message?.message?.)
                                // if(!res?.messages?.[0]?.message?.message?.conversation){
                                //     return false
                                // }
                                if(res?.messages?.[0]?.message?.messageStubType){
                                    return false
                                }

                                return true
                            })
                            allWhatsappData = _.sortBy(_.concat(allWhatsappData, value), [o => {
                                return Number(o.messages[0].message.messageTimestamp)
                            }]).reverse().map(obj => ({...obj, parentId:val.id}))
                        }else{
                            Swal.fire({
                                icon:"info",
                                title:`Authentication to ${val.id} disconnected`,
                                text:"Please reconnect it by scanning the qr code on the menu integration - whatsapp"
                            })
                            
                            const getWhatsappList = JSON.parse(localStorage.getItem("whatsappList"))
                            getWhatsappList.find(res => res.id == val.id)['active'] = false
                            localStorage.setItem("whatsappList", JSON.stringify(getWhatsappList))
                        }
                        context.setData({...context, allChatList:allWhatsappData, chatFilter:allWhatsappData})
                    });
                }else{
                    context.setData({...context, allChatList:[], chatFilter:[]})
                }
            }else{
                context.setData({...context, allChatList:[], chatFilter:[]})
            }
        }
    }, [context])
    
  return (
    <div className="max-h-screen overflow-auto absolute top-0 left-0 w-full pt-36">
        
        {
            context.chatFilter ?
            context.chatFilter.length > 0 ?
                context.chatFilter.map((item, key) => {
                    return (
                        <WhatsappChat item={item} key={key}/>
                    )
                })
            :
            <div className='px-3 text-center'>
                <h1 className='text-red-500 uppercase text-sm py-2 font-bold'>Any chat not found</h1>
            </div>
            :
            <div className='space-y-1'>
                {
                    new Array(20).fill("loading").map((item, key) => {
                        return (
                            <div className='py-10 animate-pulse bg-zinc-100 w-full'>
        
                            </div>
                        )
                    })
                }
            </div>
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
