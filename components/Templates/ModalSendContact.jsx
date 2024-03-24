import { MyContext } from "@/context/MyProvider";
import WhatsappRepository from "@/repositories/WhatsappRepository";
import { useContext, useState } from "react";
import { HiX } from "react-icons/hi";

export default function ModalSendContact() {
    const context = useContext(MyContext)
    const [data, setData] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [step, setStep] = useState(1)
    const modal = context.modal

    const handlerSubmit = async () => {
        const jidUser = context.infoChat.id
        let obj = {instance_key:context.infoChat.parentId, jid:jidUser, fullname:data, organization:"gnusachat", phoneNumber:`62${phoneNumber}`}

        if(modal && modal.type == "group"){
            const result = await WhatsappRepository.sendGroupContact({id:context.infoChat.parentId, data:obj})
            console.log(result);
            if(result.success){
                context.infoChat.messages[0].message = result.data
                context.chatDetail.push({data:result.data})
                setData("")
                setPhoneNumber("")
                context.setData({...context, chatDetail:context.chatDetail, infoChat:context.infoChat})
                context.setData({...context, modal:null})
            }
        }else{
            obj['jid'] = obj['jid'].split("@")[0]
            const result = await WhatsappRepository.sendContact({id:context.infoChat.parentId, data:obj})
            console.log(result);
            if(result.success){
                context.infoChat.messages[0].message = result.data
                context.chatDetail.push({data:result.data})
                setData("")
                setPhoneNumber("")
                context.setData({...context, chatDetail:context.chatDetail, infoChat:context.infoChat})
                context.setData({...context, modal:null})
            }
        }
    }

    if(context.modal)
    if(context.modal.name == "modalsendcontact")
    return (
        <div className="absolute w-full h-screen bg-black backdrop-blur-sm bg-opacity-40 overflow-y-auto left-0 top-0 z-30 flex items-center justify-center">
            <div className="bg-white w-full xl:w-1/2 mx-auto rounded-md p-5">
                <div className="flex items-center justify-between">
                    <h1 className="font-bold">Send Contact</h1>
                    <button onClick={() => context.setData({...context, modal:null})}>
                    <HiX />
                    </button>
                </div>
                {
                    step == 1 ?
                        <div className="w-full relative mt-5 space-y-2">
                            <input type="text" value={data} onChange={e => setData(e.target.value)} className='bg-zinc-50 text-sm py-2 px-5 outline-none border-2 hover:bg-zinc-100 focus:bg-white focus:border-lightPrimary w-full' placeholder='Type fullname' />
                            <div className='w-full relative'>
                                <span className='absolute block top-1/2 -translate-y-1/2 pl-3 text-sm text-zinc-500 font-bold'>+62</span>
                                <input type="number" onChange={e => setPhoneNumber(e.target.value)} className='bg-zinc-50 text-sm py-2 pl-10 pr-5 outline-none border-2 hover:bg-zinc-100 focus:bg-white focus:border-lightPrimary w-full' placeholder='Type in 89508...' />
                            </div>

                            <button className="btn-primary" onClick={() => handlerSubmit()}>Send Contact</button>
                        </div>
                    :""
                }
                {
                    step == 2 ?
                        <div className="w-full relative mt-5 space-y-2">
                            <iframe src={data} className="h-56 w-full" frameborder="0"></iframe>

                            <div className="flex items-center gap-2">
                                <button className="btn-secondary" onClick={() => setStep(1)}>Back</button>
                                <button className="btn-primary" onClick={() => handlerSubmit()}>Send Document</button>
                            </div>
                        </div>
                    :""
                }
            </div>
        </div>
    )
}
