import React, { useState, useEffect } from 'react'
import { getAllOrder } from '../../../../../services/operations/orderApi';
import { useSelector } from 'react-redux';
import OrderTable from './OrderTable';


const CustomerOrders = () => {
  const [tab, setTab] = useState("active");
  const [userActiveOrders, setUserActiveOrders] = useState([]);
  const [userCancelledOrders, setUserCancelledOrders] = useState([]);
  const [userCompletedOrders, setUserCompletedOrders] = useState([]);
  const [loading, setLoading] = useState();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    ;(async () => {
        setLoading(true);
        try {
            const res = await getAllOrder(token);
            setUserActiveOrders(res.userActiveOrders);
            setUserCancelledOrders(res.userCancelledOrders);
            setUserCompletedOrders(res.userCompletedOrders);
        } catch (error) {
            console.log(error);
            console.log("Could not fetch orders")
        }
        setLoading(false);
    })()
},[])


  const tabChangeHandler = (data) => {
    setTab(data);
  }

  return (
    <>
      <h1 className="mb-6 text-3xl font-medium text-black">
        Orders
      </h1>

      <div className='mb-10'>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">Select your Tab</label>
          <select id="tabs" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg">
            <option>Active Orders</option>
            <option>Completed Orders</option>
            <option>Cancelled Orders</option>
          </select>
        </div>
        <ul className="hidden text-sm font-medium text-center text-primaryColor border border-shadowColor divide-x divide-shadowColor rounded-lg  sm:flex">
          <li className="w-full">
            <button className={`inline-block w-full p-4 rounded-l-lg ${tab === "active" ? 'bg-gradient-to-r from-yellow-75 to-yellow-100 text-white' : 'bg-white' }`} onClick={() => {tabChangeHandler("active")}}>Active Orders</button>
          </li>
          <li className="w-full">
          <button className={`inline-block w-full p-4  ${tab === "completed" ? 'bg-gradient-to-r from-yellow-75 to-yellow-100 text-white' : 'bg-white'}`} onClick={() => {tabChangeHandler("completed")}}>Completed Orders</button>
          </li>
          <li className="w-full">
          <button className={`inline-block w-full p-4 rounded-r-lg ${tab === "cancelled" ? 'bg-gradient-to-r from-yellow-75 to-yellow-100 text-white' : 'bg-white'}`} onClick={() => {tabChangeHandler("cancelled")}}>Cancelled Orders</button>
          </li>
        </ul>
      </div>
      <div className='flex flex-col gap-y-8'>
        {/* Active Orders */}
        {
          tab === "active" && (
            <OrderTable heading={"Active Orders"} data={userActiveOrders} loading={loading} />
          )
        }
        {/* Completed Orders */}
        {
          tab === "completed" && (
            <OrderTable heading={"Completed Orders"} data={userCompletedOrders} loading={loading}  />
          )
        }
        {/* Cancelled Orders */}
        {
          tab === "cancelled" && (
            <OrderTable heading={"Cancelled Orders"} data={userCancelledOrders} loading={loading}  />
          )
        }
      </div>
    </>
  )
}

export default CustomerOrders
