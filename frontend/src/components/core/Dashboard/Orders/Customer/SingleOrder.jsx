import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderDetails } from '../../../../../services/operations/orderApi';
import { io } from "socket.io-client"
import { FaCheck } from "react-icons/fa"
import {MdDeliveryDining} from "react-icons/md"
import { GiConfirmed, GiCancel } from "react-icons/gi"
import { HiMiniShoppingBag } from "react-icons/hi2"

const SingleOrder = () => {
  const orderStatus = ['Ordered', "Confirmed", "Shipped", "Delivery", "Completed", "Cancelled"];
  const [orderDetails, setOrderDetails] = useState({});
  const [address, setAddress] = useState({});
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState();
  const { token } = useSelector((state) => state.auth);
  const { id } = useParams();
  useEffect(() => {
    ; (async () => {
      setLoading(true);
      try {
        const orderId = id;
        const res = await getOrderDetails(token, orderId);
        setOrderDetails(res);
        setAddress(res.shippingAddress)
        setStatus(res.status);
      } catch (error) {
        console.log(error);
        console.log("Could not fetch orders")
      }
      setLoading(false);
    })()
  }, [])

  var socket = io.connect('http://localhost:4000');

  useEffect(() => {
    socket.emit('join', { orderId: id });

    socket.on("orderUpdated", function (data) {
      setStatus(data.status);
    })

  }, [])
  return (
    <>
      <h1 className="mb-6 text-3xl font-medium text-black">
        Order Status
      </h1>
      <div className='flex justify-between'>
        <div className=''>
          <span className='bg-[#61d461] text-white text-sm px-2 py-0.5 rounded-2xl'>Order Id: {orderDetails._id}</span>
          <ol className="relative text-gray-500 mt-5 border-l-2 border-secondColor dark:border-gray-700 dark:text-gray-400 translate-x-4">
            <li className="mb-20 ml-6 flex items-center gap-x-4">
                <span className="absolute flex items-center text-white justify-center w-10 h-10 bg-primaryColor rounded-full -left-5 ring-4 ring-white">
                      <FaCheck/>
                </span>
              <h3 className="font-medium text-primaryColor leading-tight pl-2">Ordered</h3>
            </li>
            <li className="mb-20 ml-6 flex items-center gap-x-4">
              {
                orderStatus.indexOf(status) >= 1 ? (
                  <span className="absolute flex items-center text-white justify-center w-10 h-10 bg-primaryColor rounded-full -left-5 ring-4 ring-white">
                      <FaCheck/>
                  </span>
                ) : (
                  <span className="absolute flex items-center text-xl text-white justify-center w-10 h-10 bg-secondColor rounded-full -left-5 ring-4 ring-white">
                    <GiConfirmed/>
                  </span>
                )
              }
              <h3 className={`font-medium leading-tight pl-2 ${orderStatus.indexOf(status) >= 1 ? ("text-primaryColor") : ("text-secondColor")}`}>Confirmed</h3>
            </li>
            <li className="mb-20 ml-6 flex items-center gap-x-4">
              {
                orderStatus.indexOf(status) >= 2 ? (
                  <span className="absolute flex items-center text-white justify-center w-10 h-10 bg-primaryColor rounded-full -left-5 ring-4 ring-white">
                      <FaCheck/>
                  </span>
                ) : (
                  <span className="absolute flex items-center text-xl text-white justify-center w-10 h-10 bg-secondColor rounded-full -left-5 ring-4 ring-white">
                    <HiMiniShoppingBag/>
                  </span>
                )
              }
              <h3 className={`font-medium leading-tight pl-2 ${orderStatus.indexOf(status) >= 2 ? ("text-primaryColor") : ("text-secondColor")}`}>Shipped</h3>
            </li>
            <li className="mb-20 ml-6 flex items-center gap-x-4">
              {
                orderStatus.indexOf(status) >= 3 ? (
                  <span className="absolute flex items-center text-white justify-center w-10 h-10 bg-primaryColor rounded-full -left-5 ring-4 ring-white">
                      <FaCheck/>
                  </span>
                ) : (
                  <span className="absolute flex items-center text-2xl text-white justify-center w-10 h-10 bg-secondColor rounded-full -left-5 ring-4 ring-white">
                    <MdDeliveryDining/>
                  </span>
                )
              }
              <h3 className={`font-medium leading-tight pl-2 ${orderStatus.indexOf(status) >= 3 ? ("text-primaryColor") : ("text-secondColor")}`}>Delivery</h3>
            </li>
            <li className="ml-6 flex items-center">
              {
                status !== "Cancelled" ? (
                  <div className='flex items-center'>
                    <span className={`absolute flex items-center text-white justify-center w-10 h-10 rounded-full -left-5 ring-4 ring-white ${orderStatus.indexOf(status) >= 4 ? ("bg-primaryColor") : ("bg-secondColor")}`}>
                    <FaCheck/>
                    </span>
                    <h3 className={`font-medium leading-tight pl-2 ${orderStatus.indexOf(status) >= 4 ? ("text-primaryColor") : ("text-secondColor")}`}>Completed</h3>
                  </div>
                ):
                (
                  <div className='flex items-center'>
                    <span className={`absolute flex items-center text-xl text-white justify-center w-10 h-10 rounded-full -left-5 ring-4 ring-white ${orderStatus.indexOf(status) >= 4 ? ("bg-primaryColor") : ("bg-secondColor")}`}>
                      <GiCancel/>
                    </span>
                    <h3 className="font-medium leading-tight pl-2 text-primaryColor">Cancelled</h3>
                  </div>
                )
              }
            </li>
          </ol>
        </div>
        <div>
            <h3></h3>
            <div>
              <p>Address : {address.line1}</p>
              <p>City : {address.city}</p>
              <p>State : {address.state}</p>
              <p>Pin : {address.postalCode}</p> 
            </div>
        </div>
      </div>
    </>
  )
}

export default SingleOrder