import { MyContext } from '@/context/MyProvider'
import WhatsappRepository from '@/repositories/WhatsappRepository'
import React, { useContext, useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import ModalQRWhatsapp from './ModalQRWhatsapp'
import CardWhatsapp from './CardWhatsapp'

export default function WhatsappList() {
    const context = useContext(MyContext)
    const [data, setData] = useState(null)

    const handlerCreateSession = async () => {
        context.setData({...context, modal:{name:"QRWhatsapp", id:null}})
    }


    useEffect(() => {
        const polling = setInterval(() => {
            const getDataWhatsappList = JSON.parse(localStorage.getItem("whatsappList"))
            setData(getDataWhatsappList ?? [])
        }, 1000);
    
        return () => {
          clearInterval(polling);
        };
    }, [context.modal]);

  return (
    <>
    {
        context.modal ?
        context.modal.name == "QRWhatsapp" ?
            <ModalQRWhatsapp defaultId={context.modal.id}/>
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

                {
                    data ?
                    data.length > 0 ?
                    <div className='w-full md:w-1/2 space-y-2 px-5'>
                        {
                            data.map((item, key) => {
                                return <CardWhatsapp key={key} item={item} />
                            })
                        }
                    </div>
                    :
                    <div className='mx-auto w-full md:w-1/4 text-center'>
                        <h1>Image here...</h1>
                        <h1>No Whatsapp Business Account Yet</h1>
                        <p className='text-zinc-500 text-sm'>Your integrated WhatsApp Business account list will appear here.</p>
                    </div>
                    :
                    <div className='space-y-2 px-5'>
                        {
                            new Array(10).fill("mantap").map((item, key) => {
                                return (
                                    <div className='w-full md:w-1/2 h-16 bg-zinc-300 animate-pulse' key={key}>
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
