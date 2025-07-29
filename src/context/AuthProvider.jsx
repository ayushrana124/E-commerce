import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [cart, setCart] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  // For User, Token, cart
  useEffect(() => {
    const init = async () => {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUser(decoded);

          const cartRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/cart`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCart(cartRes.data);
        } catch (err) {
          setCart({});
        }
      } else {
        setUser(null);
        setCart({});
      }
      setLoading(false);
    };

    init();
  }, [token]);

 
  // For Addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/getAddress`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAddresses(res.data.addressList);
      } catch (err) {
        console.error("Failed to fetch addresses", err);
        setAddresses([]);
      }
    };

    fetchAddresses();
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setCart({});
    setAddresses([]);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, cart, setCart, addresses, setAddresses }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
