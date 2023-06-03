import "./update-profile-modal.css";
import { ToastContainer, toast } from "react-toastify";
import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../redux/UserReducer";



const UpdateProfileModal = ({ setUpdateProfile }) => {
  const {userProfile,loading} = useSelector((state) => state.user);

  const [firstName, setfirstName] = useState(userProfile.firstName);
  const [lastName, setlastName] = useState(userProfile.lastName);
  const [bio, setBio] = useState(userProfile.bio);
  const [password, setPassword] = useState("");



  const dispatch = useDispatch()
  // From Submit Handler
  const formSubmitHandler =async (e) => {
    e.preventDefault();

    const updatedUser = { firstName,lastName,bio,password };
    if (firstName.trim() === "") return toast.error("first name required");
    if (lastName.trim() === "") return toast.error("last name required");
    if (bio.trim() === "") return toast.error("bio is required");
   
dispatch(updateUserProfile(updatedUser))
setUpdateProfile(false)
  };

  return (
    <div className="update-profile">
      <ToastContainer theme="colored" />
      <form onSubmit={formSubmitHandler} className="update-profile-form">
        <abbr title="close">
          <i
            onClick={() => setUpdateProfile(false)}
            className="bi bi-x-circle-fill update-profile-form-close"
          ></i>
        </abbr>
        <h1 className="update-profile-title">Update Your Profile</h1>
        <input
          onChange={(e) => setfirstName(e.target.value)}
          value={firstName}
          type="text"
          className="update-profile-input"
          placeholder="Username"
        />
        <input
          onChange={(e) => setlastName(e.target.value)}
          value={lastName}
          type="text"
          className="update-profile-input"
          placeholder="Username"
        />
        <input
          onChange={(e) => setBio(e.target.value)}
          value={bio}
          type="text"
          className="update-profile-input"
          placeholder="Bio"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="update-profile-input"
          placeholder="Password"
        />
        <button type="submit" className="update-profile-btn">
          {
            loading? <i className="fa-solid fa-spinner fa-spin"></i> : 'Update Profile'
          }
          
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileModal;
