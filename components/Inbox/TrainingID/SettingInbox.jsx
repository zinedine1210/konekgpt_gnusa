import CardSelectKnowledge from "@/components/Knowledge/CardSelectKnowledge";
import CardSelectKnowledge2 from "@/components/Knowledge/CardSelectKnowledge2";
import { MyContext } from "@/context/MyProvider";
import KnowledgeRepository from "@/repositories/KnowledgeRepository";
import { useContext, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { IoPower } from "react-icons/io5";

export default function SettingInbox({ data }) {

    if(data.channelInformation){
        return (
          <div className="w-full bg-zinc-100 dark:bg-dark relative h-screen p-2 md:p-10">
              <h1 className="text-xl font-bold">Setting of your channel</h1>
      
              <div className="mt-5">
                  <ChangeKnowledge channelInformation={data?.channelInformation?.[0]}/>
              </div>
              <div className="mt-5">
                  <ChannelIntegration channelInformation={data.channelInformation}/>
              </div>
          </div>
        )
    }else {
        return (
            <div className="p-10 text-red-500">
                No Data Received
            </div>
        )
    }
}

function ChannelIntegration({ channelInformation }){
    // console.log(channelInformation)
    // const handlePower = () => {
    //     const getAllWhatsapp = JSON.parse(localStorage.getItem("whatsappChannel"));
    //     getAllWhatsapp.find(res => res.id == props.item.id)['active'] = !props.item.active
    //     // console.log(getAllWhatsapp);
    //     localStorage.setItem("whatsappChannel", JSON.stringify(getAllWhatsapp))
    //     context.setData({...context, channelWhatsapp:getAllWhatsapp})
    // }
    return (
        <div>
            <h1 className="font-bold uppercase tracking-wider">Channels Integration</h1>
            <p className="font-light text-sm text-zinc-700 dark:text-zinc-300">This is a channel that is connected to AI</p>
            <div className="grid grid-cols-1 mt-5 md:grid-cols-2 xl:grid-cols-5 gap-5 rounded-md">
                {
                    channelInformation ? channelInformation.map((chan, i) => {
                        return (
                            <div key={i} className="bg-white relative rounded-md shadow-md p-2">
                                <button className="absolute right-5 text-green-500 font-bold text-xl -translate-y-1/2 top-1/2">
                                    <IoPower />
                                </button>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center justify-center text-xl w-10 h-10 text-green-500 bg-green-100 rounded-full">
                                        <BsWhatsapp />
                                    </div>
                                    <div> 
                                        <p className="text-sm text-zinc-600 dark:text-zinc-300">{chan?.name}</p>
                                        <h1 className="text-blue-500 font-bold">{chan?.identity}</h1>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    :""
                }
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
            <p className="font-light text-sm mb-2 text-zinc-700 dark:text-zinc-300">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla pariatur, aliquam quae iure delectus illum libero ipsam in rerum ea!</p>
            {
                data ?
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 max-h-[500px] h-full overflow-y-auto">
                    {
                        data.map((item, i) => {
                            const used = item.id === channelInformation.knowledge_id
                            console.log(item)
                            return (
                                <div className="bg-white rounded-md px-5 py-5 shadow-md" key={i}>
                                    <CardSelectKnowledge2 active={!used} item={item} channelId={channelInformation.id}/>
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