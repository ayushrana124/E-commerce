import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Card, Modal, ListGroup } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const CheckoutPage = () => {
  const { cart, addresses, setAddresses } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    address: "",
    paymentMethod: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
  e.preventDefault();
  try {
    const payload = {
      address: form.address,
      paymentMethod: form.paymentMethod,
    };
    await axios.post(`${import.meta.env.VITE_API_URL}/order/create`, payload, {
      withCredentials : true
    });
    alert("Checkout successful!");
    navigate("/thankyou");
  } catch (err) {
    console.error("Order Error:", err);
    alert("Failed to place order");
  }
};

const handleAddressSubmit = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/address/add`,
       newAddress,
      {
        withCredentials : true
      }
    );
    console.log("Adding address", response.data);
    
setAddresses((prev) => [...prev, response.data.address]);

   setShowModal(false);
    setNewAddress({
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    });
  } catch (err) {
    console.error("Add Address Error:", err);
  }
};


  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddr = addresses.find((a) => a.isDefault);
      if (defaultAddr) {
        setForm((prev) => ({ ...prev, addressId: defaultAddr._id }));
      }
    }
  }, [addresses]);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <Card className="shadow rounded-4 border-0">
            <Card.Body className="p-4">
              <h2 className="pb-3 fw-bold text-secondary text-center">Place Order</h2>
              <Form onSubmit={handleCheckout}>
                {/* Address Selection */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Select Address</Form.Label>
                  <div className="d-flex align-items-center gap-2">
                    <Form.Select
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Choose an address --</option>
                      {addresses.map((addr) => (
                        <option key={addr._id} value={addr._id}>
                          {addr.fullAddress || `${addr.street}, ${addr.city}`}
                        </option>
                      ))}
                    </Form.Select>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => setShowModal(true)}
                    >
                      + Add
                    </Button>
                  </div>
                </Form.Group>

                {/* Payment Method */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Payment Method</Form.Label>
                  <Form.Select
                    name="paymentMethod"
                    value={form.paymentMethod}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Choose payment option --</option>
                    <option value="COD">Cash on Delivery</option>
                    <option value="UPI">UPI</option>
                    <option value="CARD">Credit/Debit Card</option>
                  </Form.Select>
                </Form.Group>

                {/* Order Summary Inline */}
                <div className="border-top pt-3 mt-4">
                  <h5 className="fw-bold mb-3">Order Summary</h5>
                  <ListGroup variant="flush" className="mb-3">
                    {cart?.items?.map((item, idx) => (
                      <ListGroup.Item
                        key={item._id}
                        className="d-flex justify-content-between"
                      >
                        <div>
                          {item.product.name} <small className="text-muted">x{item.quantity}</small>
                        </div>
                        <div>₹{item.product.price * item.quantity}</div>
                      </ListGroup.Item>
                    ))}
                    <ListGroup.Item className="d-flex justify-content-between fw-bold fs-5">
                      <div>Total</div>
                      <div>₹{cart?.totalPrice}</div>
                    </ListGroup.Item>
                  </ListGroup>
                </div>

                {/* Place Order Button */}
                <div className="d-grid mt-3">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="rounded-pill"
                  >
                    Place Order
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Add New Address Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {Object.entries(newAddress).map(([key, value]) => (
              <Form.Group key={key} className="mb-3">
                <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                <Form.Control
                  type="text"
                  name={key}
                  value={value}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, [key]: e.target.value })
                  }
                />
              </Form.Group>
            ))}
            <div className="d-grid">
              <Button variant="success" onClick={handleAddressSubmit}>
                Save Address
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CheckoutPage;
