import React,{ useState,useRef } from 'react'
import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const email = useRef('');
  const password = useRef('');
  const [error,setError] = useState([]);
  const [credentials,setCredentials] = useState(true)
  const navigate = useNavigate()
  function validateForm(){
    if(email.current.value.trim()==''){
      setError(prevError=>[...prevError,'email'])
    }else{
      setError(prevError=>prevError.filter(error=>error!='email'))
    }

    if(password.current.value.trim()==''){
      setError(prevError=>[...prevError,'password'])
    }else{
      setError(prevError=>prevError.filter(error=>error!='password'))
    }
    if(error.length) return false;
    return true;
  }

  function loginUser(e){
    console.log('fsdfs')
    e.preventDefault();
    if(!validateForm()) return;

    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        setCredentials(true)
        const user = userCredential.user;
        console.log(user)
        navigate('/')
        // ...
      })
      .catch((error) => {
        setCredentials(false)
        const errorMessage = error.message;
        console.log('invalid user',errorMessage);

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
                <form  className='flex flex-col'>
                    <p className='mt-5'>Email address</p>
                    <input ref={email} type="text" className='mt-5 p-2' placeholder='email' />
                    {error.includes('email') &&
                    <p className='text-red-600'>Please enter a valid email</p>}
                    <p className='mt-5'>Password</p>
                    <input ref={password} className='mt-5 p-2' type="password" placeholder='password' />
                    {error.includes('password') &&
                    <p className='text-red-600'>Please enter a valid password</p>}
                    <div className=' flex flex-col items-center mt-5 justify-center'>
                        <button onClick={loginUser} className=' bg-green-950 w-20 rounded-lg p-2 font-bold text-white'>Log In</button>
                        {!credentials &&
                          <p className='text-red-600 mt-5'>Invalid credentials</p>}
                    </div>
                   
                </form>
            </div>
            <div className='flex mt-5 space-x-2'>
              <p>Dont have an account?</p>
              <Link to='/signup' className='underline'>Sign Up</Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default LogIn
