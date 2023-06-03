import "./form.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./../../redux/AuthReducer";
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(null)
  const [password, setPassword] = useState("");
  let { loginUser } = useSelector((state) => state.auth);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  
  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");


    setloading(true)
    dispatch(login({ email, password }));
  
    setloading(false)

  };

 
  useEffect(() => {

    if (loginUser) {
  
      navigate("/");
    }
  }, [loginUser])
  
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
    },
   
  }
  const childvaiant = {
    hidden:{opacity:0},
    visible:{opacity:1,transition:{duration:0.4}}
  }
  


  return (
    <motion.section className="form-container"
    variants={parentVariant}
    initial='hidden'
    animate='visible'
   
    >
      <h1 className="form-title">Login to your account</h1>
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <motion.label   variants={childvaiant} htmlFor="email" className="form-label">
            Email
          </motion.label>
          <motion.input
            variants={childvaiant}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <motion.label
            variants={childvaiant}
          htmlFor="password" className="form-label">
            Password
          </motion.label>
          <motion.input
            variants={childvaiant}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            id="password"
            placeholder="Enter your password"
            className="form-input"
          />
        </div>
        <motion.button
          variants={childvaiant}
        type="submit" className="form-btn">
          {
            loading == true?<i className="fa-solid fa-spinner fa-spin"></i> : "Login"
          }
         
        </motion.button>
      </form>
      <motion.div
        variants={childvaiant}
      className="form-footer">
        Did you forget your password?{" "}
        <Link to="/forgot-password">Forgot Password</Link>
      </motion.div>
    </motion.section>
  );
};

export default Login;
