import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import ProductCard from "../components/core/Catalog/ProductCard"
import ProductSlider from "../components/core/Catalog/ProductSlider"
import { fetchCategoryPageDetails } from '../services/operations/categoryApi'

function Catalog() {
    const [loading, setLoading] = useState(false);
    const { categoryId } = useParams()
    const [active, setActive] = useState(1)
    const [catalogPageData, setCatalogPageData] = useState(null)

    useEffect(() => {
        // Calling fetchCourseDetails fucntion to fetch the details
        ;(async () => {
            setLoading(true);
            try {
                const res = await fetchCategoryPageDetails(categoryId);
                setCatalogPageData(res);
            } catch (error) {
                console.log(error);
                console.log("Could not fetch category")
            }
            setLoading(false);
        })()
    }, [categoryId])

    if (loading || !catalogPageData) {
        return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
        </div>
        )
    }

  return (
    <>
      {/* Hero Section */}
      <div className="box-content px-4 bg-backgroundColor bg-opacity-30 py-12">
        <div className="mx-auto flex min-h-[260px]max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-primaryColor">
              {catalogPageData?.selectedCategory?.categoryName}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.selectedCategory?.categoryName}
          </p>
          <p className="max-w-[870px] text-balck">
            {catalogPageData?.selectedCategory?.subHeading}
          </p>
          <p className="max-w-[870px] text-black">
            {catalogPageData?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Product to get you started</div>
        <div className="mb-4 flex border-b border-b-shadowColor text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b-[3px] border-b-primaryColor text-primaryColor"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Populer
          </p>
          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b-[3px] border-b-primaryColor text-primaryColor"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div className="flex justify-center items-center">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {
              catalogPageData?.selectedCategory?.products.map((product, i) => (
                <ProductCard product={product} Height={"h-[250px]"} />
              ))
            }
          </div>
        </div>
      </div>
      {/* Section 2 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">
          Top products in {catalogPageData?.differentCategory?.categoryName}
        </div>
        <div className="py-8">
          <ProductSlider
            Products={catalogPageData?.differentCategory?.products}
          />
        </div>
      </div>

    </>
  )
}

export default Catalog
