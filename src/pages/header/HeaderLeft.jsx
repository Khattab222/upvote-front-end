import { motion } from 'framer-motion';
import React from "react";
import { useSelector } from "react-redux";

const HeaderLeft = ({ setToggle, toggle }) => {

  const svgvariants = {
    start:{
      opacity:0,
    
      pathLength:0
    },
    end:{
      opacity:1,
      pathLength:1,
     
      transition:{
        duration:3,
        ease:'easeInOut'
      }
    }
  }
  const { loginUser } = useSelector((state) => state.auth);
  return (
    <div className="header-left">
      <div to="/" className="header-logo">
        <strong>BLOG</strong>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="35"
          viewBox="0 0 24 26"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-edit-2"
        >
          <motion.path variants={svgvariants} initial='start' animate='end'  d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></motion.path>
        </svg>
      </div>
      {loginUser ? (
        <div onClick={() => setToggle((prev) => !prev)} className="header-menu">
          {toggle ? (
            <i className="bi bi-x-lg"></i>
          ) : (
            <i className="bi bi-list"></i>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default HeaderLeft;
