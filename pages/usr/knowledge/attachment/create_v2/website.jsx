import Layout from "@/components/Layouts/Layout";
import EditableText from "@/components/Templates/EditableText";
import { MyContext } from "@/context/MyProvider";
import KnowledgeRepository from "@/repositories/KnowledgeRepository";
import { Notify } from "@/utils/scriptApp";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Suspense, useContext, useState } from "react";
import { BsChevronRight, BsGlobe, BsSave } from "react-icons/bs";
import { IoDocumentAttachOutline } from "react-icons/io5";
import Swal from "sweetalert2";

export default function WebsiteKnowledge() {
  const context = useContext(MyContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    type_training: 2,
    name: "Untitled AI ChatBot",
    code: "",
    description: "",
    prompt: "",
    url: "",
  });

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

    const result = await KnowledgeRepository.insertKnowledge({
      xa: { XA: JSON.parse(localStorage.getItem("XA")) },
      data: data,
    });
    console.log(result);
    if (result?.type == "success") {
      if (context.dataKnowledge) {
        context.dataKnowledge.push(result.data);
      } else {
        context.setData({ ...context, dataKnowledge: [result.data] });
      }
      setLoading(false);
      router.push("/usr/knowledge/attachment?m=clm_knowledge_attachment");
    } else {
      Swal.fire({
        icon: "error",
        title: "Something Wrong",
        text: "Please try again later",
      });
      setLoading(false);
    }
  };
  return (
    <Layout
      title={"Training AI ChatBot (URL)"}
      desc={"Create and training a AI ChatBot from url website"}
    >
      <Suspense fallback={"Loading"}>
        <section className="w-full bg-zinc-100 dark:bg-dark relative h-screen flex">
          <div className="w-full xl:w-3/4 relative h-screen pt-16 overflow-y-auto">
            <div className="mx-0 xl:mx-2">
              <div className="p-3 xl:p-5">
                <div className="flex items-center gap-2 pt-1 pb-3 text-sm ">
                  <Link
                    href={
                      "/usr/knowledge/attachment?m=clm_knowledge_attachment"
                    }
                    scroll={false}
                    swallow={true}
                    className="hover:text-blue-500"
                  >
                    <h1 className="flex items-center gap-2"><IoDocumentAttachOutline className="text-xl"/> Attachment Sources</h1>
                  </Link>
                  <BsChevronRight className="text-xs font-bold"/>
                  <h1>Train AI ChatBot</h1>
                </div>
                <label className="text-base xl:text-xl dark:text-white font-semibold flex items-center gap-2">
                  <BsGlobe />
                  Training AI ChatBot from URL Website
                </label>
                <p className="font-light text-sm text-zinc-500 dark:text-zinc-300">
                  Drop your url website to AI, this action will create training
                </p>

                {/* Form */}
                <div className="pt-5 border-t mt-5">
                  <EditableText placeholder="Name of your AI ChatBot" handlerChange={value => setData({...data, name: value})} value={data.name} customCss="text-3xl" />
                  <div>
                    <EditableText placeholder="Add Description" handlerChange={value => setData({...data, description: value})} value={data.descript} customCss="text-lg mt-2" />
                  </div>

                  <div className="space-y-3 mt-5">
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
                        Save and Train My "{data.name}"
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Suspense>
    </Layout>
  );
}
