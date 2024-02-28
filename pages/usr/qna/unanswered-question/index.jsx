import CardQuestion from '@/components/FAQ/CardQuestion';
import UnanswerQuestionInbox from '@/components/Inbox/TrainingID/UnanswerQuestionInbox';
import LayoutQnA from '@/components/QNA/LayoutQnA'
import ModalImport from '@/components/UnanswerQuestion/ModalImport';
import { MyContext } from '@/context/MyProvider';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { Suspense, useContext } from 'react'
import { TfiImport } from 'react-icons/tfi';

export default function UnanswerQuestion() {
  const {t} = useTranslation("common")
  const context = useContext(MyContext)


  return (
    <LayoutQnA>
        <Suspense fallback={"Loading"}>
        {
            context.modal ?
            context.modal == "importUnanswerQuestion" ?
                <ModalImport />
            :"":""
        }
        <div className="w-full bg-zinc-100 dark:bg-dark relative h-screen flex">
          <div className="w-full relative h-screen pt-16 overflow-y-auto">
              <div className='mx-0 xl:mx-2'>
              <div className='bg-white dark:bg-darkPrimary rounded-md shadow-md p-3 xl:p-5'>
                  <label className="text-base xl:text-xl dark:text-zinc-400 font-semibold">Unanswer Question</label>
                  <p className="text-xs xl:text-sm text-gray-500 font-light">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem pariatur doloribus odit doloremque voluptatibus at, eos nihil numquam aliquid in.</p>
                  {/* <div className="flex items-center gap-2 pt-1 pb-3">
                      <Link href={"/usr/faq"}>
                          <h1 className="badge-blue">
                              <FaChevronLeft />
                              Back
                          </h1>
                      </Link>
                      /
                      <h1 className="text-sm">Unanswer Question</h1>
                  </div> */}

                  <div className="sm:flex sm:items-center sm:justify-between mt-5">
                      <input type="search" placeholder="Filter by Question" className="input-search w-full xl:w-auto" />
                      <div className="flex items-center justify-between gap-2 mt-2 xl:mt-0">
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
      </div>
      </Suspense>
    </LayoutQnA>
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