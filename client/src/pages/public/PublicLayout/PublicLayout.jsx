/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { Navigation, TopHeader } from "@components/index"
import useWithRouter from "@hooks/useWithRouter"
import clsx from "clsx"
import { Outlet } from 'react-router-dom'

const PublicLayout = ({location}) => {
  return (
    <main>
      <TopHeader />
      <Navigation />
      <div className={clsx(location.pathname === '/' ? 'pt-0' : "pt-[232px]")}>
        <Outlet />
      </div>
    </main>
  )
}

export default useWithRouter(PublicLayout)