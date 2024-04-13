/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import clsx from "clsx"
import { twMerge } from 'tailwind-merge'

const InputForm = ({
  style = 'form-input',
  containerClassname,
  label,
  id,
  type = 'text',
  register,
  errors,
  inputClassname,
  validate,
  placeholder
}) => {

  return (
    <div className={twMerge(clsx('flex flex-col gap-2 w-full'))}>
      {label &&
        <label
          htmlFor={id}
          className="font-medium text-main-700"
        >
          {label}
        </label>}
      <input
        type={type}
        id={id}
        className={twMerge(clsx(style, 'placeholder:text-xs', inputClassname))}
        {...register(id, validate)}
        placeholder={placeholder}
      />
      {errors && errors[id] && <small className="text-red-500">{errors[id]?.message}</small>}
    </div>
  )
}

export default InputForm
