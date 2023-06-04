import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsappList() {
  return (
    <>
        <div className='bg-green-100 w-full p-5 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                <FaWhatsapp className='text-green-500 text-3xl'/>
                <h1 className='text-xl font-bold'>Whatsapp</h1>
            </div>
            <button className='btn-primary'>
                Add Whatsapp
            </button>
        </div>

        <div className='py-10'>
            <div className='mx-auto w-full md:w-1/4 text-center'>
                <h1>Image here...</h1>
                <h1>No Whatsapp Business Account Yet</h1>
                <p className='text-zinc-500 text-sm'>Your integrated WhatsApp Business account list will appear here.</p>
            </div>
        </div>
    </>
  )
}
