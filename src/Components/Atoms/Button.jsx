const Button = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-12  h-8 bg-[#474c5b] text-white  rounded-md  ${className} cursor-pointer`}
    >
      {text}
    </button>
  );
};

export default Button;
