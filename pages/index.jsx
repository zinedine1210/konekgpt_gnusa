import Layout from "@/components/Layouts/Layout";
import Seo from "@/components/Seo";
import Link from "next/link";

export default function Login() {
  return (
    <>
        <Seo 
        title={"Login"}
        description={"Halaman Login"}
        />
        <section className="flex items-center justify-center w-full h-screen">
            <div class="bg-white dark:bg-zinc-900">
                <div class="container flex flex-col items-center justify-center min-h-screen px-6 mx-auto">
                    <div class="flex justify-center mx-auto">
                        <img class="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt=""/>
                    </div>

                    <h1 class="mt-4 text-2xl font-semibold tracking-wide text-center text-zinc-800 capitalize md:text-3xl dark:text-white">
                        welcome Back
                    </h1>

                    <div class="flex items-center mt-6">
                        <p class="text-zinc-500 dark:text-zinc-400">continue as</p>

                        <div class="flex items-center mx-2">
                            <img class="object-cover w-8 h-8 mx-1 rounded-full" src="https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt=""/>
                            <span class="mx-1 text-zinc-800 dark:text-white">Ana Williams...</span>
                        </div>

                        <button class="text-blue-500 dark:text-blue-400 focus:outline-none hover:underline">change</button>
                    </div>

                    <div class="w-full max-w-md mx-auto mt-6">
                        <form>
                            <div>
                                <label class="block mb-2 text-sm text-zinc-600 dark:text-zinc-200">Password</label>
                                <input type="password" placeholder="Enter your password" class="block w-full px-5 py-3 mt-2 text-zinc-700 placeholder-zinc-400 bg-white border border-zinc-200 rounded-lg dark:placeholder-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>

                            <a href="#" class="inline-block mt-4 text-blue-500 capitalize hover:underline dark:text-blue-400">
                                reset password?
                            </a>

                            <Link href={"/usr"}>
                                <button class="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                    “Continue”
                                </button>
                            </Link>

                            <div class="mt-6 text-center">
                                <a href="#" class="text-sm text-blue-500 hover:underline dark:text-blue-400">
                                    Don’t have an account yet? Sign up
                                </a>
                            </div>

                            <p class="mt-6 text-zinc-500 dark:text-zinc-400">
                                By clicking “Continue” above, you acknowledge that you have read and
                                understood, and agree to Our <a href="#" class="text-zinc-700 dark:text-white">Term & Conditions</a>
                                and<a href="#" class="text-zinc-700 dark:text-white"> Privacy Policy.</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
