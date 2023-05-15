import SelectBot from "@/components/Knowledge/SelectBot";
import Layout from "../../../components/Layouts/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Suspense, useEffect, useState } from "react";
import { BsPlusCircleDotted } from "react-icons/bs";
import {FaChevronDown, FaInstagram, FaTelegramPlane, FaTwitter, FaWhatsapp} from "react-icons/fa"
import {HiOutlineArrowSmRight} from "react-icons/hi"
import CardKnowledge from "@/components/Knowledge/CardKnowledge";
import SelectType from "@/components/Knowledge/SelectType";


export default function Knowledge() {
  const {t} = useTranslation("common")
  const [data, setData] = useState(null)

  const handlerChange = value => {
    setData(value)
  }
  
  return (
    <Layout title="HOME" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <section className="w-11/12 bg-zinc-100 relative h-screen">
            <div className="px-5 pt-16 h-full overflow-y-auto">
                <div className="p-5">
                  <label class="text-sm font-bold text-zinc-600 uppercase dark:text-zinc-400">Knowledge Base</label>
                  <p className="text-sm text-zinc-500 font-light max-w-xl">Your AI understands many topics, but you can add specific knowledge about your company or products to supplement it.</p>

                  <div className="my-5">
                    <h1 className="text-sm font-bold text-zinc-600 mb-3">All Stories Your Bot</h1>
                    <div className="flex items-center justify-between">
                      <input type="search" className="input-search" placeholder="Search" />

                      <div className="flex items-center gap-2">
                        <SelectBot />
                        <SelectType />
                      </div>
                    </div>
                    <div className="mt-5">
                    <table class="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
                            <thead class="">
                                <tr>
                                    <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                        <div class="flex items-center gap-x-3">
                                            {/* <input type="checkbox" class="text-blue-500 border-zinc-300 rounded dark:bg-zinc-900 dark:ring-offset-zinc-900 dark:border-zinc-700"/> */}
                                            <span>User Query</span>
                                        </div>
                                    </th>

                                    <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                        Status
                                    </th>

                                    <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                        Created At
                                    </th>

                                    <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                        Type
                                    </th>

                                    <th scope="col" class="relative py-3.5 px-4">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-zinc-200 dark:divide-zinc-700 dark:bg-zinc-900">
                              {
                                new Array(10).fill("coba").map((item, key) => {
                                  return <CardKnowledge key={key}/>
                                })
                              }
                              
                            </tbody>
                        </table>
                    </div>
                  </div>
                </div>
            </div>
        </section>
      </Suspense>
    </Layout>
  )
}



export async function getServerSideProps({ locale }) {

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    }
  };
}