import React from "react";
import { useAuth } from "../context/AuthProvider";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
 
const { cart } = useAuth();
const { handleAddToCart, handleReduceProduct, handleRemoveFromCart} = useCart();
 
  return (
    <div className="container px-4 pt-5">
      <h1 className=" mb-5 border-bottom pb-3 fw-bold text-secondary">Shopping Cart</h1>
 
      {!cart ? (
        <p className="text-center fs-1 fst-italic text-secondary">Your cart is empty</p>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {cart?.products?.map((item) => (
              <div key={item.productId._id} className="card mb-3 shadow-sm">
                <div className="row g-0 align-items-center">
                  <div className="col-md-2 ps-2">
                    <img
                      src={item.productId.imageUrl}
                      alt={item.productId.name}
                      className="img-fluid rounded-start"
                      style={{ maxHeight: "100px", objectFit: "contain" }}
                    />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body">
                      <h5 className="card-title mb-1">{item.productId.name}</h5>
                      <p className="card-text text-muted mb-1">
                        ₹{item.productId.price} x {item.quantity}
                      </p>
                      <p className="card-text text-primary fw-bolder">
                        ₹{item.totalPrice}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex flex-column align-items-end px-3">
                    <div className="btn-group mb-2" role="group">
                      <button onClick={()=> handleReduceProduct(item.productId._id)} className="btn btn-outline-secondary btn-sm">-</button>
                      <button className="btn btn-outline-secondary btn-sm" disabled>
                        {item.quantity}
                      </button>
                      <button onClick={() => handleAddToCart(item.productId._id)} className="btn btn-outline-secondary btn-sm">+</button>
                    </div>
                    <button onClick={() => handleRemoveFromCart(item.productId._id)} className="btn btn-sm btn-outline-danger">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h5 className="mb-3 text-center">Order Summary</h5>
              <p className="d-flex justify-content-between">
                <span>Total Items:</span>
                <span>{cart?.products?.length}</span>
              </p>
              <p className="d-flex justify-content-between fw-semibold">
                <span>Total Price:</span>
                <span className="fw-bold">₹{cart?.grandTotalPrice}</span>
              </p>
              <Link to="/checkout" className="text-decoration-none text-white btn btn-primary w-100 mt-3">Proceed to Checkout</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
