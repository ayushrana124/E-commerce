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
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/verify`, {
          withCredentials: true,
        });

        if (res.data?.user) {
          setUser(res.data.user);

          // Fetch cart
          const cartRes = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
            withCredentials: true,
          });
          setCart(cartRes.data.cart);
 
          // fetch adddress
          const address = await axios.get(`${import.meta.env.VITE_API_URL}/address`, {
            withCredentials: true
          });
          setAddresses(address.data.address)

        } else {
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
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/verify`, {
        withCredentials: true,
      });
      setUser(res.data.user);

      const cartRes = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        withCredentials: true,
      });
      setCart(cartRes.data.cart);

      const address = await axios.get(`${import.meta.env.VITE_API_URL}/address`, {
        withCredentials: true
      });
      setAddresses(address.data.address)

      navigate("/");
    } catch (err) {
      console.error("Login fetch failed:", err);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/signout`, {}, {
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
