import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostList from "../../components/posts/PostList";
import { getPosts } from "../../redux/PostsReducer";
import "./category.css";

const Category = () => {
    const { category } = useParams();
    const dispatch = useDispatch()
    const {posts} = useSelector((state)=>state.posts);
    useEffect(() => {
      window.scrollTo(0,0);
      dispatch(getPosts({category}));
    }, []);
 

    return ( 
    <div className="category">
        <h1 className="category-title">Posts based on {category}</h1>
        <div className="container">
        {
          posts?.length < 1 ? <h4 className="text-center text-muted">there is no posts yet</h4> :  <PostList posts={posts} />
        }
      
        </div>
    </div> );
}
 
export default Category;