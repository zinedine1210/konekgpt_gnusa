import CardQuestion from "@/components/FAQ/CardQuestion";
import Layout from "@/components/Layouts/Layout";
import ModalImport from "@/components/UnanswerQuestion/ModalImport";
import { MyContext } from "@/context/MyProvider";
import Link from "next/link";
import { Suspense, useContext } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { TfiImport } from "react-icons/tfi";

export default function UnanswerQuestion() {
    const context = useContext(MyContext)
  return (
    <Layout title="UNANSWER QUESTION" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        {
            context.modal ?
            context.modal == "importUnanswerQuestion" ?
                <ModalImport />
            :"":""
        }
        <section className="w-full bg-zinc-100 relative h-screen flex">
          <div className="w-full relative h-screen pt-16 overflow-y-auto">
            <div className='mx-0 md:mx-2'>
              <div className='bg-white rounded-md shadow-md p-3 md:p-5'>
                <label className="text-zinc-500 text-base md:text-xl uppercase dark:text-zinc-400 font-semibold">Unanswer Question</label>
                <p className="text-xs md:text-sm text-gray-500 font-light">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem pariatur doloribus odit doloremque voluptatibus at, eos nihil numquam aliquid in.</p>
                {/* <div className="flex items-center gap-2 pt-1 pb-3">
                    <Link href={"/usr/faq"}>
                        <h1 className="text-sm dark:text-zinc-400 flex items-center gap-1 text-blue-500">
                            <FaChevronLeft />
                            Back
                        </h1>
                    </Link>
                    /
                    <h1 className="text-sm">Unanswer Question</h1>
                </div> */}

                <div className="sm:flex sm:items-center sm:justify-between mt-5">
                    <input type="search" placeholder="Filter by Question" className="input-search w-full md:w-auto" />
                    <div className="flex items-center justify-between gap-2 mt-2 md:mt-0">
                        <button className="btn-secondary">
                            Select all
                        </button>
                    </div>
                </div>
                <div className='mt-5'>
                    <h1 className="bg-blue-100 text-blue-500 text-sm inline-block py-1 px-2 rounded-md"><span className="font-bold">200</span> Question</h1>
                    <div className="py-5">
                        {
                            new Array(30).fill("coba").map((item, key) => {
                                return (
                                    <CardQuestion />
                                )
                            })
                        }
                    </div>
                </div>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-md w-full absolute bottom-0 left-0 px-5 py-2 border-t border-zinc-200 flex items-center justify-between">
            <h1 className="text-zinc-600 text-sm"><span className="font-bold text-3xl">20</span> Questions Selected</h1>
            <button className="btn-primary" onClick={() => context.setData({...context, modal:"importUnanswerQuestion"})}>
                {/* <IoCreate className='text-white font-bold text-lg'/> */}
                <TfiImport className="text-white font-bold text-lg"/>
                <span>Import</span>
            </button>
          </div>
        </section>
      </Suspense>
    </Layout>
  )
}
