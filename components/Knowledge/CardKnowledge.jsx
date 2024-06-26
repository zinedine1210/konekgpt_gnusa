import { MyContext } from "@/context/MyProvider";
import KnowledgeRepository from "@/repositories/KnowledgeRepository";
import Link from "next/link";
import { useContext } from "react";
import { BsChatQuote, BsChatQuoteFill, BsInbox, BsInboxFill, BsPencilFill } from "react-icons/bs";
import { IoEyeSharp, IoTrash } from "react-icons/io5";
import Swal from "sweetalert2";

export default function CardKnowledge({item}) {
    const context = useContext(MyContext)

    const handlerDelete = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async (result2) => {
              if (result2.isConfirmed) {
                const result = await KnowledgeRepository.deleteKnowledge({xa:{xa:JSON.parse(localStorage.getItem("XA"))}, data:[item.id]})
                console.log(result);
                if(result?.type == "success"){
                    const deleteKnowledge = context.dataKnowledge.filter(res => res.id != item.id)
                    context.setData({...context, dataKnowledge:deleteKnowledge})
                }else{
                    Swal.fire({
                        icon:"error",
                        title:"Something Wrong",
                        text:"Please try again later"
                    })
                }
            }})
        
    }

    let typeTraining = {
        1 : {name:"upload-file"},
        2 : {name:"website"},
        4 : {name:"scratch"}
    }

  return (
    <tr>
        <td className="px-4 py-4 text-sm font-medium text-zinc-700 whitespace-nowrap">
            <div className="inline-flex items-center gap-x-3">
                <div className="flex items-center gap-x-2">
                    <label htmlFor={item.id} className="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-100">
                        {/* <span>This</span> */}
                        <span className="relative">
                            <input id={item.id} type="checkbox" checked disabled className="hidden peer" />
                            <div className="w-9 h-3 rounded-full shadow bg-zinc-200 dark:bg-gray-600 peer-checked:dark:bg-violet-400"></div>
                            <div className="absolute left-0 w-5 h-5 bg-green-500 rounded-full shadow -inset-y-1 peer-checked:right-0 peer-checked:left-auto dark:bg-violet-400"></div>
                        </span>
                        {/* <span>That</span> */}
                    </label>
                    <div>
                        <h2 className="font-normal text-zinc-800 dark:text-white ">{item.name}</h2>
                        <p className="text-xs font-normal text-zinc-500 dark:text-zinc-400">{item.id}</p>
                    </div>
                </div>
            </div>
        </td>
        <td className="px-5 py-4 text-sm font-normal max-w-md">
            {item.description}
        </td>
        {/* <td className="px-4 py-4 text-sm text-zinc-500 dark:text-zinc-300 whitespace-nowrap">{moment(new Date(stuff._cd.epoch_time * 1000  )).local().format("DD MMMM YYYY, HH:mm")}</td> */}
        <td className="px-4 py-4 text-sm text-zinc-500 dark:text-zinc-300 whitespace-nowrap">{item.code}</td>
        <td className="px-4 py-4 text-sm text-zinc-500 dark:text-zinc-300 whitespace-nowrap">
            {item.type_training == 1 && <span className="bg-lime-100 text-lime-500 font-bold text-xs rounded-md uppercase py-1 px-3">Upload</span>}
            {item.type_training == 2 && <span className="bg-indigo-100 text-indigo-500 font-bold text-xs rounded-md uppercase py-1 px-3">Url</span>}
            {item.type_training == 4 && <span className="bg-teal-100 text-teal-500 font-bold text-xs rounded-md uppercase py-1 px-3">Scratch</span>}
        </td>
        <td className="px-4 py-4 text-sm whitespace-nowrap space-x-2">
            <button onClick={() => handlerDelete()} className="p-2 text-red-500 transition-colors duration-200 rounded-lg dark:text-red-300 hover:bg-red-100">
                <IoTrash />
            </button>
            <Link href={`/usr/knowledge/training/update/${typeTraining[item.type_training].name}?m=clm_knowledge_training&id=${item.id}`} shallow>
                <button className="p-2 text-green-500 transition-colors duration-200 rounded-lg dark:text-green-300 hover:bg-green-100">
                    <BsPencilFill />
                </button>
            </Link>
            {/* <Link href={`/usr/inbox/${item.id}?m=clm_inbox`} target="_blank" shallow>
                <button className="p-2 text-purple-500 transition-colors duration-200 rounded-lg dark:text-purple-300 hover:bg-purple-100">
                    <BsInboxFill className="text-base"/>
                </button>
            </Link> */}
            <button onClick={() => context.setData({...context, view:3, modal:{name:"simulationKnowledge", data:item}})} className="p-2 text-indigo-500 transition-colors duration-200 rounded-lg dark:text-indigo-300 hover:bg-indigo-100">
                <BsChatQuoteFill className="text-base"/>
            </button>
        </td>
    </tr>
  )
}
