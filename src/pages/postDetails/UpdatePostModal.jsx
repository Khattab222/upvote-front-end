import "./update-post-modal.css";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/PostsReducer";

const UpdatePostModal = ({ setUpdatePostview, post }) => {
  const [loading, setLoading] = useState(null)
  const [title, setTitle] = useState(post.title);
  const [caption, setcaption] = useState(post.caption);
  const [category, setCategory] = useState(post.category);
let dispatch = useDispatch()


  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if(title.trim() === "") return toast.error("title required")
    if(caption.trim() === "") return toast.error("caption required")
    if(category.trim() === "") return toast.error("category required")


    let form = new FormData()
    form.append('title',title)
    form.append('caption',caption)
    form.append('category',category)
    setLoading(true)
    dispatch(updatePost({id:post._id,form}))
    setLoading(false)
   

  };

  useEffect(() => {
  if (loading === false) {
    setUpdatePostview(false)
  }
  }, [loading])
  

  return (
    <div className="update-post">
      
      <form onSubmit={formSubmitHandler} className="update-post-form">
        <abbr title="close">
          <i
            onClick={() => setUpdatePostview(false)}
            className="bi bi-x-circle-fill update-post-form-close"
          ></i>
        </abbr>
        <h1 className="update-post-title">Update Post</h1>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          className="update-post-input"
        />
        <select
          className="update-post-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value="">
            Select A Category
          </option>
          <option value="music">music</option>
        <option value="travelling">travelling</option>
        <option value="programming">programming</option>
        <option value="cars">cars</option>
        <option value="nature">nature</option>
        <option value="coffee & Tea">coffee</option>
        </select>
        <textarea
          className="update-post-textarea"
          value={caption}
          onChange={(e) => setcaption(e.target.value)}
          rows="5"
        ></textarea>
        <button type="submit" className="update-post-btn">
          {loading ===true?<i className="fa-solid fa-spinner fa-spin"></i> :' Update Post'}
         
        </button>
      </form>
    </div>
  );
};

export default UpdatePostModal;
