import React, { useLayoutEffect } from "react";
// import { posts } from "../../dummyData";
import Lottie from "lottie-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PostList from "../../components/posts/PostList";
import downloadImg from "../../images/downloading.json";
import { getPosts } from "../../redux/PostsReducer";
import "./home.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);

  useLayoutEffect(() => {
    dispatch(getPosts({ page: 1 }));
  }, []);

  const style = {
    width: "50%",
    margin: "auto",
  };

  return (
    <>
      {loading ? (
        <div className="">
          <Lottie style={style} animationData={downloadImg} />
        </div>
      ) : (
        <section className="home">
          <div className="home-hearo-header ">
            <div className="home-hero-header-layout">
              <h1 className="home-title">Welcome to Blog</h1>
            </div>
          </div>
          <div className="home-latest-post">Latest Posts</div>
          <div className="home-container">
            <PostList posts={posts} />
          </div>
          <div className="home-see-posts-link">
            <Link className="home-link" to="/posts">
              See All Posts
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

export default HomePage;
