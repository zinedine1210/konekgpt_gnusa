import { MyContext } from "@/context/MyProvider";
import Layout from "../../components/Layouts/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Suspense, useContext, useEffect, useState } from "react";
import {FaChevronLeft, FaInstagram, FaTelegramPlane, FaTwitter, FaWhatsapp} from "react-icons/fa"
import {HiOutlineArrowSmRight} from "react-icons/hi"
import DonatChart from "@/components/Dashboard/DonatChart";
import BasicBar from "@/components/Dashboard/BasicBar";
import StackedADP from "@/components/Dashboard/StackedADP";


export default function Dashboard() {
  const {t} = useTranslation("common")
  const [data, setData] = useState(null)
  const context = useContext(MyContext)

  const handlerChange = value => {
    setData(value)
  }
  
  return (
    <Layout title="HOME" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <section className="w-full bg-zinc-100 dark:bg-dark relative flex">
          <div className="w-full relative pt-16 px-2">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
              <div
                className="bg-no-repeat relative bg-cover bg-center p-4 rounded-[6px] h-full"
                style={{
                  backgroundImage: `url(/images/widget-bg-1.png)`,
                }}
              >
                <div className="max-w-[169px]">
                  <div className="text-xl font-medium text-slate-900 mb-2">
                    Upgrade your KonekGpt
                  </div>
                  <p className="text-sm text-slate-800">Pro plan for better results</p>
                </div>
                <div className="absolute top-1/2 right-5 -translate-y-1/2 ltr:right-6 rtl:left-6 mt-2 h-12 w-12 bg-white text-slate-900 rounded-full text-xs font-medium flex flex-col items-center justify-center">
                  Now
                </div>
              </div>
            </div>

            <div className="xl:flex gap-5 mt-5">
              <div className="w-full xl:w-2/5 space-y-5">
                <DonatChart judul={"Chart"}/>
                <BasicBar />
              </div>
              <StackedADP judul="Chart"/>
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