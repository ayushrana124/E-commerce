import React from "react";
import { IoMdMenu } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoMdCart } from "react-icons/io";
import { IoIosArrowDropdown } from "react-icons/io";
import { useEffect, useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";

const Navbar = ({ setcategory, setSearchText }) => {
  const [categories, setCategories] = useState([]);
  const { user, logout } = useAuth();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/category/get`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => console.error("Error fetching categories", err));
  }, []);

  return (
    <div className="">
      {/* HEADER  */}
      <div className="fixed-top px-md-4 px-2 p-2 d-flex justify-content-between bg-danger align-items-center text-white shadow">
        {/* LEFT PART */}
        <div className="leftpart d-flex gap-md-4 gap-2 align-items-center justify-content-between">
          <button
            data-bs-toggle="offcanvas"
            data-bs-target="#categoryMenu"
            aria-controls="categoryMenu"
            className="btn text-white fw-bolder"
          >
            <IoMdMenu size={32} />
          </button>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search products ..."
              aria-label="Search"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="btn bg-white fs-5 text-secondary fw-bolder"
              type="button"
            >
              <IoMdSearch size={24} />
            </button>
          </div>
        </div>

        {/* MID PART */}
        <div className="midpart bg-primary d-flex align-items-center justify-content-center d-md-block d-none">
          <img src="/vite.svg" className="bg-danger" alt="" />
        </div>
        {/* RIGHT PART */}
        <div className="rightpart d-flex align-items-center justify-content-center">
          <div className="container d-flex align-items-center justify-content-center gap-2 gap-md-4">
            {user ? (
              <Link
                to="/profile"
                className="text-decoration-none text-white d-flex gap-1 align-items-center justify-content-end"
              >
                <img
                  src={user.profileImage}
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-circle object-fit-cover "
                />
                <p className="fw-semibold fs-6 m-0">{user.name}</p>
              </Link>
            ) : (
              <Link
                to="/signin"
                className=" text-decoration-none text-white d-flex gap-1 align-items-center justify-content-center"
              >
                <h3 className="">
                  <IoMdPerson />
                </h3>
                <p className="fw-semibold fs-6 m-0 d-md-block d-none">Login</p>
              </Link>
            )}

            <Link
              to="/cart"
              className=" text-decoration-none text-white d-flex gap-1 align-items-center justify-content-center"
            >
              <h3 className="">
                <IoMdCart />
              </h3>
              <p className="fw-semibold fs-6 m-0 d-md-block d-none">Cart</p>
            </Link>
          </div>
        </div>
      </div>

      {/* OFFCANVAS MENU */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex={-1}
        id="categoryMenu"
        aria-labelledby="categoryMenuLabel"
      >
        <div className="d-flex align-items-center justify-content-between py-2 px-4 shadow bg-danger">
          <div className="d-flex align-items-center gap-3">
            <img src="../vite.svg" alt="Logo" style={{ height: "25px" }} />
            {user ? (
              <div className="d-flex gap-3 align-items-center justify-content-center">
                <p className="fw-medium fs-6 m-0 text-white">
                  Hello, {user.name}
                </p>

                <Link
                  to="/"
                  className="fw-bolder text-decoration-none d-flex gap-1 align-items-center justify-content-center text-white"
                >
                  <IoMdLogOut size={24} onClick={logout} />
                </Link>
              </div>
            ) : (
              <Link
                to="/signin"
                className="text-decoration-none d-flex gap-1 align-items-center justify-content-center"
              >
                <button
                  className="btn text-white fw-bolder m-0 p-0"
                  type="button"
                >
                  <IoMdPerson size={24} />
                </button>
                <p className="fw-medium fs-6 m-0 text-white">Login</p>
              </Link>
            )}
          </div>

          {/* Close Button */}
          <button
            type="button"
            className="btn text-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <IoMdClose size={28} />
          </button>
        </div>

        {/* Dropdown */}
        <div className="dropdown px-4 mt-4">
          <div
            className="border-3 text-secondary border-bottom p-2 d-flex align-items-center justify-content-between fw-bold w-100"
            id="categoryDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <h3>CATEGORIES</h3>
            <IoIosArrowDropdown fontWeight={24} size={24} />
          </div>

          <ul
            className="dropdown-menu w-100"
            aria-labelledby="categoryDropdown"
          >
            {categories.length === 0 ? (
              <li className="dropdown-item text-muted">Loading...</li>
            ) : (
              <>
                <li>
                  <button
                    className="dropdown-item"
                    data-bs-dismiss="offcanvas"
                    onClick={() => setcategory("all")}
                  >
                    All Categories
                  </button>
                </li>

                {categories.map((cat) => (
                  <li data-bs-dismiss="offcanvas" key={cat._id || cat.name}>
                    <button
                      className="dropdown-item"
                      onClick={() => setcategory(cat.name)}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
        <div className="my-3 w-100 h-100 d-flex align-items-end justify-content-center">
          <div className="d-flex gap-2 flex-column">
            <div className="d-flex w-100 gap-2">
               <Link to="/thankyou" className="text-decoration-none btn btn-outline-secondary fs-5 fw-medium px-4 py-2 flex-grow-1 ">
              My Orders
            </Link>
            <Link to="/profile" className="text-decoration-none btn btn-outline-secondary fs-5 fw-medium px-4 py-2 flex-grow-1">
             My Profile
            </Link>
            </div>
            <div className="d-flex w-100 gap-2 ">
              {user ? ( <Link to="/" onClick={logout} className="text-decoration-none btn btn-outline-secondary fs-5 fw-medium px-4 py-2 flex-grow-1 ">
              Logout
            </Link>) : (
               <Link to="/signin" className="text-decoration-none btn btn-outline-secondary fs-5 fw-medium px-4 py-2 flex-grow-1 ">
              Login
            </Link>
            )}
           
            <Link to="/manageaddress" className="text-decoration-none btn btn-outline-secondary fs-5 fw-medium px-4 py-2 flex-grow-1 ">
              Manage Address
            </Link>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
