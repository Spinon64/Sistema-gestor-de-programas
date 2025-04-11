const Button = ({ text, onClick, className, type, form, img }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`px-12 h-8 bg-[#474c5b] text-white rounded-md ${className} cursor-pointer flex items-center justify-center gap-3 hover:scale-101 transition-all`}
        type={type}
        form={form}
      >
        <img src={img} width="20px" alt="" />

        {text}
      </button>
    </>
  );
};

export default Button;
