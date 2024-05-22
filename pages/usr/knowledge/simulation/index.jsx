import Layout from '@/components/Layouts/Layout'
import { MyContext } from '@/context/MyProvider'
import KnowledgeRepository from '@/repositories/KnowledgeRepository'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Suspense, useContext, useEffect, useState } from 'react'
import { BsFile, BsFilePdfFill, BsFileWordFill } from 'react-icons/bs'
import Typewriter from 'typewriter-effect';
import { HiOutlineArrowSmRight, HiX } from 'react-icons/hi'

export default function HalamanSimulation() {
    const router = useRouter()
    const { id } = router.query
    const [data, setData] = useState(null)
    const context = useContext(MyContext)

    const [value, setValue] = useState("")
    const [text, setText] = useState([])
    const [loading, setLoading] = useState(false)

    const [open, setOpen] = useState(true)

    const handlerChange = value => {
        setValue(value)
    }

    const handlerSubmit = async (e, defaultValue) => {
        setLoading(true)
        e.preventDefault()
        let obj = {
            "file_id": data.id,
            "text": defaultValue ?? value
        }
        const result = await KnowledgeRepository.simulationKnowledge({xa:{XA:JSON.parse(localStorage.getItem("XA"))}, data:obj})
        if(result?.type == "success"){
            setText([...text, {me:true, text:defaultValue ?? value}, {me:false, text:result.data, effect: true}])
            setLoading(false)
            setValue("")
        }
    }


    const getAllNeed = async () => {
        const result = await KnowledgeRepository.getOneKnowledge({
            id: id,
            xa: {
                XA: JSON.parse(localStorage.getItem("XA"))
            }
        })
        console.log(result)

        let resultData = result?.data
        if(result?.status == 0 && resultData){
            if(resultData?._files){
                let allFilesKnowledge = null
                if(context.dataFilesKnowledge){
                    allFilesKnowledge = context.dataFilesKnowledge
                }else{
                    const listAllFiles = await KnowledgeRepository.getListFileKnowledge({XA: JSON.parse(localStorage.getItem("XA"))})
                    if(listAllFiles?.data && listAllFiles.status == 0){
                        allFilesKnowledge = listAllFiles.data
                    }else{
                        alert("Nothing data found")
                    }
                }
                let allFilesByID = []
                resultData._files.forEach(el => {
                    const find = allFilesKnowledge.find(res => res.id === el)
                    if(find){
                        allFilesByID.push(find)
                    }
                })
                resultData._files = allFilesByID
            }else{
                setOpen(false)
            }
            console.log(resultData)
            setData(resultData)
        }else{
            alert("Something went wrong, or nothing data found")
        }
    }


    useEffect(() => {
        if(!data && id) getAllNeed()
    }, [data, id])

  return (
    <Layout title={"Training"}>
      <Suspense fallback={"Loading"}>
        <div className="px-2 xl:px-5 pt-16">
            <div className='bg-white dark:bg-darkSecondary rounded-xl shadow-xl w-full overflow-hidden h-full'>
                <div className='px-5 py-2 bg-lightPrimary text-white dark:bg-darkPrimary dark:border-b flex items-center justify-between'>
                    <div>
                        <h1 className='font-bold uppercase tracking-wider'>{data?.name}</h1>
                        <p className='text-xs'>{data?.code}</p>
                    </div>

                    <div className='flex items-center gap-2'>
                        { data?._files && <button className='btn-secondary xl:hidden' onClick={() => setOpen(!open)}>{open ? "Close":"Files"}</button> }

                        <Link href={"/usr/knowledge/training?m=clm_knowledge_training"}>
                            <button className='w-8 h-8 xl:w-10 xl:h-10 flex items-center justify-center hover:bg-white hover:bg-opacity-20 rounded-xl'><HiX className='text-2xl'/></button>
                        </Link>
                    </div>
                </div>
                <div className='xl:flex w-full h-full max-h-[950px]'>
                    {
                        data && data?._files && (
                            <div className={`${!open && "hidden"} w-full xl:w-1/2 p-5 relative max-h-[900px] overflow-y-auto`}>
                                <div className='bg-info text-sm xl:text-base p-2 bg-blue-50 mb-2 rounded-md text-blue-500'>
                                    If there are problems when displaying the file, click title to open file in new tab
                                </div>
                                {
                                    data?._files.map((file, key) => {
                                        return (
                                            <div className='w-full mb-10' key={key}>
                                                <Link href={`${file?.refKey?.name?.url}`} target='_blank'>
                                                    <h1 className='font-bold'>{file?.filestat?.["original-name"]}</h1>
                                                </Link>
                                                <p className='mb-3 font-light'>{file?.filestat?.["size"]} KB</p>
                                                <iframe src={file?.refKey?.name?.url} type="application/pdf" width="100%" height="800px" />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                    <div className={`${open && "hidden xl:block"} relative w-full max-h-[900px] bg-lightPrimary dark:bg-black bg-opacity-20 overflow-y-auto`}>
                        <div className="h-full overflow-y-hidden hover:overflow-y-auto px-3 pt-2 pb-16">
                            <div className="space-y-2 w-full mx-auto">
                                {
                                    data && (
                                        <div className='relative w-full'>
                                            <div className="flex gap-2 mb-2">
                                                <span className="hidden w-8 h-8 xl:w-10 xl:h-10 rounded-full text-white bg-lightPrimary xl:flex items-center justify-center font-bold border-2 border-white">AI</span>
                                                <div>
                                                    <h1 className="text-lightPrimary font-bold text-base py-1">KonekGPT</h1>
                                                        {data?._files ? (
                                                            <div className="space-y-2">
                                                                {
                                                                    data._files.map((file, key) => {
                                                                        return (
                                                                            <Link key={key} href={file?.refKey?.name?.url} target='_blank'>
                                                                                <div className="w-fit bg-white dark:bg-darkPrimary py-2 px-3 flex items-center justify-between gap-2 rounded-xl max-w- max-w-full relative">
                                                                                    {
                                                                                        file?.filestat?.['mime-type'] == "application/pdf" && (
                                                                                            <div>
                                                                                                <BsFilePdfFill className='text-red-500 text-3xl xl:text-5xl' />
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                    {
                                                                                        file?.filestat?.['mime-type'] == "text/plain" && (
                                                                                            <div>
                                                                                                <BsFile className='text-zinc-500 text-3xl xl:text-5xl' />
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                    {
                                                                                        (file?.filestat?.['mime-type'] == "application/wps-office.docx" ||
                                                                                        file?.filestat?.['mime-type'] == "application/word")
                                                                                        && (
                                                                                            <div>
                                                                                                <BsFileWordFill className='text-blue-500 text-3xl xl:text-5xl' />
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                    <div>
                                                                                        <h1 className="text-xs xl:text-base">{file?.filestat?.['original-name']}</h1>
                                                                                        <p className='text-xs text-zinc-600 dark:text-zinc-300'>{file?.filestat?.['size']} KB</p>
                                                                                    </div>
                                                                                </div>
                                                                            </Link>
                                                                        )
                                                                    })
                                                                }
                                                                <div className="w-fit bg-white dark:bg-darkPrimary pt-1 pb-6 px-3 rounded-md max-w-[full] relative">
                                                                    <h1 className="text-xs xl:text-base">Description: </h1>
                                                                    <p className='text-xs xl:text-base text-zinc-600 dark:text-zinc-300 mb-2'>{data?.description}</p>
                                                                    <h1 className="text-xs xl:text-base mb-2">Ask AI something about documents, let's start the conversation with:</h1>
                                                                    <button onClick={(e) => handlerSubmit(e, "Hallo, explain to me what you know")} className='btn-secondary w-full text-start'>Hallo, explain to me what you know</button>
                                                                    <button onClick={(e) => handlerSubmit(e, "What is the title?")} className='btn-secondary w-full text-start'>What is the title?</button>
                                                                    <button onClick={(e) => handlerSubmit(e, "What is the discussion in this document?")} className='btn-secondary w-full text-start'>What is the discussion in this document?</button>
                                                                </div>
                                                            </div>
                                                        ):(
                                                            <div className="w-fit bg-white dark:bg-darkPrimary py-2 px-3 flex items-center justify-between gap-2 rounded-xl max-w- max-w-full relative">
                                                                <div>
                                                                    <h1 className="text-xs xl:text-base">Description</h1>
                                                                    <p className='text-xs xl:text-base text-zinc-600 dark:text-zinc-300'>{data?.description}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    text.map((item, key) => {
                                        if(item.me)
                                        return (
                                            <div key={key} className="flex gap-2">
                                                <div className="ml-auto">
                                                    <h1 className="text-end text-zinc-500 dark:text-zinc-300 text-xs xl:text-base py-1">You</h1>
                                                    <div className="space-y-2">
                                                        <div className="w-fit bg-blue-300 dark:bg-blue-500 pt-1 pb-6 px-3 rounded-md max-w-[500px] ml-auto relative">
                                                            <h1 className="text-xs xl:text-base">{item.text}</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="w-8 h-8 xl:w-10 xl:h-10 rounded-full bg-white dark:bg-darkPrimary flex items-center justify-center font-bold border border-lightPrimary">Y</span>
                                            </div>
                                        )
                                        
                                        else
                                        return (
                                            <div key={key} className="flex gap-2">
                                                <span className="w-8 h-8 xl:w-10 xl:h-10 rounded-full bg-white dark:bg-darkPrimary flex items-center justify-center font-bold border border-lightPrimary">{data?.name.charAt(0)}</span>
                                                <div>
                                                    <h1 className="text-zinc-500 dark:text-zinc-300 text-xs xl:text-base py-1">{data?.name}</h1>
                                                    <div className="space-y-2">
                                                        <div className="w-fit bg-white dark:bg-darkPrimary pt-1 pb-6 px-3 rounded-md max-w-[500px] relative">
                                                            {
                                                                item.hasOwnProperty("effect") ? 
                                                                    <Typewriter
                                                                        options={{
                                                                            wrapperClassName:"text-xs xl:text-base",
                                                                            delay:20
                                                                        }}
                                                                        onInit={(typewriter) => {
                                                                        typewriter.typeString(item.text)
                                                                            .callFunction(() => {
                                                                                console.log('String typed out!');
                                                                            })
                                                                            .callFunction(() => {
                                                                                delete item.effect
                                                                            })
                                                                            .start();
                                                                        }}
                                                                    />
                                                                :
                                                                    <h1 className="text-xs xl:text-base">{item.text}</h1>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="fixed xl:absolute right-1/2 translate-x-1/2 w-full px-5 bottom-5 overflow-hidden rounded-xl">
                            <form onSubmit={(e) => handlerSubmit(e)} className="relative">
                                <input disabled={loading} value={value} id="inputQuestion" type="text" className="outline-none peer p-2 w-full text-xs xl:text-base border-2 border-blue-200 rounded-xl placeholder:text-zinc-500 pr-10 pl-5 bg-zinc-200 dark:bg-darkPrimary focus:bg-white transition-all duration-300" placeholder="Any Question?" maxLength={100} onChange={(e) => handlerChange(e.target.value)} />
                                <button type="submit" className="absolute peer-focus:translate-x-0 -translate-x-5 opacity-0 peer-focus:opacity-100 hover:scale-125 transition-all duration-300 top-1/2 -translate-y-1/2 right-2 w-8 h-8 flex items-center justify-center peer-focus:visible invisible peer-disabled:opacity-100 peer-disabled:translate-x-0 peer-disabled:visible">
                                    {
                                        loading ?
                                            <div role="status">
                                                <svg className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                            {/* <h1 className="text-end text-zinc-500 text-xs xl:text-base p-1">{data ? data.length :"0"}/50</h1> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </Suspense>
    </Layout>
  )
}
