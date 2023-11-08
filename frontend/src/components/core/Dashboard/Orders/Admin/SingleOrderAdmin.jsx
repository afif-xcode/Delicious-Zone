import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderDetails } from '../../../../../services/operations/orderApi';
import {TbExchange} from "react-icons/tb"
import { useForm } from 'react-hook-form';
import {updateOrderStatus } from '../../../../../services/operations/orderApi';

const SingleOrder = () => {
    const [orderDetails, setOrderDetails] = useState({});
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
                setStatus(res.status)
            } catch (error) {
                console.log(error);
                console.log("Could not fetch orders")
            }
            setLoading(false);
        })()
    }, [])

    const orderStatus = ['Ordered', "Confirmed", "Shipped", "Delivery", "Completed", 'Cancelled'];
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const formData = new FormData()
        formData.append("status", data.orderStatus)
        formData.append("orderId", id);
        setLoading(true)
        const result = await updateOrderStatus(token, formData)
        if(result) {
            setStatus(data.orderStatus);
        }
        setLoading(false)
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-y-4'>
                <p>Current Status : {status}</p>
                <div className='flex flex-col'>
                    <select
                        id="orderStatus"
                        className="border border-shadowColor text-primaryColor outline-none text-sm rounded-sm px-3"
                        {...register("orderStatus", { required: true })}
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Choose a Status
                        </option>
                        {
                            orderStatus.map((status, index) => (
                                <option value={status} key={index}>{status}</option>
                            ))
                        }
                    </select>
                </div>
                <button type='submit' className='flex items-center rounded-[8px] bg-gradient-to-r from-yellow-100 to-yellow-200 text-white shadow-lg font-medium shadow-shadowColor cursor-pointer gap-x-2 py-1 px-2'>Change <TbExchange /></button>
            </form>
        </div>
    )
}

export default SingleOrder