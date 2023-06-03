import "./admin-table.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deletePost, getALLPostsFOrAdmin } from "../../redux/PostsReducer";
import { motion } from 'framer-motion';

const PostsTable = () => {
  let dispatch = useDispatch()
  const {posts} = useSelector((state)=> state.posts)
  useEffect(() => {
 
    dispatch(getALLPostsFOrAdmin())
  }, [])
  

  
   // Delete Post Handler
   const deletePostHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePost(id))
        swal("Post has been deleted!", {
          icon: "success",
        });
      } else {
       swal("Your post is safe!");
      }
    });
  };


  const parentVariant = {
    hidden: {
      x: "100vw",
    },
    visible: {
      x: 0,

      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div variants={parentVariant} initial='hidden' animate='visible' className="table-container">
  
      <div className="table-wrapper">
        <h1 className="table-title">Posts</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Post Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={item.createdBy?.profile_pic}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">{item.createdBy?.firstName}</span>
                  </div>
                </td>
                <td>
                  <b>{item.title}</b>
                </td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/posts/details/${item._id}`}>View Post</Link>
                    </button>
                    <button onClick={() => deletePostHandler(item._id)}>Delete Post</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default PostsTable;
