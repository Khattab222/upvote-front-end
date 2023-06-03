import React,{useEffect, useState} from 'react'
import "./create-post.css";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { creatPost } from '../../redux/PostsReducer';
import { useNavigate } from 'react-router-dom';
import { getAllCategory } from '../../redux/categorySReducer';
import { motion } from 'framer-motion';



const CreatePost = () => {
  const {allCategory} = useSelector((state)=> state.category)

  useEffect(() => {
    dispatch(getAllCategory())
  }, [])
  let navigate = useNavigate()
  let dispatch = useDispatch()
  const {newpost,loading} = useSelector((state) => state.posts)
  const [title, setTitle] = useState("");
  const [caption, setcaption] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
 
  const handleSubmit = (e) => {
    e.preventDefault()
   
    if (title.trim() === "") return toast.error("Post Title is required",);
    if (category.trim() === "") return toast.error("Post Category is required");
    if (caption.trim() === "")
      return toast.error("Post caption is required");
    if (!file) return toast.error("Post Image is required");


    const formData = new FormData();
    formData.append("pic",file);
    formData.append("title",title);
    formData.append("caption", caption);
    formData.append("category", category);
  
 dispatch(creatPost(formData))
  }
 useEffect(() => {
    if (newpost?.message ==='success') {
      toast.success('post created successfully')
      setTitle('')
      setcaption('')
      setCategory('')
      setFile('')
      navigate('/')


    }
 }, [newpost])
 
const parentVariant = {
  hidden:{
    opacity:0,
    x:'60vw'
  },
  visible:{
    opacity:1,
    x:0,
    transition:{
      type:'spring',
      duration:0.3,
      // when:'beforeChildren'
      staggerChildren: 0.5
      
    }
  }
}
const childvaiant = {
  hidden:{opacity:0},
  visible:{opacity:1,transition:{duration:0.6}}
}
  return (
    <motion.section className="create-post"
    variants={parentVariant}
    initial="hidden"
    animate='visible'
    >
    <ToastContainer theme="dark"/>
    <h1 className="create-post-title">Create New Post</h1>
    <form onSubmit={handleSubmit}  className="create-post-form">
      <motion.input
       variants={childvaiant}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        placeholder="Post Title"
        className="create-post-input"
      />
      <motion.select
      variants={childvaiant}
        className="create-post-input"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option disabled value="">
          Select A Category
        </option>
        {
          allCategory?.map((cat) => {
            return ( <option key={cat._id} value={cat.title}>{cat.title}</option>)
           
          })
        }

      </motion.select>
      <motion.textarea
       variants={childvaiant}
        className="create-post-textarea"
        placeholder="Post caption"
        value={caption}
        onChange={(e) => setcaption(e.target.value)}
        rows="5"
      ></motion.textarea>
      <motion.input 
       variants={childvaiant}
      style={{cursor:'pointer'}}
        className="create-post-upload"
        type="file"
        name="file"
        id="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <motion.button  variants={childvaiant} type="submit" className="create-post-btn ">
      {
            loading == true?<i className="fa-solid fa-spinner fa-spin"></i> : "Create"
          }
        
      </motion.button>
    </form>
    
  </motion.section>
  )
}

export default CreatePost
