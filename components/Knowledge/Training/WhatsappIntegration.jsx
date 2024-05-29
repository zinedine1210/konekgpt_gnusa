import { MyContext } from "@/context/MyProvider"
import ChannelRepository from "@/repositories/ChannelRepository"
import KnowledgeRepository from "@/repositories/KnowledgeRepository"
import { Notify } from "@/utils/scriptApp"
import Link from "next/link"
import { useContext } from "react"
import { BsCheck2Circle, BsPlusCircle, BsXCircle } from "react-icons/bs"

export default function WhatsappIntegration({ knowledge }) {
    const context = useContext(MyContext)


    const getAllChannel = async () => {
        const getFromLocal = JSON.parse(localStorage.getItem("whatsappChannel"))
        if(getFromLocal){
            context.setData({ ...context, channelWhatsapp: getFromLocal })
        }else{
            const getxa = JSON.parse(localStorage.getItem("XA"))
            const result = await ChannelRepository.getAllChannel({xa:getxa}) 
            localStorage.setItem("whatsappChannel", JSON.stringify(result.data))
            context.setData({...context, channelWhatsapp:result.data})
        }
    }

    const data = context.channelWhatsapp

    const handleConnect = async (channel, index) => {
        let obj = {
            "knowledge_id": knowledge.id, //diambil dari knowledge id
            "knowledge_name": knowledge.name, //diambil dari knowledge id
            "channel_id": channel.id //id dari channel
        }
        const getXa = JSON.parse(localStorage.getItem("XA"))
        const result = await KnowledgeRepository.selectKnowledgeForChannel({
            data: obj,
            xa: {
                XA: getXa
            }
        })
        if(result.type == "success"){
            let updateChannel = JSON.parse(localStorage.getItem("whatsappChannel"))
            updateChannel = updateChannel.filter(res => res.id !== channel.id)
            updateChannel.push(result.data)
            localStorage.setItem("whatsappChannel", JSON.stringify(updateChannel))
            Notify("Updated Success", "success")
        }else{
            Notify("Something went wrong, please try again later", "error")
        }
    }
  return (
    <div>
        <h1 className="mb-1">Whatsapp</h1>
        {
            data ? 
            <div className="w-full space-y-2">
                {
                    data.length > 0 ? 
                    <>
                        <div className="flex items-center justify-between">
                            <input type="search" className="input-search" placeholder="Search whatsapp number or identity" />

                        </div>

                        <div className="w-full h-full max-h-56 overflow-y-auto">
                            { data.map((ch, index) => {
                                    return (
                                        <div key={index} className="py-2 px-5 border-b border-zinc-400">
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="text-sm">
                                                    <p className="first-letter:uppercase text-zinc-500">{ch.name}</p>
                                                    <h1 className="font-medium">+{ch.identity}</h1>
                                                </div>
                                                <div className="text-sm">
                                                    {ch.active ? 
                                                        <p className="text-green-500 flex items-center gap-2"><BsCheck2Circle /> Authenticated</p>
                                                        :
                                                        <div>
                                                            <p className="text-red-500 flex items-center gap-2"><BsXCircle /> Disconnected</p>
                                                            <Link href={"/usr/integration/whatsapp?m=clm_integration_wa"}><p className="underline">Click here to reconnect</p></Link>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="text-sm flex items-center gap-2">
                                                    <button className="btn-secondary" onClick={() => handleConnect(ch, index)} disabled={!ch.active}>Add</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
                    :
                    <div className="w-full pt-2 pb-5 px-5">
                        <h1 className="text-red-500">No whatsapp integration added yet</h1>
                        <div className="flex items-center gap-2">
                            <Link href={"/usr/integration/whatsapp?m=clm_integration_wa"}><button className="btn-secondary">Integration Whatsapp</button></Link>
                            {/* <button onClick={() => context.setData({...context, channelWhatsapp: null})} className="btn-primary">Back</button> */}
                        </div>
                    </div>
                }
            </div>
            :
            <button className="btn-primary" onClick={() => getAllChannel()}><BsPlusCircle /> Add Whatsapp</button>
        }
    </div>
  )
}
