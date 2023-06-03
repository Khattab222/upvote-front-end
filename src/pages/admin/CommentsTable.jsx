import { motion } from 'framer-motion';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { admindeleteComment, getAllComments } from "../../redux/PostsReducer";
import "./admin-table.css";

const CommentsTable = () => {
  const {allcomments} = useSelector((state)=> state.posts)
let dispatch = useDispatch()

  useEffect(() => {
    
    dispatch(getAllComments())
  }, [])

  // Delete Comment Handler
  const deleteCommentHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(admindeleteComment(id))
      
        swal("Comment has been deleted!", {
          icon: "success",
        });
      } else {
        swal("comment is safe");
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
    <motion.div variants={parentVariant} initial='hidden' animate='visible' className="table-container" >
    
      <div className="table-wrapper">
        <h1 className="table-title">Comments</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allcomments.map((item,index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={item?.commBy?.profile_pic}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">{item?.commBy?.firstName} {item?.commBy?.lastName}</span>
                  </div>
                </td>
                <td>
                  <b>{item.commentBody}</b>
                </td>
                <td>
                  <div className="table-button-group">
                    <button onClick={() => deleteCommentHandler(item._id)}>
                      Delete Comment
                    </button>
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

export default CommentsTable;
