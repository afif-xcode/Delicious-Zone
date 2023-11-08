import React, { useEffect, useState } from "react"
// Icons
import { FaRupeeSign } from "react-icons/fa"
import { Link } from "react-router-dom"
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux"

import { addToCart } from '../../../slices/cartSlice'
import { useNavigate } from "react-router-dom";

import GetAvgRating from "../../../utils/avgRating"
import RatingStars from "../../common/RatingStars"

function ProductCard({ product }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(product.ratingAndReviews)
    setAvgReviewCount(count)
  }, [product])


  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (token === null) {
      toast.error("Login to Your Account");
      navigate('/login')
      return;
    }
    dispatch(addToCart(product))
  }

  return (
    <>
      <div className="max-w-sm bg-white border border-shadowColor rounded-lg shadow shadow-shadowColor">
        <img
          className={`w-full h-[250px] object-cover rounded-t-md`}
          src={product.thumbnail.image_link}
          alt="product image"
        />
        <div className="p-5 flex flex-col gap-4">
          <div>
            <h2 className="text-lg text-left font-bold">{product.productName}</h2>
            <p className="text-subtext mb-3">
              {product.description.split(" ").length > 10
                ? product.description
                  .split(" ")
                  .slice(0, 10)
                  .join(" ") + "..."
                : product.description
              }
            </p>
            <div className="flex items-center gap-2">
              <span className="text-primaryColor bg-shadowColor py-1 px-2 rounded-lg">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-primaryColor text-sm">
                {product?.ratingAndReview?.length} Ratings
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="text-primaryColor text-2xl flex items-center font-bold"><FaRupeeSign/> {product.price}</p>
            <button
              className="outline-none flex items-center p-3 rounded-[8px] bg-gradient-to-r from-yellow-100 to-yellow-200 text-white shadow-lg font-medium shadow-shadowColor cursor-pointer gap-x-2 py-2 px-5"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCard
