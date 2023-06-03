import "./admin-table.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../../redux/UserReducer";
import { useEffect } from "react";
import { motion } from "framer-motion";

const UsersTable = () => {
  let dispatch = useDispatch();
  const { allusers } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  // Delete User Handler
  const deleteUserHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteUser(id));
        swal("User has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Something went wrong!");
      }
    });
  };


  // animation
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
    <motion.div
      className="table-container"
      variants={parentVariant}
      initial="hidden"
      animate="visible"
    >
      <div className="table-wrapper">
        <h1 className="table-title">Users</h1>
        <table className="table text-center">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allusers.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={item.profile_pic}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">{item.firstName}</span>
                  </div>
                </td>
                <td>
                  <b className="user-email">{item.email}</b>
                </td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/profile/${item._id}`}>View Profile</Link>
                    </button>
                    <button onClick={() => deleteUserHandler(item._id)}>
                      Delete User
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

export default UsersTable;
