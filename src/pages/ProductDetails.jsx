import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const { handleAddToCart } = useCart();
  const { cart } = useAuth();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/product/get/${id}`)
      .then((res) => setProduct(res.data)
      )
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  const isInCart = cart?.products?.find(
    (item) => item.productId._id === id
  );

  return (
    <div className="container my-5">
      <h1 className=" mb-5 border-bottom pb-3 fw-bold text-secondary">{product.name}</h1>
      <div className="row">
        {/* Product Image */}
        <div className="col-md-6 text-center mb-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>

        {/* Product Info */}
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h2 className="fw-bold text-secondary mb-3">{product.name}</h2>
          <p className="text-muted mb-4">{product.description}</p>
          <h4 className="text-primary fw-bold mb-3">₹{product.price}</h4>
          <button onClick={() => handleAddToCart(id)} className={` ${isInCart ? "btn-success" : "btn-primary"
            } btn btn-lg w-100`}>
            {isInCart ? `(${isInCart.quantity}) Added` : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
