import { MyContext } from "@/context/MyProvider";
import { useRouter } from "next/router";
import { useContext } from "react";
import { BsChatQuoteFill, BsPencilFill } from "react-icons/bs";
import SelectReusable from "../Templates/SelectReusable";
import { FaEllipsisH } from "react-icons/fa";

export default function CardKnowledge({item}) {
    const router = useRouter()
    const context = useContext(MyContext)

    const gotoInbox = async () => {
        localStorage.setItem("view", 1)
        router.push(`/usr/inbox/${item.id}?m=clm_inbox`, undefined, {
            shallow: true,
            target: "_blank"
        })
    }


    const bulkOptions = [
        {
            label: "View and Edit",
            iconLabel: <BsPencilFill className='text-blue-500' />,
            onClick: (item) => {
                router.push(`/usr/knowledge/training/information?m=clm_knowledge_training&id=${item.id}`, undefined, {
                    shallow: true,
                    target: "_blank"
                })
            }
        },
        {
            label: "Simulation AI",
            iconLabel: <BsChatQuoteFill className='text-zinc-500' />,
            onClick: (item) => context.setData({...context, view:3, modal:{ name:"simulationKnowledge", data:item }})
        },
    ]


  return (
    <tr>
        <td className="px-4 py-4 text-sm font-medium text-zinc-700 whitespace-nowrap">
            <div className="inline-flex items-center gap-x-3">
                <div className="flex items-center gap-x-2">
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
        <td className="px-4 py-4 text-sm text-zinc-500 dark:text-zinc-300 whitespace-nowrap">{item.code}</td>
        <td className="px-4 py-4 text-sm text-zinc-500 dark:text-zinc-300 whitespace-nowrap">
            {item.type_training == 1 && <span className="bg-lime-100 text-lime-500 font-bold text-xs rounded-md uppercase py-1 px-3">Upload</span>}
            {item.type_training == 2 && <span className="bg-indigo-100 text-indigo-500 font-bold text-xs rounded-md uppercase py-1 px-3">Url</span>}
            {item.type_training == 4 && <span className="bg-teal-100 text-teal-500 font-bold text-xs rounded-md uppercase py-1 px-3">Scratch</span>}
        </td>
        <td className="px-4 py-4 text-sm whitespace-nowrap space-x-2 flex items-center">
            <SelectReusable data={item} options={bulkOptions} label={<FaEllipsisH className='text-zinc-500 dark:text-white'/>} customCss='w-8 h-8' position="left-0"/>
            <button className="btn-primary" onClick={() => gotoInbox()}>
                Inbox
            </button>
        </td>
    </tr>
  )
}
