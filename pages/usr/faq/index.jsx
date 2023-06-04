import TableFAQ from '@/components/FAQ/TableFAQ'
import Layout from '@/components/Layouts/Layout'
import React, { Suspense } from 'react'
import { BsPlusCircleDotted } from 'react-icons/bs'

export default function FAQ() {
  return (
    <Layout title="HOME" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <section className="w-full bg-zinc-100 relative h-screen flex">
          <div className="w-full relative h-screen pt-16 overflow-y-auto">
            <div className='mx-0 md:mx-2'>
              <div className='bg-white rounded-md shadow-md p-3 md:p-5'>
                <label className="text-zinc-500 text-sm uppercase dark:text-zinc-400">frequently asked questions</label>

                <div className='my-5'>
                  <TableFAQ />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Suspense>
    </Layout>
  )
}
