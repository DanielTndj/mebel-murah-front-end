import React, { useState, useEffect } from "react";
import { getProduct } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = () => {
    getProduct(slug).then((res) => setProduct(res.data));
  };

  return (
    <div className="container-fluid">
      <div className="row pt-5">
        <SingleProduct product={product} />
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
