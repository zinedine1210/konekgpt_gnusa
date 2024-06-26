import { MyContext } from "@/context/MyProvider";
import WhatsappRepository from "@/repositories/WhatsappRepository";
import { useContext, useState } from "react";
import { HiX } from "react-icons/hi";

export default function ModalSendImage() {
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
        let obj = {jid:jidUser, imageUrl:data, caption:caption}

        // GROUP
        if(modal && modal.type == "group"){
            obj['instance_key'] = context.infoChat.parentId
            const result = await WhatsappRepository.sendGroupImage({id:context.infoChat.parentId, data:obj})
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
            const result = await WhatsappRepository.sendImage({id:context.infoChat.parentId, data:obj})
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
    
    return (
        <div className="absolute w-full h-screen bg-black backdrop-blur-sm bg-opacity-40 overflow-y-auto left-0 top-0 z-30 flex items-center justify-center">
            <div className="bg-white w-full xl:w-1/2 mx-auto rounded-md p-5">
                <div className="flex items-center justify-between">
                    <h1 className="font-bold">Send Image</h1>
                    <button onClick={() => context.setData({...context, modal:null})}>
                    <HiX />
                    </button>
                </div>
                {
                    step == 1 ?
                        <div className="w-full relative mt-5 space-y-2">
                            <input type="url" value={data} onChange={e => setData(e.target.value)} className='bg-zinc-50 text-sm py-2 px-5 outline-none border-2 hover:bg-zinc-100 focus:bg-white focus:border-lightPrimary w-full' placeholder='Type in https://... .png/jpg' />

                            <button className="btn-primary" onClick={() => handlerSubmit()}>Send Image</button>
                        </div>
                    :""
                }
                {
                    step == 2 ?
                        <div className="w-full relative mt-5 space-y-2">
                            <img src={data} alt={data} />
                            <input type="text" value={caption} onChange={e => setCaption(e.target.value)} className='bg-zinc-50 text-sm py-2 px-5 outline-none border-2 hover:bg-zinc-100 focus:bg-white focus:border-lightPrimary w-full' placeholder='Type your caption' />

                            <div className="flex items-center gap-2">
                                <button className="btn-secondary" onClick={() => setStep(1)}>Back</button>
                                <button className="btn-primary" onClick={() => handlerSubmit()}>Send Image</button>
                            </div>
                        </div>
                    :""
                }
            </div>
        </div>
    )
}
