import Layout from '@/components/Layouts/Layout'
import { MyContext } from '@/context/MyProvider'
import KnowledgeRepository from '@/repositories/KnowledgeRepository'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Suspense, useContext, useState } from 'react'
import { BsTrash } from 'react-icons/bs'
import { FaChevronLeft } from 'react-icons/fa'
import Swal from 'sweetalert2'

export default function PDFKnowledge() {
    const context = useContext(MyContext)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    
    const [data, setData] = useState({
        "type_training": 1,
        "name": "",
        "upload": null
    })

    const handlerSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        // let obj = JSON.parse(JSON.stringify(data))
        // const dataForm = new FormData()
        // dataForm.append("upload", obj.upload)
        // obj.upload = dataForm
        // console.log(obj);

        // const result = await KnowledgeRepository.insertKnowledge({xa:{XA:JSON.parse(localStorage.getItem("XA"))}, data:obj})
        // console.log(result);
        // if(result?.type == "success"){
        //     if(context.dataKnowledge){
        //         context.dataKnowledge.push(result.data)
        //     }else{
        //         context.setData({...context, dataKnowledge:[result.data]})
        //     }
        //     setLoading(false)
        //     router.push("/usr/knowledge")
        // }else{
        //     Swal.fire({
        //         icon:"error",
        //         title:"Something Wrong",
        //         text:"Please try again later"
        //     })
        //     setLoading(false)
        // }
    }

    const handlerUploadPDF = async (e) => {
        const allowedExtensions = /(\.pdf)$/i;
        const maxSize = 5 * 1024 * 1024; // 5MB
    
        // Validasi ekstensi file
        if (!allowedExtensions.exec(e.target.value)) {
            Swal.fire({
                icon:"info",
                title:"Alert",
                text:"File harus berupa PDF!"
            })
            e.target.value = '';
            return false;
        }
    
        // Validasi ukuran file
        if (e.target.files[0].size > maxSize) {
            Swal.fire({
                icon:"info",
                title:"Alert",
                text:"File terlalu besar, maksimal 5MB!"
            })
            e.target.value = '';
            return false;
        }
        let obj = {
            name :"coba", 
            type_training:1,
            upload: e.target.files[0]
        }
        console.log(obj);

        const result = await KnowledgeRepository.insertKnowledge({xa:{XA:JSON.parse(localStorage.getItem("XA"))}, data:obj})
        console.log(result);

        // setData({...data, upload:e.target.files[0]})
    }
  return (
    <Layout title={"Create From PDF"} desc={"Halaman untuk membuat word"}>
        <Suspense fallback={"Loading"}>
            <section className="w-full bg-zinc-100 relative h-screen flex">
                <div className="w-full md:w-1/2 relative h-screen pt-16 overflow-y-auto">
                    <div className='mx-0 md:mx-2'>
                    <div className='bg-white rounded-md shadow-md p-3 md:p-5'>
                        <label className="text-zinc-500 text-base md:text-xl uppercase dark:text-zinc-400 font-semibold">Create Knowledge base from PDF</label>
                        <div className="flex items-center gap-2 pt-1 pb-3">
                            <Link href={"/usr/knowledge"}>
                                <h1 className="text-sm dark:text-zinc-400 flex items-center gap-1 text-blue-500">
                                    <FaChevronLeft />
                                    Back
                                </h1>
                            </Link>
                            /
                            <h1 className="text-sm">Build From Upload</h1>
                        </div>

                        <form onSubmit={e => handlerSubmit(e)} className='my-5 space-y-5'>
                            <div>
                                <label htmlFor='namepdf' className='font-bold inline-block mb-2'>Name <span className='text-red-500'>*</span></label>
                                <input onChange={(e) => setData({...data, name:e.target.value})} value={data.name} id='namepdf' type="text" className="w-full block bg-zinc-50 text-sm py-2 px-5 outline-none border-2 hover:bg-zinc-100 focus:bg-white focus:border-lightPrimary" placeholder='Give a name to your new data source' />
                            </div>

                            <div class="w-full">
                                {
                                    data.upload ?
                                    <div className='flex items-center justify-between border p-2'>
                                        <div className='flex items-center gap-2 w-full'>
                                            <div className='w-10 h-10 rounded-md flex items-center justify-center text-white uppercase bg-red-500 text-sm font-bold'>
                                                PDF
                                            </div>
                                            <div>
                                                <h1 className='text-sm md:text-base text-zinc-600'>{data.upload.name}</h1>
                                                <p className='text-zinc-500 text-xs md:text-sm'>{data.upload.size} Byte</p>
                                            </div>
                                        </div>
                                        <button type='button' onClick={() => setData({...data, upload:null})} className='w-10 h-10 rounded-md hover:bg-red-100 flex items-center justify-center transition-colors duration-300'>
                                            <BsTrash className='text-red-500'/>
                                        </button>
                                    </div>
                                    :
                                    <label
                                        class="flex justify-center items-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                                        <div>
                                            <span class="flex items-center space-x-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                                    stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <span class="font-medium text-gray-600">
                                                    Drop files to Attach, or 
                                                    <span class="text-blue-600 underline"> browse</span>
                                                </span>
                                            </span>
                                            <p className="text-center text-zinc-500 text-xs uppercase tracking-wider font-light">Only PDF (MAX 5MB)</p>
                                        </div>

                                        <input type="file" name="file_upload" accept=".pdf" class="hidden" onChange={(e) => handlerUploadPDF(e)}/>
                                    </label>
                                }
                            </div>
                            {
                                loading ?
                                <div role="status" >
                                    <svg aria-hidden="true" class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span class="sr-only">Loading...</span>
                                </div>
                                :
                                <button className='btn-primary'>Submit</button>
                            }
                        </form>
                    </div>
                    </div>
                </div>
            </section>
        </Suspense>
    </Layout>
  )
}
