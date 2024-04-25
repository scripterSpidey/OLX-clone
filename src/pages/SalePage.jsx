import React from 'react'
import SellProduct from '../components/SellProduct'
const SalePage = () => {
  return (
    <div className='mx-auto w-full flex flex-col items-center justify-center'>
      <p style={{color:'#002F34'}} className='font-bold text-3xl mb-5'>POST YOUR AD</p>
      <SellProduct/> 
    </div>
  )
}

export default SalePage
