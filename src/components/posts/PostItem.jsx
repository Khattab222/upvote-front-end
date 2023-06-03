import { Link } from "react-router-dom";
import React from 'react'
import {motion} from 'framer-motion'


const PostItem = ({post}) => {
  const postvariant = {
    hidden:{
      // opacity:0,
      scale:.5
    },
    visible:{
      // opacity:1,
      scale:1,
    
        transition:{
          duration: .5,
          type:"linear",
         
         
        }
   
    }
  }


  return (
    <motion.div className="post-item shadow-lg border-3  bg-white"
    variants={postvariant}
    initial='hidden'
    whileInView='visible'
    viewport={{ once: true }}
    >
      <div className="post-item-image-wrapper">
        <img src={post?.Image} alt="" className="post-itme-image" />
      </div>
      <div className="post-item-info-wrapper">
        <div className="post-item-info">
          <div className="post-item-author">
            <strong>Author: </strong>
            <Link to={`/profile/${post?.createdBy?._id}`}><span>{post?.createdBy?.firstName}</span></Link>
          </div>
          <div className="post-itme-date">
            {new Date(post.createdAt).toDateString()}
          </div>
        </div>
        <div className="post-item-details">
          <h4 className="post-item-title">{post.title}</h4>
          <Link className="post-item-category" to={`/posts/categories/${post.category}`}>{post.category}</Link>
        </div>
        <p className="post-item-description">
          {post.caption}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat natus
          delectus blanditiis accusamus. Fugit vitae odit accusamus, error nobis
          debitis, rerum ex saepe quisquam rem qui sint deserunt consectetur
          voluptas! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Repudiandae itaque atque, molestiae totam, unde minus corrupti dicta
          distinctio repellat enim doloribus consectetur odit nisi optio,
          repellendus ea ex impedit incidunt.
        </p>
       
        <Link  to={`/posts/details/${post._id}`}>
         <motion.span className="post-item-link"
         whileHover={{scaleX:0.9}}
         >Read More...</motion.span> 
        </Link>
      </div>
    </motion.div>
  );
};

export default PostItem;
