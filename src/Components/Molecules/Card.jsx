import React from "react";
import img1 from "../../CardImg/img1.webp";
import { Link } from "react-router-dom";

const Card = ({ title, faculty, model, to = "#" }) => {
  return (
    <Link to={to}>
      <div className="w-full max-w-[24rem] bg-white shadow-xl rounded-2xl overflow-hidden transition-transform hover:scale-105">
        <img src={img1} alt="card" className="w-full h-40 object-cover" />
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-1">{title}</h2>
          <p className="text-gray-600 text-sm">{faculty}</p>
          <p className="text-gray-600 text-sm">{model}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
