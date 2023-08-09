import { MyContext } from '@/context/MyProvider'
import WhatsappRepository from '@/repositories/WhatsappRepository'
import _ from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import WhatsappChat from './WhatsappChat'
import Swal from 'sweetalert2'
import WhatsappGroup from './WhatsappGroup'
import ChannelRepository from '@/repositories/ChannelRepository'


export default function ChatList(props) {
    const context = useContext(MyContext)

    useEffect(() => {

        if(!context.allChatList){
            const getWhatsappList = localStorage.getItem("whatsappChannel") != "undefined" ? JSON.parse(localStorage.getItem("whatsappChannel")) : null
            if(getWhatsappList){
                const getActiveWhatsappList = getWhatsappList.filter(res => res.active == true)
                if(getActiveWhatsappList.length > 0){
                    let allWhatsappData = []
                    let getKontak = []
                    getActiveWhatsappList.forEach(async val => {
                        const result = await WhatsappRepository.getChatList({id:val.identity})
                        const groupResult = await WhatsappRepository.getGroupList({id:val.identity})
                        console.log(`chat ${val.identity}`, result);
                        console.log(`group chat ${val.identity}`, groupResult);

                        if(result.success && groupResult.success){
                            
                            const value = result.data.slice(0, 50).filter(res => {
                                if(!res?.messages?.[0]){
                                    return false
                                }
                                if(res?.messages?.[0]?.message?.messageStubType && res?.messages?.[0]?.message?.messageStubType != "REVOKE"){
                                    return false
                                }

                                return true
                            })

                            // get all number for kontak
                            getKontak = _.concat(value.map(obj => ({number:obj.id, parentId:val.identity})), getKontak)
                            
                            const groupValue = groupResult.data.slice(0, 20).filter(res => {
                                return true
                            }).map(obj => ({...obj, type:"group"}))

                            allWhatsappData = _.concat(value, groupValue)

                            allWhatsappData = _.sortBy(allWhatsappData, [o => {
                                return Number(o?.messages?.[0]?.message?.messageTimestamp)
                            }]).reverse().map(obj => ({...obj, parentId:val.identity}))

                        }else{
                            Swal.fire({
                                icon:"info",
                                title:`Authentication to ${val.identity} disconnected`,
                                text:"Please reconnect it by scanning the qr code on the menu integration - whatsapp"
                            })
                            
                            const getWhatsappList = JSON.parse(localStorage.getItem("whatsappChannel"))
                            getWhatsappList.find(res => res.id == val.identity)['active'] = false
                            localStorage.setItem("whatsappChannel", JSON.stringify(getWhatsappList))
                        }
                        context.setData({...context, allChatList:allWhatsappData, allContact:getKontak})
                    });
                }else{
                    context.setData({...context, allChatList:[]})
                }
            }else{
                getAllChannel()
                context.setData({...context, allChatList:[]})
            }
        }
    }, [context.allChatList])

    const getAllChannel = async () => {
        const getxa = JSON.parse(localStorage.getItem("XA"))
        const result = await ChannelRepository.getAllChannel({xa:getxa})
        console.log("allchannel", result);
        localStorage.setItem("whatsappChannel", JSON.stringify(result.data))
        context.setData({...context, channelWhatsapp:result.data})
    }
    
  return (
    <div className="max-h-screen overflow-auto absolute top-0 left-0 w-full pt-36">
        
        {
            context.allChatList ?
            context.allChatList.length > 0 ?
                context.allChatList.filter(res => {
                    if(props.keyword != ""){
                        if(res?.messages?.[0]?.message?.message?.conversation && res?.messages?.[0]?.message?.message?.conversation.toLowerCase().includes(props.keyword.toLowerCase())){
                            return true
                        }
                        if(res.id.split("@")[0].includes(props.keyword)){
                            return true
                        }
                        return false
                    }else{
                        return true
                    }
                }).map((item, key) => {
                    if(item.type == "group"){
                        return (
                            <WhatsappGroup item={item} key={key}/>
                        )
                    }
                    return (
                        <WhatsappChat item={item} key={key}/>
                    )
                })
            :
            <div className='px-3 py-2 text-center'>
                <h1 className='text-red-500 uppercase text-sm py-2 font-bold'>Any chat not found</h1>
            </div>
            :
            <div className='space-y-1'>
                {
                    new Array(20).fill("loading").map((item, key) => {
                        return (
                            <div key={key} className='py-10 animate-pulse bg-zinc-100 w-full'>
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
