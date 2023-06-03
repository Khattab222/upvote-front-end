import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import PostList from "../../components/posts/PostList";
import { getProfileData, updateUserPhoto } from "../../redux/UserReducer";
import UpdateProfileModal from "./UpdateProfileModal";
import "./profile.css";


const Profile = () => {
const dispatch = useDispatch()
const {id}= useParams()
const {userProfile,loading} = useSelector((state) => state.user);
const {loginUser} = useSelector((state) => state.auth);

  const [updateProfile, setUpdateProfile] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getProfileData(id))
  
  }, [id]);



 
 
  // Form Submit Handler
  const profilePhotoHandler = async(e) => {
    e.preventDefault();
    if(!file) return toast.warning("there is no file!");
    const formdata = new FormData()
    formdata.append("pic",file)
   dispatch(updateUserPhoto(formdata))
  //  window.location.reload()
 

 
  }


  // Delete Account Handler
  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Account has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Something went wrong!");
      }
    });
  }

  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img src={file ? URL.createObjectURL(file) : `${userProfile?.profile_pic}`} alt="" className="profile-image" />
          {
userProfile?._id === loginUser?._id?<form onSubmit={profilePhotoHandler}>
<abbr title="choose profile photo">
  <label
    htmlFor="file"
    className="bi bi-camera-fill upload-profile-photo-icon"
  ></label>
</abbr>
  <input
    type="file"
    name="file"
    id="file"
    style={{ display: "none" }}
    onChange={e => setFile(e.target.files[0])}
  />
  {
    file != null?  <button type="submit" className="upload-profile-photo-btn">{ loading ===true? <i className="fa-solid fa-spinner fa-spin"></i>: 'upload'}</button>:''
  }
 
</form> : ''
          }
          
        </div>
        <h1 className="profile-username">{userProfile?.firstName} {userProfile?.lastName}</h1>
        <p className="profile-bio">
        {userProfile?.bio}
        </p>
        <div className="user-date-joined">
          <strong>Date Joined: </strong>
          <span>{new Date(userProfile?.createdAt).toDateString()}</span>
        </div>
        {
          userProfile?._id === loginUser?._id&&  <button onClick={() => setUpdateProfile(true)} className="profile-update-btn">
          <i className="bi bi-file-person-fill"></i>
          Update Profile
        </button>
        }
        
      </div>
      <div className="profile-posts-list">
        <h2 className="profile-posts-list-title">{userProfile?.firstName} Posts</h2>
      {
        userProfile?.products.length?<PostList posts={userProfile?.products} /> : <h3>no posts yet </h3>
      }
        
      </div>
      {
        userProfile?._id === loginUser?._id? <button onClick={deleteAccountHandler} className="delete-account-btn">
        Delete Your Account
      </button> :''
      }
     
      {updateProfile && <UpdateProfileModal userProfile={userProfile} setUpdateProfile={setUpdateProfile} />}
    </section>
  );
};

export default Profile;
