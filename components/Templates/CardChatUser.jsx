import { MyContext } from "@/context/MyProvider"
import { getTimeAgo, getTimeDate } from "@/utils/script"
import { useContext } from "react"
import { HiDownload, HiPhoneMissedCall } from "react-icons/hi"

export default function CardChatUser({dataChat, index}){
    const context = useContext(MyContext)


   return (
        <div className="w-full">
            {index > 0 ? context.chatDetail[index - 1].data.key.fromMe != dataChat.data.key.fromMe ? 
                <h1 className="text-zinc-500 text-sm py-1">{dataChat.data.pushName ?? "+"+dataChat.data.key.remoteJid.split("@")[0]}</h1>
            :"" :""}

            <div className="space-y-2">
                {
                    dataChat.data?.messageStubType == "CALL_MISSED_VOICE" ?
                    <div className='w-fit bg-red-100 p-3 shadow-md rounded-md min-w-[80px] max-w-xl relative'>
                        <div className='flex items-center gap-2'>
                            <HiPhoneMissedCall className='text-xl text-red-500'/>
                            <h1 className='text-sm uppercase font-bold text-red-500'>Panggilan tak terjawab</h1>
                        </div>
                        <p className='text-red-500 text-xs mt-2'>{getTimeAgo(Number(dataChat.data?.messageTimestamp) * 1000)}</p>
                    </div>
                    :
                    <div className="w-fit bg-white pt-1.5 pb-6 px-1.5 shadow-md rounded-md min-w-[80px] max-w-xl relative">
                        {
                            dataChat.data.message?.conversation ?
                            <h1 className="text-xs md:text-sm">{dataChat.data.message.conversation}</h1>
                            :""
                        }
                        {
                            dataChat.data.message?.extendedTextMessage ?
                            <h1 className="text-xs md:text-sm">{dataChat.data.message.extendedTextMessage.text}</h1>
                            :""
                        }
                        {
                            dataChat.data.message?.imageMessage ? 
                            <div className='min-w-[300px] max-w-sm'>
                                <img src={dataChat.file_url} alt={dataChat.data.message.imageMessage?.caption ?? ""} className='mb-2' />
                                <h1 className="text-xs md:text-sm">{dataChat.data.message.imageMessage?.caption}</h1>
                            </div>
                            :""
                        }
                        {
                            dataChat.data.message?.protocolMessage ? 
                                <i className="italic text-sm text-zinc-500">Pesan ini dihapus</i>
                            :""
                        }
                        {
                            dataChat.data.message?.videoMessage ? 
                            <div className='min-w-[300px] max-w-sm'>
                                <video controls poster="path/to/poster-image.jpg" className='mb-2'>
                                    <source src={dataChat.file_url} type="video/mp4"/>
                                    {/* <source src="path/to/video.webm" type="video/webm"/> */}
                                    {/* asjkajs */}
                                </video>
                                <h1 className="text-xs md:text-sm">{dataChat.data.message.videoMessage?.caption}</h1>
                            </div>
                            :""
                        }
                        {
                            dataChat.data.message?.documentMessage ? 
                            <div className='min-w-[300px] max-w-sm relative'>
                                <div className='flex items-center gap-2'>
                                    <div className='w-10 h-10 flex items-center justify-center text-white bg-blue-500'>
                                        PDF
                                    </div>
                                    <div>
                                        <h1 className="text-xs md:text-sm">{dataChat.data.message.documentMessage?.title}</h1>
                                        <p className='text-zinc-500 text-sm'>{dataChat.data.message.documentMessage?.pageCount} Halaman</p>
                                    </div>
                                </div>
                                <button className='absolute top-1/2 -translate-y-1/2 right-2 border hover:bg-zinc-300 transition-all duration-300 border-zinc-300 rounded-full w-8 h-8 flex items-center justify-center'>
                                    <HiDownload className='text-zinc-500 font-bold text-lg'/>
                                </button>
                            </div>
                            :""
                        }
                        {
                            dataChat.data.message?.templateMessage ? 
                            <div className='min-w-[300px] max-w-sm'>
                                <img src={dataChat.file_url} alt={""} className='mb-2' />
                                <h1 className="text-xs md:text-sm">{dataChat.data.message.templateMessage.hydratedTemplate.imageMessage?.caption}</h1>
                            </div>
                            :""
                        }
                        <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500 flex items-center gap-2">
                            {getTimeDate(Number(dataChat.data?.messageTimestamp) * 1000)}
                        </span>
                    </div>
                }
            </div>
        </div>
   ) 
}