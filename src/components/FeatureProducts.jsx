import React, { useRef } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useCart } from "../context/CartContext";

const FeatureProducts = ({ category, searchText }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { cart } = useAuth();
  const { handleAddToCart } = useCart();

  useEffect(() => {
    const delay = setTimeout(() => {
      const trimmedSearch = searchText.trim();
      const isSearching =
        trimmedSearch !== "" || (category && category !== "all");

      if (isSearching) {
        const queryObj = {};
        if (trimmedSearch) queryObj.search = trimmedSearch;
        if (category !== "all") queryObj.categoryName = category;

        axios
          .get(
            `http://localhost:4000/api/products/getallproducts`, {params : queryObj }
          )
          .then((res) => {
            setProducts(res.data.data);
            setTotalPages(1);
            setPage(1);
          })
          .catch((err) => console.error("Search error", err));
      } else {
        axios
          .get(`http://localhost:4000/api/products/getallproducts?page=${page}`)
          .then((res) => {
            setProducts(res.data.data);
            setTotalPages(res.data.totalPages);
          })
          .catch((err) => console.error("Pagination error", err));
      }
    }, 500); // debounce delay of 500ms

    return () => clearTimeout(delay);
  }, [searchText, category, page]);

  return (
    <>
      <div className="mb-5 pt-5 px-md-4 px-2 bg-light">
        <h1 className="mb-1 mt-3 fs-3 fw-semibold fst-italic text-secondary text-center">
          {category && category !== "all" ? (
            <>
              Products in{" "}
              <span className="text-danger fw-bold fst-normal">
                {category.toUpperCase()}
              </span>{" "}
              category{" "}
            </>
          ) : (
            "Featured Products"
          )}
        </h1>
        <p className="text-muted small text-center">
          Showing variety of quality products across variety of ranges
        </p>

        <div className="row row-cols-md-3 row-cols-xl-4 row-cols-2 mt-5">
          {products.length === 0 ? (
            <p className="text-center">Loading...</p>
          ) : (
            products.map((product) => {
              
              const isInCart = cart.items.find(
                (item) => item.product._id === product._id
              );

              return (
                <div
                  key={product._id}
                  className="col mb-4 d-flex align-items-stretch bg-white"
                >
                  <div className="card shadow d-flex flex-column w-100 ">
                    <Link
                      to={`/products/${product._id}`}
                      className="text-decoration-none text-dark"
                    >
                      <div style={{ height: "200px" }}>
                        <img
                          src={product.imageUrl}
                          className="card-img-top h-100 w-100"
                          alt={product.name}
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    </Link>

                    <div className="card-body d-flex flex-column justify-content-between">
                      <div className="mb-2 mb-md-3">
                        <h5 className="card-title my-2 text-secondary fw-bolder">
                          {product.name}
                        </h5>
                        <p className="card-text text-muted small d-none d-md-block">
                          {product.description.length > 70
                            ? product.description.slice(0, 70) + "..."
                            : product.description}
                        </p>
                      </div>

                      <div className="mt-auto d-flex flex-md-row flex-column justify-content-between gap-2 gap-md-4">
                        <p className="card-text text-primary fs-4 fw-bold m-0 p-0">
                          ₹{product.price}
                        </p>

                        <button
                          className={`btn ${
                            isInCart ? "btn-success" : "btn-primary"
                          }`}
                          onClick={() => handleAddToCart(product._id)}
                        >
                          {isInCart ? `(${isInCart.quantity}) Added  ` : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* PAGINATION */}
        <nav aria-label="Product Pagination">
          <ul className="pagination justify-content-center">
            {/* Previous Button */}
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setPage(page - 1)}>
                Prev
              </button>
            </li>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${page === index + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            {/* Next Button */}
            <li
              className={`page-item ${page === totalPages ? "disabled" : ""}`}
            >
              <button className="page-link" onClick={() => setPage(page + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default FeatureProducts;
