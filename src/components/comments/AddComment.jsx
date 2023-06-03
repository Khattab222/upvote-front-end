import { useState } from "react";
import { toast } from "react-toastify";
import "./add-comment.css";
import { useDispatch } from "react-redux";

import { addComment } from "../../redux/PostsReducer";


const AddComment = ({post}) => {

let dispatch = useDispatch()

const [loading, setLoading] = useState(false)
 const [commentBody, setcommentBody] = useState("");

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if(commentBody.trim() === "") return toast.error("Please write something")

  
    setLoading(true)
   dispatch(addComment({id:post._id,body:{commentBody}}))

   setcommentBody('')
   setLoading(false)
  }

  return (
    <form onSubmit={formSubmitHandler} className="add-comment">
      <input
        type="text"
        placeholder="Add a comment"
        className="add-comment-input"
        value={commentBody}
        onChange={e => setcommentBody(e.target.value)}
      />
      <button type="submit" className="add-comment-btn">
        {loading?<i className="fa-solid fa-spinner fa-spin"></i>:'Comment'}
    
      </button>
    </form>
  );
};

export default AddComment;
