import axios from "axios";
import React, { useEffect, useState } from "react";

const HomeCarousel = () => {
  const [images, setimages] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/uploads/get`)
      .then((res) => {
       setimages(res.data.images);
      })
      .catch((err) => console.error("Error fetching carousel images", err));
  }, []);

  return (
    <div
      id="heroCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="2000"
      style={{ maxHeight: "50vh", overflow: "hidden", marginTop: "62px" }}
    >
      <div className="carousel-inner">
        {images.map((image, i) => (
          <div key={i} className="carousel-item active">
            <img
              src={image}
              className="d-block w-100"
              style={{ height: "50vh", objectFit: "cover" }}
              alt="Banner 1"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCarousel;
