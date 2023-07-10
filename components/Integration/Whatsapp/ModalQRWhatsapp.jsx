import { MyContext } from '@/context/MyProvider'
import { baseDomain } from '@/repositories/Repository'
import WhatsappRepository from '@/repositories/WhatsappRepository'
import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { HiX } from 'react-icons/hi'
import Swal from 'sweetalert2'


export default function ModalQRWhatsapp(props) {
  const context = useContext(MyContext)
  const [step, setStep] = useState(props.defaultStep ?? 1)
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
          if(!props.defaultStep){
            setStep(1)
            Swal.fire({
              icon:"info",
              title:"Session already exist",
              text:"Please try again later"
            })
          }
        }
      }
    }

    if(id && !data){
      getQRCode(id)
    }

    const refetch = setInterval(() => {
      // setId(null)
      setData(null)
    }, 60000);

    return () => {
      clearInterval(refetch);
    };
  }, [id, data])


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
            step == 2 ?
              <div className='py-5'>
                {
                  data ?
                  <div className='text-center'>
                    <h1 className='text-xl font-bold text-zinc-600'>{"+"+id}</h1>
                    {/* <button className='text-center text-blue-500 text-sm font-light'>Change Number</button> */}
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
            <CreateSession setStep={value => setStep(value)} setId={value => setId(value)}/>
          }
        </div>
      }
    </div>
  )
}


function CreateSession(props){
  const [data, setData] = useState(null)
  const [dial, setDial] = useState(null)
  const [open, setOpen] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [choose, setChoose] = useState({name:"Indonesia", dial_code:"+62"})
  const dropRef = useRef(null)
  const [datatimeout, setDatatimeout] = useState(null)

  useEffect(() => {
    axios.get("/dial.json").then(res => {
      console.log(res);
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

  const handlerCreateSession = () => {
    if(data && choose){
      const result = choose.dial_code.split("+")[1] + data
      props.setId(result)
      props.setStep(2)
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
    <form>
      <div className='w-full relative my-5'>
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

        <input type="number" onChange={e => setData(e.target.value)} maxLength={12} className='bg-zinc-50 text-sm py-2 pl-16 pr-5 outline-none border-2 hover:bg-zinc-100 focus:bg-white focus:border-lightPrimary w-full' placeholder='Type in 89508...' />
      </div>

      <button className='btn-primary' onClick={() => handlerCreateSession()}>Create Session</button>
    </form>
  )
}