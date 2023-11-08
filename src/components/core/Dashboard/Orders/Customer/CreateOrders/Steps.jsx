import React from 'react'
import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"

const Steps = ({item, steps}) => {
    const { step } = useSelector((state) => state.order)
    return (
        <>
            <div
                className="flex flex-col items-center "
            >
                <button
                    className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${step === item.id
                            ? "border-primaryColor bg-primaryColor text-white"
                            : "border-secondColor bg-secondColor text-white"
                        } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
                >
                    {step > item.id ? (
                        <FaCheck className="font-bold text-white" />
                    ) : (
                        item.id
                    )}
                </button>

            </div>
            {item.id !== steps.length && (
                <>
                    <div
                        className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${step > item.id ? "border-yellow-50" : "border-shadowColor"
                            } `}
                    ></div>
                </>
            )}
        </>
    )
}

export default Steps