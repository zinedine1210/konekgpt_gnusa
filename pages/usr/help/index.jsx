import ChatHelp from "@/components/Help/ChatHelp";
import FAQCard from "@/components/Help/FAQCard";
import Layout from "@/components/Layouts/Layout";
import { MyContext } from "@/context/MyProvider";
import Link from "next/link";
import { Suspense, useContext } from "react";
import { BsChevronRight, BsQuestionCircle } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa";

export default function HalamanHelp() {
    const context = useContext(MyContext)
  return (
    <Layout title="HELP" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <section className="w-full bg-zinc-100 relative h-screen">
            <div className="px-3 md:px-5 pt-16 h-full overflow-y-auto flex">
                <div className="p-0 md:p-5">
                    <p className="text-sm font-bold text-zinc-600 uppercase dark:text-zinc-400">Hi, Zinedine</p>
                    <p className="text-2xl text-zinc-500 font-light max-w-xl">How can we help you today?</p>
                    <div className="mt-5">
                        <Link href={"/usr/help/create"}><button className="btn-primary">Get help quickly</button></Link>
                        <div className={`mt-5 grid grid-cols-1 gap-3 ${context?.modal == "chatHelp" ? "md:grid-cols-4":"md:grid-cols-5"}`}>
                            <div className="bg-white shadow-md rounded-xl p-5">
                                <p className="text-zinc-500 text-sm font-bold mb-3"><span className="bg-blue-100 text-blue-500 py-1 px-2 rounded-full">Knowledge</span> Id: 12173916</p>
                                <h1>Bagaimana cara membuat knowledge?</h1>
                                <p className="text-zinc-500 text-sm flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 block"></span>Ongoing</p>
                                <div className="border-t pt-2 mt-3">
                                    <button onClick={() => context.setData({...context, modal:"chatHelp"})} className="flex items-center justify-between text-start w-full text-sm transition-colors duration-300 hover:text-blue-500">
                                        Check Status
                                        <BsChevronRight className="text-sm text-zinc-500"/>
                                    </button>
                                </div>
                            </div>
                            <div className="bg-white shadow-md rounded-xl p-5">
                                <p className="text-zinc-500 text-sm font-bold mb-3"><span className="bg-blue-100 text-blue-500 py-1 px-2 rounded-full">FAQ Builder</span> Id: 12173916</p>
                                <h1>Bagaimana cara membuat FAQ Builder?</h1>
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
                    <div className={`mt-5 w-full ${context?.modal == "chatHelp" ? "md:w-3/4":"md:w-1/2"}`}>
                        <h1 className="text-zinc-600">Frequently Asked Question</h1>

                        <div className="mt-5 space-y-3">
                            {
                                new Array(5).fill("coba").map((item, key) => {
                                    return <FAQCard />
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
