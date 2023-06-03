import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './pages/header/Header'
import Footer from './components/footer/Footer';
import Sidebar from './components/sidebar/Sidebar';
import { useSelector } from 'react-redux';
import {AnimatePresence}from 'framer-motion'


export default function LayoutRouter() {
  const {loginUser} = useSelector((state) => state.auth);
  const location = useLocation()
  return (
    <>
    
<Header/>
{
  loginUser&&<div className='topZ position-fixed top-50 end-0 shadow-lg'>   <Sidebar /></div>
}

<AnimatePresence mode='wait' >
<Outlet location={location} key={location.pathname} />
</AnimatePresence>




<Footer/>
    </>
  )
}
