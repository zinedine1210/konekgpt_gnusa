import { MyContext } from "@/context/MyProvider"
import KnowledgeRepository from "@/repositories/KnowledgeRepository"
import { useContext, useEffect, useState } from "react"

export default function TableAttachmentSelected({files}){
    const [data, setData] = useState(null)
    const context = useContext(MyContext)
  
    const getFileList = async () => {
      const getXA = JSON.parse(localStorage.getItem("XA"))
      const result = await KnowledgeRepository.getListFileKnowledge({XA:getXA})
      console.log("get list file =>", result.data);
      if(result?.status == 0){
        let final = []
        files.forEach(el => {
          const findOne = result.data.find(res => res.id == el)
          final.push(findOne)
        });
        setData(final)
      }
    }
  
    useEffect(() => {
      if(!data){
        if(context?.dataFilesKnowledge?.length > 0){
          let final = []
          files.forEach(el => {
            const findOne = context.dataFilesKnowledge.find(res => res.id == el)
            final.push(findOne)
          });
          setData(final)
        }else{
          getFileList()
        }
      }
    }, [data])
    
    return (
      <div className="w-full">
        <div className="flex flex-col">
            <div className="-mx-4 -my-2 sm:-mx-6">
                <div className="inline-block min-w-full min-h-[320px] py-2 align-middle xl:px-6 lg:px-8">
                    <div className="">
                        {
                            data ?
                            data.length > 0 ?
                            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
                                <thead className="">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                            <div className="flex items-center gap-x-3">
                                                <span>File Identity</span>
                                            </div>
                                        </th>
    
                                        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-zinc-200 dark:divide-zinc-700 dark:bg-black">
                                  {
                                    data.map((file, index) => {
                                      return (
                                        <tr key={index}>
                                          <td className="px-4 py-4 text-sm font-medium text-zinc-700 dark:text-white whitespace-nowrap">
                                              <div className="inline-flex items-center gap-x-3">
  
                                                  <div className="flex items-center gap-x-2">
                                                      <div className="flex items-center justify-center w-8 h-8 text-blue-500 bg-blue-100 rounded-full dark:bg-zinc-800">
                                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                          </svg>
                                                      </div>
                                                      
                                                      <div>
                                                        <h2 className="font-normal text-zinc-800 dark:text-white ">{file.filestat?.["original-name"]}</h2>
                                                        <p className="text-xs font-normal text-zinc-500 dark:text-zinc-400">{file.filestat?.size} KB</p>
                                                      </div>
                                                  </div>
                                              </div>
                                          </td>
                                          <td className="px-12 py-4 text-sm font-normal text-zinc-700 dark:text-white whitespace-nowrap">
                                              Ready to train
                                          </td>
                                        </tr>
                                      )
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
                                {new Array(5).fill("mantap").map((key) => {
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
      </div>
    )
  }