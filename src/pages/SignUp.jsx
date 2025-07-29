import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
 
  const navigate = useNavigate();

const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
  dob: "",
  gender: "",
  phone: "",
  profileImage: null,
});


  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    console.log(form);

   axios.post(`${import.meta.env.VITE_API_URL}/api/user/signup`, form)
   .then((res) => {
    console.log("User Registered", res.data)
    navigate('/signin')
   } )
   .catch((err) =>  { setError("Invalid data")
     console.error("Registration Failed : ", err) } )
   
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg p-4 rounded-4 border-0">
            <h3 className="text-center mb-4 fw-bold text-primary">
              Create Your Account
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label fw-semibold">Gender</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="gender"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="dob" className="form-label fw-semibold">Date Of Birth</label>
                <input
                type="date"
                  className="form-control form-control-lg"
                  id="dob"
                  name="dob"
                  rows="2"
                  value={form.dob}
                  onChange={handleChange}
                  placeholder="123 Main Street, City"
                  required
                />
              </div>

             
                <div className=" mb-3">
                  <label htmlFor="password" className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="********"
                    required
                  />
                </div>
            
             

               <div className="mb-3">
                <label htmlFor="phone" className="form-label fw-semibold">Phone</label>
                <input
                type="number"
                  className="form-control form-control-lg"
                  id="phone"
                  name="phone"
                  rows="2"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="93157 XXXXX"
                  required
                />
              </div>

              <div className="mb-3">
  <label htmlFor="profileImage" className="form-label fw-semibold">
    Profile Image
  </label>
  <input
    type="file"
    className="form-control form-control-lg"
    id="profileImage"
    name="profileImage"
    accept="image/*"
    onChange={handleChange}
  />
</div>


              {error && <div className="alert alert-danger">{error}</div>}

              <div className="d-grid mt-2">
                <button type="submit" className="btn btn-primary btn-lg fw-bold">
                  Sign Up
                </button>
              </div>

              <p className="text-center mt-4 small">
                Already have an account?{" "}
                <Link to="/signin" className="text-decoration-none fw-medium">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
