import { HiOutlineMailOpen } from "react-icons/hi";
import { FaFacebookF,FaInstagram, FaYoutube  } from "react-icons/fa";
import { AiOutlinePhone  } from "react-icons/ai";

const TopHeader = () => {
  return (
    <div className="h-[85px] w-full text-white border-b border-main-400 bg-transparent fixed z-50 top-0 flex items-center justify-between px-[100px] py-[26px]">
      <span className="flex items-center gap-2">
        <HiOutlineMailOpen />
        <span>
          <span className="font-bold">Email us at: </span>
          <span className="text-gray-300">example@gmail.com</span>
        </span>
      </span>
      <div className="flex items-center gap-6">
        <div className="flex items-center text-xl text-gray-300 gap-6">
          <FaFacebookF />
          <FaInstagram />
          <FaYoutube />
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

export default TopHeader