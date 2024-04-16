import { MyContext } from "@/context/MyProvider"
import { useContext, useEffect, useRef, useState } from "react"
import { BsChevronLeft } from "react-icons/bs"
import { FaEllipsisV, FaWhatsapp } from "react-icons/fa"
import ModalCreateGroup from "../../ModalCreateGroup"
import KnowledgeRepository from "@/repositories/KnowledgeRepository"
import DetailChat from "./DetailChat"
import InfoPersonal from "./InfoPersonal"

export default function ChatLayout({ channelId }) {
    const context = useContext(MyContext)
    const dropRef = useRef(null)
    const [open, setOpen] = useState(false)

    const handleOutsideClick = (event) => {
        if (dropRef.current && !dropRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        if(!context.allChatList){
            getChatTry()
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [context.allChatList])

    const getChatTry = async () => {    
        const result = await KnowledgeRepository.getChatByKnowledge({
          id: channelId,
          xa: {
            XA: JSON.parse(localStorage.getItem("XA"))
          }
        })

        console.log(result.data.res)
        const getChannelData = JSON.parse(localStorage.getItem("whatsappChannel")).find(res => res.knowledge_id == channelId)
        const filterMyMessage = result.data.res.filter(res => res.channel_identity == getChannelData.identity).reverse()
        // kelola data
        let arr = []
        filterMyMessage.forEach((el) => {
            let obj = {
                from: el.user_id,
                unreadCount: 0,
                fromName: el.user_name,
                channelIdentity: el.channel_identity,
                messages: [el]
            }

            const getFromMe = el.user_id == el.channel_identity
            if(getFromMe){
                const find = arr.find(res => res.from == el.to_id)
                if(find){
                    find.messages.push(el)
                }else{
                    obj['from'] = el.to_id
                    obj['fromName'] = el.to_name
                    arr.push(obj)
                }
            }else{
                const find = arr.find(res => res.from == el.user_id)
                // jika sudah dimasukan ke array maka tidak usah masukan lagi
                if(find){
                    find.fromName = el.user_name
                    find.messages.push(el)
                }else{
                    arr.push(obj)
                }
            }
        });
        
        const getDraftChatList = JSON.parse(localStorage.getItem("draftChatList"))
        if(!getDraftChatList){
            localStorage.setItem("draftChatList", JSON.stringify(arr))
        }else{
            getDraftChatList.forEach((el) => {
                arr.forEach((el2, index2) => {
                    // cek jika terdapat pesan baru maka unreadcountnya ditambahkan
                    if(el.messages.length < el2.messages.length){
                        const difference = el2.messages.length - el.messages.length
                        arr[index2].unreadCount = difference
                        localStorage.setItem("draftChatList", JSON.stringify(arr))
                    }
                })
            })
        }
        context.setData((prev) => ({
            ...prev,
            allChatList: arr.reverse(),
            // jika sebelumnya sedang membuka halaman maka tidak perlu refresh lagi
            chatDetail: prev.chatDetail ? arr.reverse().find(res => res.channelIdentity == prev.chatDetail.channelIdentity) : null
        }))
    }

    const handlerDetailChat = async (value) => {
        value.unreadCount = 0
        context.setData({...context, chatDetail:value, detailContact:null, view: 3, modal:null})

        // saat membuka maka tidak ada lagi yang belum dibaca
        const getLocalDraftChatList = JSON.parse(localStorage.getItem("draftChatList"))
        let getfindOne = getLocalDraftChatList.find(res => res.channelIdentity == value.channelIdentity)
        getfindOne.unreadCount = 0

        const replaceChatlist = getLocalDraftChatList.filter(res => res.channelIdentity !== value.channelIdentity)
        replaceChatlist.push(getfindOne)
        // masukan kembali ke localstorage
        localStorage.setItem("draftChatList", JSON.stringify(replaceChatlist))
    }


  return (
    <div className="w-full bg-zinc-100 dark:bg-dark relative h-screen flex">
        {
            context.modal == "modalcreategroup" && (
                <ModalCreateGroup />
            )
        }
        <div className={`${context.view == 2 ? "fixed top-0 left-0 w-screen h-screen z-20":"hidden xl:block"} xl:z-0 xl:relative xl:w-1/4 bg-white dark:bg-darkPrimary`}>
            <div className='px-3 absolute top-0 bg-white dark:bg-darkPrimary left-0 w-full shadow-md z-20 pt-3'>
                <div className="flex items-center justify-between">
                    <button className="xl:hidden" onClick={() => context.setData({...context, view: 1})}>
                    <BsChevronLeft/>
                    </button>
                    <label className="block text-sm px-3 xl:text-xs text-zinc-500 uppercase dark:text-zinc-400">INBOX</label>
                    <div ref={dropRef} className="relative">
                        <button onClick={() => setOpen(true)}>
                            <FaEllipsisV className="text-zinc-500 text-sm"/>
                        </button>
                        <div className={`${open ? "":"hidden"} absolute top-full right-0 shadow-md rounded-md backdrop-blur-md w-44`}>
                            <button onClick={() => context.setData({...context, modal:"modalcreategroup"})} className="hover:bg-blue-100 px-3 py-2 text-sm w-full text-start">
                                Create Group
                            </button>
                            <button onClick={() => context.setData({...context, allChatList:null})} className="hover:bg-blue-100 px-3 py-2 text-sm w-full text-start">
                                Refresh Chat List
                            </button>
                        </div>
                    </div>
                </div>
                <input type="text" disabled={context.allChatList ? false:true} onChange={(e) => handlerKeyword(e.target.value)} name="" id="" className='input-search w-full my-2' placeholder='Search by Number or Last Message' />
            </div>
            <div className="max-h-screen overflow-auto absolute top-0 left-0 w-full pt-24 dark:bg-darkPrimary">
                {
                    context.allChatList ?
                    context.allChatList.length > 0 ?
                    context.allChatList.map((chatList, i) => {
                        return (
                            <button key={i} onClick={() => handlerDetailChat(chatList)} className="text-start w-full hover:bg-zinc-100 transition-all duration-300 border-b p-2 flex gap-2 cursor-pointer relative">
                                <span className="bg-zinc-200 dark:bg-dark w-8 h-8 rounded-full flex items-center justify-center">
                                    <FaWhatsapp className='text-green-500 font-bold text-xl'/>
                                </span>
                                <div>
                                    <h1 className="text-[15px] font-bold">{chatList.fromName == "" ? chatList.from : chatList.fromName}</h1>
                                    <p className='text-xs text-blue-500 font-bold mb-1'>Auth from {chatList.channelIdentity}</p>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-300">{chatList.messages[chatList.messages.length - 1].msg.length > 35 ? chatList.messages[chatList.messages.length - 1].msg.substring(0, 35) + "..." :chatList.messages[chatList.messages.length - 1].msg}</p>
                                </div>
                                {
                                    chatList.unreadCount ?
                                    <span className="rounded-full bg-green-500 w-5 text-sm font-bold flex items-center justify-center h-5 absolute bottom-2 right-2 text-white ">{chatList.unreadCount}</span>
                                    :""
                                }
                            </button>
                        )
                    })
                    :
                    // kalau datanya tidak ditemukan maka tampilan akan seperti ini:
                    <div className='px-3 py-2 text-center'>
                        <h1 className='text-red-500 uppercase text-sm py-2 font-bold'>Any chat not found</h1>
                    </div>
                    :
                    // efek loading
                    <div className='space-y-1'>
                        {
                            new Array(20).fill("loading").map((item, key) => {
                                return (
                                    <div key={key} className='py-10 animate-pulse bg-zinc-100 w-full'>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </div>
        {
            context.chatDetail && (
                <DetailChat />
            )
        }
        {
            context.detailContact ? 
            <div className={`xl:w-1/4 relative bg-white border border-l`}>
                {
                context.detailContact?.type == "personal" ? 
                    <InfoPersonal />
                :""
                }
            </div>
            :""
        }
        </div>
  )
}
