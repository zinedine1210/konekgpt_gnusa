import { MyContext } from "@/context/MyProvider";
import Layout from "../../components/Layouts/Layout";
import { Suspense, useContext, useState } from "react";
import { useRouter } from "next/router";


export default function LayoutQnA({children}) {
  const [data, setData] = useState(null)
  const context = useContext(MyContext)
  const router = useRouter()

  const handlerChange = value => {
    setData(value)
  }

  console.log(context.view);
  const handlerRedirect = (url) => {
      router.push(url)
      localStorage.setItem("view", 3)
      context.setData({...context, view:3})
  }
  
  return (
    <Layout title="QNA" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <section className="w-full bg-zinc-100 relative h-screen">
          {/* <div className={`${context.view == 2 ? "fixed top-0 left-0 w-screen h-screen z-20":"hidden xl:block"} xl:z-0 xl:relative xl:w-1/6 bg-white pt-16`}>
            <label className="px-3 text-xs text-zinc-500 uppercase dark:text-zinc-400">Question & Answer</label>

            <div className="space-y-2 mt-2">
                <button onClick={() => handlerRedirect("/usr/qna/service")} className={`w-full transition-all duration-300 py-2 px-3 flex gap-2 cursor-pointer relative items-center ${router.asPath == "/usr/qna/service" ? "bg-blue-100":"hover:bg-zinc-100"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>
                    <h1>Service</h1>
                </button>
                <button onClick={() => handlerRedirect("/usr/qna/unanswer-question")} className={`w-full transition-all duration-300 py-2 px-3 flex gap-2 cursor-pointer relative items-center ${router.asPath == "/usr/qna/unanswer-question" ? "bg-blue-100":"hover:bg-zinc-100"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                    </svg>
                    <h1>Unanswer Question</h1>
                </button>
            </div>
          </div> */}

          <div className="w-full border bg-white relative h-screen overflow-y-auto">
            {children}
          </div>
        </section>
      </Suspense>
    </Layout>
  )
}