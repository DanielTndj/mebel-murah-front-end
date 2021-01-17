import React, { useRef } from "react";
import TypeWriter from "../components/cards/TypeWriter";
import bannerImage1 from "../image/banner-image-1.jpg";
import bannerImage2 from "../image/banner-image-2.jpg";
import bannerImage3 from "../image/banner-image-3.jpg";
import bannerImage4 from "../image/banner-image-4.png";
import { Button, Carousel } from "antd";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";

const bannerImages = [bannerImage1, bannerImage2, bannerImage3, bannerImage4];

const Home = () => {
  const divRef = useRef(null);

  const scrollToBottom = () => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className="row d-flex align-items-center">
        <div className="col-md-8">
          <Carousel autoplay>
            {bannerImages.map((image) => (
              <img
                key={image.uri}
                src={image}
                alt=""
                className="image-responsive"
                width="100%"
              />
            ))}
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
            className="btn btn-outline-warning"
            onClick={scrollToBottom}
          >
            Shop Now
          </Button>
        </div>
      </div>
      <div ref={divRef}>
        <NewArrivals />
      </div>
      <BestSellers />
    </div>
  );
};

export default Home;
