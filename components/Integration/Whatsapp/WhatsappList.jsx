import { MyContext } from '@/context/MyProvider'
import WhatsappRepository from '@/repositories/WhatsappRepository'
import React, { useContext, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import ModalQRWhatsapp from './ModalQRWhatsapp'

export default function WhatsappList() {
    const context = useContext(MyContext)

    const handlerCreateSession = async () => {
        context.setData({...context, modal:"QRWhatsapp"})
        // const result = await WhatsappRepository.createSession({id:"mydevice1", isLegacy:false, panel_domain:"john"})
    }

  return (
    <>
    {
        context.modal ?
        context.modal == "QRWhatsapp" ?
            <ModalQRWhatsapp />
        :""
        :""
    }
        <div className='bg-green-100 w-full p-5 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                <FaWhatsapp className='text-green-500 text-3xl'/>
                <h1 className='text-xl font-bold'>Whatsapp</h1>
            </div>
            <button className='btn-primary' onClick={() => handlerCreateSession()}>
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
