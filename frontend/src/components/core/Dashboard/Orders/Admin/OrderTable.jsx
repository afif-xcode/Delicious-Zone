import React from 'react'
import { NavLink } from 'react-router-dom';
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"

const OrderTable = ({heading, data, loading}) => {
  
  return (
    <div>
        <h2 className="mb-3 text-lg text-center font-medium text-black">{heading}</h2>
        <div className='flex justify-center items-center'>
        {
            loading ? (<div className='pt-16'><div className='spinner'></div></div>) : (
              <Table className="rounded-xl border border-shadowColor bg-white">
                <Thead>
                  <Tr className="flex gap-x-10 rounded-t-md border-b border-b-shadowColor px-6 py-2 divide-x-2 divide-shadowColor">
                  <Th className="flex-1 text-center text-sm font-medium uppercase text-black">
                      Order Id
                    </Th>
                    <Th className="flex-1 text-center text-sm font-medium uppercase text-black">
                      Products
                    </Th>
                    <Th className="flex-1 text-center text-sm font-medium uppercase text-black">
                      Address
                    </Th>
                    <Th className="flex-1 text-center text-sm font-medium uppercase text-black">
                      Total Amount
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.length === 0 ? (
                    <Tr>
                      <Td className="py-10 text-center text-lg  text-subtext">
                        No Orders found
                        {/* TODO: Need to change this state */}
                      </Td>
                    </Tr>
                  ) : (
                    data?.map((order) => (
                      <Tr
                        key={order._id}
                        className="flex border-b gap-x-1 text-left border-shadowColor px-3 py-8"
                      >
                        <Td className="flex flex-1">
                            <NavLink to={`/dashboard/orders/admin/${order._id}`}><p className='text-sm text-primaryColor underline'
                            >{order._id}</p></NavLink>
                        </Td>
                        <Td className="text-sm flex-1 font-medium text-black">
                          <div className='flex flex-col items-center justify-center'>
                            {
                              order?.products?.map((item, index) => (
                                <div key={item._id} className='flex gap-x-2'>
                                  <p>{index+1}.</p>
                                  <div>
                                    <div className='flex gap-x-2'>
                                      <p>Products :</p>
                                      <p>{item.product.productName}</p>
                                    </div>
                                    <div className='flex gap-x-2'>
                                      <p>Quantity :</p>
                                      <p>{item.quantity}</p>
                                    </div>
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        </Td>
                        <Td className="text-sm flex-1 font-medium text-black flex flex-col items-center">
                          <div>
                            <p>Address : {order.shippingAddress.line1}</p>
                            <p>City : {order.shippingAddress.city}</p>
                            <p>Pin : {order.shippingAddress.postalCode}</p>
                            <p>State : {order.shippingAddress.state}</p>
                          </div>
                        </Td>
                        <Td className="text-sm flex-1 font-medium text-black flex justify-center">
                          <div className='flex gap-x-1'>
                            <p>{order.totalAmount} /</p>
                            <p className='text-subtext'>{order.paymentMod}</p>
                          </div>
                        </Td>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>
            )
        }
        </div> 
    </div>
  )
}

export default OrderTable