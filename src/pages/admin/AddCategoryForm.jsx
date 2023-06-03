import { ToastContainer, toast } from "react-toastify";
import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../redux/categorySReducer";

const AddCategoryForm = () => {
  const [title, setTitle] = useState("");
  const {loading} = useSelector((state)=> state.category)
let dispatch = useDispatch()
  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Category Title is required");
    dispatch(createCategory({title}));
   
  };

  useEffect(() => {
    if (loading == false) {
      setTitle('')
    }
  }, [loading])
  
  return (
    <div className="add-category">
      <ToastContainer/>
      <h6 className="add-category-title">Add New Category</h6>
      <form onSubmit={formSubmitHandler} className="add-category-form">
        <div className="add-category-form-group">
          <label htmlFor="title">Category Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
            placeholder="Enter Category Title"
          />
        </div>
        <button type="submit" className="add-category-btn">

          {
            loading == true?<i className="fa-solid fa-spinner fa-spin"></i> :`Add`
          }
       
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
