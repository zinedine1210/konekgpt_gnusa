import { useContext, useEffect, useState } from "react"
import { MyContext } from "@/context/MyProvider"
import KnowledgeRepository from "@/repositories/KnowledgeRepository"
import CardAttach from "./CardAttach"
import UploadFileRepository from "@/repositories/UploadFileRepository"
import ModalInsertKnowledge from "./ModalInsertKnowledge"

export default function TableAttachments({collect, setCollect}) {
    const context = useContext(MyContext)
    

    useEffect(() => {
        if(!context.dataFilesKnowledge){
            getFileList()
        }
    }, [context.dataFilesKnowledge])

    const getFileList = async () => {
        const getXA = JSON.parse(localStorage.getItem("XA"))
        const result = await KnowledgeRepository.getListFileKnowledge({XA:getXA})
        console.log("get list file =>", result.data);

        // const getXa = JSON.parse(localStorage.getItem("XA"))
        // const dataone = await UploadFileRepository.getFile({XA:getXa, table:"knowledge", refKey:result.data[0]?.id, size:"m"})
        // console.log("dataone", dataone); 
        // setData(dataone)
        
        if(result?.status == 0){
            context.setData({...context, dataFilesKnowledge:result.data})
        }
    }

    const handlerCheckbox = (id) => {
        if(collect.includes(id)){
            setCollect(collect.filter(res => res !== id))
        }else{
            setCollect([...collect, id])
        }
    }

    const handlerSelectAll = () => {
        if(context.dataFilesKnowledge.length === collect.length){
            setCollect([])
        }else{
            let all = []
            context.dataFilesKnowledge.forEach(file => {
                all.push(file.id)
            });

            setCollect(all)
        }
    }


    
  return (
    <div className="w-full">
        <div className="flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6">
                {/* <button onClick={() => console.log(collect)}>abskahsk</button> */}
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        {
                            context.dataFilesKnowledge ?
                            context.dataFilesKnowledge.length > 0 ?
                            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
                                <thead className="">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                            <div className="flex items-center gap-x-3">
                                                <input type="checkbox" onChange={() => handlerSelectAll()} checked={context.dataFilesKnowledge.length == collect.length} className="text-blue-500 border-zinc-300 rounded dark:bg-zinc-900 dark:ring-offset-zinc-900 dark:border-zinc-700"/>
                                                <span>File Name</span>
                                            </div>
                                        </th>
    
                                        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                            Type
                                        </th>

                                        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                            Description
                                        </th>
    
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                            Date created
                                        </th>
    
                                        {/* <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                            Last updated
                                        </th> */}
    
                                        {/* <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                            Uploaded by
                                        </th> */}
    
                                        <th scope="col" className="relative py-3.5 px-4">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-zinc-200 dark:divide-zinc-700 dark:bg-zinc-900">
                                    {
                                        context.dataFilesKnowledge.sort((a, b) => b._cd.epoch_time - a._cd.epoch_time).map((file, key) => {
                                            return <CardAttach collect={collect} handlerCheckbox={handlerCheckbox} file={file} key={key}/>
                                        })
                                    }
                                </tbody>
                            </table>
                            :
                            <div className="w-full text-center p-5">
                                <h1 className="text-red-500 text-sm uppercase font-bold">No Data Available</h1>
                            </div>
                            :
                            <div className="mt-10">
                                {new Array(10).fill("mantap").map((key) => {
                                    return (
                                        <div key={key} className="w-full h-10 animate-pulse bg-zinc-200 mb-1 rounded-md"></div>
                                    )
                                })}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-between mt-6">
            <a href="#" className="flex items-center px-5 py-2 text-sm text-zinc-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>

                <span>
                    previous
                </span>
            </a>

            <div className="items-center hidden md:flex gap-x-3">
                <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-zinc-800 bg-blue-100/60">1</a>
                <a href="#" className="px-2 py-1 text-sm text-zinc-500 rounded-md dark:hover:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-100">2</a>
                <a href="#" className="px-2 py-1 text-sm text-zinc-500 rounded-md dark:hover:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-100">3</a>
                <a href="#" className="px-2 py-1 text-sm text-zinc-500 rounded-md dark:hover:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-100">...</a>
                <a href="#" className="px-2 py-1 text-sm text-zinc-500 rounded-md dark:hover:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-100">12</a>
                <a href="#" className="px-2 py-1 text-sm text-zinc-500 rounded-md dark:hover:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-100">13</a>
                <a href="#" className="px-2 py-1 text-sm text-zinc-500 rounded-md dark:hover:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-100">14</a>
            </div>

            <a href="#" className="flex items-center px-5 py-2 text-sm text-zinc-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-800">
                <span>
                    Next
                </span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
            </a>
        </div>
    </div>
  )
}
