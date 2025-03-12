const Button = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-12  h-8 bg-gray-700 text-white  rounded-md  ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
