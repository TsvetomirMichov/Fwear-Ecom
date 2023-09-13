import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { makeRequest } from '../../makeRequest';

const Success = () => {

  const { session_id } = useParams();
  const { order_id } = useParams();
  const navigate =useNavigate()

  if(!session_id){
    navigate('/')
  }

  useEffect( () => {
    async function fetchData() {
      // You can await here
      const res = await makeRequest.post("/custom", {
        session_id: session_id,
        orderId:order_id
      });
      console.log(res)
      // ...
    }
    fetchData();
    
  }, [session_id,order_id]);

  return (
    <div>
    <h2>Payment Successful</h2>
    <p>Session ID: {session_id}</p>
    <p>Order ID: {order_id}</p>
    {/* Display additional information about the order if needed */}
  </div>
  )
  
}

export default Success