import "./update-comment-modal.css";
import { toast } from "react-toastify";
import  { useState } from "react";
import { useDispatch } from "react-redux";
import { updateComment } from "../../redux/PostsReducer";

const UpdateCommentModal = ({updatcomm, setUpdateComment }) => {
  const [commentBody, setcommentBody] = useState(updatcomm.commentBody);
let dispatch = useDispatch()
  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if(commentBody.trim() === "") return toast.error("commentBody required")
    console.log(commentBody)
    dispatch(updateComment({id:updatcomm._id,body:{commentBody}}))
    setUpdateComment(false)

  };

  return (
    <div className="update-comment">
      
      <form onSubmit={formSubmitHandler} className="update-comment-form">
        <abbr title="close">
          <i
            onClick={() => setUpdateComment(false)}
            className="bi bi-x-circle-fill update-comment-form-close"
          ></i>
        </abbr>
        <h1 className="update-comment-title">Edit Comment</h1>
        <input
          onChange={(e) => setcommentBody(e.target.value)}
          value={commentBody}
          type="text"
          className="update-comment-input"
          placeholder="Update Comment"
        />
        <button type="submit" className="update-comment-btn">
          Edit Comment
        </button>
      </form>
    </div>
  );
};

export default UpdateCommentModal;

