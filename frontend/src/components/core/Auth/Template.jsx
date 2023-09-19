import { useSelector } from "react-redux"

import logo from "../../../assets/Logo/logo.png"

import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="grid min-h-[calc(100vh-95px)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-textColor">
              {
                formType === "login" ? (title) : 
                (
                  <div className="flex items-center gap-x-3">
                    Join
                    <img src={logo} width={200} height={20} className="mb-4"></img>
                    today!
                  </div>
                )
              }
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-textColor">{description1}</span>{" "}
              <span className="italic bg-gradient-to-b from-yellow-100 via-yellow-100 to-yellow-200 text-transparent bg-clip-text font-bold">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
          <div className="relative mx-auto w-11/12 max-w-[600px] md:mx-0">
            <img
              src={image}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute -top-10 right-4 z-10"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Template
