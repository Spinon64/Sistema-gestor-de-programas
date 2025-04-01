import { useState, useRef, useEffect } from "react";
import { Calendar } from "react-date-range";
import { format, isSameDay } from "date-fns";
import "react-date-range/dist/styles.css"; // estilos principales
import "react-date-range/dist/theme/default.css"; // tema por defecto

function SingleDatePicker({
  label = "Escoger fecha",
  onChangeDays,
  className,
  disabledDates = [],
}) {
  const [date, setDate] = useState(null); // No se cuenta hasta que el usuario seleccione
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleSelect = (selectedDate) => {
    // Verificamos si la fecha está en la lista de deshabilitadas
    const isDisabled = disabledDates.some((d) => isSameDay(d, selectedDate));

    if (!isDisabled) {
      setDate(selectedDate);
      onChangeDays?.(1); // Cuenta 1 día solo si es válida
    } else {
      onChangeDays?.(0); // Si es inválida, no se cuenta
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
