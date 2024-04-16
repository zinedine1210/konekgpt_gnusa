import Layout from "../../../components/Layouts/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Suspense, useContext } from "react";
import TableUsageReport from "@/components/UsageReport/TableUsageReport";


export default function UsageReport() {
  const {t} = useTranslation("common")

  return (
    <Layout title="HOME" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <section className="w-full bg-zinc-100 dark:bg-dark relative h-screen">
            <div className="px-3 xl:px-5 pt-16 h-full overflow-y-auto">
                <div className="p-0 xl:p-5">
                  <label className="text-sm font-bold text-zinc-600 uppercase dark:text-zinc-400">Usage Report</label>
                  <p className="text-sm text-zinc-500 font-light">Your AI understands many topics, but you can add specific knowledge about your company or products to supplement it.</p>

                  <div className="flex gap-5">
                    <div className={`my-5 w-full`}>
                      <h1 className="text-sm font-bold text-zinc-600 mb-3">All Stories Your Token</h1>
                      <div className="xl:flex items-center justify-between">
                        <input type="search" className="input-search w-full xl:w-auto" placeholder="Search" />

                        <div className="xl:flex items-center gap-2 mt-2 xl:mt-0 space-y-2 xl:space-y-0">
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