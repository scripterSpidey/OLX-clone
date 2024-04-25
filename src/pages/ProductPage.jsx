import React, { useEffect,useState } from 'react'
import HomeHeader from '../components/HomeHeader'
import Banner from '../components/Banner'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../config/firebase';
// import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const ProductPage = () => {
    const{productId} = useParams();
    const docRef = doc(db, "products", productId);
    

    const [productDetails,setProductDetails] = useState({});
    const [user,setUser] = useState({})
    console.log(productDetails);
    console.log(user)
    

    useEffect(()=>{
        getDoc(docRef)
        .then(product=>{
            // product.data()
            // console.log(product.data());
            const products = product.data()
            setProductDetails(products);
            const userRef = doc(db,'users',products.uid);

            getDoc(userRef)
                .then(user=>{
                    setUser(user.data())
                })
        })
    },[])
  return (
    <div>
      <HomeHeader></HomeHeader>
      <div style={{backgroundColor:'#F3F4F0'}} className='h-72 mb-7 mx-auto w-5/6 bg-red-100'><Banner/></div>
      <div className='mx-auto  bg-slate-100 flex space-x-4  w-10/12 p-4'>
        <div className='w-3/5'>
            <img className='rounded' src={productDetails.url} alt="" />
        </div>
        <div className='flex flex-col w-2/5'>
            <div className='w-full bg-white p-4 rounded border mb-4 border-gray-300'>
                <p style={{color:'#002F34'}} className='font-bold text-4xl mb-3'>{productDetails.price}</p>
                <p className='mb-3 text-lg'>{productDetails.productName}</p>
                <p className='mb-3'>{productDetails.category}</p>
                <p className=''></p>
            </div>
            <div className='bg-white p-7'>
                <div className='flex items-center space-x-5'>
                    <img className='w-20 h-20' src="https://statics.olx.in/external/base/img/avatar_2.png" alt="" />
                    <p style={{color:'#002F34'}} className='text-2xl font-bold'>{user.name}</p>
                </div>
                <div className='p-3 border border-black flex  justify-center rounded'>
                    <p style={{color:'#002F34'}} className='font-bold text-lg '>Chat with seller</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
