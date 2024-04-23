import { MyContext } from '@/context/MyProvider'
import WhatsappRepository from '@/repositories/WhatsappRepository'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { HiOutlineArrowSmRight } from 'react-icons/hi'
import Swal from 'sweetalert2'

export default function EditorPersonal(props) {
    const [data, setData] = useState("")
    const [loading, setLoading] = useState(false)
    const context = useContext(MyContext)
    const [open, setOpen] = useState(false)
    const dropRef = useRef(null)

    useEffect(() => {
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

    const handlerChange = value => {
        setData(value)
    }

    const handlerSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        const detail = context.chatDetail
        let obj = {
            message: data,
            jid: detail.from
        }
        const result = await WhatsappRepository.sendMessage({
            id: detail.channelIdentity,
            data: obj
        })
        console.log(result);
        if(result.success){
            let getOneDataFromMe = JSON.parse(JSON.stringify(detail.messages.find(res => res.channel_identity == res.user_id)))
            if(!getOneDataFromMe){
                getOneDataFromMe = JSON.parse(JSON.stringify(detail.messages[0]))
            }
            getOneDataFromMe.msg = data
            detail.messages.push(getOneDataFromMe)
            context.setData({...context, chatDetail:detail})
            setData("")

            await waitForSomeTime()
            props.ScrollOnTop()
        }else{
            Swal.fire({
                icon:"error",
                title:"Something went wrong",
                text:"Please try again later"
            })
        }

        setLoading(false)
    }

    function waitForSomeTime() {
        return new Promise((resolve) => {
          setTimeout(resolve, 100); // Menunggu 3 detik
        });
    }

  return (
    <>
    
        <div className='flex items-center gap-2'>
            {/* <div ref={dropRef} className='relative'>
                <div className={`${open ? "visible opacity-100 translate-y-0":"invisible opacity-0 translate-y-5"} transition-all duration-300 translate-y-0 absolute bottom-full mb-5 w-full grid grid-cols-1 gap-3`}>
                    <button onClick={() => context.setData({...context, modal:{type:"personal", name:"modalsendimage"}})} className='w-full h-auto rounded-md flex items-center justify-center p-2 hover:bg-amber-200 bg-amber-100 shadow-lg'>
                        <IoImage className='text-amber-600 text-2xl'/>
                    </button>
                    <button onClick={() => context.setData({...context, modal:{type:"personal", name:"modalsenddocument"}})} className='w-full h-auto rounded-md flex items-center justify-center p-2 hover:bg-lime-200 bg-lime-100 shadow-lg'>
                        <IoDocument className='text-lime-600 text-2xl'/>
                    </button>
                    <button onClick={() => context.setData({...context, modal:{type:"personal", name:"modalsendvideo"}})} className='w-full h-auto rounded-md flex items-center justify-center p-2 hover:bg-cyan-200 bg-cyan-100 shadow-lg'>
                        <FaVideo className='text-cyan-600 text-2xl'/>
                    </button>
                    <button onClick={() => context.setData({...context, modal:{type:"personal", name:"modalsendcontact"}})} className='w-full h-auto rounded-md flex items-center justify-center p-2 hover:bg-rose-200 bg-rose-100 shadow-lg'>
                        <FaUser className='text-rose-600 text-2xl'/>
                    </button>
                    <button className='w-full h-auto rounded-md flex items-center justify-center p-2 hover:bg-indigo-200 bg-indigo-100 shadow-lg'>
                        <IoLocation className='text-indigo-600 text-2xl'/>
                    </button>
                </div>
                <button onClick={() => setOpen(true)} className='text-blue-500 bg-blue-100 hover:bg-blue-200 transition-colors duration-300 w-10 h-10 rounded-md flex items-center justify-center'>
                    <TfiClip className='font-bold text-2xl'/>
                </button>
            </div> */}
            <form onSubmit={(e) => handlerSubmit(e)} className="relative w-full">
                <input disabled={loading} id="inputQuestion" type="text" value={data} required autoFocus autoComplete='off' className="outline-none peer p-2 w-full text-sm border-2 border-blue-200 rounded-xl placeholder:text-zinc-500 pr-10 pl-5 bg-zinc-200 focus:bg-white transition-all duration-300" placeholder="Type here.." maxLength={2000} onChange={(e) => handlerChange(e.target.value)} />
                <button type="submit" className="absolute peer-focus:translate-x-0 -translate-x-5 opacity-0 peer-focus:opacity-100 hover:scale-125 transition-all duration-300 top-1/2 -translate-y-1/2 right-2 w-8 h-8 flex items-center justify-center peer-focus:visible invisible">
                    <HiOutlineArrowSmRight className="text-xl"/>
                </button>
            </form>
        </div>
        <h1 className="text-end text-zinc-500 text-xs p-1">{data ? data.length :"0"}/2000</h1>
    </>
  )
}
