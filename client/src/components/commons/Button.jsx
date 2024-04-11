/* eslint-disable react/prop-types */
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const Button = (props) => {
  const {
    children,
    className,
    onClick,
    type='button'
  } = props

  return (
    <button 
      type={type}
      onClick={onClick}
      className={twMerge(clsx('py-3 px-4 text-white bg-main-700 rounded-md', className))}
    >
      {children}
    </button>
  )
}

export default Button;
