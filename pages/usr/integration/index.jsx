import ChannelType from "@/components/Integration/ChannelType";
import Layout from "@/components/Layouts/Layout";
import { Suspense } from "react";

export default function Integration() {
  return (
    <Layout title="HOME" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <section className="w-11/12 bg-zinc-100 relative h-screen flex">
          <ChannelType />
          <div className="w-5/6 border bg-white relative h-screen pt-16 overflow-y-auto">
            <div className="flex items-center justify-center h-full w-full">
                <div className="text-center">
                    <h1>Select your Integration Channel</h1>
                    <h1>Image here...</h1>
                </div>
            </div>
          </div>
        </section>
      </Suspense>
    </Layout>
  )
}
