import {HiOutlineArrowSmRight, HiX} from "react-icons/hi"
import { useContext, useEffect, useState } from "react";
import { MyContext } from "@/context/MyProvider";
import KnowledgeRepository from "@/repositories/KnowledgeRepository";

export default function SimulationKnowledge() {
    const [data, setData] = useState("")
    const context = useContext(MyContext)
    const [text, setText] = useState([])
    const [loading, setLoading] = useState(false)

    const handlerChange = value => {
        setData(value)
    }

    const handlerSubmit = async e => {
        setLoading(true)
        e.preventDefault()
        let obj = {
            "file_id": context.modal.data.id,
            "text": data
        }
        const result = await KnowledgeRepository.simulationKnowledge({xa:{XA:JSON.parse(localStorage.getItem("XA"))}, data:obj})
        // console.log(result);
        if(result?.type == "success"){
            setText([...text, {me:true, text:data}, {me:false, text:result.data}])
            setLoading(false)
            setData("")
        }
    }

  return (
    <div className="fixed top-0 left-0 z-50 md:block w-full md:w-[300px] h-screen md:h-[640px] md:border-8 border-black md:z-0 md:rounded-[20px] bg-white dark:bg-dark dark:border-black mx-auto outline outline-blue-300 shadow-2xl pb-16 md:relative overflow-hidden">
        <div className="w-full py-2 flex items-center justify-between bg-blue-100 px-2">
            <div>
                <h1 className="text-sm">{context.modal.data.name}</h1>
                <p className="text-xs text-zinc-500">Simulation Knowledge</p>
            </div>
            <button className="flex items-center justify-center hover:bg-red-200 transition-colors duration-300 ease-in-out rounded-full w-6 h-6" onClick={() => context.setData({...context, modal:null, view:2})}>
                <HiX />
            </button>
        </div>
        <div className="h-full overflow-y-hidden hover:overflow-y-auto px-3 pt-2 pb-16">
            <div className="space-y-2 w-full mx-auto">
                {
                    text.map((item, key) => {
                        if(item.me)
                        return (
                            <div key={key} className="flex gap-2">
                                <div className="ml-auto">
                                    <h1 className="text-end text-zinc-500 text-xs py-1">You</h1>
                                    <div className="space-y-2">
                                        <div className="w-fit backdrop-blur-2xl pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] ml-auto relative">
                                            <h1 className="text-xs">{item.text}</h1>
                                            <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">00.00</span>
                                        </div>
                                    </div>
                                </div>
                                <span className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold border-2 border-white">Y</span>
                            </div>
                        )
                        
                        else
                        return (
                            <div key={key} className="flex gap-2">
                                <span className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold border-2 border-white">GB</span>
                                <div>
                                    <h1 className="text-zinc-500 text-xs py-1">Gnusa Bot</h1>
                                    <div className="space-y-2">
                                        <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] relative">
                                            <h1 className="text-xs">{item.text}</h1>
                                            <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">00.00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <div className="absolute right-1/2 translate-x-1/2 w-full px-5 bottom-0 overflow-hidden rounded-xl">
            <form onSubmit={(e) => handlerSubmit(e)} className="relative">
                <input disabled={loading} value={data} id="inputQuestion" type="text" className="outline-none peer p-2 w-full text-xs border-2 border-blue-200 rounded-xl placeholder:text-zinc-500 pr-10 pl-5 bg-zinc-200 focus:bg-white transition-all duration-300" placeholder="Any Question?" maxLength={50} onChange={(e) => handlerChange(e.target.value)} />
                <button type="submit" className="absolute peer-focus:translate-x-0 -translate-x-5 opacity-0 peer-focus:opacity-100 hover:scale-125 transition-all duration-300 top-1/2 -translate-y-1/2 right-2 w-8 h-8 flex items-center justify-center peer-focus:visible invisible">
                    {
                        loading ?
                        <div role="status">
                            <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        :
                        <HiOutlineArrowSmRight className="text-xl"/>
                    }
                </button>
            </form>
            <h1 className="text-end text-zinc-500 text-xs p-1">{data ? data.length :"0"}/50</h1>
        </div>
    </div>
  )
}
