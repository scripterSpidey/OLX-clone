import React,{useState,useRef} from 'react'
import PhotoIcon from '../assets/icons/PhotoIcon';
import { storageRef,db,auth } from '../config/firebase';
import { uploadBytes,ref, getStorage,getDownloadURL  } from 'firebase/storage';
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SellProduct = () => {

    const [productImage,setProductImage] = useState(null);
    const [displayImage,setDisplayImage] = useState(null);
    const [errors,setErrors] = useState([])
    const productName = useRef('');
    const category = useRef('');
    const price = useRef('');
    const navigate = useNavigate();
    function handlePhoto(event){
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setProductImage(file)
        setDisplayImage(imageUrl)
    }
    function validateForm(){
        if(productName.current.value.trim() == ''){
            console.log('not a valid product name')
            setErrors(prevErrors=>[...prevErrors,'productName'])
        }else{
            setErrors(prevErrors=> prevErrors.filter(error=>error!='productName'))
        }

        if(category.current.value.trim() == ''){
            setErrors(prevErrors=>[...prevErrors,'category'])
        }else{
            setErrors(prevErrors=> prevErrors.filter(error=>error!='category'))
        }

        if(price.current.value <= 10){
            setErrors(prevErrors =>[...prevErrors,'price'])
        }else{
            setErrors(prevErrors=>prevErrors.filter(error => error!= 'price'))
        }
        if(productImage==null){
            setErrors(prevErrors=>[...prevErrors,'image'])
        }else{
            setErrors(prevErrors => prevErrors.filter(error => error!='image'))
        }
        if(errors.length) return false;
        return true;
    }

    function handleSubmit(){

        if(!validateForm()) return;
        
        onAuthStateChanged(auth, (user) => {
            if (user) {
               const uid = user.uid;
               const storage = getStorage()
               const filePath = 'images/'+productName.current.value;
               const fileRef = ref(storage,filePath)
               uploadBytes(fileRef, productImage).then((snapshot) => {
                // console.log(snapshot);
                getDownloadURL(fileRef)
                    .then((downloadURL=>{
                        console.log('URL',downloadURL);
                        addDoc(collection(db, "products"), {
                            productName:productName.current.value,
                            category:category.current.value,
                            price:price.current.value,
                            uid:uid,
                            url:downloadURL
                          })
                            .then(data=>{
                            console.log(data);
                            navigate('/')
                            })
                            .catch(error=> console.log('error on saving doc',error))
                    }))
                    .catch(error=>{
                        console.log('error on downloading', error)
                    })
              });
               
            }else{
                console.log('no user')
                navigate('/login')
            }
          })
         
    }
  return (
    <div className='w-3/5  border flex flex-col  border-black p-4 '>
      <div className='p-4 flex space-x-5 ml-5'>
        <div className='w-1/2'>
            <p className='font-bold text-xl mb-3'>INCLUDE SOME DETAILS</p>
            <div className='mb-8'>
                <p>Name of the Product</p>
                <input ref={productName} className='border border-black rounded w-full p-2'  type="text" />
                {errors.includes("productName") &&
                <p className='text-sm text-red-500'>Enter a valid product name</p>}
            </div>
            <div className='mb-8'>
                <p>Category</p>
                <input ref={category} className='border border-black rounded w-full p-2' type="text" />
                {errors.includes("category") &&
                <p className='text-sm text-red-500'>Enter a valid category</p>}
            </div>
            <div className='mb-8'>
                <p>Price</p>
                <input ref={price} className='border border-black rounded w-full p-2' type="number" />
                {errors.includes("price") &&
                <p className='text-sm text-red-500'>price can not be less than 10</p>}
            </div>
            <div>
                <label htmlFor="file_input"><PhotoIcon/></label>
                <input onChange={handlePhoto} id='file_input' style={{display:'none'}} type="file" />
                {errors.includes("image") &&
                <p className='text-sm text-red-500'>Please select an image</p>}
            </div>   
        </div>
        <div className='border p-5 w-96 h-96 border-black'>
            <img className='w-full h-full object-cover' src={displayImage} alt="selected Image" />
            
        </div>
      </div>
      <div className='flex justify-center'>
        <button
            onClick={handleSubmit} 
            className='text-white p-2 rounded-md font-bold' 
            style={{backgroundColor:'#002F34'}}>POST NOW</button>
      </div>
    </div>
    
  )
}

export default SellProduct
