import { MyContext } from '@/context/MyProvider'
import WhatsappRepository from '@/repositories/WhatsappRepository'
import React, { useContext, useEffect, useRef} from 'react'
import Swal from 'sweetalert2'
import Editor from '../Templates/Editor'
import CardChatFromMe from '../Templates/CardChatFromMe'
import CardChatUser from '../Templates/CardChatUser'
import ModalSendImage from '../Templates/ModalSendImage'
import ModalSendVideo from '../Templates/ModalSendVideo'
import ModalSendDocument from '../Templates/ModalSendDocument'
import ModalSendContact from '../Templates/ModalSendContact'

export default function DetailChat() {
    const context = useContext(MyContext)


  return (
    <div className={`w-full md:w-3/4 bg-zinc-100 relative h-screen pt-16 pb-20 md:pb-20`}>
        {
            context.chatDetail ?
            <>
                <ModalSendImage />
                <ModalSendVideo />
                <ModalSendDocument />
                <ModalSendContact />
                <div className='absolute top-0 left-0 w-full px-5 py-2 backdrop-blur-lg z-20 pt-16 border-b shadow-md'>
                    <h1 className='font-bold'>{"+"+context.chatInfo.id.split("@")[0]}</h1>
                </div>
                <SessionChat />
            </>
            :""
        }
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
    }, [context.chatInfo]);


    const checkDetailList = async () => {
        const result = await WhatsappRepository.getDetailChat({id:context.chatInfo.parentId, receiverId:context.chatInfo.id})
        // console.log(result);
        if(!result.success){
            context.setData({...context, chatInfo:null, chatDetail:null})
            Swal.fire({
                icon:"error",
                title:"Something went wrong",
                text:"Please try again later"
            })
            return false
        }
        context.chatInfo
        context.setData({...context, chatDetail:result.data})
    }

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, []);


    return (
        <>
            <div className="h-full overflow-y-auto pt-10 pb-1" ref={containerRef}>
                <div className="space-y-1 w-full px-2 md:px-0 md:w-2/3 mx-auto">
                    {
                        context.chatDetail.map((item, key) => {

                            if(item.data.key.fromMe)
                            return <CardChatFromMe key={key} index={key} dataChat={item}/>

                            return <CardChatUser key={key} index={key} dataChat={item}/>
                        })
                    }
                </div>
            </div>
            
            <div className="absolute right-1/2 translate-x-1/2 w-full px-2 md:px-0 md:w-2/3 md:bottom-2 bottom-2 rounded-xl">
                <Editor />
            </div>
        </>
    )
}
