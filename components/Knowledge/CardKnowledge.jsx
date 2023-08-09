import { MyContext } from "@/context/MyProvider";
import KnowledgeRepository from "@/repositories/KnowledgeRepository";
import { useContext } from "react";
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

  return (
    <tr>
        <td className="px-4 py-4 text-sm font-medium text-zinc-700 whitespace-nowrap">
            <div className="inline-flex items-center gap-x-3">
                <div className="flex items-center gap-x-2">
                    <label for="Toggle2" className="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-100">
                        {/* <span>This</span> */}
                        <span className="relative">
                            <input id="Toggle2" type="checkbox" className="hidden peer" />
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
        <td className="px-5 py-4 text-sm font-normal text-zinc-700 whitespace-nowrap">
            <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                Active
            </div>
        </td>
        <td className="px-4 py-4 text-sm text-zinc-500 dark:text-zinc-300 whitespace-nowrap">Jan 4, 2022</td>
        <td className="px-4 py-4 text-sm text-zinc-500 dark:text-zinc-300 whitespace-nowrap">
            {item.type_training == 1 && <span className="bg-lime-100 text-lime-500 font-bold text-xs rounded-md uppercase py-1 px-3">Upload</span>}
            {item.type_training == 2 && <span className="bg-indigo-100 text-indigo-500 font-bold text-xs rounded-md uppercase py-1 px-3">Url</span>}
            {item.type_training == 4 && <span className="bg-teal-100 text-teal-500 font-bold text-xs rounded-md uppercase py-1 px-3">Scratch</span>}
        </td>
        <td className="px-4 py-4 text-sm whitespace-nowrap space-x-2">
            <button onClick={() => handlerDelete()} className="p-2 text-red-500 transition-colors duration-200 rounded-lg dark:text-red-300 hover:bg-red-100">
                <IoTrash />
            </button>
            <button onClick={() => context.setData({...context, view:3, modal:{name:"simulationKnowledge", data:item}})} className="bg-blue-100 p-2 text-zinc-500 transition-colors duration-200 rounded-lg dark:text-zinc-300 hover:bg-blue-200">
                Start Simulation
            </button>
        </td>
    </tr>
  )
}
