const Button = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-12 w-64 h-8 bg-gray-700 text-white  rounded-md hover:bg-gray-800 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
