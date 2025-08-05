import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
    const [cartLoading, setCartLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        // Verify user session from cookie
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
          withCredentials: true,
        });

        if (res.data?.user) {
          setUser(res.data.user);

          // Fetch cart
          const cartRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart`, {
            withCredentials: true,
          });
          setCart(cartRes.data.cart);
         
        } else {
          // No user found, reset everything
          setUser(null);
          setCart({});
          setAddresses([]);
        }
      } catch (err) {
        if (err.response?.status !== 401) {
          console.error("Auth init failed", err);
        }
        setUser(null);
        setCart({});
        setAddresses([]);
      } finally {
        setLoading(false);
        setCartLoading(false);
      }
    };

    init();
  }, []);

  const login = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
        withCredentials: true,
      });
      console.log("user", res.data.user);
      setUser(res.data.user);

      const cartRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart`, {
        withCredentials: true,
      });
      console.log("cart data : ", cartRes.data.cart)
      setCart(cartRes.data.cart);

      navigate("/");
    } catch (err) {
      console.error("Login fetch failed:", err);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {}, {
        withCredentials: true,
      });
    } catch (err) {
      console.error("Logout error:", err);
    }

    setUser(null);
    setCart({});
    setAddresses([]);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading,
        cart,
        setCart,
        addresses,
        setAddresses,
        cartLoading,
        setCartLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
