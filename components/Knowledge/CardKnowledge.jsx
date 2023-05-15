import { FaCheck } from "react-icons/fa";

export default function CardKnowledge() {
  return (
    <tr>
        <td class="px-4 py-4 text-sm font-medium text-zinc-700 whitespace-nowrap">
            <div class="inline-flex items-center gap-x-3">
                <div class="flex items-center gap-x-2">
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
                        <h2 class="font-normal text-zinc-800 dark:text-white ">Zinedine Ziddan Fahdlevy</h2>
                        <p class="text-xs font-normal text-zinc-500 dark:text-zinc-400">20 Pages</p>
                    </div>
                </div>
            </div>
        </td>
        <td class="px-5 py-4 text-sm font-normal text-zinc-700 whitespace-nowrap">
            <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                Active
            </div>
        </td>
        <td class="px-4 py-4 text-sm text-zinc-500 dark:text-zinc-300 whitespace-nowrap">Jan 4, 2022</td>
        <td class="px-4 py-4 text-sm text-zinc-500 dark:text-zinc-300 whitespace-nowrap">Scratch</td>
        <td class="px-4 py-4 text-sm whitespace-nowrap">
            <button class="px-1 py-1 text-zinc-500 transition-colors duration-200 rounded-lg dark:text-zinc-300 hover:bg-zinc-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                </svg>
            </button>
        </td>
    </tr>
  )
}
