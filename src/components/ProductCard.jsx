import React,{useContext} from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ind,product}) => {

  return (
    <Link 
      to={{
        pathname:`/product/${product.id}`,
        state:{
          url:product.url,
          productName:product.productName,
          category:product.category,
          price: product.price
        }
      }}
      className='w-1/4 p-2 border border-gray-400 rounded'>
      <div>
        <img src={product.url} alt="" />
      </div>
      <div>
        <p className='text-xl font-bold'>&#8377; {product.price}</p>
        <p>{product.productName}</p>
        <p className='text-gray-500'>{product.category}</p>
        <div>
          <p></p>
          <p></p>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
