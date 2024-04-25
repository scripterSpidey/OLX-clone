import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { auth,db } from '../config/firebase';
import {createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 

const SignUp = () => {

    const [userName,setUserName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState([])
    const navigate = useNavigate();
    function validateForm(){
        if(userName.trim()==''){
            setError(prevErrors=>[...prevErrors,'username']);
            
        }else if(error.includes('username')){
            setError(prevErrors => prevErrors.filter(error => error !== 'username'));
        }
        
        if(!(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email))){
            setError(prevErrors=>[...prevErrors,'email']);
        }else if(error.includes('email')){
            setError(prevErrors => prevErrors.filter(error => error !== 'email'))
        }

        if(password.trim().length<6){
            setError(prevErrors=>[...prevErrors,'password'])
        }else if(error.includes('password')){
            setError(prevErrors => prevErrors.filter(error => error !== 'password'))
        }

        if(error.length) return false;
        return true;
    }

    function registerUser(event){
        event.preventDefault();
        console.log('checking')
        if(!validateForm()) return;
        console.log('valid form')
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            //updating user profile name
            updateProfile(user, { displayName: userName })
            .then( () => {
                //saving user datas to databse
                console.log("Display name set successfully");
                 setDoc(doc(db,"users",user.uid), {
                    name: userName,
                    email:email,
                    password:password
                    })
                    .then(navigate('/login'))
                    .catch(error=>console.log(error))

            })
            .catch((error) => {
                console.error("Error setting display name:", error);
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });
    }
  return (
    <div className='flex justify-center items-center h-screen bg-black bg-opacity-50' >
      <div className='w-1/4'>
        <div className='p-5 bg-white flex flex-col '>
            <div className='flex items-center justify-center'>
                <img src="https://logos-world.net/wp-content/uploads/2022/04/OLX-Symbol.png" className='w-9/12 ' alt="logo" />
            </div>
            <div>
                <form className='flex flex-col'>
                    <p className='mt-5'>User Name</p>
                    <input
                        style={{border: '3px solid #002f34'}} 
                        type="text" 
                        className='mt-5 p-2 rounded' 
                        placeholder='username'
                        value={userName}
                        onChange={(e)=>setUserName(e.target.value)} />
                    {error.includes('username') && 
                    <p className='text-red-600'>Invalid user name</p>}
                    <p className='mt-5'>Email address</p>
                    <input 
                        style={{border: '3px solid #002f34'}} 
                        type="text" 
                        className='mt-5 p-2 rounded' 
                        placeholder='email' 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}/>
                    {error.includes('email') &&
                    <p className='text-red-600'>Invalid Email address</p>}
                    <p className='mt-5'>Password</p>
                    <input 
                        className='mt-5 p-2 rounded' 
                        style={{border: '3px solid #002f34'}} 
                        type="text " 
                        placeholder='password' 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}/>
                    {error.includes('password') &&
                    <p className='text-red-600'>Password must contain atleast 6 letters</p>}
                    <div className=' flex items-center mt-5 justify-center'>
                        <button onClick={()=>registerUser(event)} className=' bg-green-950 w-20 rounded-lg p-2 font-bold text-white'>Sign Up</button>
                    </div>
                </form>
                <div className='flex mt-5 space-x-2'>
                    <p>Already have an account?</p>
                    <Link to='/login' className='underline'>login</Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
