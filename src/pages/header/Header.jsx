import React, { useState } from "react";
import "./header.css";
import Navbar from "./Navbar";
import HeaderLeft from './HeaderLeft'
import HeaderRight from "./HeaderRight";
import { useSelector } from "react-redux";
import { motion } from "framer-motion"

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const {loginUser} = useSelector((state) => state.auth);

  const containervariants = {
    hidden:{
      opacity:0,
      y:"-100vh"
    },
    visible:{
      opacity:1,
      y:0,
      transition:{
        duration: .8,
        type:"spring"
      }
    }
  }

  return (
    <motion.header className="header "
      variants={containervariants}
      initial='hidden'
      animate='visible'
    >
      <HeaderLeft setToggle={setToggle} toggle={toggle}  />
{
  loginUser? <Navbar   toggle={toggle} setToggle={setToggle}  /> :''
}
     
      <HeaderRight   />
    </motion.header>
  );
};

export default Header;
