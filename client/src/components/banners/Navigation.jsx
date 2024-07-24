/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { Link, NavLink } from "react-router-dom"
import logo from '@assets/images/logo.png'
import { Button, Login } from ".."
import { navigations } from "@utils/constants"
import clsx from "clsx"
import { twMerge } from 'tailwind-merge'
import useWithRouter from "@hooks/useWithRouter"
import { useUserStore } from "@store/useUserStore"
import { useAppStore } from "@store/useAppStore"

const Navigation = ({ location }) => {

  const { token } = useUserStore()
  const { setModal } = useAppStore()

  return (
    <div className="w-full bg-transparent flex items-center justify-between fixed z-10 top-[85px] px-[100px] py-[26px]">
      <Link to="/">
        <img src={logo} alt="logo" className="object-contain" />
      </Link>
      <div className={clsx("flex items-center text-lg gap-6", location.pathname === '/' ? 'text-main-100' : 'text-gray-700')}>
        {
          navigations.map(el => (
            <NavLink
              className={({ isActive }) => clsx(
                isActive && "font-medium text-white",
                location.pathname === '/' ? '' : 'text-gray-900'
              )}
              key={el.id}
              to={el.path} 
            >
              {el.text}
            </NavLink>
          ))
        }
        {
          !token ? <Button
            className={
              twMerge(clsx(location.pathname === '/' && 'bg-transparent border-main-100 border'))
            }
            handleOnClick={() => setModal(true, <Login />)}
          >
            Sign in
          </Button>
            :
            <Button className={
              twMerge(clsx(location.pathname === '/' && 'bg-transparent border-main-100 border'))
            }>
              Add listing
            </Button>
        }
      </div>
    </div>
  )
}

export default useWithRouter(Navigation)