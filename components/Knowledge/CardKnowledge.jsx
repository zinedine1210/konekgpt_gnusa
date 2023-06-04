import { MyContext } from "@/context/MyProvider";
import { useContext } from "react";
import { IoEyeSharp } from "react-icons/io5";

export default function CardKnowledge() {
    const context = useContext(MyContext)
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
                        <h2 className="font-normal text-zinc-800 dark:text-white ">Zinedine Ziddan Fahdlevy</h2>
                        <p className="text-xs font-normal text-zinc-500 dark:text-zinc-400">20 Pages</p>
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
        <td className="px-4 py-4 text-sm text-zinc-500 dark:text-zinc-300 whitespace-nowrap">Scratch</td>
        <td className="px-4 py-4 text-sm whitespace-nowrap">
            <button onClick={() => context.setData({...context, view:3, modal:"simulationKnowledge"})} className="p-2 text-zinc-500 transition-colors duration-200 rounded-lg dark:text-zinc-300 hover:bg-zinc-100">
                <IoEyeSharp />
            </button>
        </td>
    </tr>
  )
}
