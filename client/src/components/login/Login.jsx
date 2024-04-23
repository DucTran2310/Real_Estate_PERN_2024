import { apiRegister, apiSignIn } from "@apis/auth"
import InputForm from "@components/inputs/InputForm"
import { SIGN_IN } from "@utils/constants"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import Swal from 'sweetalert2'
import { Button, InputRadio } from ".."
import { useAppStore } from "@store/useAppStore"

const Login = () => {

  const [variant, setVariant] = useState(SIGN_IN.LOGIN)
  const { register, formState: { errors }, handleSubmit, reset } = useForm()
  const { setModal } = useAppStore()

  useEffect(() => {
    reset()
  }, [reset, variant])

  const onSubmit = async (data) => {
    if (variant === SIGN_IN.REGISTER) {
      const response = await apiRegister(data)
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Congratulation",
          text: response.toastMessage,
          showConfirmButton: true,
          confirmButtonText: "Go Sign In",
        }).then(({ isConfirmed }) => {
          if (isConfirmed) {
            setVariant(SIGN_IN.LOGIN)
          }
        });
      } else toast.error(response.toastMessage)
    }

    if (variant === SIGN_IN.LOGIN) {
      const response = await apiSignIn(data)
      if (response.success) {
        toast.success(response?.toastMessage)
        setModal(false, null)
      } else {
        toast.error(response.toastMessage)
      }
    }
  }


  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white text-lg rounded-md px-6 py-8 w-[500px] flex flex-col items-center gap-6"
    >
      <h1 className="text-3xl font-semibold font-montserrat tracking-tighter">
        Welcome Real estate
      </h1>
      <div className="flex border-b w-full justify-start gap-6">
        <span
          onClick={() => setVariant(SIGN_IN.LOGIN)}
          className={clsx(variant === SIGN_IN.LOGIN && 'border-b-4 border-main-700', "cursor-pointer")}
        >
          Login
        </span>
        <span
          onClick={() => setVariant(SIGN_IN.REGISTER)}
          className={clsx(variant === SIGN_IN.REGISTER && 'border-b-4 cursor-pointer border-main-700', "cursor-pointer")}
        >
          New account
        </span>
      </div>
      <form className="w-full flex flex-col gap-4">
        <InputForm
          label='Phone number'
          inputClassname="rounded-md"
          register={register}
          type="number"
          id='phone'
          placeholder="Type your phone number here"
          validate={{
            required: "This field cannot empty.",
            pattern: {
              value: /(|0[1|3|5|7|8|9])+([0-9]{8})\b/,
              message: "Phone number invalid",
            },
          }}
          errors={errors}
        />
        <InputForm
          label='Password'
          inputClassname="rounded-md"
          register={register}
          id='password'
          placeholder="Type your password here"
          type="password"
          validate={{ required: "This field cannot empty." }}
          errors={errors}
        />
        {
          variant === SIGN_IN.REGISTER && (
            <InputForm
              label='Your Fullname'
              inputClassname="rounded-md"
              register={register}
              id='name'
              placeholder="Type your fullname here"
              validate={{ required: "This field cannot empty." }}
              errors={errors}
            />
          )
        }
        {variant === "REGISTER" && (
          <InputRadio
            label="Type account"
            register={register}
            id="role"
            validate={{ required: "This field cannot empty." }}
            optionClassname="grid grid-cols-3 gap-4"
            errors={errors}
            options={[
              { label: 'User', value: 'USER' },
              { label: 'Agent', value: 'AGENT' }
            ]}
          />
        )}
        <Button
          className="py-2 my-6"
          onClick={handleSubmit(onSubmit)}
        >
          {variant === SIGN_IN.LOGIN ? SIGN_IN.LOGIN : SIGN_IN.REGISTER}
        </Button>
        <span className="cursor-pointer text-main-500 hover:underline w-full text-center">
          Forgot your password?
        </span>
      </form>
    </div>
  )
}

export default Login