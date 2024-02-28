import { MyContext } from "@/context/MyProvider";
import { useContext } from "react";
import { IoEyeSharp } from "react-icons/io5";

export default function CardUsageReport() {
    const context = useContext(MyContext)

    
  return (
    <tr>
        <td className="px-4 py-4 text-sm font-medium text-zinc-700 whitespace-nowrap">
            <div className="inline-flex items-center gap-x-3">
                <h1>Zinedine Ziddan</h1>
            </div>
        </td>
        <td className="px-5 py-4 text-sm font-normal text-zinc-700 whitespace-nowrap">
            1932snqo1903118nqie10e
        </td>
        <td className="px-4 py-4 text-sm text-zinc-500 dark:text-zinc-300 whitespace-nowrap">Jan 4, 2022</td>
        <td className="px-4 py-4 text-sm text-zinc-500 dark:text-zinc-300 whitespace-nowrap">089518018802</td>
        <td className="px-4 py-4 text-sm whitespace-nowrap">
            <button onClick={() => context.setData({...context, view:3, modal:"simulationKnowledge"})} className="p-2 text-zinc-500 transition-colors duration-200 rounded-lg dark:text-zinc-300 hover:bg-zinc-100">
                <IoEyeSharp />
            </button>
        </td>
    </tr>
  )
}
