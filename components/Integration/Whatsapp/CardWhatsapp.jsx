import { MyContext } from "@/context/MyProvider"
import ChannelRepository from "@/repositories/ChannelRepository"
import WhatsappRepository from "@/repositories/WhatsappRepository"
import { useContext, useEffect, useState } from "react"
import { FaPowerOff, FaTrash, FaWhatsapp } from "react-icons/fa"
import Swal from "sweetalert2"

export default function CardWhatsapp(props) {
    const [status, setStatus] = useState(null)
    const context = useContext(MyContext)

    useEffect(() => {
        async function getStatus(){
            const result = await WhatsappRepository.statusSession({id:props.item.identity})
            console.log(result);
            let active = false
            if(result.success){
                setStatus(result.data.status)
                active = true
            }else{
                setStatus("disconnected")
            }
            const getActiveWhatsapp = JSON.parse(localStorage.getItem("whatsappChannel"));
            getActiveWhatsapp.find(res => res.id == props.item.id)['active'] = active
            localStorage.setItem("whatsappChannel", JSON.stringify(getActiveWhatsapp))
            context.setData({...context, channelWhatsapp:getActiveWhatsapp})
        }

        getStatus()
    }, [context.modal])

    const handlerDeleteSession = () => {
        console.log(status);
        if(status == "authenticated"){
            Swal.fire({
                title: 'This number is still authenticated',
                text: "are you sure you want to delete it?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    WhatsappRepository.deleteSession({id:props.item.identity}).then(res => {
                        console.log(res);
                        if(res.success){
                            ChannelRepository.deleteChannel({xa:{xa:JSON.parse(localStorage.getItem("XA"))}, data:[props.item.id]}).then(dele => {
                                console.log(dele);
                            })
                            
                            // set localstorage
                            const getWhatsappList = JSON.parse(localStorage.getItem("whatsappChannel"))
                            const deleteData = getWhatsappList.filter(res => {
                                return res.id != props.item.id
                            })

                            localStorage.setItem("whatsappChannel", JSON.stringify(deleteData))
                            context.setData({...context, channelWhatsapp:deleteData})

                            Swal.fire(
                                'Deleted!',
                                'Your session has been deleted.',
                                'success'
                            )
                        }
                    })
                }else{
                    return false
                }
            })
        }else{
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    ChannelRepository.deleteChannel({xa:{xa:JSON.parse(localStorage.getItem("XA"))}, data:[props.item.id]}).then(dele => {
                        console.log(dele);
                    })
                    const getWhatsappList = JSON.parse(localStorage.getItem("whatsappChannel"))
                    const deleteData = getWhatsappList.filter(res => {
                        return res.id != props.item.id
                    })

                    localStorage.setItem("whatsappChannel", JSON.stringify(deleteData))
                    context.setData({...context, channelWhatsapp:deleteData})

                    Swal.fire(
                        'Deleted!',
                        'Your session has been deleted.',
                        'success'
                    )
                }
            })
        }
    }

    const handlerActive = () => {
        const getAllWhatsapp = JSON.parse(localStorage.getItem("whatsappChannel"));
        
        getAllWhatsapp.find(res => res.id == props.item.id)['active'] = !props.item.active
        // console.log(getAllWhatsapp);
        localStorage.setItem("whatsappChannel", JSON.stringify(getAllWhatsapp))
        context.setData({...context, channelWhatsapp:getAllWhatsapp})
    }

    const handlerCheck = () => {
        if(status == "disconnected"){
            context.setData({...context, modal:{name:"QRWhatsapp", id:props.item.identity, step:2}})
        }else{
            handlerActive()
        }
    }

    const options = {
        'authenticated': {
            name:"authenticated",
            warna:"bg-green-500"
        },
        'connected': {
            name:"connected",
            warna:"bg-orange-500"
        },
        'disconnected': {
            name:"disconnected",
            warna:"bg-red-500"
        },
        'loading': {
            name:"loading",
            warna:"bg-blue-500"
        }
    }

  return (
    <div className="border-2 border-zinc-300 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <FaWhatsapp className="text-green-500 text-2xl"/>
            <div>
                <p className="text-zinc-500 tracking-wider text-xs uppercase">{props.item.name}</p>
                <h1 className="text-zinc-600 font-bold">{props.item.identity}</h1>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <h1 className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${options[status] ? options[status]['warna'] : "bg-blue-500"}`}></span>
                <p className="text-xs text-zinc-600 capitalize">{options[status] ? options[status]['name'] :"Searching"}</p>
            </h1>
            <button type="button" onClick={() => handlerCheck()}>
                <FaPowerOff className={`${props.item.active ? "text-green-500":"text-red-500"}`}/>
            </button>
            <button title="Delete Session">
                <FaTrash className="text-red-500" onClick={() => handlerDeleteSession()}/>
            </button>
        </div>
    </div>
  )
}
