import { useState } from "react"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import GetAvgRating from "../../../../../../../utils/avgRating"
import RatingStars from "../../../../../../common/RatingStars"

import { setOrder, setStep } from "../../../../../../../slices/orderSlice"
import IconBtn from "../../../../../../common/IconBtn"
import { useNavigate } from "react-router-dom"

export default function CourseInformationForm() {
  const getRating = (data) => {
    const count = GetAvgRating(data)
    return count;
  }
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { cart, total, totalItems } = useSelector((state) => state.cart)
  const [loading, setLoading] = useState(false)

  //   handle next button click
  const goNext = () => {
    const orderData = {
      products: cart,
      totalAmount: total,
      shippingAddress: null,
      paymentMod: null,
    }
    setLoading(true)
    dispatch(setStep(2))
    dispatch(setOrder(orderData))
    setLoading(false)

    console.log(orderData);
  }

  return (
    <div
      className="space-y-8 rounded-md border-[1px] border-shadowColor bg-white p-6"
    >
      <div className="flex flex-col gap-y-10">
        <div>
          {
            <div className="flex flex-1 flex-col">
              {cart.map((product, indx) => (
                <div
                  key={product.product._id}
                  className={`flex w-full flex-wrap items-start justify-between gap-6 ${indx !== cart.length - 1 && "border-b border-b-shadowColor pb-6"
                    } ${indx !== 0 && "mt-6"} `}
                >
                  <div className="flex flex-1 flex-col gap-4 xl:flex-row">
                    <img
                      src={product?.product?.thumbnail.image_link}
                      alt={product?.product?.productName}
                      className="h-[148px] w-[220px] rounded-lg object-cover"
                    />
                    <div className="flex flex-col space-y-1">
                      <p className="text-lg font-medium">
                        {product?.product?.productName}
                      </p>
                      <p className="text-sm text-primaryColor">
                        {product?.product?.category?.categoryName}
                      </p>
                      <p className="text-lg font-medium text-primaryColor">
                        ₹ {product?.product?.price}
                      </p>
                      <p className="text-sm font-medium text-primaryColor">
                        Quantity : {product?.quantity}
                      </p>

                      <div className="flex items-center gap-2">
                        <span className="text-primaryColor">{`${getRating(product?.ratingAndReviews) ? getRating(product?.ratingAndReviews) : "0"}`}</span>
                        <RatingStars Review_Count={getRating(product?.ratingAndReviews)} />
                        <span className="text-primaryColor">
                          {product?.product?.ratingAndReview?.length} Ratings
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
        <div className="border-t-2 border-shadowColor border-dashed pt-7">
          <h2 className="text-xl text-primaryColor">Price Details</h2>
          <div className="border-t border-shadowColor pt-3">
            <div className="flex justify-between">
              <p>Total Item :</p>
              <p className="text-primaryColor">{totalItems}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping Charge :</p>
              <p className="text-primaryColor">₹ 50</p>
            </div>
            <div className="flex justify-between items-center border-t pt-2 mt-2 border-shadowColor">
              <p>Total Amount :</p>
              <p className="text-primaryColor text-lg">₹ {total +  50}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        <button
          onClick={() => navigate('/dashboard/cart')}
          disabled={loading}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          cancel
        </button>
        <IconBtn
          disabled={loading}
          onclick={goNext}
          text={"Next"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  )
}
