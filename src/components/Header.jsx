import React,{useState,useEffect} from 'react';
import SearchIcon from '../assets/icons/SearchIcon';
import ArrowIcon from '../assets/icons/ArrowIcon';
import { Link } from 'react-router-dom';
import UserComponent from './UserComponent';
import {  onAuthStateChanged,signOut  } from "firebase/auth";
import { auth,db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
const Header = () => {

  const [loggedIn,setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [userName,setUserName] = useState('')
  useEffect(()=>{
    const userInfo = onAuthStateChanged(auth, (user) => {
      if (user ) {
        const uid = user.uid;
        console.log(user.email);
        setUserName(user.displayName)
        setLoggedIn(true);
        // navigate('/')
      } else {
        navigate('/');
        setLoggedIn(false);
      }
    });
    return ()=> userInfo();
  },[])

  function signOutUser(){
    signOut(auth).then(() => {
      setLoggedIn(!loggedIn)
      navigate('/login')
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <header>
      <div className='px-2.5 py-4 bg-cyan-50'>
        <div className='bg-cyan-50 flex relative items-center px-5 justify-between'>
          <Link to={'/'}>
            <img
              className='w-12 h-7'
              src="https://logos-world.net/wp-content/uploads/2022/04/OLX-Symbol.png" alt="olx_logo" />
          </Link>
          
            <div className='flex h-10 items-center space-x-4 bg-white'>
              <SearchIcon/>
              <input type="text" className='h-10'/>
              <ArrowIcon/>
            </div>
            <div className='w-1/2 flex bg-white'>
              <input className='w-full h-10' type="text" />
              <div className='flex items-center justify-center bg-green-950 px-2'>
                <SearchIcon color ='white'/>
              </div>
            </div>
            <div className='flex items-center space-x-2'>
              <p className='font-bold text-green-950 '>ENGLISH</p>
              <ArrowIcon/>
            </div>
            <div>
              {loggedIn && <UserComponent userName = {userName}/>}
            </div>
            <div className='flex items-center'>
              {loggedIn ? <button onClick={signOutUser} className='font-bold rounded bg-green-950 p-1 text-white'>LogOut</button> : 
                          <Link to='/login' className='font-bold text-green-950 underline'>Login</Link>}
              
            </div>
            <div  className='flex items-center'>
              <Link  to='/sale-product' className='font-bold text-md  rounded-3xl bg-white py-1 px-3 border border-blue-500 border-solid border-4'>+SELL</Link>
              
            </div>
        </div>
      </div>
    </header>
  )
}

export default Header
