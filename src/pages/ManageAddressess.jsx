import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const ManageAddressPage = () => {
  const { addresses, setAddresses, token } = useAuth();
    const [form, setForm] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/address/delete/${id}`, {
      withCredentials : true
      });
      setAddresses((prev) => prev.filter((addr) => addr._id !== id));
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
    }
  };

   const handleAddAddress = async () => {
    try {

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/address/add`,
        form,
        {
         withCredentials : true
        }
      );
      setAddresses((prev) => [...prev, res.data.address]);
      setForm({
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      });
    } catch (err) {
      console.error("Add error:", err.response?.data || err.message);
    }
  };

  
  return (
    <div className="container py-4">
      <h2 className="mt-2 mb-3 fw-bold text-secondary">Manage Addresses</h2>

      {addresses.length === 0 ? <p>No addresses yet.</p> : null}

      <ul className="list-group mb-4">
        {addresses.map((addr) => (
          <li
            key={addr._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {`${addr.street}, ${addr.city}, ${addr.state}, ${addr.postalCode}, ${addr.country}`}
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(addr._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h5>Add New Address</h5>
      <div className="row g-2">
        {["street", "city", "state", "postalCode", "country"].map((field) => (
          <div className="col-md-6" key={field}>
            <input
              type="text"
              className="form-control"
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            />
          </div>
        ))}
      </div>

      <button className="btn btn-primary mt-3" onClick={handleAddAddress}>
        Add Address
      </button>
    </div>
  );
};

export default ManageAddressPage;