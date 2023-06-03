import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCategory } from "../../redux/categorySReducer";
import "./sidebar.css";

const Sidebar = () => {
  const {allCategory} = useSelector((state)=> state.category)
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCategory())
  }, [])
  return (
   

    <>
    <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"> <i className="fa-solid fa-gear"></i> Categories</button>

<div className="offcanvas bg-primary offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
  <div className="offcanvas-header">
  
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
 
  <div className="sidebar offcanvas-body">
   
      <ul className="sidebar-links ">
        {!allCategory?.length? <h3>no category yet</h3>:allCategory?.map((category) => (
          <Link
            to={`/posts/categories/${category.title}`}
            key={category._id}
            className="sidebar-link "
          >
            {category.title}
          </Link>
        ))}
      </ul>
    </div>
</div>
    
    </>
  );
};

export default Sidebar;
