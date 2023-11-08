import { RiDeleteBin6Line } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import GetAvgRating from "../../../../utils/avgRating"
import RatingStars from "../../../common/RatingStars"

import { removeFromCart } from "../../../../slices/cartSlice"

export default function RenderCartProduct() {
  const getRating = (data) => {
    const count = GetAvgRating(data)
    return count;
  }
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  return (
    <div className="flex flex-1 flex-col">
      {cart.map((product, indx) => (
        <div
          key={product.product._id}
          className={`flex w-full flex-wrap items-start justify-between gap-6 ${
            indx !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
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
              <div className="flex items-center gap-x-5">
                <p className="text-lg font-medium text-primaryColor">
                  ₹ {product?.product?.price}
                </p>
                <p className="text-sm">
                  quantity : {product?.quantity}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-primaryColor">{`${getRating(product?.ratingAndReviews) ? getRating(product?.ratingAndReviews) : "0"}`}</span>
                <RatingStars Review_Count={getRating(product?.ratingAndReviews)} />
                <span className="text-primaryColor">
                  {product?.product?.ratingAndReview?.length} Ratings
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <button
              onClick={() => dispatch(removeFromCart(product._id))}
              className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
