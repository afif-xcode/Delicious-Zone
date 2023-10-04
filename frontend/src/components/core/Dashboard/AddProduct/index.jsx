import { useEffect } from "react"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useState } from "react"
import {VscAdd} from "react-icons/vsc"

import ConfirmationModal from "../../../common/ConfirmationModal"
import { getAllProducts, deleteProduct } from "../../../../services/operations/productApi";
import { fetchProductCategories } from '../../../../services/operations/categoryApi'
import AddProduct from "./AddProduct"
import ProductTable from "./ProductTable"

export default function index () {
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [addProductModal, setAddProductModal] = useState(null);
  const [productCategory, setproductCategory] = useState([])
  const [products, setProducts] = useState([]);

  useEffect(() => {
      ;(async () => {
          setLoading(true);
          try {
              const res = await getAllProducts();
              setProducts(res);
          } catch (error) {
              console.log(error);
              console.log("Could not fetch category")
          }
          setLoading(false);
      })()
  },[])

  useEffect(() => {
      // Calling fetchCourseDetails fucntion to fetch the details
      ;(async () => {
          setLoading(true);
          try {
              const res = await fetchProductCategories();
              setproductCategory(res);
          } catch (error) {
              console.log(error);
              console.log("Could not fetch category")
          }
          setLoading(false);
      })()
  }, [])

  return (
    
    <div className="flex flex-col gap-y-6">
      <div className="mb-14 flex items-center justify-between">
            <h1 className="text-3xl font-medium text-richblack-5">My Products</h1>
            <button
            className="flex justify-center items-center rounded-[8px] bg-gradient-to-r from-yellow-100 to-yellow-200 text-white shadow-lg font-medium shadow-shadowColor cursor-pointer gap-x-2 py-2 px-5"
            onClick={() => {
                setAddProductModal({
                  headingText : "Add Product",
                  editmod : false,
                  cancelBtn: !loading
                    ? () => setAddProductModal(null)
                    : () => {},
                })
              }}

            >
            <VscAdd />
            Add Product
            </button>
      </div>
      <ProductTable products={products} loading={loading} setLoading={setLoading} setConfirmationModal={setConfirmationModal} setAddProductModal={setAddProductModal}/>
      <div>
              
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      {addProductModal && <AddProduct modalData={addProductModal} setAddProductModal={setAddProductModal} productCategory={productCategory} setRender={setRender} />}
    </div>
  )
}
