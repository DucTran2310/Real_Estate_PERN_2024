/* eslint-disable react/prop-types */
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const Button = (props) => {
  const {
    children,
    className,
    onClick,
    type='button',
    disabled
  } = props

  return (
    <button 
      type={type}
      onClick={onClick}
      className={twMerge(
        clsx(
          'py-3 px-4 text-white bg-main-700 rounded-md flex justify-center items-center gap-3', 
          className,
          disabled && 'opacity-50'
        )
      )}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button;
