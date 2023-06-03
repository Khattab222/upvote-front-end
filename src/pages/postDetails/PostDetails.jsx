import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import "./post-details.css";
import { ToastContainer, toast } from "react-toastify";
import AddComment from "../../components/comments/AddComment";
// import CommentList from '../../components/comments/CommentList';
import swal from "sweetalert";
import CommentList from "../../components/comments/CommentList";
import UpdatePostModal from "./UpdatePostModal";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getOnePost, likePost, updatePost } from "../../redux/PostsReducer";

export default function PostDetails() {
  let Navigate = useNavigate()
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post,loading } = useSelector((state) => state.posts);
  const {loginUser} = useSelector((state) => state.auth);
  const [isliked, setisliked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getOnePost(id));
  }, []);


  // like check
  useEffect(() => {
    if (post?.likes?.includes(loginUser?._id)) {
      setisliked(true);
    } else {
      setisliked(false);
    }
    
  }, [post]);



  const [updatePostview, setUpdatePostview] = useState(false);

  const [file, setFile] = useState(null);

  // Update Image Submit Handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("there is no file!");

    let form = new FormData()
    form.append('pic',file)
    dispatch(updatePost({id:post._id,form}))
  

  };
  const deletePosthandler = () => {
    swal({
      title: "Are you sure delete this post ?",
      text: "Once deleted, you will not be able to recover this post",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePost(post._id))
       Navigate('/')
      } else {
        // swal("something went wrong");
      }
    });
  };


  // toggle like
  const handleLike = async () => {
    dispatch(likePost(id));
  };

  return (
    <div className="post-details" style={{ minHeight: "85vh" }}>
      <ToastContainer />
      <div className="post-details-image-wrapper">
        <img
          src={file ? URL.createObjectURL(file) : post?.Image}
          alt=""
          className="post-details-image"
        />
        {loginUser?._id === post?.createdBy?.id ? (
          <form
            onSubmit={updateImageSubmitHandler}
            className="update-post-image-form"
          >
            <label className="update-post-image" htmlFor="file">
              <i className="bi bi-image-fill"></i> select new image
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />

            {
              !file? '':   <button type="submit">
              {loading? <i className="fa-solid fa-spinner fa-spin"></i>:'upload' }
              </button>
            }
          
          </form>
        ) : (
          ""
        )}
      </div>
      <h1 className="post-details-title">{post?.title}</h1>
      <div className="post-details-user-info">
        <img
          src={post?.createdBy?.profile_pic}
          alt=""
          className="post-details-user-image"
        />
        <div className="post-details-user">
          <strong>
            <Link to={`/profile/${post?.createdBy?._id}`}>{post?.createdBy?.firstName}</Link>
          </strong>
          <span>{new Date(post?.createdAt).toDateString()}</span>
        </div>
      </div>
      <p className="post-details-description">
        {post?.caption}
        ... Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
        quis a omnis aut sit earum atque eveniet ratione sint animi illo id
        accusamus obcaecati dolore voluptatibus aperiam qui, provident fuga?
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam
        neque odit soluta? Fugiat, dolores! Laboriosam rem quod, explicabo
        similique aliquam unde sed vel distinctio, fugiat ab aperiam odio
        nesciunt quas?
      </p>
      <div className="post-details-icon-wrapper">
        <div>
          <i
            onClick={handleLike}
            className={
              isliked ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"
            }
          ></i>
          <small>{post?.likes?.length} likes</small>
        </div>
        {loginUser?._id === post?.createdBy?.id ? (
          <div>
            <i
              onClick={() => setUpdatePostview(true)}
              className="bi bi-pencil-square"
            ></i>
            <i onClick={deletePosthandler} className="bi bi-trash-fill"></i>
          </div>
        ) : (
          ""
        )}
      </div>
      {
        loginUser? <AddComment  post={post} /> : <h4>login to comment</h4>
      }
     
      {post?.comments?.length ? (
        
        <CommentList comments={post?.comments} />
      ) : (
        ""
      )}

      {updatePostview && (
        <UpdatePostModal post={post} setUpdatePostview={setUpdatePostview} />
      )}
    </div>
  );
}
