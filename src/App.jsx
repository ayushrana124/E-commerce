import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/signIn.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import CartPage from "./pages/CartPage.jsx";
import ProtectedUser from "./components/ProtectedUser.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Checkout from "./pages/CheckoutPage.jsx";
import Thankyou from "./pages/Thankyou.jsx";
import ManageAddressPage from "./pages/ManageAddressess.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route
          path="/cart"
          element={
            <ProtectedUser>
              <CartPage />
            </ProtectedUser>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedUser>
              <UserProfile />
            </ProtectedUser>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedUser>
              <Checkout />
            </ProtectedUser>
          }
        />
        <Route
          path="/thankyou"
          element={
            <ProtectedUser>
              <Thankyou />
            </ProtectedUser>
          }
        />
        <Route
          path="/manageaddress"
          element={
            <ProtectedUser>
              <ManageAddressPage />
            </ProtectedUser>
          }
        />
      </Routes>
    </>
  );
};

export default App;
