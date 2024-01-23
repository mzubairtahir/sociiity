import React from 'react'
import loading from "./Rolling-0.6s-58px.gif";

export default function Loading() {
  return (
    <div className='d-flex justify-content-center'>
      <img src={loading} alt="loading" style={{height:"25px"}}/>

      
    </div>
  )
}
