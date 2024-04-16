import CardSelectKnowledge from "@/components/Knowledge/CardSelectKnowledge";
import { MyContext } from "@/context/MyProvider";
import KnowledgeRepository from "@/repositories/KnowledgeRepository";
import { useContext, useState } from "react";

export default function SettingInbox({ data }) {
  return (
    <div className="w-full bg-zinc-100 dark:bg-dark relative h-screen p-2 md:p-10">
        <h1 className="text-xl font-bold">Setting of your channel</h1>

        <div className="mt-5">
            <ChangeKnowledge channelInformation={data.channelInformation}/>
        </div>
    </div>
  )
}

function ChangeKnowledge({ channelInformation }){
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const context = useContext(MyContext)

    const handleConnect = async () => {
        setLoading(true)
        const dataKnowledgeTraining = context.dataKnowledge;
        if(dataKnowledgeTraining && data){
            setData(dataKnowledgeTraining)
        }else{
            await getKnowledge()
        }
        setLoading(false)
    }

    const getKnowledge = async () => {
        const getxa = JSON.parse(localStorage.getItem("XA"))
        const result = await KnowledgeRepository.getAllKnowledge({xa:getxa})
        // console.log(result)
        if(result?.data){
            context.setData({...context, dataKnowledge:result.data})
            setData(result.data)
        }else{
            alert("Something went wrong, Please try again later")
        }
    }
    return (
        <div>
            <h1 className="font-bold uppercase tracking-wider">Change knowledge</h1>
            <p className="font-light text-sm mb-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla pariatur, aliquam quae iure delectus illum libero ipsam in rerum ea!</p>
            {
                data ?
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                    {
                        data.map((item, i) => {
                            const used = item.id === channelInformation.knowledge_id


                            return (
                                <div className="bg-white rounded-md px-5 py-5 shadow-md" key={i}>
                                    <CardSelectKnowledge active={!used} item={item} channelId={channelInformation.knowledge_id}/>
                                </div>
                            )
                        })
                    }
                </div>
                :
                <button className="btn-secondary" disabled={loading} onClick={() => handleConnect()}>{loading ? "Loading...":"Change"}</button>
            }
        </div>
    )
}