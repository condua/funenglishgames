import React from "react";

const LogoImage = ({
  width = 100,
  height = 100,
  alt = "Logo",
  src = "https://www.mlpa.edu.vn/assets/logo-kvWYVhLQ.png",
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="mx-auto mb-3 rounded-full border-none border-gray-300"
    />
  );
};

export default LogoImage;
