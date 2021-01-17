import React from "react";
import StarRating from "react-star-ratings";

export const showAverage = (product) => {
  if (product && product.ratings) {
    let ratingsArray = product && product.ratings;
    let total = [];
    let length = ratingsArray.length;
    console.log("jumlah yg ngasih rating ", length);

    ratingsArray.map((rating) => total.push(rating.star));
    let totalReduced = total.reduce((prev, next) => prev + next, 0);
    console.log("jumlah bintang ", totalReduced);

    let highest = length * 5;
    console.log("highest ", highest);

    let result = (totalReduced * 5) / highest;
    console.log("result ", result);

    return (
      <>
        <StarRating
          rating={result}
          isSelectable={false}
          starRatedColor="#ffcc29"
          starDimension="20px"
          starSpacing="2px"
          starHoverColor="#ffcc29"
        />{" "}
        ({length})
      </>
    );
  }
};
