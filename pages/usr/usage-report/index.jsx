import SelectBot from "@/components/Knowledge/SelectBot";
import Layout from "../../../components/Layouts/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Suspense, useContext, useState } from "react";
import SelectType from "@/components/Knowledge/SelectType";
import TableKnowledge from "@/components/Knowledge/TableKnowledge";
import SimulationKnowledge from "@/components/Knowledge/SimulationKnowledge";
import { MyContext } from "@/context/MyProvider";
import TableUsageReport from "@/components/UsageReport/TableUsageReport";


export default function UsageReport() {
  const {t} = useTranslation("common")
  const context = useContext(MyContext)
  
  return (
    <Layout title="HOME" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <section className="w-full bg-zinc-100 relative h-screen">
            <div className="px-3 md:px-5 pt-16 h-full overflow-y-auto">
                <div className="p-0 md:p-5">
                  <label className="text-sm font-bold text-zinc-600 uppercase dark:text-zinc-400">Usage Report</label>
                  <p className="text-sm text-zinc-500 font-light">Your AI understands many topics, but you can add specific knowledge about your company or products to supplement it.</p>

                  <div className="flex gap-5">
                    <div className={`my-5 w-full`}>
                      <h1 className="text-sm font-bold text-zinc-600 mb-3">All Stories Your Token</h1>
                      <div className="md:flex items-center justify-between">
                        <input type="search" className="input-search w-full md:w-auto" placeholder="Search" />

                        <div className="md:flex items-center gap-2 mt-2 md:mt-0 space-y-2 md:space-y-0">
                          {/* <SelectBot /> */}
                          {/* <SelectType /> */}
                          <button className="btn-primary">Create Token</button>
                        </div>
                      </div>
                      <div className="mt-5">
                        {/* <TableKnowledge /> */}
                        <TableUsageReport />
                      </div>
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