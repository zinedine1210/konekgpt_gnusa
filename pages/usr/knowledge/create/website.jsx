import Layout from '@/components/Layouts/Layout'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { FaChevronLeft } from 'react-icons/fa'

export default function WebsiteKnowledge() {
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

                        <div className='my-5'>
                            
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </Suspense>
    </Layout>
  )
}
