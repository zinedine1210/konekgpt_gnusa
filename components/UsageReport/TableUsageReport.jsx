import CardUsageReport from "./CardUsageReport"

export default function TableUsageReport() {
  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
                    <thead className="">
                        <tr>
                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                <div className="flex items-center gap-x-3">
                                    {/* <input type="checkbox" className="text-blue-500 border-zinc-300 rounded dark:bg-zinc-900 dark:ring-offset-zinc-900 dark:border-zinc-700"/> */}
                                    <span>User</span>
                                </div>
                            </th>

                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                Token
                            </th>

                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                Date
                            </th>

                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                No. HP
                            </th>

                            <th scope="col" className="relative py-3.5 px-4">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-zinc-200 dark:divide-zinc-700 dark:bg-zinc-900">
                        {
                        new Array(10).fill("coba").map((item, key) => {
                            return <CardUsageReport key={key}/>
                        })
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
