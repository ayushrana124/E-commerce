import React from "react";
import { useAuth } from "../context/AuthProvider";

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="text-center mt-5">Loading user data...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className=" mb-5 border-bottom pb-3 fw-bold text-secondary">My Profile</h1>
      <div className="row">
        <div className="col-md-4">
          <img
            src={user.profileImage}
            alt="Profile"
            className="object-fit-cover rounded-circle shadow h-100 w-100"
          />
        </div>

        <div className="col-md-8">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{user.name}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{user.email}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{user.phone}</td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{user.gender}</td>
              </tr>
              <tr>
                <th>Date of Birth</th>
                <td>{new Date(user.dob).toLocaleDateString()}</td>
              </tr>
              <tr>
                <th>Role</th>
                <td>{user.role}</td>
              </tr>
              <tr>
                <th>User ID</th>
                <td>{user._id}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
