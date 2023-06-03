import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { deleteComment } from "../../redux/PostsReducer";
import UpdateCommentModal from "./UpdateCommentModal";
import "./comment-list.css";

const CommentList = ({comments}) => {
  const [updateComment, setUpdateComment] = useState(false);
  const {userProfile} = useSelector((state) => state.user);
  const {loginUser} = useSelector((state) => state.auth);

  const [updatcomm, setupdatcomm] = useState({})

let dispatch = useDispatch()
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
        
        dispatch (deleteComment(id))
      } else {
       
      }
    });
  };

  const handleshowupdatecomment = (updatecomm) =>{
    setUpdateComment(true)
    setupdatcomm(updatecomm)
  }

  return (
    <div className="comment-list">
      <h4 className="comment-list-count">{comments?.length} comments</h4>
      {comments?.map((comment) => (
        <div key={comment._id} className="comment-item">
          <div className="comment-item-info">
            <div className="comment-item-user-info">
              <img
                src={comment?.commBy?.profile_pic}
                alt=""
                className="comment-item-user-photo"
              />
              <span className="comment-item-username">{comment.commBy?.firstName}</span>
            </div>
            <div className="comment-item-time">{new Date(comment?.createdAt).toDateString()}</div>
          </div>
          <p className="comment-item-text">{comment.commentBody}</p>

          {
              loginUser?.id === comment?.commBy?._id? <div className="comment-item-icon-wrapper">
              <i
                onClick={()=>handleshowupdatecomment(comment)}
                className="bi bi-pencil-square"
              ></i>
              <i onClick={() =>deleteCommentHandler(comment._id)} className="bi bi-trash-fill"></i>
            </div> :''
          }
         
        </div>
      ))}
      {updateComment && (
        <UpdateCommentModal updatcomm={updatcomm} setUpdateComment={setUpdateComment} />
      )}
    </div>
  );
};

export default CommentList;
