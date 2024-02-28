import { MyContext } from '@/context/MyProvider'
import WhatsappRepository from '@/repositories/WhatsappRepository'
import React, { useContext, useEffect, useRef, useState} from 'react'
import Swal from 'sweetalert2'
import CardChatFromMe from '../Templates/CardChatFromMe'
import CardChatUser from '../Templates/CardChatUser'
import ModalSendImage from '../Templates/ModalSendImage'
import ModalSendVideo from '../Templates/ModalSendVideo'
import ModalSendDocument from '../Templates/ModalSendDocument'
import ModalSendContact from '../Templates/ModalSendContact'
import { HiDotsVertical } from 'react-icons/hi'
import EditorPersonal from '../Templates/EditorPersonal'
import EditorGroup from '../Templates/EditorGroup'
import ModalAddParticipants from './ModalAddParticipants'

export default function DetailChat() {
    const context = useContext(MyContext)

    const [open, setOpen] = useState(false)
    const dropRef = useRef(null)

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleOutsideClick = (event) => {
        if (dropRef.current && !dropRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    const handlerRefreshChat = async () => {
        const result = await WhatsappRepository.getDetailChat({id:context.infoChat.parentId, receiverId:context.infoChat.id, limit:200})
        // console.log("getdetailfirst", result.data.reverse());
        if(result.success){
            const filtering = result.data.slice(0, 50).filter(res => {
                if(res?.message?.stikerMessage){
                    return false
                }
                // if(res?.messageStubType){
                //     return true
                // }
                return true
            })
            context.infoChat.unreadCount = 0
            context.setData({...context, view:3, chatDetail:filtering, infoChat:context.infoChat, detailContact:null})
        }else{
            Swal.fire({
                icon:"error",
                title:"Something Wrong",
                text:"Please try again later"
            })
        }
    }

  return (
    <div className={`w-full ${context.detailContact ? "xl:w-1/2":"xl:w-3/4"} bg-zinc-100 dark:bg-dark relative h-screen pt-16 pb-20 xl:pb-20`}>
        <>  
            {
                context.modal && (
                    <>
                        {
                            context.modal.name == "modalsendimage" && <ModalSendImage />
                        }
                        {
                            context.modal.name == "modalsendvideo" && <ModalSendVideo />
                        }
                        {
                            context.modal.name == "modalsenddocument" && <ModalSendDocument />
                        }
                        {
                            context.modal.name == "modalsendcontact" && <ModalSendContact />
                        }
                        {
                            context.modal.name == "modaladdparticipants" && <ModalAddParticipants />
                        }
                    </>
                )
            }
            <div className='absolute top-0 left-0 w-full px-5 pb-2 backdrop-blur-lg z-20 pt-3 border-b shadow-md flex items-center justify-between'>
                <div className='cursor-pointer flex items-center gap-2' onClick={() => context.setData({...context, detailContact:{type:context.infoChat?.type ?? "personal", data:context.infoChat}})}>
                    <div className='flex items-center justify-center w-10 h-10 rounded-full text-white bg-zinc-500 uppercase font-bold'>
                        {
                            context.infoChat.type == "group" ?
                            context.infoChat.name.charAt(0)
                            :
                            "A"
                        }
                    </div>
                    <div>
                        <h1 className='font-bold'>{context.infoChat.type == "group" ? context.infoChat.name:"+"+context.infoChat.id.split("@")[0]}</h1>
                        <p className='text-xs font-light'>{context.infoChat.type == "group" ? context.infoChat.id:"Active Now"}</p>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <div ref={dropRef} className='relative'>
                        <button className='w-10 h-10 rounded-full hover:bg-blue-100 transition-colors duration-300 flex items-center justify-center' onClick={() => setOpen(true)}>
                            <HiDotsVertical />
                        </button>

                        <div className={`${open ? "":"hidden"} absolute top-full right-0 shadow-md rounded-md bg-white w-44`}>
                            <button onClick={() => handlerRefreshChat()} className="hover:bg-blue-100 px-3 py-2 text-sm w-full text-start">
                                Refresh Chat
                            </button>
                            <button onClick={() => context.setData({...context, detailContact:{type:context.infoChat?.type ?? "personal", data:context.infoChat}})} className="hover:bg-blue-100 px-3 py-2 text-sm w-full text-start">
                                {context.infoChat.type == "group" ? "Info Group":"Info Contact"}
                            </button>
                            <button onClick={() => context.setData({...context, view:2, chatDetail:null, infoChat:null, detailContact:null})} className="hover:bg-blue-100 px-3 py-2 text-sm w-full text-start">
                                Tutup Chat
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <SessionChat />
        </>
    </div>
  )
}


function SessionChat(){
    const context = useContext(MyContext)
    const containerRef = useRef(null);
    

    useEffect(() => {
        const polling = setInterval(() => {
            // checkDetailList();
        }, 7000);
    
        return () => {
          clearInterval(polling);
        };
    }, [context.infoChat]);


    const checkDetailList = async () => {
        const result = await WhatsappRepository.getDetailChat({id:context.infoChat.parentId, receiverId:context.infoChat.id})
        // console.log(result);
        if(!result.success){
            context.setData({...context, infoChat:null, chatDetail:null})
            Swal.fire({
                icon:"error",
                title:"Something went wrong",
                text:"Please try again later"
            })
            return false
        }
        context.infoChat
        context.setData({...context, chatDetail:result.data})
    }
    
    const ScrollOnTop = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }

    useEffect(() => {
        ScrollOnTop()
    }, []);


    return (
        <>
            <div className="h-full overflow-y-auto pt-14 pb-1 relative" ref={containerRef}>
                <div className={`${context.detailContact ? "xl:w-4/5":"xl:w-2/3"} space-y-1 w-full px-2 xl:px-0 mx-auto`}>
                    {
                        context.chatDetail.map((item, key) => {

                            if(item.data.key.fromMe)
                            return <CardChatFromMe key={key} index={key} dataChat={item}/>
                            return <CardChatUser key={key} index={key} dataChat={item}/>
                        })
                    }
                </div>
            </div>
            {/* <button onClick={() => ScrollOnTop()} className='absolute bottom-20 right-20 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center font-bold'>
                <BsChevronBarDown />
            </button> */}

            
            <div className={`${context.detailContact ? "xl:w-4/5":"xl:w-2/3"} absolute right-1/2 translate-x-1/2 w-full px-2 xl:px-0 xl:bottom-2 bottom-2 rounded-xl`}>
                {
                    context.infoChat.type == "group" ? 
                    <EditorGroup ScrollOnTop={() => ScrollOnTop()}/>
                    :
                    <EditorPersonal ScrollOnTop={() => ScrollOnTop()}/>
                }
            </div>
        </>
    )
}
