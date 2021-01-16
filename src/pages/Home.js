import React, { useState, useEffect, useRef } from "react";
import { getProductsByCount } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import TypeWriter from "../components/cards/TypeWriter";
import bannerImage from "../image/banner-image.jpg";
import bannerImage2 from "../image/banner-image-2.jpg";
import bannerImage3 from "../image/banner-image-3.jpg";
import { Button, Carousel } from "antd";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);

    getProductsByCount(2)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const scrollToBottom = () => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className="row d-flex align-items-center">
        <div className="col-md-8">
          <Carousel autoplay>
            <div>
              <img
                src={bannerImage}
                alt=""
                className="image-responsive"
                width="100%"
              />
            </div>
            <div>
              <img
                src={bannerImage2}
                alt=""
                className="image-responsive"
                width="100%"
              />
            </div>
            <div>
              <img
                src={bannerImage3}
                alt=""
                className="image-responsive"
                width="100%"
              />
            </div>
          </Carousel>
        </div>
        <div className="col-md-4 p-5">
          <h1 className="pb-1">
            <TypeWriter
              text={["Latest Products", "New Arrivals", "Best Sellers"]}
            />
          </h1>
          <Button
            type="primary"
            size="large"
            className="btn btn-warning btn-raised"
            onClick={scrollToBottom}
          >
            Shop Now
          </Button>
        </div>
      </div>
      <div className="container" ref={divRef}>
        <h3 className="py-3">All Products</h3>
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4">
              <ProductCard product={product} loading={loading} />
            </div>
          ))}
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default Home;
