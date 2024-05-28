import logo from '@assets/images/logo.png'
import { adminSidebar } from '@utils/constants'
import { renderIcon } from '@utils/rendericon'
import clsx from 'clsx'
import { Fragment, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaChevronDown, FaChevronRight } from "react-icons/fa"
import './AdminSidebars.module.css'
import { RiShareForwardLine } from 'react-icons/ri'

const AdminSidebars = () => {

  const [activeTabs, setActiveTabs] = useState([])

  const handleActiveTabs = (tabId) => {
    if (activeTabs.some((el => el === tabId))) {
      setActiveTabs(prev => prev.filter(el => el !== tabId))
    } else {
      setActiveTabs(prev => [...prev, tabId])
    }
  }

  return (
    <div className="h-screen w-full">
      <div className="w-full flex flex-col items-center justify-center">
        <img src={logo} alt="logo" className="w-4/5 object-contain" />
        <small className='text-red-100 italic'>Admin workspace</small>
      </div>
      <div className='mt-6'>
        {
          adminSidebar.map((el) => (
            <Fragment key={el.id}>
              {
                el.type === 'SINGLE' && (
                  <NavLink
                    className={({ isActive }) => clsx('flex items-center gap-2 hover:bg-main-700 hover:border-r-4 border-orange-700 px-4 py-3',
                      isActive && 'bg-main-700 border-r-4'
                    )
                    }
                    to={el.path}
                  >
                    <span className='text-2xl'>{renderIcon(el.icon)}</span>
                    <span className='select-none'>{el.name}</span>
                  </NavLink>
                )
              }
              {
                el.type === 'PARENT' && (
                  <>
                    <div
                      className='flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-main-700'
                      onClick={() => handleActiveTabs(el.id)}
                    >
                      <span className='flex items-center gap-2'>
                        <span className='text-2xl'>{renderIcon(el.icon)}</span>
                        <span>{el.name}</span>
                      </span>
                      {activeTabs.some(tabId => tabId === el.id) ? <FaChevronDown /> : <FaChevronRight />}
                    </div>
                    {
                      activeTabs.some(tabId => tabId === el.id) &&
                      <div className={`submenu ${activeTabs.some(tabId => tabId === el.id) ? 'active' : ''}`}>
                        {
                          el.subs.map((sub) => (
                            <NavLink
                              key={sub.id}
                              className={({ isActive }) => clsx('flex items-center gap-2 hover:bg-main-700 hover:border-r-4 border-orange-700 px-4 py-3',
                                isActive && 'bg-main-700 border-r-4'
                              )
                              }
                              to={sub.path}
                            >
                              <span className='text-2xl'>{renderIcon(sub.icon)}</span>
                              <span>{sub.name}</span>
                            </NavLink>
                          ))
                        }
                      </div>
                    }
                  </>
                )
              }
            </Fragment>
          ))
        }
        <Link
          className={clsx('flex items-center gap-2 hover:bg-main-700 hover:border-r-4 border-orange-700 px-4 py-3',)}
          to={'/'}
        >
          <span className='text-2xl'>
            <RiShareForwardLine />
          </span>
          <span className='select-none'>Go homepage</span>
        </Link>
      </div>
    </div>
  )
}

export default AdminSidebars