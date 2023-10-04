import React from 'react'
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { formatDate } from "../../../../services/formatDate"
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { deleteProduct } from "../../../../services/operations/productApi";

const ProductTable = ({products, loading, setLoading, setConfirmationModal, setAddProductModal}) => {
    const {token} = useSelector((state) => state.auth)

    const handleProductDelete = async (productId) => {
        setLoading(true);
        try {
          setConfirmationModal(null)
          const res = await deleteProduct({prodID : productId}, token);
        } catch(error) {
          console.log(error);
          console.log("deleter unsuccessfully");
        }
        setLoading(false);
      }
  return (
    <div>
        <Table className="rounded-xl border border-shadowColor bg-white">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-shadowColor px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-black">
              Products
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-black">
              Price
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-black">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {products?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-black">
                No products found
                {/* TODO: Need to change this state */}
              </Td>
            </Tr>
          ) : (
            products?.map((product) => (
              <Tr
                key={product._id}
                className="flex gap-x-10 border-b border-shadowColor px-6 py-8"
              >
                <Td className="flex flex-1 gap-x-4">
                  <img
                    src={product?.thumbnail.image_link}
                    alt={product?.productName}
                    className="h-[148px] w-[220px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-lg font-semibold text-black">
                      {product.productName}
                    </p>
                    <p className="text-xs text-subtext">
                        {product.description}
                    </p>
                    <p className="text-[12px] text-black font-semibold">
                      Created: {formatDate(product.createdAt)}
                    </p>
                    {product === null ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-shadowColor px-2 py-[2px] text-[12px] font-medium text-primaryColor">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-primaryColor text-white">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </p>
                    )}
                  </div>
                </Td>
                <Td className="text-sm font-medium text-black">
                  ₹{product.price}
                </Td>
                <Td className="text-sm font-medium text-black ">
                  <button
                    disabled={loading}
                    onClick={() => {
                      setAddProductModal({
                        headingText : "Edit Product",
                        productData : product,
                        editmod : true,
                        cancelBtn: !loading
                          ? () => setAddProductModal(null)
                          : () => {},
                      })
                    }}
                    title="Edit"
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                        setConfirmationModal({
                          text1: "Do you want to delete this product?",
                          text2:
                            "All the data related to this product will be deleted",
                          btn1Text: !loading ? "Delete" : "Loading...  ",
                          btn2Text: "Cancel",
                          btn1Handler: !loading
                            ? () => handleProductDelete(product._id)
                            : () => {},
                          btn2Handler: !loading
                            ? () => setConfirmationModal(null)
                            : () => {},
                        })
                      }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </div>
  )
}

export default ProductTable