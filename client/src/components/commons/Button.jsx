/* eslint-disable react/prop-types */
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = (props) => {
  const {
    children,
    className,
    handleOnClick,
    type = 'button',
    disabled
  } = props;

  return (
    <button 
      type={type}
      onClick={handleOnClick}
      className={twMerge(
        clsx(
          'py-3 px-4 text-white bg-main-600 rounded-md flex justify-center items-center gap-3', 
          'transition duration-300 ease-in-out transform hover:bg-main-700 hover:shadow-lg ', // Add hover effect classes
          className,
          disabled && 'opacity-50 cursor-not-allowed'
        )
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
