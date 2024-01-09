import Layout from '@/components/Layouts/Layout'
import { MyContext } from '@/context/MyProvider'
import KnowledgeRepository from '@/repositories/KnowledgeRepository'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Suspense, useContext, useState } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import Swal from 'sweetalert2'

export default function BlankScratch() {
    const context = useContext(MyContext)
    const router = useRouter()
    const [loading, setLoading] = useState(false)


    const [data, setData] = useState({
        "type_training": 4,
        "name": "",
        "code":"",
        "description":"",
        "text": ""
    })

    const handlerSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const result = await KnowledgeRepository.insertKnowledge({xa:{xa:JSON.parse(localStorage.getItem("XA"))}, data:data})
        console.log(result);
        if(result?.type == "success"){
            if(context.dataKnowledge){
                context.dataKnowledge.push(result.data)
            }else{
                context.setData({...context, dataKnowledge:[result.data]})
            }
            router.push("/usr/knowledge")
            setLoading(false)
        }else{
            Swal.fire({
                icon:"error",
                title:"Something Wrong",
                text:"Please try again later"
            })
            
            setLoading(false)
        }
    }


  return (
    <Layout title={"Create From Blink Scratch"} desc={"Halaman untuk membuat word"}>
        <Suspense fallback={"Loading"}>
            <section className="w-full bg-zinc-100 relative h-screen flex">
                <div className="w-full relative h-screen pt-16 overflow-y-auto">
                    <div className='mx-0 md:mx-2'>
                    <div className='bg-white rounded-md shadow-md p-3 md:p-5'>
                        <label className="text-base md:text-xl dark:text-zinc-400 font-semibold">Create Knowledge base from scratch</label>
                        <div className="flex items-center gap-2 pt-1 pb-3">
                            <Link href={"/usr/knowledge"}>
                                <h1 className="badge-blue">
                                    <FaChevronLeft />
                                    Back
                                </h1>
                            </Link>
                            /
                            <h1 className="text-sm">Build From Scratch</h1>
                        </div>

                        <form onSubmit={(e) => handlerSubmit(e)} className='my-5 space-y-4'>
                            <div>
                                <label htmlhtmlFor='nameofscratch' className='font-bold inline-block mb-2 text-sm'>Name <span className='text-red-500'>*</span></label>
                                <input onChange={(e) => setData({...data, name:e.target.value})} value={data.name} id='nameofscratch' type="text" className="input-search w-full" placeholder='Give a name to your new data source' />
                            </div>
                            <div>
                                <label htmlhtmlFor='code' className='font-bold inline-block mb-2 text-sm'>Code <span className='text-red-500'>*</span></label>
                                <input onChange={(e) => setData({...data, code:e.target.value})} value={data.code} id='code' type="text" className="input-search w-full" placeholder='Give a code name of data' />
                            </div>
                            <div>
                                <label htmlhtmlFor='description' className='font-bold inline-block mb-2 text-sm'>Description <span className='text-red-500'>*</span></label>
                                <input onChange={(e) => setData({...data, description:e.target.value})} value={data.description} id='description' type="text" className="input-search w-full" placeholder='Description' />
                            </div>
                            <div>
                                <label htmlhtmlFor="textareaofscratch" className='font-bold inline-block'>The content you want to add</label>
                                <p className='text-zinc-500 font-light text-sm mb-2'>This text will be added to the knowledge of your Chatbot. Carefully add relevant content.</p>

                                <div className='relative'>
                                    <span className='absolute inline-block right-2 top-2 text-opacity-75 text-xs font-light text-zinc-500'><span className='font-bold text-base'>1</span>/1000</span>
                                    <textarea value={data.text} onChange={(e) => setData({...data, text:e.target.value})} name="description" id="textareaofscratch" className='block w-full bg-zinc-50 text-sm py-2 px-2 md:px-5 outline-none border-2 hover:bg-zinc-100 focus:bg-white focus:border-lightPrimary resize-y' rows={30} >
                                    </textarea>
                                </div>
                            </div>
                            {
                                loading ?
                                <div role="status" >
                                    <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                                :
                                <button className='btn-primary' type='submit'>Submit</button>
                            }
                        </form>
                    </div>
                    </div>
                </div>
            </section>
        </Suspense>
    </Layout>
  )
}
