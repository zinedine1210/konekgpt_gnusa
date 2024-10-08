import Layout from "@/components/Layouts/Layout";
import { MyContext } from "@/context/MyProvider";
import KnowledgeRepository from "@/repositories/KnowledgeRepository";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import Swal from "sweetalert2";

export default function UpdateUploadFile() {
  const context = useContext(MyContext);
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(null);

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
    console.log(result);
    if (result?.status == 0) {
      setData(result.data);
    } else {
      Swal.fire({
        icon: "info",
        title: "Knowledge ID not found",
        text: "You will direct to knowledge menu",
      });
      router.push("/usr/knowledge", { scroll: false, shallow: true });
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    setLoading(true);
    const result = await KnowledgeRepository.updateKnowledge({
      xa: { xa: JSON.parse(localStorage.getItem("XA")) },
      data: data,
      id: data.id,
    });
    console.log(result);
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

  return (
    <Layout title={"Update Knowledge"} desc={"Halaman untuk update knowledge"}>
      <Suspense fallback={"Loading"}>
        <section className="w-full bg-zinc-100 dark:bg-dark relative h-screen flex">
          <div className="w-full relative h-screen pt-16 overflow-y-auto">
            <div className="mx-0 xl:mx-2">
              {data ? (
                <div className="w-full xl:w-1/2 bg-white dark:bg-darkPrimary rounded-md shadow-md p-3 xl:p-5">
                  <label className="text-base xl:text-xl dark:text-white font-semibold">
                    Update Information Training Knowledge
                  </label>
                  <p className="text-zinc-600 text-sm dark:text-zinc-300">ID: {data.id}</p>
                  <div className="flex items-center gap-2 pt-1 pb-3">
                    <Link
                      href={"/usr/knowledge/training?m=clm_knowledge_training"}
                    >
                      <h1 className="badge-blue">
                        <FaChevronLeft />
                        Back
                      </h1>
                    </Link>
                    /<h1 className="text-sm">Update Knowledge</h1>
                  </div>

                  <form
                    onSubmit={(e) => handlerSubmit(e)}
                    className="my-5 space-y-4"
                  >
                    <div>
                      <label
                        htmlFor="nameofscratch"
                        className="font-bold inline-block mb-2 text-sm"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) =>
                          setData({ ...data, name: e.target.value })
                        }
                        value={data.name}
                        id="nameofscratch"
                        type="text"
                        className="input-search w-full"
                        placeholder="Give a name to your new data source"
                      />
                    </div>
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
                        htmlFor="description"
                        className="font-bold inline-block mb-2 text-sm"
                      >
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea 
                        onChange={(e) =>
                          setData({ ...data, description: e.target.value })
                        }
                        value={data.description}
                        id="description"
                        required
                        className="input-search w-full"
                        placeholder="Update your description knowledge"
                      >
                      </textarea>
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
                        required
                        className="input-search w-full"
                        placeholder="Exp. If you don't know the answer, just say 'Saya tidak tahu'"
                      >
                      </textarea>
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
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      <button className="btn-primary" type="submit">
                        Update
                      </button>
                    )}
                  </form>
                </div>
              ) : (
                <div className="w-full xl:w-1/2 h-[500px] bg-zinc-200 animate-pulse rounded-md shadow-md"></div>
              )}
            </div>
          </div>
        </section>
      </Suspense>
    </Layout>
  );
}
