import { MyContext } from "@/context/MyProvider";
import { getTimeDate } from "@/utils/script";
import { useContext } from "react";
import { HiCheck, HiDownload } from "react-icons/hi";

export default function CardChatFromMe({dataChat, index}){
    const context = useContext(MyContext)
    return (
        <div className="ml-auto w-full">
            {index > 0 ? context.chatDetail[index - 1].data.key.fromMe != dataChat.data.key.fromMe ? 
            <h1 className="text-end text-zinc-500 text-sm py-1">You</h1>
            :"" :""}
            <div className="w-fit backdrop-blur-2xl pt-1.5 pb-6 px-1.5 shadow-md rounded-md max-w-xl min-w-[80px] ml-auto relative">
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
                    dataChat.data.messageStubType == "CALL_MISSED_VOICE" ?
                    <div className='bg-red-100 rounded-md w-fit p-3'>
                        Panggilan tidak terjawab
                    </div>
                    :""
                }
                {
                    dataChat.data.message?.imageMessage ? 
                    <div className='min-w-[300px] max-w-sm'>
                        <img src={dataChat.file_url} alt="" className='mb-2' />
                        <h1 className="text-xs md:text-sm">{dataChat.data.message.imageMessage?.caption}</h1>
                    </div>
                    :""
                }
                {
                    dataChat.data.message?.protocolMessage ? 
                        <i className="italic text-sm text-zinc-500">Anda menghapus pesan ini</i>
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
                            <div className='w-10 h-10 flex items-center justify-center text-white bg-blue-500 uppercase text-sm'>
                                {dataChat.data.message.documentMessage?.mimetype.split("/")[1]}
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
                    <div className={` flex items-center ${dataChat.data?.status == "READ" ? "text-blue-500":""}`}>
                        <HiCheck className={`text-base -mr-2.5`}/>
                        <HiCheck className='text-base'/>
                    </div>
                </span>
            </div>
        </div>
    )
}