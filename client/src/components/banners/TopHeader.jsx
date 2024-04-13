/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { HiOutlineMailOpen } from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { AiOutlinePhone } from "react-icons/ai";
import clsx from "clsx";
import { twMerge } from 'tailwind-merge'
import useWithRouter from "@hooks/useWithRouter";

const TopHeader = ({ location }) => {
  return (
    <div
      className={twMerge(clsx('h-[85px] w-full text-white border-b border-main-400 bg-transparent fixed z-50 top-0 flex items-center justify-between px-[100px] py-[26px]',
        location.pathname !== '/' && 'bg-main-700'))}>
      <span className="flex items-center gap-2">
        <HiOutlineMailOpen />
        <span>
          <span className="font-bold">Email us at: </span>
          <span className="text-gray-300">example@gmail.com</span>
        </span>
      </span>
      <div className="flex items-center gap-6">
        <div className="flex items-center text-xl text-gray-300 gap-6">
          <FaFacebookF size={18} />
          <FaInstagram size={18} />
          <FaYoutube size={20} />
        </div>
        <div className="flex items-center pl-8 border-1 border-main-400">
          <span className="flex items-center gap-2">
            <AiOutlinePhone />
            <span className="text-gray-300">123-456-789</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default useWithRouter(TopHeader)