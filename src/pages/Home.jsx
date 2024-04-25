import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import HomeHeader from '../components/HomeHeader';
import Banner from '../components/Banner';
import Products from '../components/Products';
const Home = () => {
  return (
    <div>
      <div><HomeHeader/></div>
      <div style={{backgroundColor:'#F3F4F0'}} className='h-72 mx-auto w-5/6 bg-red-100'><Banner/></div>
      <div className='mx-auto w-9/12 '><Products/></div>
    </div>
  )
}

export default Home
