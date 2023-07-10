import { MyContext } from "@/context/MyProvider";
import WhatsappRepository from "@/repositories/WhatsappRepository";
import { useContext, useEffect, useRef, useState } from "react";
import { HiDotsVertical, HiX } from "react-icons/hi";
import CardParticipant from "./CardParticipant";
import { FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import { TfiClip } from "react-icons/tfi";
import Swal from "sweetalert2";

export default function InfoGroup() {
    const context = useContext(MyContext)
    const [keyword, setKeyword] = useState("")
    const data = context.detailContact
    const [info, setInfo] = useState(null)

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
    

    useEffect(() => {
        async function getAllDetail(){
            const result = await WhatsappRepository.infoDetailGroup({id:data.data.parentId, data:{instance_key:data.data.parentId, jid:data.data.id}})
            if(result.success){
                setInfo(result.message.data)
                context.detailContact['infoGroup'] = result.message.data
            }
        }

        if(!info){
            getAllDetail()
        }
    }, [info])

    const handlerLeaveGroup = async () => {
        const result = await WhatsappRepository.leaveGroup({id:data.data.parentId, data:{instance_key:data.data.parentId, jid:data.data.id}})
        console.log(result);
        if(result.data.success){
            const filteringDelete = context.allChatList.filter(res => res.id != data.data.id)
            context.setData({...context, allChatList:filteringDelete, detailContact:null, infoChat:null, chatDetail:null})
            Swal.fire({
                icon:"info",
                title:"Leave Group"
            })
        }
    }

    if(context.detailContact.hasOwnProperty("infoGroup")){
        return (
          <div className="pt-16 absolute top-0 left-0 w-full h-screen overflow-auto">
              <div className="flex items-center justify-between gap-5 px-3 pb-2 shadow-md">
                <div className="flex items-center gap-5">
                  <button onClick={() => context.setData({...context, detailContact:null})}>
                      <HiX />
                  </button>
                  <h1 className="text-black">Info Group</h1>
                </div>
                <div ref={dropRef} className="relative">
                    <button onClick={() => setOpen(true)}>
                        <HiDotsVertical />
                    </button>
                    <div className={`${open ? "":"hidden"} absolute top-full right-0 shadow-md rounded-md backdrop-blur-md w-44`}>
                        <button className="hover:bg-blue-100 px-3 py-2 text-sm w-full text-start">
                            Edit Group
                        </button>
                        <button onClick={() => handlerLeaveGroup()} className="hover:bg-red-100 text-red-500 px-3 py-2 text-sm w-full text-start">
                            Leave Group
                        </button>
                    </div>
                </div>
              </div>
              <div className="">
                    <div className="px-3 text-center py-5">
                        <div className="flex items-center justify-center w-32 h-32 rounded-full mx-auto bg-blue-100 text-blue-500 text-5xl font-bold uppercase">
                            {context.detailContact.infoGroup.subject.charAt(0)}
                        </div>
                        <h1 className="mt-2 text-zinc-600 font-bold">{context.detailContact.infoGroup.subject}</h1>
                        <p className="text-sm text-zinc-500">Group - {context.detailContact.infoGroup.participants.length} participants</p>
                    </div>
                    <div className="border-t py-2 px-3">
                        <h1 className="text-sm text-zinc-500">Shared Documents</h1>
                        <div className="grid grid-cols-4 gap-2 mt-2">
                            <div className="bg-zinc-500 w-full h-10 rounded-md"></div>
                            <div className="bg-zinc-500 w-full h-10 rounded-md"></div>
                            <div className="bg-zinc-500 w-full h-10 rounded-md"></div>
                            <div className="bg-zinc-500 w-full h-10 rounded-md"></div>
                            <div className="bg-zinc-500 w-full h-10 rounded-md"></div>
                            <div className="bg-zinc-500 w-full h-10 rounded-md"></div>
                            <div className="bg-zinc-500 w-full h-10 rounded-md"></div>
                        </div>
                    </div>
                    <div className="border-t py-2">
                        <h1 className="text-sm text-zinc-500 px-3"><span className="font-bold ">{context.detailContact.infoGroup.participants.length}</span> Participants</h1>
                        <input type="text" className="outline-none border mt-1 mx-3 px-2 py-1 text-xs placeholder:text-xs" placeholder="Search by number" onChange={(e) => setKeyword(e.target.value)} />
                        <div className="mt-2 max-h-96 overflow-auto">
                                <button onClick={() => context.setData({...context, modal:{name:"modaladdparticipants"}})} className="text-start w-full hover:bg-zinc-100 transition-colors duration-300 ease-in-out py-2 border-b flex items-center gap-2 px-3">
                                    <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center">
                                        <FaUserPlus className="text-sm text-green-500"/>
                                    </div>
                                    <h1 className="text-sm text-zinc-600">Add Participants</h1>
                                </button>
                                <button className="text-start w-full hover:bg-zinc-100 transition-colors duration-300 ease-in-out py-2 border-b flex items-center gap-2 px-3">
                                    <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center">
                                        <TfiClip className="font-bold text-green-500"/>
                                    </div>
                                    <h1 className="text-sm text-zinc-600">Invite to group via link</h1>
                                </button>
                            {
                                context.detailContact.infoGroup.participants.filter(datares => {
                                    if(keyword == ""){
                                        return true
                                    }else{
                                        if(keyword && datares.id.includes(keyword.toLowerCase())){
                                            return true
                                        }
                                    }
                                    return false
                                }).map((item, key) => {
                                    return (
                                        <CardParticipant item={item} key={key}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <button onClick={() => handlerLeaveGroup()} className="py-4 transition-colors duration-300 hover:bg-red-100 px-3 flex items-center gap-3 text-red-500 border-b w-full text-start text-sm">
                        <FaSignOutAlt className="text-xl" />
                        Leave Group
                    </button>
              </div>
          </div>
        )
    }else{
        return (
            <div className="border border-red-500">
                Loading
            </div>
        )
    }
}
