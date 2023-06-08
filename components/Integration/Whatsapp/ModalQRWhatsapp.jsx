import { MyContext } from '@/context/MyProvider'
import WhatsappRepository from '@/repositories/WhatsappRepository'
import { generateRandomId } from '@/utils/script'
import { EventStreamContentType, fetchEventSource } from '@microsoft/fetch-event-source'
import React, { useContext, useEffect, useState } from 'react'
import { HiX } from 'react-icons/hi'

class RetriableError extends Error { }
class FatalError extends Error { }


export default function ModalQRWhatsapp() {
  const context = useContext(MyContext)
  const [id, setId] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    async function getQRCode(valueId){
      const result = await WhatsappRepository.createSession({id:valueId, panel_domain:"http://localhost:3000", isLegacy:false})
      if(result.success){
        result.data.id = valueId
        setData(result.data)
      }else{
        if(result.message == "Session already exists, please use another id."){
          setId(null)
          setData(null)
        }
      }
    }

    if(!id){
      const idRandom = `${generateRandomId(20)}`
      setId(idRandom)
      getQRCode(idRandom)
    }
  }, [id])

  const ctrl = new AbortController();
  
  useEffect(() => {
    const eventSource = new EventSource(`https://be1.whatsva.id/sessions/find/${id}`);

    eventSource.addEventListener('message', (event) => {
      // const data = JSON.parse(event.data);
      // setIsScanned(data.isScanned);
      console.log(event);
    });

    eventSource.addEventListener('error', (event) => {
      console.error('Terjadi kesalahan koneksi:', event);
    });
    
    // Event listener untuk menangani penutupan koneksi
    eventSource.addEventListener('close', () => {
      console.log('Koneksi EventSource ditutup');
    });

    return () => {
      eventSource.close();
    };

    // function getFindSession(){
    //   // fetchEventSource(`https://be1.whatsva.id/sessions/find/${id}`, {
    //   //   // method:"GET",
    //   //   // headers: {
    //   //   //   'Content-Type': 'text/event-stream',
    //   //   // },
    //   //   signal: ctrl.signal,
    //   //   async onopen(response) {
    //   //       if (response.ok) {
    //   //         // console.log('berhasil')
    //   //         response.json().then(res => {
    //   //           console.log(id, res);
    
    //   //         })
    //   //         return; // everything's good
    //   //       } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
    //   //         // client-side errors are usually non-retriable:
    //   //         throw new FatalError();
    //   //       } else {
    //   //         throw new RetriableError();
    //   //       }
    //   //   },
    //   //   onmessage(msg) {
    //   //     // if the server emits an error message, throw an exception
    //   //     // so it gets handled by the onerror callback below:
    //   //     console.log("onmessage",msg)
    //   //     if (msg.event === 'FatalError') {
    //   //         throw new FatalError(msg.data);
    //   //     }
    //   //   },
    //   //   onclose() {
    //   //     // if the server closes the connection unexpectedly, retry:
    //   //     throw new RetriableError();
    //   //   },
    //   //   onerror(err) {
    //   //     if (err instanceof FatalError) {
    //   //         throw err; // rethrow to stop the operation
    //   //     } else {
    //   //         // do nothing to automatically retry. You can also
    //   //         // return a specific retry interval here.
    //   //     }
    //   //   }
    //   // });
    // }

    // if(id){
    //   getFindSession()
    // }
  }, [id]);


  const handlerClose = () => {
    context.setData({...context, modal:null})
    // fetchEventSource(`https://be1.whatsva.id/sessions/find/${id}`)
  }



  return (
    <div className="fixed w-full h-screen bg-black bg-opacity-40 overflow-y-auto left-0 top-0 z-50 flex items-center justify-center">
        <div className="bg-white w-full md:w-1/4 mx-auto rounded-md p-5">
          <div className="flex items-center justify-between">
            <h1 className="font-bold">QR Scan</h1>
            <button onClick={() => handlerClose()}>
              <HiX />
            </button>
          </div>
          <div className='py-5'>
            {
              data ?
                <img src={data.qr} alt="QR Image" className='mx-auto' />
              :"Loading"
            }
            {/* <input type="text" onChange={(e) => setUrl(e.target.value)} className='input-search block w-full' />
            <button onClick={() => handlerFindSession()}>Send</button> */}
          </div>
        </div>
    </div>
  )
}
