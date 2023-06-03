import React, { useEffect, useState } from 'react'
import "./posts-page.css";

import PostList from '../../components/posts/PostList'
import Lottie from 'lottie-react'
import downloadImg from '../../images/downloading.json'

import Sidebar from '../../components/sidebar/Sidebar'
import Pagination from './../../components/pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux/PostsReducer';

const PostsPage = () => {
  const dispatch = useDispatch()
  const {posts,meta,loading} = useSelector((state)=>state.posts);
  const [currentpage, setcurrentpage] = useState(1)
  useEffect(() => {
  window.scrollTo(0,0)
  dispatch(getPosts({page:currentpage}));
  }, [])
  
  useEffect(() => {
    dispatch(getPosts({page:currentpage}));
  window.scrollTo(0,0)


  }, [currentpage])
  

    const style = {
      width: '50%',
      margin:'auto'
     
    }
      

  return (
    <div >
      {
        loading?<div ><Lottie style={style} animationData={downloadImg}/></div> :<><section className="posts-page">
        <PostList posts={posts} />
    
      </section>
      <Pagination meta={meta} setcurrentpage={setcurrentpage} currentpage={currentpage} /></>
      }
   
    </div>
  )
}

export default PostsPage
