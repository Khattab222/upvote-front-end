import "./form.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../redux/passwordReducer";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  let dispatch = useDispatch();
  const [email, setEmail] = useState("");

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("Email is required");

    dispatch(forgetPassword({ email }));
  };
  const parentVariant = {
    hidden: {
      opacity: 0,
      x: "60vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };
  const childvaiant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  };

  return (
    <motion.section
      variants={parentVariant}
      initial="hidden"
      animate="visible"
      className="form-container"
    >
      <h1 variants={childvaiant} className="form-title">
        Forgot Password
      </h1>
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <motion.label
            variants={childvaiant}
            htmlFor="email"
            className="form-label"
          >
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
        <motion.button
          variants={childvaiant}
          type="submit"
          className="form-btn"
        >
          Submit
        </motion.button>
      </form>
    </motion.section>
  );
};

export default ForgotPassword;
