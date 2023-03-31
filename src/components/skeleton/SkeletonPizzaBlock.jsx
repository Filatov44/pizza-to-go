import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonPizzaBlock = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="152" y="314" rx="0" ry="0" width="0" height="1" />
    <rect x="5" y="290" rx="9" ry="9" width="270" height="27" />
    <rect x="5" y="336" rx="15" ry="15" width="270" height="75" />
    <rect x="5" y="428" rx="6" ry="6" width="115" height="27" />
    <rect x="128" y="421" rx="25" ry="25" width="140" height="40" />
    <circle cx="140" cy="130" r="125" />
  </ContentLoader>
);

export default SkeletonPizzaBlock;
