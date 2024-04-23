import ModalSendContact from '@/components/Templates/ModalSendContact';
import ModalSendDocument from '@/components/Templates/ModalSendDocument';
import ModalSendImage from '@/components/Templates/ModalSendImage';
import ModalSendVideo from '@/components/Templates/ModalSendVideo';
import { MyContext } from '@/context/MyProvider';
import { useContext, useEffect, useRef, useState } from 'react'
import ModalAddParticipants from '../../ModalAddParticipants';
import { HiDotsVertical } from 'react-icons/hi';
import SessionChat from './SessionChat';

export default function DetailChat({ getChatTry }) {
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

    const chatDetail = context.chatDetail;

  return (
    <div className={`w-full ${context.detailContact ? "xl:w-1/2":"xl:w-3/4"} bg-zinc-100 dark:bg-dark fixed xl:relative z-50 h-screen pt-16 pb-20 xl:pb-20`}>
        {
            context.modal && (
                <>
                    {
                        context.modal.name == "modalsendimage" && <ModalSendImage />
                    }
                    {
                        context.modal.name == "modalsendvideo" && <ModalSendVideo />
                    }
                    {
                        context.modal.name == "modalsenddocument" && <ModalSendDocument />
                    }
                    {
                        context.modal.name == "modalsendcontact" && <ModalSendContact />
                    }
                    {
                        context.modal.name == "modaladdparticipants" && <ModalAddParticipants />
                    }
                </>
            )
        }
        <div className='absolute top-0 left-0 w-full px-5 pb-2 backdrop-blur-lg z-20 pt-3 border-b shadow-md flex items-center justify-between'>
            <div className='cursor-pointer flex items-center gap-2'>
                <div className='flex items-center justify-center w-10 h-10 rounded-full text-white bg-zinc-500 uppercase font-bold'>
                    {chatDetail?.fromName.charAt(0) ?? "A"}
                </div>
                <div>
                    <h1 className='font-bold'>{chatDetail.fromName == "" ? chatDetail.from : chatDetail.fromName}</h1>
                    <p className='text-xs font-light text-green-500'>Active</p>
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <div ref={dropRef} className='relative'>
                    <button className='w-10 h-10 rounded-full hover:bg-blue-100 transition-colors duration-300 flex items-center justify-center' onClick={() => setOpen(true)}>
                        <HiDotsVertical />
                    </button>

                    <div className={`${open ? "":"hidden"} absolute top-full right-0 shadow-md rounded-md bg-white w-44`}>
                        <button onClick={() => context.setData({...context, detailContact:{type:context.infoChat?.type ?? "personal", data:context.chatDetail}})} className="hover:bg-blue-100 px-3 py-2 text-sm w-full text-start">
                            Info Contact
                        </button>
                        <button onClick={() => getChatTry()} className="hover:bg-blue-100 px-3 py-2 text-sm w-full text-start">
                            Refresh Chat
                        </button>
                        <button onClick={() => context.setData({...context, view:2, chatDetail:null, detailContact:null})} className="hover:bg-blue-100 px-3 py-2 text-sm w-full text-start">
                            Tutup Chat
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <SessionChat />
    </div>
  )
}
