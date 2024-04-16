import CardSelectKnowledge from "@/components/Knowledge/CardSelectKnowledge"
import { MyContext } from "@/context/MyProvider"
import ChannelRepository from "@/repositories/ChannelRepository"
import KnowledgeRepository from "@/repositories/KnowledgeRepository"
import WhatsappRepository from "@/repositories/WhatsappRepository"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useRef, useState } from "react"
import { FaEye, FaPowerOff, FaTrash, FaWhatsapp } from "react-icons/fa"
import Swal from "sweetalert2"

export default function CardWhatsapp(props) {
    const [status, setStatus] = useState(null)
    const context = useContext(MyContext)
    const dropRef = useRef(null)
    const [open, setOpen] = useState(false)

    const handleOutsideClick = (event) => {
        if (dropRef.current && !dropRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        async function getStatus(){
            // get status apakah nomer tersebut terautentikasi atau tidak
            const result = await WhatsappRepository.statusSession({id:props.item.identity})
            let active = false
            if(result.success){
                setStatus(result.data.status)
                active = true
            }else{
                setStatus("disconnected")
            }
            const getActiveWhatsapp = localStorage.getItem("whatsappChannel") != "undefined" ? JSON.parse(localStorage.getItem("whatsappChannel")) : null;
            if(getActiveWhatsapp){
                getActiveWhatsapp.find(res => res.id == props.item.id)['active'] = active
                localStorage.setItem("whatsappChannel", JSON.stringify(getActiveWhatsapp))
                context.setData({...context, channelWhatsapp:getActiveWhatsapp})
            }
        }

        getStatus()

    }, [context.modal])

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [])

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
                    WhatsappRepository.deleteSession({id:props.item.identity}).then(async res => {
                        console.log(res);
                        if(res.success){
                            const result = await ChannelRepository.deleteChannel({xa:{XA:JSON.parse(localStorage.getItem("XA"))}, data:[props.item.id]})
                            console.log(result);
                            if(result?.type == "success"){
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
                            }else{
                                Swal.fire({
                                    icon:"error",
                                    title:"Something Wrong",
                                    text:"Please try again later"
                                })
                            }
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
              }).then(async (result) => {
                if (result.isConfirmed) {
                    const result = await ChannelRepository.deleteChannel({xa:{XA:JSON.parse(localStorage.getItem("XA"))}, data:[props.item.id]})
                    console.log(result);
                    if(result?.type == "success"){
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
                    }else{
                        Swal.fire({
                            icon:"error",
                            title:"Something Wrong",
                            text:"Please try again later"
                        })
                    }
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
    <div ref={dropRef}>
        <div className="border-2 border-zinc-300 p-2 xl:p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <FaWhatsapp className="text-green-500 text-2xl"/>
                <div>
                    <p className="dark:text-zinc-300 text-zinc-500 tracking-wider text-xs uppercase">{props.item?.name}</p>
                    <h1 className="dark:text-zinc-300 text-zinc-600 font-bold">{props.item?.identity}</h1>
                </div>
            </div>
            <div className="flex items-center xl:gap-4 gap-2">
                <h1 className="flex items-center gap-2">
                    <span className={`w-4 xl:w-2 h-4 xl:h-2 rounded-full ${options[status] ? options[status]['warna'] : "bg-blue-500"}`}></span>
                    <p className="text-xs dark:text-zinc-300 text-zinc-600 capitalize xl:block hidden">{options[status] ? options[status]['name'] :"Searching"}</p>
                </h1>

                <button type="button" onClick={() => handlerCheck()}>
                    <FaPowerOff className={`${props.item.active ? "text-green-500":"text-red-500"}`}/>
                </button>
                <button title="Delete Session" onClick={() => handlerDeleteSession()}>
                    <FaTrash className="text-red-500"/>
                </button>
                <button title="Information Session" onClick={() => setOpen(!open)} className="btn-primary">
                    <FaEye className="text-white"/>
                    <h1 className="hidden xl:block">{props.item?.knowledge_id ? "Info":"Connect"}</h1>
                </button>
            </div>
        </div>

        {
            open && <InformationKnowledge item={props.item}/>
        }
    </div>
  )
}


function InformationKnowledge({ item }){
    const context = useContext(MyContext)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleConnect = async () => {
        setLoading(true)
        const dataKnowledgeTraining = context.dataKnowledge;
        if(dataKnowledgeTraining && data){
            setData(dataKnowledgeTraining)
        }else{
            await getKnowledge()
        }
        setLoading(false)
    }

    const getKnowledge = async () => {
        const getxa = JSON.parse(localStorage.getItem("XA"))
        const result = await KnowledgeRepository.getAllKnowledge({xa:getxa})
        // console.log(result)
        if(result?.data){
            context.setData({...context, dataKnowledge:result.data})
            setData(result.data)
        }else{
            alert("Something went wrong, Please try again later")
        }
    }

    const gotoInbox = async () => {
        if(item.active){
            router.push(`/usr/inbox/${item.id}?m=clm_inbox`, undefined, {
                shallow: true,
                target: "_blank"
            })
        }else{
            Swal.fire({
                icon: 'info', 
                title: 'Disconnected Status',
                text: 'This channel must be in status authenticated'
            })
        }
    }

    return (
        <div className="w-full xl:w-1/2 border-l right-0 absolute bg-white xl:right-2 xl:bg-transparent p-5 top-5">
            <h1 className="font-bold text-xl flex items-center gap-5 uppercase pb-5 border-b border-dashed border-black">Information Of Knowledge <span className="badge-blue">{item.identity}</span></h1>
            {
                item?.knowledge_id ?
                // Halaman information jika dia sudah mengoneksikan dengan knowledge
                <div>
                    {
                        data ?
                        <div className="w-full py-5">
                            <button onClick={() => setData(null)} className="text-red-500 pb-5 font-bold">Cancel</button>
                            <div className="grid grid-cols-1 gap-2 w-full">
                                {
                                    data.map((item2, i) => {
                                        const used = item2.id === item.knowledge_id
                                        return (
                                            <div key={i} className="bg-zinc-100 dark:bg-darkPrimary px-3 py-5 rounded-md">
                                                <CardSelectKnowledge active={!used} channelId={item.id} item={item2}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        :
                            <div className="w-full py-5 text-sm space-y-3">
                                <div className="flex items-center gap-5">
                                    Knowledge ID : 
                                    <p className="font-bold">{item.knowledge_id}</p>
                                </div>
                                <div className="flex items-center gap-5">
                                    Knowledge Name :
                                    <p className="font-bold">{item.knowledge_name}</p>
                                </div>
                                <div className="flex items-center gap-5">
                                    Channel Label : 
                                    <p className="font-bold">{item.name}</p>
                                </div>
                                <div className="flex items-center gap-5">
                                    Channel Identity : 
                                    <p className="font-bold">{item.identity}</p>
                                </div>
                                <div className="flex items-center gap-5">
                                    Status : 
                                    <p className={item.active ? "badge-green":"badge-red"}>{item.active ? 'Active':'Unactive'}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button className="btn-primary" onClick={() => gotoInbox()}>
                                        Goto Inbox
                                    </button>
                                    <button className="btn-secondary" onClick={() => handleConnect()}>
                                        Change Knowledge
                                    </button>
                                </div>
                            </div>
                    }
                </div>
                :
                <div>
                    <p className="text-sm mb-5">You have not added a training knowledge base from the (training -{">"} knowledge) menu</p>
                    {
                        data ?
                        <>
                            <h1 className="font-bold mb-2">Choose your knowledge for the channel</h1>
                            <div className="grid grid-cols-1 gap-2">
                                {
                                    data.map((item2, i) => {
                                        return (
                                            <div key={i} className="bg-zinc-100 dark:bg-darkPrimary px-3 py-5 rounded-md">
                                                <CardSelectKnowledge channelId={item.id} item={item2}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
                        :
                        <button className="btn-primary mt-5" disabled={loading} onClick={() => handleConnect()}>{!loading ? "Connect Now":"Loading..."}</button>
                    }
                </div>
            }
        </div>
    )
}