import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/AuthReducer";

const HeaderRight = () => {

  const {loginUser} = useSelector((state) => state.auth);
let navigate = useNavigate()
let dispatch = useDispatch()


 // logOut function
 function logOutFunc() {
  dispatch(logOut())
  navigate('/login')

}


  return (

    <div className="header-right">

    {
      loginUser?<>
     
      <div className="dropdown">
  <button className="btn  dropdown-toggle border-0"  data-bs-toggle="dropdown" >
  <img className="header-right-user-photo" src={loginUser?.profile_pic} alt="user photo" />

  </button>
  <ul className="dropdown-menu bg-primary text-white">
    <li><Link className="dropdown-item fw-700 " to={`/profile/${loginUser._id}`}>Profile</Link></li>
    <li onClick={logOutFunc} className="dropdown-item logout"> Log Out <span className=""><i className="fa-solid fa-right-from-bracket  fa-large"></i></span></li>
  </ul>
</div>
      </>
       :<><Link to='/login' className="header-right-link" >
      <i className="bi bi-box-arrow-in-right"></i>
      <span>Login</span>
    </Link>
    <Link to='/register' className="header-right-link" >
      <i className="bi bi-person-plus"></i>
      <span>Register</span>
    </Link></>
    }
      
    </div>
  );
};

export default HeaderRight;
