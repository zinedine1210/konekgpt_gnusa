import TableFAQ from '@/components/FAQ/TableFAQ';
import Layout from '@/components/Layouts/Layout';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { Suspense } from 'react'

export default function FAQ() {
  const {t} = useTranslation("common")


  return (
    <Layout title={"Halaman QNA"}>
      <Suspense fallback={"Loading"}>
        <section className="w-full bg-zinc-100 dark:bg-dark relative h-screen flex">
          <div className="w-full relative h-screen pt-16 overflow-y-auto">
            <div className='mx-0 xl:mx-2'>
              <div className='bg-white dark:bg-darkPrimary rounded-md shadow-md p-3 xl:p-5'>
                <label className="text-zinc-500 text-sm uppercase dark:text-zinc-400">frequently asked questions</label>

                <div className='my-5'>
                  <TableFAQ />
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