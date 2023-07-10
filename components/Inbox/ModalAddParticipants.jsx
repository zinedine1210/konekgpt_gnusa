import { MyContext } from "@/context/MyProvider";
import WhatsappRepository from "@/repositories/WhatsappRepository";
import { useContext, useEffect, useRef, useState } from "react";
import { HiX } from "react-icons/hi";
import SelectAuth from "./SelectAuth";
import Swal from "sweetalert2";

export default function ModalAddParticipants() {
    const context = useContext(MyContext)
    const [keyword, setKeyword] = useState("")
    const [member, setMember] = useState([])
    const [a, setA] = useState(false)

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

    const handlerKeyword = (e, value) => {
        if(e.key == "Enter"){
            e.preventDefault()
            member.push(value)
            setMember(member)
            setA(!a)
            return false
        }

        setKeyword(value)
    }

    const handlerChooseNumber = (item) => {
        member.push(item.number)
        setMember(member)
        setA(!a)
    }

    
    const handlerDelete = (e, value) => {
        console.log(e.key);
        if(e.key == "Delete"){
            const newData = member.filter(res => {
                return res != value
            })
            setMember(newData)
        }
    }
    
    const handlerSubmit = async e => {
        e.preventDefault()
        if(member.length > 0){
            let obj = {
                "instance_key":context.infoChat.parentId,
                "jid": context.infoChat.id,
                "participants": member
            }
            const result = await WhatsappRepository.addParticipants({id:obj['instance_key'], data:obj})
            console.log(result);
            if(result.success){
                member.forEach((value) => {
                    context.detailContact.infoGroup.participants.push({id:value, admin:null})
                })
                context.setData({...context, detailContact:context.detailContact, modal:null})
                
                Swal.fire({
                    icon:"success",
                    title:`New member into the group was successful`
                })

            }else{
                Swal.fire({
                    icon:"error",
                    title:"Something went wrong",
                    text:"Please try again later"
                })
            }
        }
    }


  return (
    <div className="absolute w-full h-screen bg-black backdrop-blur-sm bg-opacity-40 overflow-y-auto left-0 top-0 z-30 flex items-center justify-center">
        <div className="bg-white w-full md:w-1/3 mx-auto rounded-md p-5">
            <div className="flex items-center justify-between">
                <h1 className="font-bold">Add Participants</h1>
                <button onClick={() => context.setData({...context, modal:null})}>
                <HiX />
                </button>
            </div>
            <form onSubmit={(e) => handlerSubmit(e)} className="w-full relative mt-5 space-y-4">
                <div className="">
                    <div className="input-search flex items-center gap-2 flex-wrap">
                        {
                            member.length > 0 && (
                                member.map((item, key) => {
                                    return (
                                        <button key={key} onKeyDown={(e) => handlerDelete(e, item)} className="focus:from-red-200 focus:to-red-50 focus:text-red-500 flex items-center justify-center bg-gradient-to-tr from-blue-200 font-bold to-blue-50 text-xs py-1 px-2 rounded-full text-blue-500">{item.split("@")[0]}</button>
                                    )
                                })
                            )
                        }
                        
                        <div ref={dropRef} className="relative">
                            <p role={"textbox"} className="editable-text" onFocus={() => setOpen(true)} spellCheck="false" maxLength={10} autoFocus={true} contentEditable data-placeholder={"Type Number"} onKeyDown={(e) => handlerKeyword(e, e.target.innerHTML)}></p>

                            <div className={`${open ? "":"hidden"} bg-white shadow-md rounded-b-md w-56 py-1 absolute top-full left-0 max-h-56 overflow-y-auto mt-1`}>
                                {
                                    context.allContact.filter(res => {
                                        const findmember = context.detailContact.infoGroup.participants.find(info => info.id == res.number)
                                        const find = member.find(mem => {
                                            return mem == res.number
                                        })

                                        if(find || findmember){
                                            return false
                                        }

                                        if(keyword != ""){
                                            if(res.number.toLowerCase().includes(keyword.toLowerCase())){
                                                return true
                                            }
                                        }else{
                                            return true
                                        }
                                    }).map((item, key) => {
                                        return (
                                            <button key={key} onClick={() => handlerChooseNumber(item)} type="button" className="hover:bg-blue-100 px-3 py-2 text-sm w-full text-start">
                                                +{item.number.split("@")[0]}
                                                <p className="text-blue-500 text-xs font-bold">Auth from +{item.parentId}</p>
                                            </button>
                                        )
                                    })
                                }
                                
                            </div>
                        </div>
                    </div>
                    <p className="text-xs mt-1">Delete: click number and then enter "delete"</p>
                </div>

                <div className="flex items-center gap-2 mt-3">
                    <button className="btn-primary">
                        Add Participants
                    </button>
                    <button className="btn-secondary" type="button" onClick={() => context.setData({...context, modal:null})}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
  )
}
