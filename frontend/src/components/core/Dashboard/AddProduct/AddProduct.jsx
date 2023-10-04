import { useState } from "react"
import { useForm } from "react-hook-form"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import {AiOutlineClose} from "react-icons/ai"
import {addProduct} from "../../../../services/operations/productApi"
import Upload from './Upload'
import ChipInput from './ChipInput'
import { useSelector } from "react-redux"

const AddProduct = ({modalData, setAddProductModal, productCategory}) => {
    const {token} = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm()

    

    const onSubmit = async (data) => {
    
        const formData = new FormData()
        formData.append("productName", data.productTitle)
        formData.append("description", data.productShortDesc)
        formData.append("price", data.productPrice)
        formData.append("category", data.productCategory)
        formData.append("tag", JSON.stringify(data.productTags))
        formData.append("thumbnailImage", data.productImage)
        
        setLoading(true)
        const result = await addProduct(formData, token)
        setAddProductModal(null);
        setLoading(false)
    }
    

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        {
            loading === true ? (<div className="spinner"></div>) : 
            (
            <div className="w-11/12 max-w-[600px] my-8 rounded-lg border border-secondColor bg-backgroundColor p-6">
                <div className="flex relative w-full justify-center mb-4">
                    <h3 className="text-xl">{modalData?.headingText}</h3>
                    <button className="absolute right-3 text-2xl"
                    onClick={modalData?.cancelBtn}
                    >
                        <AiOutlineClose/>
                    </button>
                </div>
                <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8 rounded-md border-[1px] border-secondColor p-6"
                >
                {/* Product Title */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-5" htmlFor="courseTitle">
                    Product Title <sup className="text-pink-200">*</sup>
                    </label>
                    <input
                    id="productTitle"
                    placeholder="Enter Product Title"
                    {...register("productTitle", { required: true })}
                    className="w-full shadow-sm shadow-shadowColor outline-none border border-yellow-100 text-sm rounded-lg p-2.5"
                    />
                    {errors.productTitle && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Product title is required
                    </span>
                    )}
                </div>
                {/* Product Short Description */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
                    Product Short Description <sup className="text-pink-200">*</sup>
                    </label>
                    <textarea
                    id="productShortDesc"
                    placeholder="Enter Description"
                    {...register("productShortDesc", { required: true })}
                    className="w-full resize-x-none min-h-[130px] shadow-sm shadow-shadowColor outline-none border border-yellow-100 text-sm rounded-lg p-2.5"
                    />
                    {errors.productShortDesc && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Product Description is required
                    </span>
                    )}
                </div>
                {/* Product Price */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-5" htmlFor="coursePrice">
                    Product Price <sup className="text-pink-200">*</sup>
                    </label>
                    <div className="relative">
                    <input
                        id="productPrice"
                        placeholder="Enter Product Price"
                        {...register("productPrice", {
                        required: true,
                        valueAsNumber: true,
                        pattern: {
                            value: /^(0|[1-9]\d*)(\.\d+)?$/,
                        },
                        })}
                        className="w-full !pl-12 shadow-sm shadow-shadowColor outline-none border border-yellow-100 text-sm rounded-lg p-2.5"
                    />
                    <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-primaryColor" />
                    </div>
                    {errors.productPrice && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Product Price is required
                    </span>
                    )}
                </div>
                {/* Product Category */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-5" htmlFor="courseCategory">
                    Product Category <sup className="text-pink-200">*</sup>
                    </label>
                    <select
                    {...register("productCategory", { required: true })}
                    defaultValue=""
                    id="productCategory"
                    className="w-full shadow-sm shadow-shadowColor outline-none border border-yellow-100 text-sm rounded-lg p-2.5"
                    >
                    <option value="" disabled>
                        Choose a Category
                    </option>
                    {!loading &&
                        productCategory?.map((category, indx) => (
                        <option key={indx} value={category?._id}>
                            {category?.categoryName}
                        </option>
                        ))}
                    </select>
                    {errors.productCategory && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Product Category is required
                    </span>
                    )}
                </div>
                {/* Course Tags */}
                <ChipInput
                    label="Tags"
                    name="productTags"
                    placeholder="Enter Tags and press Enter"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    getValues={getValues}
                /> 
                {/* Product Thumbnail Image */}
                <Upload
                    name="productImage"
                    label="Product Thumbnail"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    editData={ null}
                />
                {/* Buttons */}
                <div className="flex justify-end gap-x-3">
                    <button type="submit" className="flex items-center rounded-[8px] bg-gradient-to-r from-yellow-100 to-yellow-200 text-white shadow-lg font-medium shadow-shadowColor cursor-pointer gap-x-2 py-2 px-5">Submit</button>
                    <button className="cursor-pointer rounded-md bg-white shadow-inner py-[8px] px-[20px] font-semibold"
                        onClick={modalData?.cancelBtn}
                    >Cancle</button>
                </div>
                </form>
            </div>
            )
        }
    </div>
  )
}

export default AddProduct