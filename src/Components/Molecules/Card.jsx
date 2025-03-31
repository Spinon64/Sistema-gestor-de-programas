import React from "react";
//import images from "../../CardImg/images";
import img1 from "../../CardImg/img1.webp";

const Card = ({ title, faculty, model }) => {
  //const randomImage = images[Math.floor(Math.random() * images.length)];
  return (
    <div className="bg-white shadow-2xl rounded-lg w-full mx-auto">
      <div className="m-3">
        <img
          src={img1}
          alt="card"
          className="h-48 w-96 object-cover rounded-md"
        />
        <h2 className="mt-2 text-lg font-semibold">{title}</h2>
        <p className="text-gray-600">{faculty}</p>
        <p className="text-gray-600">{model}</p>
      </div>
    </div>
  );
};

export default Card;
