import Layout from "@/components/Layouts/Layout";
import Link from "next/link";
import { Suspense } from "react";
import {
  FaChevronDown,
  FaChevronLeft,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";

export default function EditContact() {
  return (
    <Layout title="CONTACT" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <section className="w-full bg-zinc-100 relative h-screen flex">
          <div className="w-full relative h-screen pt-16 overflow-y-auto">
            <div className="mx-0 xl:mx-2 xl:flex gap-2">
              <div className="w-full xl:w-1/4 bg-white rounded-md shadow-md p-3 xl:p-5">
                <div className="flex items-center gap-2 pt-1 pb-3">
                  <Link href={"/usr/contacts"}>
                    <h1 className="badge-blue">
                      <FaChevronLeft />
                      Back
                    </h1>
                  </Link>
                  /<h1 className="text-sm">Contact Detail</h1>
                </div>

                <div className="flex items-center gap-2 py-3">
                  <div className="user-avatar bg-blue-500 w-16 h-16 text-white text-2xl">
                    Zz
                  </div>
                  <div>
                    <h1 className="font-bold text-xl">
                      Zinedine Ziddan Fahdlevy
                    </h1>
                    <p className="font-light text-sm text-gray-500 mt-1">
                      Last Active: 27 Jan 2023, 17:34 PM
                    </p>
                  </div>
                </div>

                <div className="border-t py-3">
                  <p className="text-zinc-500 text-sm uppercase dark:text-zinc-400">
                    Contact Handle
                  </p>

                  <div className="space-y-2 mt-3">
                    <div className="flex items-center gap-3">
                      <FaTelegramPlane className="text-blue-500 text-3xl" />
                      <div>
                        <h1 className="font-bold text-sm">EnzoZiddan</h1>
                        <p className="text-gray-500 text-sm font-light">
                          Zinedine Bot
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t py-3">
                  <p className="text-zinc-500 text-sm uppercase dark:text-zinc-400">
                    Contact Information
                  </p>

                  <div className="space-y-2 mt-3">
                    <div>
                      <label
                        htmlFor="fullnamecontact"
                        className="font-bold inline-block mb-1 text-sm"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="fullnamecontact"
                        type="text"
                        className="w-full block bg-zinc-50 text-sm py-2 px-2 outline-none border-2 hover:bg-zinc-100 focus:bg-white focus:border-lightPrimary"
                        placeholder=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phonecontact"
                        className="font-bold inline-block mb-1 text-sm"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phonecontact"
                        type="text"
                        className="w-full block bg-zinc-50 text-sm py-2 px-2 outline-none border-2 hover:bg-zinc-100 focus:bg-white focus:border-lightPrimary"
                        placeholder=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="emailcontact"
                        className="font-bold inline-block mb-1 text-sm"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="emailcontact"
                        type="text"
                        className="w-full block bg-zinc-50 text-sm py-2 px-2 outline-none border-2 hover:bg-zinc-100 focus:bg-white focus:border-lightPrimary"
                        placeholder=""
                      />
                    </div>
                  </div>

                  <button className="btn-primary mt-5 ml-auto">
                    Update Contact
                  </button>
                </div>
              </div>
              <div className="w-full xl:w-3/4 bg-white rounded-md shadow-md p-5">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-zinc-500 text-sm uppercase dark:text-zinc-400">
                      Conversations
                    </p>
                    <button>
                      <FaChevronDown className="text-sm text-gray-500" />
                    </button>
                  </div>
                  <div className="space-y-2 mt-5">
                    <div className="border p-2">
                      <div className="flex items-center gap-2">
                        <FaWhatsapp className="text-green-500" />
                        <h1 className="text-sm font-light">Zinedine Bot</h1>
                      </div>
                      <h1 className="mt-1 text-sm font-bold">Hallo Bot</h1>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-5">
                    <h1 className="text-sm">Showing 1-1 of 1 conversations</h1>
                    <div className="items-center space-y-2 text-xs sm:space-y-0 sm:space-x-3 sm:flex">
                      <span className="block">Page 2 of 4</span>
                      <div className="space-x-1">
                        <button
                          title="previous"
                          type="button"
                          className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4"
                          >
                            <polyline points="15 18 9 12 15 6"></polyline>
                          </svg>
                        </button>
                        <button
                          title="next"
                          type="button"
                          className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4"
                          >
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-zinc-500 text-sm uppercase dark:text-zinc-400">
                      Campaigns
                    </p>
                    <button>
                      <FaChevronDown className="text-sm text-gray-500" />
                    </button>
                  </div>

                  <div className="p-2">
                    <h1 className="font-bold text-red-500 text-sm">
                      No Campaigns
                    </h1>
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
