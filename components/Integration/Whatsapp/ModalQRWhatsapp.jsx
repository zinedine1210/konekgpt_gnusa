import { MyContext } from '@/context/MyProvider'
import { baseDomain } from '@/repositories/Repository'
import WhatsappRepository from '@/repositories/WhatsappRepository'
import React, { useContext, useEffect, useState } from 'react'
import { HiX } from 'react-icons/hi'
import Swal from 'sweetalert2'


export default function ModalQRWhatsapp(props) {
  const context = useContext(MyContext)
  const [id, setId] = useState(props.defaultId)
  const [data, setData] = useState(null)
  const [connect, setConnect] = useState(false)

  useEffect(() => {
    async function getQRCode(valueId){
      const result = await WhatsappRepository.createSession({id:valueId, domain:baseDomain, isLegacy:false})
      if(result.success){
        setData(result.data)
      }else{
        if(result.message == "Session already exists, please use another id."){
          // setId(null)
          setData(null)
          Swal.fire({
            icon:"info",
            title:"Session already exist",
            text:"Please try again later"
          })
        }
      }
    }

    if(id){
      getQRCode(id)
    }

    const refetch = setInterval(() => {
      // setId(null)
      setData(null)
    }, 60000);

    return () => {
      clearInterval(refetch);
    };
  }, [id])


  useEffect(() => {
    const polling = setInterval(() => {
      if(data){
        checkStatus(id);
      }
    }, 2000);

    return () => {
      clearInterval(polling);
    };
  }, [data]);

  async function checkStatus(id) {
    try {
      const response = await WhatsappRepository.statusSession({id:id})
      // console.log(response);
      if(response.success && response.data.status == "authenticated"){
        setConnect(true)
        const getWhatsappList = JSON.parse(localStorage.getItem("whatsappList"))
        if(getWhatsappList){
          const getDetailWhatsappList = getWhatsappList.find(res => res.id == id)
          // getWhatsappList.forEach(val => {
          //   val.active = false
          // });
          if(getDetailWhatsappList){
            getWhatsappList.find(res => res.id == id)['active'] = true
          }else{
            getWhatsappList.push({id:id, active:true})
          }
          localStorage.setItem("whatsappList", JSON.stringify(getWhatsappList))
        }else{
          localStorage.setItem("whatsappList", JSON.stringify([{id:id, active:true}]))
        }
        setData(null)
        context.setData({...context, modal:null})
      }
    } catch (error) {
      console.error(error);
    }
  }


  const handlerClose = () => {
    context.setData({...context, modal:null})
    // fetchEventSource(`https://be1.whatsva.id/sessions/find/${id}`)
  }


  return (
    <div className="fixed w-full h-screen bg-black backdrop-blur-md bg-opacity-40 overflow-y-auto left-0 top-0 z-50 flex items-center justify-center">
      {
        connect ?
          <div id="wifi-loader">
              <svg class="circle-outer" viewBox="0 0 86 86">
                  <circle class="back" cx="43" cy="43" r="40"></circle>
                  <circle class="front" cx="43" cy="43" r="40"></circle>
                  <circle class="new" cx="43" cy="43" r="40"></circle>
              </svg>
              <svg class="circle-middle" viewBox="0 0 60 60">
                  <circle class="back" cx="30" cy="30" r="27"></circle>
                  <circle class="front" cx="30" cy="30" r="27"></circle>
              </svg>
              <svg class="circle-inner" viewBox="0 0 34 34">
                  <circle class="back" cx="17" cy="17" r="14"></circle>
                  <circle class="front" cx="17" cy="17" r="14"></circle>
              </svg>
              <div class="text" data-text="Connecting"></div>
          </div>
        :
        <div className="bg-white w-full md:w-1/4 mx-auto rounded-md p-5">
          <div className="flex items-center justify-between">
            <h1 className="font-bold">Whatsapp Integration</h1>
            <button onClick={() => handlerClose()}>
              <HiX />
            </button>
          </div>
          {
            id ?
              <div className='py-5'>
                {
                  data ?
                  <div className='text-center'>
                    <h1 className='text-xl font-bold text-zinc-600'>{id}</h1>
                    <img src={data.qr} alt="QR Image" className='mx-auto w-full h-auto' />
                    <p className='text-start text-xl font-bold mt-5'>Integration to Whatsapp by QR Code</p>
                    <ul className='text-sm list-inside list-disc text-start'>
                      <li>Open Whatsapp on your phone</li>
                      <li>Go to Settings - Linked Devices - Link Desktop Device</li>
                      <li>Point your phone at this screen to confirm login</li>
                    </ul>
                  </div>
                  :
                  <div className='bg-zinc-200 animate-pulse w-full h-96 mx-auto'>

                  </div>
                }
              </div>
            :
            <CreateSession setId={value => setId(value)}/>
          }
        </div>
      }
    </div>
  )
}


function CreateSession(props){
  const [data, setData] = useState(null)

  const handlerCreateSession = () => {
    const result = '62' + data
    props.setId(result)
  }

  return (
    <div>
      <div className='w-full relative my-5'>
        <span className='absolute block top-1/2 -translate-y-1/2 pl-3 text-sm text-zinc-500 font-bold'>+62</span>
        <input type="number" onChange={e => setData(e.target.value)} className='bg-zinc-50 text-sm py-2 pl-10 pr-5 outline-none border-2 hover:bg-zinc-100 focus:bg-white focus:border-lightPrimary w-full' placeholder='Type in 89508...' />
      </div>

      <button className='btn-primary' onClick={() => handlerCreateSession()}>Create Session</button>
    </div>
  )
}