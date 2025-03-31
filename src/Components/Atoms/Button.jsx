const Button = ({ text, onClick, className, type, form }) => {
  return (
    <button
      onClick={onClick}
      className={`px-12  h-8 bg-[#474c5b] text-white   rounded-md  ${className} cursor-pointer`}
      type={type}
      form={form}
    >
      {text}
    </button>
  );
};

export default Button;
