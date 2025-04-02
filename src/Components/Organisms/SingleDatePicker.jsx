import { useState, useRef, useEffect } from "react";
import { Calendar } from "react-date-range";
import { format, isSameDay } from "date-fns";
import "react-date-range/dist/styles.css"; // estilos principales
import "react-date-range/dist/theme/default.css"; // tema por defecto

function SingleDatePicker({
  label = "Escoger fecha",
  onChangeDays,
  onChangeFecha, // ✅ nuevo prop
  className,
  disabledDates = [],
}) {
  const [date, setDate] = useState(null); // No se cuenta hasta que el usuario seleccione
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleSelect = (selectedDate) => {
    const isDisabled = disabledDates.some((d) => isSameDay(d, selectedDate));

    if (!isDisabled) {
      setDate(selectedDate);
      onChangeDays?.(1);
      onChangeFecha?.(selectedDate); // ✅ pasamos fecha al padre
    } else {
      onChangeDays?.(0);
      onChangeFecha?.(null);
    }

    setOpen(false);
  };

  // Cerrar calendario al hacer clic fuera
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
    <div className="relative w-full" ref={ref}>
      {label && (
        <label className="text-sm text-gray-600 block mb-1">{label}</label>
      )}
      <input
        type="text"
        readOnly
        value={date ? format(date, "dd/MM/yyyy") : ""}
        onClick={() => setOpen(!open)}
        className={`${className} border border-gray-300 rounded-md px-4 py-3 w-full cursor-pointer h-14 bg-white`}
        placeholder="Seleccionar fecha"
      />
      {open && (
        <div className="absolute z-10 mt-2 shadow-lg">
          <Calendar
            date={date || new Date()}
            onChange={handleSelect}
            minDate={new Date()}
            showDateDisplay={false}
            disabledDates={disabledDates}
          />
        </div>
      )}
    </div>
  );
}

export default SingleDatePicker;
