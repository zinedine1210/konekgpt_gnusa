import Layout from '@/components/Layouts/Layout'
import KnowledgeRepository from '@/repositories/KnowledgeRepository'
import Link from 'next/link'
import React, { Suspense, useState } from 'react'
import { FaChevronLeft } from 'react-icons/fa'

export default function WebsiteKnowledge() {
    const [data, setData] = useState({
        "type_training": 2,
        "name": "",
        "url": ""
    })
    const handlerSubmit = async (e) => {
        e.preventDefault()
        console.log(data);
        const result = await KnowledgeRepository.insertKnowledge({xa:{xa:JSON.parse(localStorage.getItem("XA"))}, data:data})
        console.log(result);
    }
  return (
    <Layout title={"Create From Blink Scratch"} desc={"Halaman untuk membuat word"}>
        <Suspense fallback={"Loading"}>
            <section className="w-full bg-zinc-100 relative h-screen flex">
                <div className="w-full relative h-screen pt-16 overflow-y-auto">
                    <div className='mx-0 md:mx-2'>
                    <div className='bg-white rounded-md shadow-md p-3 md:p-5'>
                        <label className="text-zinc-500 text-base md:text-xl uppercase dark:text-zinc-400 font-semibold">Create Knowledge base from Website</label>
                        <div className="flex items-center gap-2 pt-1 pb-3">
                            <Link href={"/usr/knowledge"}>
                                <h1 className="text-sm dark:text-zinc-400 flex items-center gap-1 text-blue-500">
                                    <FaChevronLeft />
                                    Back
                                </h1>
                            </Link>
                            /
                            <h1 className="text-sm">Build From Website</h1>
                        </div>

                        <form onSubmit={e => handlerSubmit(e)} className='my-5 space-y-5 w-1/2'>
                            <div>
                                <label htmlFor='namewebsite' className='font-bold inline-block mb-2'>Name <span className='text-red-500'>*</span></label>
                                <input onChange={(e) => setData({...data, name:e.target.value})} value={data.name} id='namewebsite' type="text" className="w-full block bg-zinc-50 text-sm py-2 px-5 outline-none border-2 hover:bg-zinc-100 focus:bg-white focus:border-lightPrimary" placeholder='Give a name to your new data source' />
                            </div>
                            <div>
                                <label htmlFor='urlwebsite' className='font-bold inline-block mb-2'>Url <span className='text-red-500'>*</span></label>
                                <input onChange={(e) => setData({...data, url:e.target.value})} value={data.url} id='urlwebsite' type="url" className="w-full block bg-zinc-50 text-sm py-2 px-5 outline-none border-2 hover:bg-zinc-100 focus:bg-white focus:border-lightPrimary" placeholder='Type in https://...' />
                            </div>
                            <button className='btn-primary'>Submit</button>
                        </form>
                    </div>
                    </div>
                </div>
            </section>
        </Suspense>
    </Layout>
  )
}
