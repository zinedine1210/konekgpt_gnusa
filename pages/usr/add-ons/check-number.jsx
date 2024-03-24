import Layout from '@/components/Layouts/Layout'
import { MyContext } from '@/context/MyProvider';
import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'

export default function HalamanCheckNumberAddOns() {
  const router = useRouter()
  console.log(router);
  const context = useContext(MyContext)
  const { svid } = router.query
  console.log(context.structured);

  useEffect(() => {
    if(!context.structured){
      const getData = JSON.parse(localStorage.getItem("structuredData"))
      if(getData){
        context.setData({...context, structured:getData})
      }else{
        getDataStructured()
      }
    }
  }, [])

  const getDataStructured = async () => {
    const result = await axios.get("/structure.json")
    console.log(result);
    localStorage.setItem("structuredData", JSON.stringify(result.data))
    context.setData({...context, structured:result.data})
  }

  const handlerEvent = async () => {
    let obj = context.structured.client_service
    obj['clientId'] = "wieY6ama" // belum dapat id clientnya
    obj['serviceId'] = svid
    obj['id'] = 4 // manual input

    if(localStorage.getItem("eventAddOns")){
      const json = JSON.parse(localStorage.getItem("eventAddOns"))
      json.push(obj)
      localStorage.setItem("eventAddOns", JSON.stringify(json))
    }else{
      localStorage.setItem("eventAddOns", JSON.stringify([obj]))
    }

    const data = JSON.parse(localStorage.getItem("client_menus"))
    data[0].menus.find(res => res.id == "clm_check_number" || res.parent == "clm_check_number").show = true
    
    localStorage.setItem("client_menus", JSON.stringify(data))
    context.setData({...context, menus:data})

    router.push("/usr/check-number?m=clm_check_number")
  }

  const event = context?.structured?.services.find(res => res.id == svid)
  if(context.structured && event)

  return (
    <Layout title="Check Number">
        <section className='pt-16 px-2 xl:px-5'>
            <div className='bg-white w-full xl:w-1/2 rounded-md shadow-md p-3 xl:p-10'>
                <h1 className='font-bold uppercase text-xl'>Check Number</h1>
                <div className='mt-5'>
                <p className='text-base text-zinc-500'>{event.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non repudiandae recusandae soluta. Itaque porro explicabo ipsam error sequi, possimus assumenda dolorum exercitationem libero iure beatae veniam? Tempore quisquam eveniet cum aperiam numquam culpa. Commodi voluptatem ipsum atque, quo voluptate nihil. Praesentium delectus nisi alias laborum itaque placeat hic reprehenderit, illum in amet at cupiditate ut ad! Ad adipisci aspernatur, harum eum sequi doloremque ab officia facere incidunt illum unde. Debitis, est quia architecto quas possimus quaerat nostrum eius eaque laboriosam vitae expedita ratione vero velit incidunt illo? Natus atque recusandae dicta id vero. Ex magni laborum harum, vitae sit aliquid?</p>
                <button className='btn-primary mt-10' onClick={() => handlerEvent()}>Create</button>
                </div>
            </div>
        </section>
    </Layout>
  )
}
