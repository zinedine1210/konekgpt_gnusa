import { MyContext } from '@/context/MyProvider'
import WhatsappRepository from '@/repositories/WhatsappRepository'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { HiOutlineArrowSmRight } from 'react-icons/hi'
import Swal from 'sweetalert2'

export default function DetailChat() {
    const context = useContext(MyContext)


  return (
    <div className={`w-full md:w-3/4 bg-zinc-100 relative h-screen pt-16 pb-20 md:pb-20`}>
        {
            context.chatDetail ?
            <>
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
    const [data, setData] = useState("")
    const [loading, setLoading] = useState(false)

    const handlerChange = value => {
        setData(value)
    }

    const handlerSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        // console.log(context.chatInfo);
        const result = await WhatsappRepository.sendMessage({id:context.chatInfo.parentId, data:{message:data, jid:context.chatInfo.id.split("@")[0]}})
        console.log(result);
        if(result.success){
            context.chatInfo.messages[0].message.message.conversation = data
            context.chatDetail.push(result.data)
            setData("")
            context.setData({...context, chatDetail:context.chatDetail, chatInfo:context.chatInfo})
        }else{
            Swal.fire({
                icon:"error",
                title:"Something went wrong",
                text:"Please try again later"
            })
        }

        setLoading(false)
    }

    useEffect(() => {
        const polling = setInterval(() => {
            // checkDetailList();
        }, 6000);
    
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
            
            <div className="absolute right-1/2 translate-x-1/2 w-full px-2 md:px-0 md:w-2/3 md:bottom-2 bottom-2 overflow-hidden rounded-xl">
                <form onSubmit={(e) => handlerSubmit(e)} className="relative">
                    <input disabled={loading} id="inputQuestion" type="text" value={data} required autoFocus autoComplete='off' className="outline-none peer p-2 w-full text-sm border-2 border-blue-200 rounded-xl placeholder:text-zinc-500 pr-10 pl-5 bg-zinc-200 focus:bg-white transition-all duration-300" placeholder="Any Question?" maxLength={2000} onChange={(e) => handlerChange(e.target.value)} />
                    <button type="submit" className="absolute peer-focus:translate-x-0 -translate-x-5 opacity-0 peer-focus:opacity-100 hover:scale-125 transition-all duration-300 top-1/2 -translate-y-1/2 right-2 w-8 h-8 flex items-center justify-center peer-focus:visible invisible">
                        <HiOutlineArrowSmRight className="text-xl"/>
                    </button>
                </form>
                <h1 className="text-end text-zinc-500 text-xs p-1">{data ? data.length :"0"}/2000</h1>
            </div>
        </>
    )
}

function CardChatFromMe({dataChat, index}){
    const context = useContext(MyContext)
    console.log();
    return (
        <div className="ml-auto w-full">
            {index > 0 ? context.chatDetail[index - 1].data.key.fromMe != dataChat.data.key.fromMe ? 
            <h1 className="text-end text-zinc-500 text-sm py-1">You</h1>
            :"" :""}
            <div className="w-fit backdrop-blur-2xl pt-1.5 pb-6 px-1.5 shadow-md rounded-md max-w-xl ml-auto relative">
                {
                    dataChat.data.message?.conversation ?
                    <h1 className="text-xs md:text-sm">{dataChat.data.message.conversation}</h1>
                    :""
                }
                {
                    dataChat.data.message?.extendedTextMessage ?
                    <h1 className="text-xs md:text-sm">{dataChat.data.message.extendedTextMessage.text}</h1>
                    :""
                }
                <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
            </div>
        </div>
    )
}



function CardChatUser({dataChat, index}){
    const context = useContext(MyContext)

   return (
        <div className="w-full">
            {index > 0 ? context.chatDetail[index - 1].data.key.fromMe != dataChat.data.key.fromMe ? 
                <h1 className="text-zinc-500 text-sm py-1">{dataChat.data.pushName ?? "+"+dataChat.data.key.remoteJid.split("@")[0]}</h1>
            :"" :""}
            <div className="space-y-2">
                <div className="w-fit bg-white pt-1.5 pb-6 px-1.5 shadow-md rounded-md max-w-xl relative">
                    {
                        dataChat.data.message?.conversation ?
                        <h1 className="text-xs md:text-sm">{dataChat.data.message.conversation}</h1>
                        :""
                    }
                    <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                </div>
            </div>
        </div>
   ) 
}