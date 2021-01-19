import React, { useState, useEffect } from "react";
import { getProduct, productStar } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";
import { getRelated } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import { Empty } from "antd";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    getProduct(slug).then((res) => {
      setLoading(false);
      setProduct(res.data);

      getRelated(res.data._id).then((res) => {
        setLoading(false);
        setRelated(res.data);
      });
    });
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

      <div className="px-5">
        <h3 className="pt-5 pb-2">Related Products</h3>
        <div className="row">
          {related.length ? (
            related.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} loading={loading} />
              </div>
            ))
          ) : (
            <div className="offset-md-4 col-md-4">
              <Empty />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
