import ChatHelp from "@/components/Help/ChatHelp";
import FAQCard from "@/components/Help/FAQCard";
import Layout from "@/components/Layouts/Layout";
import { MyContext } from "@/context/MyProvider";
import Link from "next/link";
import { Suspense, useContext, useEffect, useState } from "react";
import { BsChevronRight} from "react-icons/bs";
import { HiX } from "react-icons/hi";

export default function HalamanHelp() {
    const context = useContext(MyContext)
    const [data, setData] = useState(null)

    useEffect(() => {
        if(!data){
            const getAuth = JSON.parse(localStorage.getItem("auth"))
            console.log(getAuth)
            setData(getAuth.data)
        }
    }, [data])
  return (
    <Layout title="HELP" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <section className="w-full bg-zinc-100 dark:bg-dark relative h-screen">
            <div className="px-3 xl:px-5 pt-16 h-full overflow-y-auto flex">
                <div className="p-0 xl:p-5 relative">
                    <Link href={"/usr/help?m=clm_help"}>
                        <button className="absolute top-0 xl:top-5 right-0 xl:right-5 w-10 h-10 rounded-full hover:bg-red-100 transition-colors duration-300 flex items-center justify-center"><HiX className="text-xl"/></button>
                    </Link>
                    <p className="text-sm font-bold text-zinc-600 uppercase dark:text-white">Hi, {data?.username}</p>
                    <p className="text-base xl:text-2xl text-zinc-500 dark:text-zinc-300 font-light max-w-xl">How can we help you today?</p>
                    <div className="mt-5">
                        <Link href={"/usr/help/create?m=clm_help"} className="inline-block"><button className="btn-primary">Get help quickly</button></Link>
                        <div className={`mt-5 grid grid-cols-1 gap-3 ${context?.modal == "chatHelp" ? "xl:grid-cols-4":"xl:grid-cols-5"}`}>
                            <div className="bg-white dark:bg-darkPrimary shadow-md rounded-xl p-5">
                                <p className="text-zinc-500 text-sm font-bold mb-3"><span className="bg-blue-100 text-blue-500 py-1 px-2 rounded-full">Knowledge</span> Id: 12173916</p>
                                <h1 className="text-sm xl:text-base">Bagaimana cara membuat knowledge?</h1>
                                <p className="text-zinc-500 text-sm flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 block"></span>Ongoing</p>
                                <div className="border-t pt-2 mt-3">
                                    <button onClick={() => context.setData({...context, modal:"chatHelp"})} className="flex items-center justify-between text-start w-full text-sm transition-colors duration-300 hover:text-blue-500">
                                        Check Status
                                        <BsChevronRight className="text-sm text-zinc-500"/>
                                    </button>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-darkPrimary shadow-md rounded-xl p-5">
                                <p className="text-zinc-500 text-sm font-bold mb-3"><span className="bg-blue-100 text-blue-500 py-1 px-2 rounded-full">FAQ Builder</span> Id: 12173916</p>
                                <h1 className="text-sm xl:text-base">Bagaimana cara membuat FAQ Builder?</h1>
                                <p className="text-zinc-500 text-sm flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 block"></span>Ongoing</p>
                                <div className="border-t pt-2 mt-3">
                                    <button onClick={() => context.setData({...context, modal:"chatHelp"})} className="flex items-center justify-between text-start w-full text-sm transition-colors duration-300 hover:text-blue-500">
                                        Check Status
                                        <BsChevronRight className="text-sm text-zinc-500"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`mt-5 w-full ${context?.modal == "chatHelp" ? "xl:w-3/4":"xl:w-1/2"}`}>
                        <h1 className="text-zinc-500 dark:text-white">Frequently Asked Question</h1>

                        <div className="mt-5 space-y-3">
                            {
                                new Array(5).fill("coba").map((item, key) => {
                                    return <FAQCard key={key} />
                                })
                            }
                        </div>
                    </div>
                </div>
                <ChatHelp />
            </div>
        </section>
      </Suspense>
    </Layout>
  )
}
