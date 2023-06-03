import "./posts.css";
import PostItem from "./PostItem";
import React from 'react'
import { motion } from "framer-motion"
const PostList = ({ posts }) => {
  const postvariant = {
    hidden:{
      opacity:0,
      scale:.5
    },
    visible:{
      opacity:1,
      scale:1,
    
        transition:{
          duration: 2,
          type:"spring",
          delay:.8
        }
   
    }
  }

  return (
    <motion.div className="post-list container"

  
    >
      {posts?.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </motion.div>
  );
};

export default PostList;
