import SimulationKnowledge from "@/components/Knowledge/SimulationKnowledge";
import TableAttachmentSelected from "@/components/Knowledge/TableKnowledgeSelected";
import WhatsappIntegration from "@/components/Knowledge/Training/WhatsappIntegration";
import Layout from "@/components/Layouts/Layout";
import EditableText from "@/components/Templates/EditableText";
import { MyContext } from "@/context/MyProvider";
import KnowledgeRepository from "@/repositories/KnowledgeRepository";
import { Notify } from "@/utils/scriptApp";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { BsChevronRight, BsPlusCircle, BsSave, BsTrash } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { HiOutlinePuzzle } from "react-icons/hi";
import Swal from "sweetalert2";

export default function UpdateKnowledge() {
  const context = useContext(MyContext);
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [tab, setTab] = useState(1)

  useEffect(() => {
    if (!data) {
      getDetailKnowledge();
    }
  }, [data]);

  const getDetailKnowledge = async () => {
    const result = await KnowledgeRepository.getOneKnowledge({
      xa: { xa: JSON.parse(localStorage.getItem("XA")) },
      id: id,
    });
    if (result?.status == 0) {
        context.setData({...context, view: 3, modal: { name: "simulationKnowledge", data: result.data }})
        setData(result.data);
    } else {
      Swal.fire({
        icon: "info",
        title: "Knowledge ID not found",
        text: "You will direct to knowledge menu",
      });
      router.push("/usr/knowledge/training?m=clm_knowledge_training", { scroll: false, shallow: true });
    }
  };


  const checkInput = async () => {
    if(data.name == "") { Notify("Name is mandatory", "info"); return false }
    if(data.code == "") { Notify("Code is mandatory", "info"); return false }
    if(data.description == "") { Notify("Description is mandatory", "info"); return false }
    if(data.url == "") { Notify("URL website is mandatory", "info"); return false }
    return true
  }


  const handlerSubmit = async () => {
    setLoading(true);

    // cek validasi inputan
    const check = await checkInput()
    if(!check) {
      setLoading(false)
      return false
    }

    setLoading(true)
    const result = await KnowledgeRepository.updateKnowledge({
        xa: { xa: JSON.parse(localStorage.getItem("XA")) },
        data: data,
        id: data.id,
    });
    if (result?.type == "success") {
        if (context.dataKnowledge) {
            context.dataKnowledge.push(result.data);
        } else {
            context.setData({ ...context, dataKnowledge: [result.data] });
        }
        Swal.fire({
            icon: "success",
            title: "Knowledge updated successfully",
            text: "ID: " + data.id,
        });
        router.push("/usr/knowledge/training?m=clm_knowledge_training");
        setLoading(false);
        } else {
        Swal.fire({
            icon: "error",
            title: "Something went Wrong",
            text: "Please try again later",
        });

        setLoading(false);
    }
  };


  const handlerDelete = async () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result2) => {
          if (result2.isConfirmed) {
            const result = await KnowledgeRepository.deleteKnowledge({xa:{xa:JSON.parse(localStorage.getItem("XA"))}, data:[data.id]})
            console.log(result);
            if(result?.type == "success"){
                const deleteKnowledge = context.dataKnowledge.filter(res => res.id != data.id)
                context.setData({...context, dataKnowledge:deleteKnowledge})
                router.push("/usr/knowledge/training?m=clm_knowledge_training")
            }else{
                Swal.fire({
                    icon:"error",
                    title:"Something Wrong",
                    text:"Please try again later"
                })
        }}
    })
  }

  console.log(data)

  if(data)
  return (
    <Layout
      title={"Information of Knowledge"}
      desc={"Create and training a AI ChatBot"}
    >
      <Suspense fallback={"Loading"}>
        <section className="w-full bg-zinc-100 dark:bg-dark relative h-screen xl:flex gap-5">
          <div className="w-full xl:w-3/4 relative h-screen pt-16 overflow-y-auto ">
            <div className="mx-0 xl:mx-2">
              <div className="p-3 xl:p-5">
                <div className="flex items-center gap-2 pt-1 pb-3 text-sm ">
                  <Link
                    href={
                      "/usr/knowledge/training?m=clm_knowledge_training"
                    }
                    scroll={false}
                    swallow={true}
                    className="hover:text-blue-500"
                  >
                    <h1 className="flex items-center gap-2"><FaChalkboardTeacher className="text-xl"/> Knowledge Base</h1>
                  </Link>
                  <BsChevronRight className="text-xs font-bold"/>
                  <h1>Detail</h1>
                </div>

                {/* Form */}
                <div className="mt-5">
                    <EditableText placeholder="Name of your AI ChatBot" handlerChange={value => setData({...data, name: value})} value={data.name} customCss="text-3xl" />
                    <div>
                        <EditableText placeholder="Add Description" handlerChange={value => setData({...data, description: value})} value={data.description} customCss="text-lg mt-2" />
                    </div>

                    {/* tabs */}
                    <div class="text-sm mt-5 font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                        <ul class="flex flex-wrap -mb-px">
                            <li class="me-2">
                                <button onClick={() => setTab(1)} class={`${tab == 1 ? "text-blue-500 border-b-2 border-blue-500":"text-zinc-500 hover:text-zinc-600"} inline-block px-4 py-2 border-b-2 border-transparent rounded-t-lg`}>AI ChatBot</button>
                            </li>
                            <li class="me-2">
                                <button onClick={() => setTab(2)} class={`${tab == 2 ? "text-blue-500 border-b-2 border-blue-500":"text-zinc-500 hover:text-zinc-600"} inline-block px-4 py-2 border-b-2 border-transparent rounded-t-lg`} aria-current="page">Attachments</button>
                            </li>
                            <li class="me-2">
                                <button onClick={() => setTab(3)} class={`${tab == 3 ? "text-blue-500 border-b-2 border-blue-500":"text-zinc-500 hover:text-zinc-600"} inline-block px-4 py-2 border-b-2 border-transparent rounded-t-lg`} aria-current="page">Connections</button>
                            </li>
                            <li class="me-2">
                                <button onClick={() => setTab(4)} class={`${tab == 4 ? "text-blue-500 border-b-2 border-blue-500":"text-zinc-500 hover:text-zinc-600"} inline-block px-4 py-2 border-b-2 border-transparent rounded-t-lg`} aria-current="page">Simulation</button>
                            </li>
                            <li class="me-2">
                                <button onClick={() => setTab(5)} class={`${tab == 5 ? "text-blue-500 border-b-2 border-blue-500":"text-zinc-500 hover:text-zinc-600"} inline-block px-4 py-2 border-b-2 border-transparent rounded-t-lg`} aria-current="page">Settings</button>
                            </li>
                        </ul>
                    </div>

                    {tab == 1 && (
                        <div className="space-y-3 mt-5 mb-5">
                            <div>
                              <label
                                  htmlFor="code"
                                  className="font-bold inline-block mb-2 text-sm"
                              >
                                  Code <span className="text-red-500">*</span>
                              </label>
                              <input
                                  onChange={(e) =>
                                  setData({ ...data, code: e.target.value })
                                  }
                                  value={data.code}
                                  id="code"
                                  type="text"
                                  className="input-search w-full"
                                  placeholder="Give a code name of data"
                              />
                            </div>
                            <div>
                              <label
                                  htmlFor="prompt"
                                  className="font-bold inline-block mb-2 text-sm"
                              >
                                  Prompt
                              </label>
                              <textarea 
                                  onChange={(e) =>
                                  setData({ ...data, prompt: e.target.value })
                                  }
                                  value={data.prompt}
                                  id="prompt"
                                  className="input-search w-full"
                                  placeholder="Exp. If you don't know the answer, just say 'Saya tidak tahu'"
                              >
                              </textarea>
                            </div>
                            {
                              data?.url && (
                                <div>
                                  <label
                                      htmlFor="urlwebsite"
                                      className="font-bold inline-block mb-2 text-sm"
                                  >
                                      Url Website<span className="text-red-500">*</span>
                                  </label>
                                  <input
                                      onChange={(e) =>
                                      setData({ ...data, url: e.target.value })
                                      }
                                      value={data.url}
                                      id="urlwebsite"
                                      type="url"
                                      className="input-search w-full"
                                      placeholder="Type in https://..."
                                  />
                                </div>
                              )
                            }
                            {loading ? (
                              <div role="status">
                                <svg
                                    aria-hidden="true"
                                    className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                    />
                                    <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                    />
                                </svg>
                                <span className="sr-only">Train...</span>
                              </div>
                            ) : (
                                <button onClick={() => handlerSubmit()} className="btn-primary">
                                <BsSave />
                                    Save and Update
                                </button>
                            )}
                        </div>
                    )}
                    {tab == 2 && (
                        <TableAttachmentSelected files={data?._files ?? []}/>
                    )}
                    {tab == 3 && (
                      <div className="px-10 py-5">
                        <div className=" mb-5 ">
                          <h1 className="font-bold flex items-center gap-2 text-2xl">
                            <HiOutlinePuzzle />
                            Integration
                          </h1>
                          <p className="">Connect your konekGPT with a broad range of third-party tools and services</p>
                        </div>
                        <div className="space-y-2">
                          <div className="px-5">
                            <WhatsappIntegration knowledge={data}/>
                          </div>
                        </div>
                      </div>
                    )}
                    {tab == 4 && (
                      <div className="w-full px-10 py-5">
                        <h1 className="font-bold mb-5">Simulation on WebChat</h1>
                        <Link href={`/usr/knowledge/simulation?id=${data.id}&m=clm_knowledge_training`}><button className="btn-secondary">Click here..</button></Link>
                      </div>
                    )}
                    {tab == 5 && (
                      <div className="px-10 py-5">
                        <div className="border-b border-red-500 text-red-500">
                          <h1 className="font-bold">Danger Zone</h1>
                        </div>

                        <button className="mt-2 btn-danger" onClick={() => handlerDelete()}>
                          <BsTrash />
                          Delete this Knowledge
                        </button>
                      </div>
                    )}
                    
                    </div>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-2/5 relative h-screen pt-16 overflow-y-auto">
            <h1 className="my-5 font-bold text-blue-500">Simulation on Mobile</h1>
            {
              context.modal && context.modal.name == "simulationKnowledge" && (
                <SimulationKnowledge />
              )
            }
          </div>
        </section>
      </Suspense>
    </Layout>
  );
}
