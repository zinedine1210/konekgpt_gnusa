
import Layout from "../../../components/Layouts/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Suspense, useContext, useState } from "react";


export default function Subscription() {
  const {t} = useTranslation("common")
  
  return (
    <Layout title="SUBSCRIPTION" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <section className="w-full bg-zinc-100 relative h-screen">
            <div className="px-3 xl:px-5 pt-16 h-full overflow-y-auto">
                <div className="p-0 xl:p-5">
                  <p className="text-sm font-bold text-zinc-600 uppercase dark:text-zinc-400">Subscription</p>
                  <div>
                    <input type="text" className="input-search mt-3" />
                    <button className="btn-primary mt-5">Submit</button>
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