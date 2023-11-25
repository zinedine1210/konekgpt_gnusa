
export default function CardFAQ() {
  return (
    <tr>
        <td className="px-4 py-4 text-sm font-medium text-zinc-700 whitespace-nowrap">
            <div className="inline-flex items-center gap-x-3">
                <input type="checkbox" className="text-blue-500 border-zinc-300 rounded dark:bg-zinc-900 dark:ring-offset-zinc-900 dark:border-zinc-700"/>

                <div className="flex items-center gap-x-2">
                    <div className="flex items-center justify-center w-8 h-8 text-blue-500 bg-blue-100 rounded-full dark:bg-zinc-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                    </div>
                    
                    <div>
                        <h2 className="font-normal text-zinc-800 dark:text-white ">Zinedine Ziddan Fahdlevy</h2>
                        <p className="text-xs font-normal text-zinc-500 dark:text-zinc-400">20 Question</p>
                    </div>
                </div>
            </div>
        </td>
        <td className="px-12 py-4 text-sm font-normal text-zinc-700 whitespace-nowrap">
            20
        </td>
        <td className="px-4 py-4 text-sm text-zinc-500 dark:text-zinc-300 whitespace-nowrap">Jan 4, 2022</td>
        <td className="px-4 py-4 text-sm text-zinc-500 dark:text-zinc-300 whitespace-nowrap">Jan 4, 2022</td>
        <td className="px-4 py-4 text-sm text-zinc-500 dark:text-zinc-300 whitespace-nowrap">Lana Steiner</td>
        <td className="px-4 py-4 text-sm whitespace-nowrap">
            <button className="px-1 py-1 text-zinc-500 transition-colors duration-200 rounded-lg dark:text-zinc-300 hover:bg-zinc-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                </svg>
            </button>
        </td>
    </tr>
  )
}
