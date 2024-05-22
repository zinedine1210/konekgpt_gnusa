import { MyContext } from '@/context/MyProvider'
import UploadFileRepository from '@/repositories/UploadFileRepository'
import moment from 'moment'
import React, { useContext } from 'react'
import { BsEye } from 'react-icons/bs'
import Swal from 'sweetalert2'

export default function CardAttach({file, handlerCheckbox, collect}) {
    const context = useContext(MyContext)

    const handleDelete = async () => {
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
                const result = await UploadFileRepository.deleteMetadata({
                    data: [file?.id],
                    XA: JSON.parse(localStorage.getItem("XA"))
                })
                if(result?.status == 0){
                    if(context?.dataFilesKnowledge){
                        const filterdelete = context.dataFilesKnowledge.filter(res => res.id !== file.id)
                        context.setData({ ...context, dataFilesKnowledge: filterdelete })
                    }
                }else{
                    Swal.fire({
                        icon:"error",
                        title:"Something Wrong",
                        text:"Please try again later"
                    })
                }
            }
        })
    }
    

  return (
    <tr>
        <td className="px-4 py-4 text-sm font-medium text-zinc-700 dark:text-white whitespace-nowrap">
            <div className="inline-flex items-center gap-x-3">
                <input type="checkbox" checked={collect.includes(file.id)} onChange={e => handlerCheckbox(file.id)} className="text-blue-500 border-zinc-300 rounded dark:bg-zinc-900 dark:ring-offset-zinc-900 dark:border-zinc-700"/>

                <div className="flex items-center gap-x-2">
                    <div className="flex items-center justify-center w-8 h-8 text-blue-500 bg-blue-100 rounded-full dark:bg-zinc-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                    </div>
                    
                    <div>
                        <h2 className="font-normal text-zinc-800 dark:text-white ">{file.filestat?.["original-name"]}</h2>
                        <p className="text-xs font-normal text-zinc-500 dark:text-zinc-400">{file.filestat?.size} KB</p>
                    </div>
                </div>
            </div>
        </td>
        <td className="px-12 py-4 text-sm font-normal text-zinc-700 dark:text-white whitespace-nowrap">
            {file.filestat?.["mime-type"]}
        </td>
        <td className="px-12 py-4 text-sm font-normal text-zinc-700 dark:text-white whitespace-nowrap">
            {file.filestat?.['size']} KB
        </td>
        <td className="px-12 py-4 text-sm font-normal text-zinc-700 dark:text-white whitespace-nowrap">
            {file?.refKey?.name?._dmsversion}
        </td>
        <td className="px-4 py-4 text-sm text-zinc-500 dark:text-zinc-300 whitespace-nowrap">{moment(file._cd.epoch_time * 1000).format("MMM DD, YYYY")}</td>
        <td className="px-4 py-4 text-sm whitespace-nowrap flex items-center gap-2">
            {/* <button className="px-1 py-1 text-zinc-500 transition-colors duration-200 rounded-lg dark:text-zinc-300 hover:bg-zinc-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                </svg>
            </button> */}
            <a target='_blank' href={file.refKey.name.url} className="flex items-center gap-1 bg-blue-100 dark:bg-blue-500 dark:hover:bg-blue-600 p-2 text-zinc-500 transition-colors duration-200 rounded-lg dark:text-white hover:bg-blue-200">
                <BsEye /> View
            </a>
            <button onClick={() => context.setData({...context, modal:{name:"insertKnowledge", files:[file.id]}})} className="bg-yellow-100 dark:bg-yellow-500 dark:hover:bg-yellow-600 p-2 text-zinc-500 transition-colors duration-200 rounded-lg dark:text-white hover:bg-yellow-200">
                Training
            </button>
            <button onClick={() => handleDelete()} className="bg-red-100 dark:bg-red-500 dark:hover:bg-red-600 p-2 text-zinc-500 transition-colors duration-200 rounded-lg dark:text-white hover:bg-red-200">
                Delete
            </button>
        </td>
    </tr>
  )
}
