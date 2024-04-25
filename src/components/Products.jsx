import React,{useEffect,useState,useContext,createContext} from 'react';
import ProductCard from './ProductCard'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../config/firebase';

export const PostContext = createContext();


const Products = () => {
  const [products,setProducts] = useState([]);
  
  console.log(products)
  useEffect(()=>{
    getDocs(collection(db, "products"))
    .then(products=>{
      const productsData = products.docs.map(doc=>{
        return {
            id:doc.id,
            ...doc.data()
          }
      })
      setProducts(productsData)  
    })
    .catch(error=>console.log(error));
  },[])
 
  // const {postDetails,setPostDetails} = useContext(PostContext)
  
  return (
        <div>
          <div className='text-2xl'>Fresh Recomendations</div>
          <div className='w-full flex space-x-2'>
            {products.map((product,ind)=><ProductCard index={ind} product={product}/>)}
          </div>
        </div>
  )
}

export default Products
