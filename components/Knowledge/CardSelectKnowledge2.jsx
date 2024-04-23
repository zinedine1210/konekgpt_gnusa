import KnowledgeRepository from "@/repositories/KnowledgeRepository"
import Link from "next/link"
import { useRouter } from "next/router"
import Swal from "sweetalert2"

export default function CardSelectKnowledge2({ item, channelId, active=true }) {
    const router = useRouter()
    const handleSelectKnowledge = async (itemKnowledge) => {
        let obj = {
            "knowledge_id": itemKnowledge.id, //diambil dari knowledge id
            "knowledge_name": itemKnowledge.name, //diambil dari knowledge id
            "channel_id": channelId //id dari channel
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
            updateChannel = updateChannel.filter(res => res.id !== channelId)
            updateChannel.push(result.data)
            localStorage.setItem("whatsappChannel", JSON.stringify(updateChannel))
            router.push(`/usr/inbox/${itemKnowledge.id}?m=clm_inbox`)
            setTimeout(() => {
                router.reload()
            }, 3000);
            Swal.fire({
                icon: "info",
                position: "top-end",
                title: "Success Updated",
                text: "Within 3 seconds you will be directed to the related page",
                showCloseButton: false
            })
        }else{
            alert("Something went wrong, please try again later")
        }
    }

    const typeTraining = {
        1: "Attachment",
        2: "URL Website",
        3: "Scratch"
    }

  return (
    <div className="w-full relative">
        <h1 className="font-bold">{item.name}</h1>
        <p className="text-sm font-light">Description : <span className="font-bold">{item.description}</span></p>
        <p className="text-sm font-light">Code : <span className="font-bold">{item.code}</span></p>
        <p className="text-sm font-light">Type : <span className="font-bold">{typeTraining[item.type_training]}</span></p>
        
        {
            item?._files ? 
            <>
                <p className="text-sm font-bold text-blue-500">Files :</p>
                <div className="border rounded-md border-zinc-300 p-2">
                    {
                        item._files.map((file, i2) => {
                            return (
                                <div key={i2} className="flex items-center justify-between">
                                    <h1 className="text-sm">{file}</h1>
                                    <Link href={"/"}>
                                        <button className="text-sm text-blue-500 font-semibold">View</button>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </>
            :""
        }
        <button disabled={!active} onClick={() => handleSelectKnowledge(item)} className="absolute top-2 right-2 btn-secondary">{active ? "Insert":"Used"}</button>
    </div>
  )
}
