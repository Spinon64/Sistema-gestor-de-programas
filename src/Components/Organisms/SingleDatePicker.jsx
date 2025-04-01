// components/SingleDatePicker.js
import { useState, useRef, useEffect } from "react";
import { Calendar } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // estilos principales
import "react-date-range/dist/theme/default.css"; // tema por defecto

function SingleDatePicker({
  label = "Escoger fecha",
  onChangeDays,
  className,
}) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    onChangeDays?.(1); // ✅ cuenta 1 día desde el inicio
  }, []);

  const handleSelect = (date) => {
    setDate(date);
    onChangeDays?.(1);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full " ref={ref}>
      <label className="text-sm text-gray-600 block mb-1">{label}</label>
      <input
        type="text"
        readOnly
        value={format(date, "dd/MM/yyyy")}
        onClick={() => setOpen(!open)}
        className={`${className} border border-gray-300 rounded-md px-4 py-3 w-full cursor-pointer h-14 bg-white`}
      />
      {open && (
        <div className="absolute z-10 mt-2 shadow-lg">
          <Calendar
            date={date}
            onChange={handleSelect}
            minDate={new Date()}
            showDateDisplay={false}
          />
        </div>
      )}
    </div>
  );
}

export default SingleDatePicker;
