import CardKnowledgeHelp from "@/components/Help/CardKnowledgeHelp";
import SelectFeature from "@/components/Help/SelectFeature";
import Layout from "@/components/Layouts/Layout";
import { MyContext } from "@/context/MyProvider";
import KnowledgeRepository from "@/repositories/KnowledgeRepository";
import Link from "next/link";
import { Suspense, useContext, useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";

export default function HalamanCreate() {
    const context = useContext(MyContext)


    useEffect(() => {
        if(!context.dataKnowledge){
            getKnowledge()
        }
    }, [context.dataKnowledge])

    const getKnowledge = async () => {
        const getxa = JSON.parse(localStorage.getItem("XA"))
        const result = await KnowledgeRepository.getAllKnowledge({xa:getxa})
        console.log(result);
        if(result?.data){
            context.setData({...context, dataKnowledge:result.data})
        }
    }
  return (
    <Layout title="HELP" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <section className="w-full bg-zinc-100 relative h-screen">
            <div className="px-3 md:px-5 pt-16 h-full overflow-y-auto">
                <div className="p-0 md:p-5">
                    <p className="text-2xl font-bold text-zinc-500 max-w-xl">Which feature do you need help with?</p>
                    <div className="flex items-center gap-2 pt-1 pb-3">
                        <Link href={"/usr/help?m=clm_help"}>
                            <h1 className="badge-blue">
                                <FaChevronLeft />
                                Back
                            </h1>
                        </Link>
                        /
                        <h1 className="text-sm">Request for help</h1>
                    </div>
                    <div className="mt-5">
                        <SelectFeature />

                        <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-5">
                            {
                                context.dataKnowledge ? 
                                context.dataKnowledge.length > 0 ?
                                context.dataKnowledge.map((item, key) => {
                                    return (
                                        <CardKnowledgeHelp key={key} item={item}/>
                                    )
                                })
                                :""
                                :""
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </Suspense>
    </Layout>
  )
}
