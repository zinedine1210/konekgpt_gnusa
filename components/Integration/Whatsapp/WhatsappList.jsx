import { MyContext } from '@/context/MyProvider'
import React, { useContext, useEffect } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import ModalQRWhatsapp from './ModalQRWhatsapp'
import CardWhatsapp from './CardWhatsapp'
import ChannelRepository from '@/repositories/ChannelRepository'
import Image from 'next/image'
import { IoRefresh } from 'react-icons/io5'

export default function WhatsappList() {
    const context = useContext(MyContext)
    const data = localStorage.getItem("whatsappChannel") != "undefined" ? JSON.parse(localStorage.getItem("whatsappChannel")) : null

    const handlerCreateSession = async () => {
        context.setData({...context, modal:{name:"QRWhatsapp", id:null}})
    }

    const getAllChannel = async () => {
        const getxa = JSON.parse(localStorage.getItem("XA"))
        const result = await ChannelRepository.getAllChannel({xa:getxa}) 
        localStorage.setItem("whatsappChannel", JSON.stringify(result.data))
        context.setData({...context, channelWhatsapp:result.data})
    }

    useEffect(() => {
        if(!data){
            getAllChannel()
        }else{
            context.setData({...context, channelWhatsapp: JSON.parse(localStorage.getItem("whatsappChannel"))})
        }
    }, []);

  return (
    <>
    {
        context.modal ?
        context.modal.name == "QRWhatsapp" ?
            <ModalQRWhatsapp defaultId={context.modal.id} defaultStep={context.modal.step}/>
        :""
        :""
    }
        <div className='bg-green-100 dark:bg-green-700 w-full p-5 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                <FaWhatsapp className='text-green-500 dark:text-white text-3xl'/>
                <h1 className='text-xl font-bold'>Whatsapp</h1>
            </div>
            <button className='btn-primary' onClick={() => handlerCreateSession()}>
                Add Whatsapp
            </button>
        </div>

        <div className='py-10 w-full relative'>
            {
                data ?
                data.length > 0 ?
                <>
                    <div className='w-full xl:w-1/2 space-y-2 px-5'>
                        <button className='btn-secondary' onClick={() => getAllChannel()}>
                            <IoRefresh />
                            Refresh
                        </button>
                        {
                            data.map((item, key) => {
                                return <CardWhatsapp key={key} item={item} />
                            })
                        }
                    </div>
                </>
                
                :
                <div className='mx-auto w-full xl:w-1/4 text-center'>
                    <Image src={"/images/whatsapp.png"} width={512} className='w-1/2 mx-auto mb-10' height={512}/>
                    <h1>No Whatsapp Business Account Yet</h1>
                    <p className='text-zinc-500 text-sm'>Your integrated WhatsApp Business account list will appear here.</p>
                </div>
                :
                <div className='space-y-2 px-5'>
                    {
                        new Array(10).fill("mantap").map((item, key) => {
                            return (
                                <div className='w-full xl:w-1/2 h-16 bg-zinc-300 animate-pulse' key={key}>
                            </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    </>
  )
}
