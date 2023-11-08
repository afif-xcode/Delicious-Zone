import { useSelector } from "react-redux"
import Address from "./Address/Address"
import OrderSummary from "./OrderSummary/OrderSummary"
import Payment from "./Payment/Payment"

import Steps from "./Steps"
export default function RenderSteps() {
  const { step } = useSelector((state) => state.order)

  const steps = [
    {
      id: 1,
      title: "OrderSummary",
    },
    {
      id: 2,
      title: "Address",
    },
    {
      id: 3,
      title: "Payment",
    },
  ]

  return (
    <>
      <div className="relative mb-2 flex w-full justify-center">
        {steps.map((item) => (
          <Steps key={item.id} item={item} steps={steps}></Steps>
        ))}
      </div>

      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <div key={item.id}>
            <div
              className="flex min-w-[130px] flex-col items-center gap-y-2"
            >
              
              <p
                className={`text-sm ${
                  step >= item.id ? "text-primaryColor" : "text-secondColor"
                }`}
              >
                {item.title}
              </p>
            </div>
            
          </div>
        ))}
      </div>
      {/* Render specific component based on current step */}
      {step === 1 && <OrderSummary />}
      {step === 2 && <Address />}
      {step === 3 && <Payment />}
    </>
  )
}
