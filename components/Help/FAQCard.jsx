import { BsChevronRight, BsQuestionCircle } from "react-icons/bs";

export default function FAQCard() {
  return (
    <button className="border-b py-3 w-full text-start flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-sm xl:text-base"><BsQuestionCircle className="text-blue-500 text-xl" /> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, fuga!</h1>
        <BsChevronRight />
    </button>
  )
}
