import SelectNumberWhatsapp from '@/components/CheckNumber/SelectNumberWhatsapp'
import Layout from '@/components/Layouts/Layout'
import { MyContext } from '@/context/MyProvider'
import ChannelRepository from '@/repositories/ChannelRepository'
import WhatsappRepository from '@/repositories/WhatsappRepository'
import axios from 'axios'
import React, { Suspense, useContext, useEffect, useRef, useState } from 'react'
import { BsCheck, BsInfo, BsWhatsapp } from 'react-icons/bs'
import Swal from 'sweetalert2'

export default function HalamanCheckNumber() {
  const context = useContext(MyContext)
  const [number, setNumber] = useState([])
  const [check, setCheck] = useState("")
  const { addContext, removeContext } = context
  const [loading, setLoading] = useState(false)
  const dropRef = useRef(null)
  const [choose, setChoose] = useState({name:"Indonesia", dial_code:"+62"})
  const [open, setOpen] = useState(false)
  const [dial, setDial] = useState(null)
  const [keyword, setKeyword] = useState("")

  useEffect(() => {
    axios.get("/dial.json").then(res => {
      setDial(res.data)
    })


    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event) => {
      if (dropRef.current && !dropRef.current.contains(event.target)) {
          setOpen(false);
      }
  };

  const getAllChannel = async () => {
    const getxa = JSON.parse(localStorage.getItem("XA"))
    const result = await ChannelRepository.getAllChannel({xa:getxa})
    console.log("allchannel", result);
    localStorage.setItem("whatsappChannel", JSON.stringify(result.data))
    context.setData({...context, channelWhatsapp:result.data})
  }

  useEffect(() => {
    if(!context.channelWhatsapp){
      const getLocal = JSON.parse(localStorage?.getItem("whatsappChannel") ?? JSON.stringify([{}]))
      if(getLocal){
        context.setData({...context, channelWhatsapp:getLocal})
      }else{
        getAllChannel()
      }
    }
  }, [])

  const handlerSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const groupNumber = `${choose.dial_code}${check}`

    let obj = {
      instance_key: number[0][0]?.identity,
      jid: groupNumber
    }
    const result = await WhatsappRepository.checkNumber({data:obj})

    if(result?.success){
      if(context?.historyCheckNumber){
        context.historyCheckNumber.push(obj)
        addContext("historyCheckNumber", context.historyCheckNumber)
      }else{
        addContext("historyCheckNumber", [obj])
      }
      Swal.fire({
        icon:"success",
        title:`${result.message}`
      })
      setLoading(false)
    }else{
      Swal.fire({
        icon:"error",
        title:`${result.message}`
      })
      setLoading(false)
    }
  }


  const handlerSearch = (value) => {
    setChoose({dial_code:value})
    setKeyword(value)
  }

  const handlerChoose = (item) => {
    setChoose(item)
    setOpen(false)
  }


  return (
    <Layout title={"Check Number"}>
      <Suspense fallback={"Loading"}>
        <div className="px-5 xl:px-10 pt-20">
          <label className="text-sm font-bold text-zinc-600 uppercase dark:text-zinc-400">Check User Number</label>
          <p className="text-sm text-zinc-500 font-light">You can check the number whether you have whatsapp or not.</p>
          <form onSubmit={e => handlerSubmit(e)} className='bg-white mt-5 rounded-md shadow-md p-5'>
            <p className='mb-5 flex items-center gap-3 text-sm'>
              <BsInfo className='text-blue-500 font-bold text-3xl'/>
              You must actively integrate one of the whatsapp numbers.
            </p>
            <div className='flex items-center justify-between'>
              <div className='flex items-end gap-5'>
                <SelectNumberWhatsapp setNumber={setNumber}/>
                {number.length > 0 && number?.[0]?.length > 0 && (
                  <div className='w-full relative'>
                    <div ref={dropRef} className='absolute block top-1/2 -translate-y-1/2 pl-3 text-sm text-zinc-500 font-bold'>
                      <input type="text" placeholder='+---' className='outline-none inline-block bg-inherit w-12' value={choose.dial_code} onChange={(e) => handlerSearch(e.target.value)} onFocus={() => setOpen(true)} />
                      <div className={`${open ? "":"hidden"} bg-white shadow-md top-full absolute left-0 w-fit max-h-80 overflow-auto mt-2 z-20`}>
                        {
                          dial ?
                          dial.filter(res => {
                            if(res?.dial_code != null){
                              if(keyword != ""){
                                if(res.dial_code.includes(keyword)){
                                  return res
                                }
                              }else{
                                return res
                              }
                            }
                          }).map((item, key) => {
                            return (
                              <button type='button' onClick={() => handlerChoose(item)} key={key} className='w-full py-2 px-4 hover:bg-blue-100 text-start'>
                                <h1 className='font-bold text-black'>{item.name}</h1>
                                <p className='text-zinc-500 text-sm font-normal'>{item.dial_code}</p>
                              </button>
                            )
                          })
                          :""
                        }
                      </div>
                    </div>
          
                    <input type="number" onChange={e => setCheck(e.target.value)} value={check} maxLength={12} className='bg-zinc-50 text-sm py-2 pl-16 pr-5 outline-none border-2 hover:bg-zinc-100 focus:bg-white focus:border-lightPrimary w-full' placeholder='Type in 89508...' />
                  </div>
                )}
              </div>

              <button type='submit' disabled={loading} className='btn-primary'><BsCheck className='text-xl'/> Check</button>
            </div>
          </form>

          <div className='mt-5'>
            <h1 className='font-semibold'>Your history</h1>
            <div className='grid grid-cols-4 xl:grid-cols-5 mt-5'>
              {
                context?.historyCheckNumber && context?.historyCheckNumber.length > 0 ? context.historyCheckNumber.map((item, key) => {
                  return (
                    <div key={key} className='bg-white rounded-md shadow-md p-3'>
                      <h1 className='font-mono text-xl'>{item.jid}</h1>
                      <button className='btn-primary ml-auto mt-5'><BsWhatsapp /> Chat Now</button>
                    </div>
                  )
                })
                :
                <p className='text-red-500 font-bold'>Not Available Data</p>
              }
            </div>
          </div>
        </div>
      </Suspense>
    </Layout>
  )
}
