import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const SignIn = () => {

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }

    setError("");
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signin`,  form , {
        withCredentials: true,
      })

      if (res.status == 200) {
        login();
      }else{
        console.error("SigIn error")
      }
    } catch (error) {
      console.error("SignIn error", error.response?.data || error.message);
    }

  };

  return (
    <div className="container my-5 ">
      <div className="row justify-content-center ">
        <div className="col-md-6 col-lg-5">
          <div className="card p-4 shadow-lg rounded-4 border-0">
            <h3 className="text-center mb-4 fw-bold text-primary">Login</h3>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">Email address</label>
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

              {/* Password */}
              <div className="mb-3">
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

              {/* Error */}
              {error && <div className="alert alert-danger">{error}</div>}

              {/* Submit */}
              <div className="d-grid mt-2">
                <button type="submit" className="btn btn-primary btn-lg fw-bold">
                  Login
                </button>
              </div>

              {/* Forgot password + signup */}
              <div className="text-center mt-4 small">
                <p className="mb-1">
                  <a href="/forgot-password" className="text-decoration-none">Forgot password?</a>
                </p>
                <p>
                  Don’t have an account?{" "}
                  <Link to="/signup" className="fw-semibold text-decoration-none">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
