import CardContacts from "./CardContacts"

export default function TableContacts() {
  return (
    <div>
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle xl:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full table-auto divide-y divide-zinc-200 dark:divide-zinc-700">
                        <thead className="">
                            <tr>
                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                    <div className="flex items-center gap-x-3">
                                        {/* <input type="checkbox" className="text-blue-500 border-zinc-300 rounded dark:bg-zinc-900 dark:ring-offset-zinc-900 dark:border-zinc-700"/> */}
                                        <span>Name</span>
                                    </div>
                                </th>

                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                    Email
                                </th>

                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                    Channel
                                </th>

                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                    Last Updated At
                                </th>

                                <th scope="col" className="relative py-3.5 px-4">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-zinc-200 dark:divide-zinc-700 dark:bg-zinc-900">
                            {
                                new Array(5).fill("coba").map((item, key) => {
                                    return <CardContacts key={key}/>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div className="flex items-center justify-between mt-6">
            <a href="#" className="flex items-center px-5 py-2 text-sm text-zinc-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>

                <span>
                    previous
                </span>
            </a>

            <div className="items-center hidden xl:flex gap-x-3">
                <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-zinc-800 bg-blue-100/60">1</a>
                <a href="#" className="px-2 py-1 text-sm text-zinc-500 rounded-md dark:hover:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-100">2</a>
                <a href="#" className="px-2 py-1 text-sm text-zinc-500 rounded-md dark:hover:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-100">3</a>
                <a href="#" className="px-2 py-1 text-sm text-zinc-500 rounded-md dark:hover:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-100">...</a>
                <a href="#" className="px-2 py-1 text-sm text-zinc-500 rounded-md dark:hover:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-100">12</a>
                <a href="#" className="px-2 py-1 text-sm text-zinc-500 rounded-md dark:hover:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-100">13</a>
                <a href="#" className="px-2 py-1 text-sm text-zinc-500 rounded-md dark:hover:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-100">14</a>
            </div>

            <a href="#" className="flex items-center px-5 py-2 text-sm text-zinc-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-800">
                <span>
                    Next
                </span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
            </a>
        </div>
    </div>
  )
}
