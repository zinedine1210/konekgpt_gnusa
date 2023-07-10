import { MyContext } from "@/context/MyProvider";
import WhatsappRepository from "@/repositories/WhatsappRepository";
import { useContext, useState } from "react";
import { HiX } from "react-icons/hi";

export default function ModalSendVideo() {
    const context = useContext(MyContext)
    const [data, setData] = useState("")
    const [caption, setCaption] = useState("")
    const [step, setStep] = useState(1)

    const modal = context.modal

    const handlerSubmit = async () => {
        if(step == 1){
            setStep(2)
            return false
        }

        const jidUser = context.infoChat.id
        let obj = {instance_key:context.infoChat.parentId, jid:jidUser, videoUrl:data, caption:caption}
        
        if(modal && modal.type == "group"){
            const result = await WhatsappRepository.sendGroupVideo({id:context.infoChat.parentId, data:obj})
            console.log(result);
            if(result.success){
                context.infoChat.messages[0].message = result.data
                context.chatDetail.push({data:result.data, file_url:data})
                setData("")
                setCaption("")
                context.setData({...context, chatDetail:context.chatDetail, infoChat:context.infoChat})
                context.setData({...context, modal:null})
            }
        }else{
            obj['jid'] = obj['jid'].split("@")[0]
            const result = await WhatsappRepository.sendVideo({id:context.infoChat.parentId, data:obj})
            console.log(result);
            if(result.success){
                context.infoChat.messages[0].message = result.data
                context.chatDetail.push({data:result.data, file_url:data})
                setData("")
                setCaption("")
                context.setData({...context, chatDetail:context.chatDetail, infoChat:context.infoChat})
                context.setData({...context, modal:null})
            }
        }
    }

    if(context.modal)
    if(context.modal.name == "modalsendvideo")
    return (
        <div className="absolute w-full h-screen bg-black backdrop-blur-sm bg-opacity-40 overflow-y-auto left-0 top-0 z-30 flex items-center justify-center">
            <div className="bg-white w-full md:w-1/2 mx-auto rounded-md p-5">
                <div className="flex items-center justify-between">
                    <h1 className="font-bold">Send Video</h1>
                    <button onClick={() => context.setData({...context, modal:null})}>
                    <HiX />
                    </button>
                </div>
                {
                    step == 1 ?
                        <div className="w-full relative mt-5 space-y-2">
                            <input type="url" value={data} onChange={e => setData(e.target.value)} className='bg-zinc-50 text-sm py-2 px-5 outline-none border-2 hover:bg-zinc-100 focus:bg-white focus:border-lightPrimary w-full' placeholder='Type in https://... .mp4' />

                            <button className="btn-primary" onClick={() => handlerSubmit()}>Send Video</button>
                        </div>
                    :""
                }
                {
                    step == 2 ?
                        <div className="w-full relative mt-5 space-y-2">
                            <video src={data} controls>
                                <source />
                            </video>
                            <input type="text" value={caption} onChange={e => setCaption(e.target.value)} className='bg-zinc-50 text-sm py-2 px-5 outline-none border-2 hover:bg-zinc-100 focus:bg-white focus:border-lightPrimary w-full' placeholder='Type your caption' />

                            <div className="flex items-center gap-2">
                                <button className="btn-secondary" onClick={() => setStep(1)}>Back</button>
                                <button className="btn-primary" onClick={() => handlerSubmit()}>Send Video</button>
                            </div>
                        </div>
                    :""
                }
            </div>
        </div>
    )
}
