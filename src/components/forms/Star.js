import React from "react";
import StarRating from "react-star-ratings";

const Star = ({ starClick, numberOfStars }) => (
  <div style={{ marginBottom: "5px" }}>
    <StarRating
      changeRating={() => starClick(numberOfStars)}
      numberOfStars={numberOfStars}
      starEmptyColor="#ffcc29"
      starDimension="20px"
      starSpacing="2px"
      starHoverColor="#ffcc29"
    />
    <span style={{ position: "relative", top: "3px" }}> ({numberOfStars})</span>
    <br />
  </div>
);

export default Star;
