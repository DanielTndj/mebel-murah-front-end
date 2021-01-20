import React from "react";
import { Link } from "react-router-dom";
import { Collapse } from "antd";

const { Panel } = Collapse;

const ProductListItems = ({ product }) => {
  const {
    price,
    category,
    subs,
    shipping,
    color,
    fabric,
    quantity,
    sold,
  } = product;

  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price
        <span className="label label-default label-pill pull-xs-right font-weight-bold">
          IDR {price}
        </span>
      </li>

      {category && (
        <li className="list-group-item">
          Category
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {category.name}
          </Link>
        </li>
      )}

      {subs && (
        <Collapse ghost>
          <Panel header="Sub Categories">
            {subs.map((sub) => (
              <div className="row ml-1 py-1" key={sub._id}>
                <Link to={`/sub/${sub.slug}`}>{sub.name}</Link>
                <br />
                {/* <hr /> */}
              </div>
            ))}
          </Panel>
        </Collapse>
      )}

      <li className="list-group-item">
        Materia;
        <span className="label label-default label-pill pull-xs-right">
          {fabric}
        </span>
      </li>
      <li className="list-group-item">
        Shipping
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </li>
      <li className="list-group-item">
        Color
        <span className="label label-default label-pill pull-xs-right">
          {color}
        </span>
      </li>
      <li className="list-group-item">
        Available
        <span className="label label-default label-pill pull-xs-right">
          {quantity}
        </span>
      </li>
      <li className="list-group-item">
        Sold
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </li>
    </ul>
  );
};

export default ProductListItems;
