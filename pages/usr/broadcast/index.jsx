import BroadcastType from "@/components/Broadcast/BroadcastType";
import Layout from "@/components/Layouts/Layout";
import { Suspense } from "react";

export default function Broadcast() {
  return (
    <Layout title="Broadcast Page" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <section className="w-full bg-zinc-100 relative h-screen flex">
          <BroadcastType />
          <div className="w-5/6 border bg-white relative h-screen pt-16 overflow-y-auto">
            <div className="flex items-center justify-center h-full w-full">
                <div className="text-center">
                    <h1>Select your Broadcast Type</h1>
                    <h1>Image here...</h1>
                </div>
            </div>
          </div>
        </section>
      </Suspense>
    </Layout>
  )
}
