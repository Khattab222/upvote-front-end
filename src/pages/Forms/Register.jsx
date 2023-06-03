import "./form.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/AuthReducer";
import { motion } from 'framer-motion';

const Register = () => {
let dispatch = useDispatch()
let navigate = useNavigate()
const {newUser,loading} = useSelector((state) =>state.auth)
  const [user, setuser] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    cpass:""
  })
  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (user.firstName.trim() === "") return toast.error("first name is required");
    if (user.lastName.trim() === "") return toast.error("last name is required");
    if (user.password === "") return toast.error("Password is required");
    if (user.password !== user.cpass) return toast.error("Password and cPass not matched");
   
    
    dispatch(register(user))

  
  };

  const getUserData = (e)=>{
    e.preventDefault();
    let newUser = {...user};
    newUser[e.target.name] = e.target.value;
    setuser(newUser);
   

  }
  useEffect(() => {
   if(newUser?.message == 'sign up success please confirm your account '){
  toast.success(`success please check your email to confirm `);
  navigate("/login");
  
   }
  }, [newUser])
  
  const parentVariant = {
    hidden:{
      opacity:0,
      x:'60vw'
    },
    visible:{
      opacity:1,
      x:0,
      transition:{
        type:'spring',
        duration:0.3,
        when:'beforeChildren',
        staggerChildren: 0.1
        
      }
    }
  }
  const childvaiant = {
    hidden:{opacity:0},
    visible:{opacity:1,transition:{duration:0.6}}
  }
  return (
    <motion.section className="form-container"
    variants={parentVariant}
    initial='hidden'
    animate='visible'
    >
      <h1 className="form-title">Create new account</h1>
      <form onSubmit={formSubmitHandler}  className="form">
        <div className="form-group ">
          <motion.label variants={childvaiant} htmlFor="firstname" className="form-label">
            Firstname
          </motion.label>
          <motion.input
          variants={childvaiant}
          onChange={getUserData}
            name="firstName"
            type="text"
            id="firstname"
            placeholder="Enter your First Name"
            className="form-input "
          />
        </div>
        <div className="form-group">
          <motion.label variants={childvaiant} htmlFor="Lastname" className="form-label">
            Lastname
          </motion.label>
          <motion.input
          variants={childvaiant}
          onChange={getUserData}
          name="lastName"
            type="text"
            id="Lastname"
            placeholder="Enter your Lastname"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <motion.label variants={childvaiant} htmlFor="email" className="form-label">
            Email
          </motion.label>
          <motion.input
          variants={childvaiant}
        onChange={getUserData}
            name="email"
            type="email"
            id="email"
            placeholder="Enter your email"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <motion.label variants={childvaiant} htmlFor="password" className="form-label">
            Password
          </motion.label>
          <motion.input
          variants={childvaiant}
          onChange={getUserData}
           name="password"
            type="password"
            id="password"
            placeholder="Enter your password"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <motion.label variants={childvaiant} htmlFor="cPass" className="form-label">
            cPass
          </motion.label>
          <motion.input
          variants={childvaiant}
           onChange={getUserData}
            name='cpass'
            type="password"
            id="cPass"
            placeholder="ReEnter your password"
            className="form-input"
          />
        </div>
        <motion.button variants={childvaiant} whileHover={{scaleX:0.99}} type="submit" className="form-btn">
          {
            loading == true? <i className="fa-solid fa-spinner fa-spin"></i>:"Register"
          }
          
        </motion.button>
      </form>
      <motion.div variants={childvaiant} className="form-footer">
        Already have an account? <Link to="/login">Login</Link>
      </motion.div>
    </motion.section>
  );
};

export default Register;
