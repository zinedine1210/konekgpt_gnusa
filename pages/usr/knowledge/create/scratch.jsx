import Layout from '@/components/Layouts/Layout'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { FaChevronLeft } from 'react-icons/fa'

export default function BlinkScratch() {
  return (
    <Layout title={"Create From Blink Scratch"} desc={"Halaman untuk membuat word"}>
        <Suspense fallback={"Loading"}>
            <section className="w-full bg-zinc-100 relative h-screen flex">
                <div className="w-full relative h-screen pt-16 overflow-y-auto">
                    <div className='mx-0 md:mx-2'>
                    <div className='bg-white rounded-md shadow-md p-3 md:p-5'>
                        <label className="text-zinc-500 text-base md:text-xl uppercase dark:text-zinc-400 font-semibold">Create Knowledge base from scratch</label>
                        <div className="flex items-center gap-2 pt-1 pb-3">
                            <Link href={"/usr/knowledge"}>
                                <h1 className="text-sm dark:text-zinc-400 flex items-center gap-1 text-blue-500">
                                    <FaChevronLeft />
                                    Back
                                </h1>
                            </Link>
                            /
                            <h1 className="text-sm">Build From Scratch</h1>
                        </div>

                        <div className='my-5 space-y-5'>
                            <div>
                                <label htmlFor='nameofscratch' className='font-bold inline-block mb-2'>Name <span className='text-red-500'>*</span></label>
                                <input id='nameofscratch' type="text" className="w-full block bg-zinc-50 text-sm py-2 px-5 outline-none border-2 hover:bg-zinc-100 focus:bg-white focus:border-lightPrimary" placeholder='Give a name to your new data source' />
                            </div>

                            <div>
                                <label htmlFor="textareaofscratch" className='font-bold inline-block'>The content you want to add</label>
                                <p className='text-zinc-500 font-light text-sm mb-2'>This text will be added to the knowledge of your Chatbot. Carefully add relevant content.</p>

                                <div className='relative'>
                                    <span className='absolute inline-block right-2 top-2 text-opacity-75 text-xs font-light text-zinc-500'><span className='font-bold text-base'>1</span>/1000</span>
                                    <textarea name="description" id="textareaofscratch" className='block w-full bg-zinc-50 text-sm py-2 px-2 md:px-5 outline-none border-2 hover:bg-zinc-100 focus:bg-white focus:border-lightPrimary resize-y' rows={30} >
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </Suspense>
    </Layout>
  )
}
