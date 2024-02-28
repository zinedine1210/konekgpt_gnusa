import { MyContext } from "@/context/MyProvider";
import WhatsappRepository from "@/repositories/WhatsappRepository";
import { useContext, useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import Swal from "sweetalert2";

export default function CardParticipant({item}) {
    const [open, setOpen] = useState(false)
    const dropRef = useRef(null)
    const context = useContext(MyContext)

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

    const handlerDemoteAdmin = async () => {
        let obj = {
            "instance_key":context.detailContact.data.parentId,
            "jid": context.detailContact.data.id,
            "participants": [item.id]
        }
        const result = await WhatsappRepository.demoteAdmin({id:obj['instance_key'], data:obj})
        console.log(result);
        if(result.success){
            item.admin = null
            context.setData({...context, detailContact:context.detailContact})
        }
    }

    const handlerMakeAdmin = async () => {
        let obj = {
            "instance_key":context.detailContact.data.parentId,
            "jid": context.detailContact.data.id,
            "participants": [item.id]
        }
        const result = await WhatsappRepository.makeAdmin({id:obj['instance_key'], data:obj})
        console.log(result);
        if(result.success){
            item.admin = "admin"
            context.setData({...context, detailContact:context.detailContact})
        }
    }

    const removeParticipant = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, kick it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                const result = await WhatsappRepository.removeParticipants({id:context.detailContact.data.parentId, data:{instance_key:context.detailContact.data.parentId, jid:context.detailContact.data.id, participants:[item.id]}})
                console.log(result);
                if(result.success){
                    const filterdelete = context.detailContact.infoGroup.participants.filter(res => res.id != item.id)
                    context.detailContact.infoGroup.participants = filterdelete
                    context.setData({...context, detailContact:context.detailContact})
                    Swal.fire({
                        icon:"info",
                        title:`Kick`,
                        text:`Removing ${item.id} from the group was successful`
                    })
                }
            }})
        }
    
  return (
    <button className="group text-start w-full hover:bg-zinc-100 transition-colors duration-300 ease-in-out py-2 border-b flex items-center justify-between gap-2 px-3">
        <div className="flex items-center gap-2">
            <span className="flex items-center justify-center uppercase w-8 h-8 rounded-full bg-blue-100 text-blue-500 font-bold text-lg">{item.admin ? item.admin.charAt(0): "G"}</span>
            <div>
                <h1 className="text-sm text-zinc-500">{item.id.split("@")[0]}</h1>
                {
                    item.admin ? (
                        <span className="bg-green-100 text-green-500 py-0.5 rounded-full px-3 text-xs font-bold capitalize">{item.admin}</span>
                    )
                    :""
                }
            </div>
        </div>

        <div ref={dropRef} className="relative">
            <button onClick={() => setOpen(true)} className={`hover:bg-blue-100 transition-colors duration-300 ease-in-out rounded-full w-8 h-8 flex items-center justify-center`}>
                <BsChevronDown className={`${open ? "rotate-180":""} transition-all duration-300 `}/>
            </button>

            <div className={`${open ? "":"hidden"} absolute bottom-full right-0 shadow-md rounded-md backdrop-blur-md z-20 w-44`}>
                <button onClick={() => removeParticipant()} className="hover:bg-blue-100 px-3 py-2 text-sm w-full text-start">
                    Kick
                </button>
                {
                    item.admin ? 
                    <button onClick={() => handlerDemoteAdmin()} className="hover:bg-blue-100 px-3 py-2 text-sm w-full text-start">
                        Demote admin
                    </button>
                    :
                    <button onClick={() => handlerMakeAdmin()} className="hover:bg-blue-100 px-3 py-2 text-sm w-full text-start">
                        Make admin
                    </button>
                }
            </div>
        </div>
    </button>
  )
}
