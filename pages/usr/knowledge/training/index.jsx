import SelectBot from '@/components/Knowledge/SelectBot'
import SelectType from '@/components/Knowledge/SelectType'
import SimulationKnowledge from '@/components/Knowledge/SimulationKnowledge'
import TableKnowledge from '@/components/Knowledge/TableKnowledge'
import Layout from '@/components/Layouts/Layout'
import { MyContext } from '@/context/MyProvider'
import React, { Suspense, useContext, useState } from 'react'
import { IoRefresh } from 'react-icons/io5'

export default function HalamanTraining() {
  const [name, setName] = useState(null)
  const context = useContext(MyContext)


  return (
    <Layout title={"Training"}>
      <Suspense fallback={"Loading"}>
        <div className="px-5 xl:px-10 pt-20">
          <label className="text-sm font-bold text-zinc-600 uppercase dark:text-white">Knowledge Base</label>
          <p className="text-sm text-zinc-500 dark:text-zinc-300 font-light">Your AI understands many topics, but you can add specific knowledge about your company or products to supplement it.</p>

          <div className="flex gap-5">
            <div className={`my-5 w-full ${context.modal ? context.modal.name == "simulationKnowledge" ? "xl:w-auto":"xl:w-full":""}`}>
              <h1 className="text-sm font-bold text-zinc-600 mb-3 dark:text-zinc-400">All Stories Your Bot</h1>
              <div className="xl:flex items-center justify-between">
                <input type="search" className="input-search w-full xl:w-auto" placeholder="Search" />

                <div className="xl:flex items-center gap-2 mt-2 xl:mt-0 space-y-2 xl:space-y-0">
                  <button className="btn-secondary" onClick={() => context.setData({...context, dataKnowledge:null})}>Refresh <IoRefresh /></button>
                  <SelectBot setName={e => setName(e)} /> 
                  <button disabled={!name} className={`btn-primary`} onClick={() => context.setData({...context, view:3, modal:{name:"simulationKnowledge", data:name}})}>Start Simulation</button>
                </div>
              </div>
              <div className="mt-5">
                <TableKnowledge />
              </div>

            </div>
            {
              context.modal && context.modal.name == "simulationKnowledge" && (
                <SimulationKnowledge close={true}/>
              )
            }
          </div>
        </div>
      </Suspense>
    </Layout>
  )
}
