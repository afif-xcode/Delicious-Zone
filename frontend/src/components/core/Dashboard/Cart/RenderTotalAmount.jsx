import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

// import { BuyCourse } from "../../../../services/operations/studentFeaturesAPI"
import IconBtn from "../../../common/IconBtn"

export default function RenderTotalAmount() {
  const { cart, total, totalItems } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const handleBuyCourse = () => {
    navigate('/dashboard/order/new-order');
  }

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-shadowColor bg-white p-6">
      <div className="flex justify-center mb-4">
        <h2>Order Details</h2>
      </div>
      <div className="flex justify-between">
        <p className="mb-1 text-xl font-medium">Total Items:</p>
        <p className="mb-1 text-xl font-medium text-primaryColor">{`${totalItems}`}</p>
      </div>
      <div className="flex justify-between">
        <p className="mb-1 text-xl font-medium">Total Amount:</p>
        <p className="mb-6 text-xl font-medium text-primaryColor">₹ {`${total}`}</p>
      </div>
      <IconBtn
        text="Check Out"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>  
  )
}
