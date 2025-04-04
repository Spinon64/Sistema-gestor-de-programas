const SearchInput = ({ placeholder, value, onChange }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-gray-300 h-[2.5rem] rounded-md px-4 w-64 mr-2 py-1 focus:outline-none "
      />
      <span className="absolute right-3 top-2 text-gray-500"></span>
    </div>
  );
};

export default SearchInput;
