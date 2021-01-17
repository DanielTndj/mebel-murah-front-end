import React, { useState, useEffect } from "react";
import { getProduct, productStar } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";  

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const { slug } = match.params;
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadProduct();
  }, [slug]);

  useEffect(() => {
    // load star if user already give rating
    if (product.ratings && user) {
      let existingRating = product.ratings.find(
        (rating) => rating.postedBy.toString() === user._id.toString()
      );

      if (existingRating) {
        setStar(existingRating.star);
      }
    }
  });

  const loadProduct = () => {
    getProduct(slug).then((res) => setProduct(res.data));
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    // name = productId
    productStar(name, newRating, user.token).then((res) => {
      console.log("RATING CLICKED", res.data);
      loadProduct();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-5">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>

      <div className="row p-5">
        <div className="col">
          <h3>Related Products</h3>
        </div>
      </div>
    </div>
  );
};

export default Product;
