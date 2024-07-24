/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { HiOutlineMailOpen } from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { AiOutlinePhone } from "react-icons/ai";
import clsx from "clsx";
import { twMerge } from 'tailwind-merge'
import useWithRouter from "@hooks/useWithRouter";
import { useUserStore } from "@store/useUserStore";
import person from "@assets/images/person.svg"
import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { showOptions } from "@utils/constants";

const TopHeader = ({ location }) => {

  const { current, logout } = useUserStore()

  const optionBox = useRef()
  const [isShowOptions, setIsShowOptions] = useState(false)

  useEffect(() => {
    const handleOnClick = (e) => {
      if (optionBox.current.contains(e.target)) {
        setIsShowOptions(true)
      } else setIsShowOptions(false)
    }
    window.addEventListener("click", handleOnClick)
    return () => {
      window.removeEventListener("click", handleOnClick)
    }
  }, [])

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
        <div className="flex items-center pl-8 border-l border-main-400">
          <span className="flex items-center gap-2">
            <AiOutlinePhone />
            <span className="text-gray-300">123-456-789</span>
          </span>
        </div>
        {current && (
          <div
            ref={optionBox}
            onClick={() => setIsShowOptions(!isShowOptions)}
            className="flex items-center relative cursor-pointer hover:bg-overlay-30 p-2 rounded-md gap-4 pl-8 border-l border-main-400"
          >
            <div className="flex flex-col gap-2">
              <span>{current?.name}</span>
              <span>ID: #<span>{current?.id}</span></span>
            </div>
            <img src={current?.avatar || person} alt="avatar" className="w-8 h-8 object-cover rounded-full text-white" />
            {current && isShowOptions && (
              <div className="absolute z-[1000] right-0 top-full bg-white rounded-md drop-shadow-sm flex flex-col py-2 border text-black">
                {showOptions.map((el) => (
                  <Fragment key={el.id}>
                    {current?.userRoles?.some(
                      (role) => role.roleCode === el.code
                    ) && (
                        <Link className="px-6 py-2 hover:bg-gray-100 " to={el.path}>
                          {el?.name}
                        </Link>
                      )}
                  </Fragment>
                ))}
                <span
                  onClick={() => logout()}
                  className="px-6 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default useWithRouter(TopHeader)