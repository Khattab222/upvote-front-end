import { useDispatch, useSelector } from "react-redux";
import "./admin-table.css";
import swal from "sweetalert";

import { useEffect } from "react";
import { deleteCategory, getAllCategory } from "../../redux/categorySReducer";
import { motion } from 'framer-motion';

const CategoriesTable = () => {
  const {allCategory}= useSelector((state) => state.category);


  let dispatch = useDispatch()
useEffect(() => {
  
  dispatch(getAllCategory())
 
}, [])



  // Delete Category Handler
  const deleteCategoryHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {

        dispatch(deleteCategory(id))
        swal("Category has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your category is safe!");
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
        <h1 className="table-title">Categories</h1>
        <table className="table text-center fw-bold">
          <thead>
            <tr>
              <th>Count</th>
              <th>Category Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allCategory?.map((item,index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>
                  <b>{item.title}</b>
                </td>
                <td>
                  <div className="table-button-group">
                    <button onClick={() =>deleteCategoryHandler(item._id)}>
                      Delete Category
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

export default CategoriesTable;
