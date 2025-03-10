import React from "react";
import images from "../../CardImg/images";

const Card = ({ title, faculty, model }) => {
  const randomImage = images[Math.floor(Math.random() * images.length)];
  return (
    <div className="bg-white shadow-2xl rounded-lg p-4">
      <img
        src={randomImage}
        alt="card"
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="mt-2 text-lg font-semibold">{title}</h2>
      <p className="text-gray-600">{faculty}</p>
      <p className="text-gray-600">{model}</p>
    </div>
  );
};

export default Card;
