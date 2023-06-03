import "./form.css";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/passwordReducer";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const {token} = useParams()
  const [newPass, setNewPass] = useState("");
  const {message,loading} = useSelector((state)=> state.password)
  let dispatch = useDispatch();
  let navigate = useNavigate()

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (newPass.trim() === "") return toast.error("new password  is required");

    dispatch(resetPassword({newPass,token}))
  };


  useEffect(() => {
    
if (message === 'success try to login') {
  toast.success(message)
  navigate('/login')
}
  }, [message])
  

  return (
    <section className="form-container">
      <h1 className="form-title">Reset Password</h1>
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            New Password
          </label>
          <input
            onChange={(e) => setNewPass(e.target.value)}
            value={newPass}
            type="password"
            id="password"
            placeholder="Enter your new password"
            className="form-input"
          />
        </div>
        <button type="submit" className="form-btn">
        {
            loading == true?<i className="fa-solid fa-spinner fa-spin"></i> : "Submit"
          }
          
        </button>
      </form>
    </section>
  );
};

export default ResetPassword;
