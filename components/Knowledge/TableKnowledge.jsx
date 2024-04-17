import { useContext, useEffect } from "react"
import CardKnowledge from "./CardKnowledge"
import { MyContext } from "@/context/MyProvider"
import KnowledgeRepository from "@/repositories/KnowledgeRepository"
import Link from "next/link"
import { BsPlus, BsPlusCircle } from "react-icons/bs"

export default function TableKnowledge() {
    const context = useContext(MyContext)

    useEffect(() => {
        if(!context.dataKnowledge){
            getKnowledge()
        }
    }, [context.dataKnowledge])

    const getKnowledge = async () => {
        const getxa = JSON.parse(localStorage.getItem("XA"))
        const result = await KnowledgeRepository.getAllKnowledge({xa:getxa})
        console.log(result);
        if(result?.data){
            context.setData({...context, dataKnowledge:result.data})
        }
    }
    
  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle xl:px-6 lg:px-8">
            <div className="overflow-hidden">
                {
                    context.dataKnowledge ?
                    context.dataKnowledge.length > 0 ?
                        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
                            <thead className="">
                                <tr>
                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                        <div className="flex items-center gap-x-3">
                                            {/* <input type="checkbox" className="text-blue-500 border-zinc-300 rounded dark:bg-zinc-900 dark:ring-offset-zinc-900 dark:border-zinc-700"/> */}
                                            <span>Knowledge Name</span>
                                        </div>
                                    </th>

                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                        Status
                                    </th>

                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                        Created At
                                    </th>

                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                        Type
                                    </th>

                                    <th scope="col" className="relative py-3.5 px-4">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-zinc-200 dark:divide-zinc-700 dark:bg-black">
                                {
                                    context.dataKnowledge.map((item, key) => {
                                        return <CardKnowledge item={item} key={key}/>
                                    })
                                }
                                
                            </tbody>
                        </table>
                    :
                    <div className="w-full text-center p-5">
                        <h1 className="text-red-500 text-sm uppercase font-bold">No Data Available</h1>
                        <Link href="/usr/knowledge/attachment?m=clm_knowledge_attachment">
                            <button className="btn-secondary text-center mx-auto mt-5"><BsPlusCircle /> Training Bot</button>
                        </Link>
                    </div>
                    :
                    new Array(10).fill("mantap").map((key) => {
                        return (
                            <div key={key} className="w-full h-10 animate-pulse bg-zinc-200 mb-1 rounded-md"></div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}
