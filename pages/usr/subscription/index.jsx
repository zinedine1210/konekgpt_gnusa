import { MyContext } from "@/context/MyProvider";
import Layout from "../../../components/Layouts/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Suspense, useContext, useEffect, useState } from "react";
import {FaChevronLeft, FaInstagram, FaTelegramPlane, FaTwitter, FaWhatsapp} from "react-icons/fa"
import {HiOutlineArrowSmRight} from "react-icons/hi"


export default function Subscription() {
  const {t} = useTranslation("common")
  const [data, setData] = useState(null)
  const context = useContext(MyContext)

  const handlerChange = value => {
    setData(value)
  }
  
  return (
    <Layout title="SUBSCRIPTION" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <section className="w-full bg-zinc-100 relative h-screen">
            <div className="px-3 md:px-5 pt-16 h-full overflow-y-auto">
                <div className="p-0 md:p-5">
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