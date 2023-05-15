import CardQuestion from "@/components/FAQ/CardQuestion";
import Layout from "@/components/Layouts/Layout";
import Link from "next/link";
import { Suspense } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";

export default function CreateFAQ() {
  return (
    <Layout title="HOME" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <section className="w-11/12 bg-zinc-100 relative h-screen flex">
          <div className="w-full relative h-screen pt-16 overflow-y-auto">
            <div className='mx-2'>
              <div className='bg-white rounded-md shadow-md p-5'>
                <label class="text-zinc-500 text-xl uppercase dark:text-zinc-400 font-semibold">Frequently Asked Question Builder</label>
                <div className="flex items-center gap-2 pt-1 pb-3">
                    <Link href={"/usr/faq"}>
                        <h1 class="text-sm dark:text-zinc-400 flex items-center gap-1 text-blue-500">
                            <FaChevronLeft />
                            Back
                        </h1>
                    </Link>
                    /
                    <h1 class="text-sm">Create FAQ</h1>
                </div>

                <div class="sm:flex sm:items-center sm:justify-between mt-5">
                    <input type="search" placeholder="Filter by Question" className="input-search" />
                    <div class="flex items-center justify-between gap-2">
                        <button class="px-5 py-2 text-sm text-zinc-800 transition-colors duration-200 bg-white border rounded-lg sm:w-auto dark:hover:bg-zinc-800 dark:bg-zinc-900 hover:bg-zinc-100 dark:text-white dark:border-zinc-700">
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
            <button class="btn-primary">
                <IoCreate className='text-white font-bold text-lg'/>
                <span>Generate</span>
            </button>
          </div>
        </section>
      </Suspense>
    </Layout>
  )
}
