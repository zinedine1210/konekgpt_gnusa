import { MyContext } from '@/context/MyProvider'
import WhatsappRepository from '@/repositories/WhatsappRepository'
import { getTimeAgo } from '@/utils/script'
import React, { useContext } from 'react'
import { BsCheck2Circle, BsReply } from 'react-icons/bs'
import { FaImage, FaWhatsapp } from 'react-icons/fa'
import { HiVideoCamera } from 'react-icons/hi'
import { IoDocument } from 'react-icons/io5'
import Swal from 'sweetalert2'

export default function WhatsappChat({item}) {
    const context = useContext(MyContext)

    const handlerDetailChat = async (value) => {
        const result = await WhatsappRepository.getDetailChat({id:value.parentId, receiverId:value.id, limit:200})
        // console.log("getdetailfirst", result.data.reverse());
        if(result.success){
            const filtering = result.data.filter(res => {
                if(res?.message?.stikerMessage){
                    return false
                }
                // if(res?.messageStubType){
                //     return true
                // }
                return true
            })
            value.unreadCount = 0
            context.setData({...context, view:3, chatDetail:filtering, infoChat:value, detailContact:null, modal:null})
        }else{
            Swal.fire({
                icon:"error",
                title:"Can't load messages",
                text:"Something went wrong, please try again later"
            })
        }
    }

    const dataChat = item?.messages?.[0]?.message?.message
    
  return (
    <button onClick={() => handlerDetailChat(item)} className="text-start w-full hover:bg-zinc-100 transition-all duration-300 border-b p-2 flex gap-2 cursor-pointer relative">
        <span className="bg-zinc-200 dark:bg-dark w-8 h-8 rounded-full flex items-center justify-center">
            <FaWhatsapp className='text-green-500 font-bold text-xl'/>
        </span>
        <div>
            <h1 className="text-[15px] font-bold">{"+" + item.id.split("@")[0]}</h1>
            <p className='text-xs text-blue-500 font-bold mb-1'>Auth from +{item.parentId}</p>
            {
                dataChat?.conversation ?
                <p className="text-sm text-zinc-600 dark:text-zinc-300">{dataChat.conversation.length > 35 ? dataChat.conversation.substring(0, 35) + "..." :dataChat.conversation}</p>
                :""
            }
            {
                dataChat?.videoMessage ?
                <p className='text-sm text-zinc-600 dark:text-zinc-300 flex items-center gap-1'>
                    <HiVideoCamera className='text-zinc-400'/>
                    {dataChat?.videoMessage?.caption ? dataChat.videoMessage.caption.length > 33 ? dataChat.videoMessage.caption.substring(0, 33)+"..." : dataChat.videoMessage.caption :"Photo"}
                </p>
                :""
            }
            {
                dataChat?.imageMessage ?
                <p className='text-sm text-zinc-600 dark:text-zinc-300 flex items-center gap-1'>
                    <FaImage className='text-zinc-600 dark:text-zinc-300'/>
                    {dataChat?.imageMessage?.caption ? dataChat.imageMessage.caption.length > 33 ? dataChat.imageMessage.caption.substring(0, 33)+"..." : dataChat.imageMessage.caption :"Photo"}
                </p>
                :""
            }
            {
                dataChat?.documentMessage ?
                <p className='text-sm text-zinc-600 dark:text-zinc-300 flex items-center gap-1'>
                    <IoDocument className='text-zinc-400'/>
                    {dataChat?.documentMessage?.title ? dataChat.documentMessage.title.length > 33 ? dataChat.documentMessage.title.substring(0, 33)+"..." : dataChat.documentMessage.title :"Photo"}
                </p>
                :""
            }
            {
                dataChat?.extendedTextMessage ?
                <p className='text-sm text-zinc-600 dark:text-zinc-300 flex items-center gap-1'>
                    <BsReply className='text-zinc-400 dark:text-zinc-300'/>
                    {dataChat?.extendedTextMessage?.text ? dataChat.extendedTextMessage.text.length > 33 ? dataChat.extendedTextMessage.text.substring(0, 33)+"..." : dataChat.extendedTextMessage.text :"Extended Text"}
                </p>
                :""
            }
            {
                dataChat?.templateMessage ?
                <p className='text-sm text-green-600 flex items-center gap-1'>
                    <BsCheck2Circle className='text-green-400'/>
                    {dataChat?.templateMessage?.hydratedTemplate?.hydratedContentText ? dataChat.templateMessage.hydratedTemplate.hydratedContentText.length > 33 ? dataChat.templateMessage.hydratedTemplate.hydratedContentText.substring(0, 33)+"..." : dataChat.templateMessage.hydratedTemplate.hydratedContentText :"Photo"}
                </p>
                :""
            }
        </div>
        <p className="text-[10px] absolute top-2 right-2">{getTimeAgo(Number(item.messages[0].message.messageTimestamp * 1000))}</p>
        {
            item?.unreadCount ?
            <span className="rounded-full bg-green-500 w-5 text-sm font-bold flex items-center justify-center h-5 absolute bottom-2 right-2 text-white ">{item.unreadCount}</span>
            :""
        }
        {/* <FaWhatsapp className="text-green-500 absolute bottom-2 right-10" /> */}
    </button>
  )
}
