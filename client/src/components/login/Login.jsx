/* eslint-disable react-hooks/rules-of-hooks */
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { twMerge } from "tailwind-merge";
import { useAppStore } from "@store/useAppStore";
import { useUserStore } from "@store/useUserStore";
import auth from "@utils/firebase.config";
import { apiRegister, apiSignIn } from "@apis/auth";
import { Button, InputForm, InputRadio, OtpVerifier } from "..";
import useWithRouter from "@hooks/useWithRouter";

const Login = ({ navigate }) => {
  const [variant, setVariant] = useState("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const { setModal } = useAppStore();
  const [isShowConfirmOTP, setIsShowConfirmOTP] = useState(false);
  const { setToken, listRoles } = useUserStore();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()

  useEffect(() => {
    reset()
  }, [variant])

  // Create captcha if have not exist!!!
  const handleCaptchaVerify = () => {
    if (!window.recaptchVerify) {
      window.recaptchVerify = new RecaptchaVerifier(
        auth,
        "recaptcha-verifier",
        {
          size: "invisible",
          callback: () => {},
          "expired-callback": () => {}
        }
      );
    }
  }

  const handleSendOTP = (phone) => {
    setIsLoading(true)
    handleCaptchaVerify()
    const verifier = window.recaptchVerify
    const formatPhone = "+84" + phone.slice(1)
    signInWithPhoneNumber(auth, formatPhone, verifier)
      .then((result) => {
        setIsLoading(false)
        window.confirmationResult = result
        toast.success("Sent OTP your phone")
        setIsShowConfirmOTP(true)
      })
      .catch((error) => {
        setIsLoading(false)
        window.isSentOTP = false
        toast.error("Something went wrong")
        console.log('VVVERROR: ', error)
      })
  }

  const onSubmit = async (data) => {
    if (variant === "REGISTER") {
      if (data?.roleCode !== "ROL7") {
        handleSendOTP(data.phone)
      } else handleRegister(data)
    }
    if (variant === "LOGIN") {
      const { name, role, ...payload } = data
      const response = await apiSignIn(payload)
      if (response.success) {
        toast.success(response.toastMessage)
        setToken(response.accessToken)
        setModal(false, null)
      } else toast.error(response.toastMessage)
    }
  }

  const handleRegister = async (data) => {
    const response = await apiRegister(data)
    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Congratulation",
        text: response.mes,
        showConfirmButton: true,
        confirmButtonText: "Go Sign In",
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          setVariant("LOGIN")
          setIsShowConfirmOTP(false)
        }
      })
    } else toast.error(response.toastMessage)
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={twMerge(
        clsx(
          "bg-white relative text-base rounded-md px-6 py-8 w-[500px] items-center flex flex-col gap-6",
          isShowConfirmOTP && "w-[600px] h-[270px]"
        )
      )}
    >
      {isShowConfirmOTP && (
        <div className="absolute inset-0 bg-white rounded-md">
          <OtpVerifier cb={handleSubmit(handleRegister)} />
        </div>
      )}
      <h1 className="text-3xl font-Agbalumo font-semibold tracking-tight">
        Welcome to Real Estate
      </h1>
      <div
        className={twMerge(
          clsx(
            "flex border-b w-full justify-start  gap-6",
            isShowConfirmOTP && "hidden"
          )
        )}
      >
        <span
          onClick={() => setVariant("LOGIN")}
          className={clsx(
            variant === "LOGIN" && "border-b-4  border-main-700",
            "cursor-pointer"
          )}
        >
          Login
        </span>
        <div id="recaptcha-verifier"></div>
        <span
          onClick={() => setVariant("REGISTER")}
          className={clsx(
            variant === "REGISTER" && "border-b-4  border-main-700",
            "cursor-pointer"
          )}
        >
          New account
        </span>
      </div>
      <form
        className={twMerge(
          clsx("flex w-full px-4 flex-col gap-4", isShowConfirmOTP && "hidden")
        )}
      >
        <InputForm
          label="Phone Number"
          inputClassname="rounded-md"
          register={register}
          id="phone"
          placeholder="Type your phone number"
          validate={{
            required: "This field cannot empty.",
            // pattern: {
            //   value: /(|0[1|3|5|7|8|9])+([0-9]{8})\b/,
            //   message: "Phone number invalid",
            // },
          }}
          errors={errors}
        />
        <InputForm
          label="Password"
          inputClassname="rounded-md"
          register={register}
          id="password"
          placeholder="Type your password"
          validate={{ required: "This field cannot empty." }}
          type="password"
          errors={errors}
        />
        {variant === "REGISTER" && (
          <InputForm
            label="Your fullname"
            inputClassname="rounded-md"
            register={register}
            id="name"
            placeholder="Type your name"
            validate={{ required: "This field cannot empty." }}
            errors={errors}
          />
        )}
        {variant === "REGISTER" && (
          <InputRadio
            label="Type account"
            register={register}
            id="roleCode"
            validate={{ required: "This field cannot empty." }}
            optionClassname="grid grid-cols-3 gap-4"
            errors={errors}
            options={listRoles
              ?.filter((el) => el.code !== "ROL1")
              .map((el) => ({ label: el.value, value: el.code }))}
          />
        )}

        <Button
          disabled={isLoading}
          handleOnClick={handleSubmit(onSubmit)}
          className="py-2 my-6"
        >
          {variant === "LOGIN" ? "Sign In" : "Register"}
        </Button>
        <span className="cursor-pointer text-main-500 hover:underline w-full text-center">
          Forgot your password
        </span>
      </form>
    </div>
  );
};

export default useWithRouter(Login)
