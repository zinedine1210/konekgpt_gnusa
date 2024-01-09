import CardQuestion from "@/components/FAQ/CardQuestion";
import ModalInsertKnowledge from "@/components/Knowledge/ModalInsertKnowledge";
import SelectType from "@/components/Knowledge/SelectType";
import TableAttachments from "@/components/Knowledge/TableAttachments";
import TableKnowledge from "@/components/Knowledge/TableKnowledge";
import Layout from "@/components/Layouts/Layout";
import { MyContext } from "@/context/MyProvider";
import KnowledgeRepository from "@/repositories/KnowledgeRepository";
import { useContext, useState } from "react";
import { BsInfo } from "react-icons/bs";
import { IoRefresh } from "react-icons/io5";
import { TfiImport } from "react-icons/tfi";

export default function HalamanAttachment() {
  const [collect, setCollect] = useState([])
  const context = useContext(MyContext)

  const handlerSelectAll = () => {
    if(context.dataFilesKnowledge.length === collect.length){
        setCollect([])
    }else{
        let all = []
        context.dataFilesKnowledge.forEach(file => {
            all.push(file.id)
        });

        setCollect(all)
    }
  }

  return (
    <Layout title={"Attachments Knowledge"} desc={"Halaman untuk menambahkan atau upload file yang diperlukan"}>
      <section className="pt-16">
        <div className='mx-0 md:mx-2'>
          <div className='p-3 md:p-5'>
            <label className="text-sm font-bold text-zinc-600 uppercase dark:text-zinc-400">Attachments</label>
            <p className="text-sm text-zinc-500 font-light">Input your file business here to create knowledge</p>

            <div className="sm:flex sm:items-center sm:justify-between mt-5">
                <input type="search" placeholder="Filter by Name / Description" className="input-search w-full md:w-auto" />

                <div className="md:flex space-y-2 md:space-y-0 items-center justify-between gap-2 mt-2 md:mt-0">
                  <div className="group relative">
                    <div className="transition-opacity z-20 duration-300 invisible group-hover:visible opacity-0 group-hover:opacity-100 group-hover:block absolute w-72 shadow-md p-5 bg-white rounded-md top-full right-0">
                      <h1 className="text-sm font-bold">Usage Information</h1>
                      <p className="text-xs font-light mt-2">Select files you want to create and train, then enter to button <span className="font-bold">Training Bot</span>. <br /> Your training files will be added to the training page.</p>
                    </div>
                    <span className="flex items-center justify-center w-10 h-10 rounded-full text-xl font-bold bg-white border hover:bg-zinc-100 ">
                      <BsInfo className="w-6 h-6" />
                    </span>
                  </div>
                  <button className="btn-secondary" onClick={() => context.setData({...context, dataFilesKnowledge:null})}>Refresh <IoRefresh /></button>
                  <button className="btn-secondary" onClick={() => handlerSelectAll()}>
                      Select all
                  </button>
                  <SelectType />
                </div>
            </div>
            <div className="pb-10">
              {
                context.modal && context.modal.name == "insertKnowledge" ? <ModalInsertKnowledge/> : <TableAttachments collect={collect} setCollect={value => setCollect(value)}/>
              }
            </div>
          </div>
        </div>

        <div className="backdrop-blur-md w-full sticky bottom-0 left-0 px-5 py-2 border-t border-zinc-200 flex items-center justify-between">
          <h1 className="text-zinc-600 text-sm"><span className="font-bold text-3xl">{collect.length}</span> {collect.length == 1 ? "File":"Files"} Selected</h1>
          <button className="btn-primary" onClick={() => context.setData({...context, modal:{name:"insertKnowledge", files:collect}})}>
              {/* <IoCreate className='text-white font-bold text-lg'/> */}
              <TfiImport className="text-white font-bold text-lg"/>
              <span>Training Bot</span>
          </button>
        </div>
      </section>
    </Layout>
  )
}
