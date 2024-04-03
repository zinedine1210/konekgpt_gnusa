import CardQuestion from "@/components/FAQ/CardQuestion"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FaChevronLeft } from "react-icons/fa"
import { IoCreate } from "react-icons/io5"

export default function FAQInbox() {
    const [data, setData] = useState(null)

    const getData = () => {
        const getLocalStorage = JSON.parse(localStorage.getItem("FAQlocal"))
        setData(getLocalStorage ?? [])
    }

    useEffect(() => {if(!data) getData()}, [])
  return (
    <>
        <div className="w-full relative h-screen pt-16 overflow-y-auto">
            <div className='mx-0 xl:mx-2'>
                <div className='bg-white dark:bg-darkPrimary rounded-md shadow-md p-3 xl:p-5'>
                <label className="text-base xl:text-xl dark:text-zinc-300 font-semibold">Frequently Asked Question Builder</label>
                <div className="flex items-center gap-2 pt-1 pb-3">
                    <Link href={"/usr/qna/service?m=clm_qna_service"}>
                        <h1 className="badge-blue">
                            <FaChevronLeft />
                            Back
                        </h1>
                    </Link>
                    /
                    <h1 className="text-sm">Create FAQ</h1>
                </div>

                <div className="sm:flex sm:items-center sm:justify-between mt-5">
                    <input type="search" placeholder="Filter by Question" className="input-search w-full xl:w-auto" />
                    <div className="flex items-center justify-between gap-2 mt-2 xl:mt-0">
                        <button className="btn-secondary">
                            Select all
                        </button>
                    </div>
                </div>
                <div className='mt-5'>
                    <h1 className="bg-blue-100 text-blue-500 text-sm inline-block py-1 px-2 rounded-md"><span className="font-bold">200</span> Question</h1>
                    <div className="py-5">
                        {
                            data ? data.map((item, key) => {
                                return (
                                    <CardQuestion key={key}/>
                                )
                            }):""
                        }
                    </div>
                </div>
                </div>
            </div>
        </div>

        <div className="backdrop-blur-md w-full absolute bottom-0 left-0 px-5 py-2 border-t border-zinc-200 flex items-center justify-between">
            <h1 className="text-zinc-600 text-sm"><span className="font-bold text-3xl">20</span> Questions Selected</h1>
            <button className="btn-primary">
                <IoCreate className='text-white font-bold text-lg'/>
                <span>Generate</span>
            </button>
        </div>
    </>
  )
}
