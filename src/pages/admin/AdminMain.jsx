import { Link } from "react-router-dom";
import AddCategoryForm from "./AddCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCategory } from "../../redux/categorySReducer";
import { getAllUsers } from "../../redux/UserReducer";
import { getALLPostsFOrAdmin, getAllComments } from "../../redux/PostsReducer";
import { motion } from 'framer-motion';


const AdminMain = () => {
const {allCategory} = useSelector((state)=> state.category)
const {posts} = useSelector((state)=> state.posts)
const {allcomments} = useSelector((state)=> state.posts)
const {allusers} = useSelector((state)=> state.user)
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCategory())
    dispatch(getAllUsers())
    dispatch(getAllComments())
    dispatch(getALLPostsFOrAdmin())
  }, [])
  const parentVariant = {
    hidden:{
      x:'100vw',
    
    },
    visible:{
      x:0,
    
      transition:{
    
        dealy:1,
        duration:0.3,
        when:'beforeChildren',
        staggerChildren: 0.1
        
      }
    },
   
  }
 
  return (
    <motion.div
    variants={parentVariant}
    initial='hidden'
    animate='visible'
    className="admin-main">
      <div className="admin-main-header">
        <div className="admin-main-card">
          <h5 className="admin-card-title">Users</h5>
          <div className="admin-card-count">{allusers?.length}</div>
          <div className="admin-card-link-wrapper">
            <Link to="/admin-dashboard/users-table" className="admin-card-link">
              See all users
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-person"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">Posts</h5>
          <div className="admin-card-count">{posts?.length?posts.length: 0}</div>
          <div className="admin-card-link-wrapper">
            <Link to="/admin-dashboard/posts-table" className="admin-card-link">
              See all posts
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-file-post"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">Categories</h5>
          <div className="admin-card-count">{allCategory?.length}</div>
          <div className="admin-card-link-wrapper">
            <Link
              to="/admin-dashboard/categories-table"
              className="admin-card-link"
            >
              See all categories
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-tag-fill"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">Comments</h5>
          <div className="admin-card-count">{allcomments.length?allcomments.length:0}</div>
          <div className="admin-card-link-wrapper">
            <Link
              to="/admin-dashboard/comments-table"
              className="admin-card-link"
            >
              See all comments
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-chat-left-text"></i>
            </div>
          </div>
        </div>
      </div>
      <AddCategoryForm  />
    </motion.div>
  );
};

export default AdminMain;
