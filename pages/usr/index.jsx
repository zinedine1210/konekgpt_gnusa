import { MyContext } from "@/context/MyProvider";
import Layout from "../../components/Layouts/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Suspense, useContext, useEffect, useState } from "react";
import {FaChevronLeft, FaInstagram, FaTelegramPlane, FaTwitter, FaWhatsapp} from "react-icons/fa"
import {HiOutlineArrowSmRight} from "react-icons/hi"


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
        <section className="w-full bg-zinc-100 relative h-screen flex">
          <div className="w-full relative pt-16 px-2">
            <div className="grid grid-cols-4 gap-5">
              <div className="bg-white shadow-md p-2">
                Data
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