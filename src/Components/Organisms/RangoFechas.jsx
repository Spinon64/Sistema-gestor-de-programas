import React, { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import { format, differenceInCalendarDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function RangoFechas({ onChangeDays }) {
  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const prevDays = useRef(null); // <- nuevo

  // Cerrar al hacer clic fuera del componente
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calcular días y evitar loop infinito
  useEffect(() => {
    const { startDate, endDate } = range[0];
    let newDays = 0;
    if (startDate && endDate) {
      newDays = differenceInCalendarDays(endDate, startDate) + 1;
      if (newDays < 0) newDays = 0;
    }

    if (prevDays.current !== newDays) {
      prevDays.current = newDays;
      onChangeDays?.(newDays);
    }
  }, [range, onChangeDays]);

  const formatOrPlaceholder = (date) =>
    date ? format(date, "dd MMM yyyy") : "DD / MM / YY";

  return (
    <div style={{ position: "relative", display: "inline-block" }} ref={ref}>
      <input
        type="text"
        readOnly
        value={`${formatOrPlaceholder(
          range[0].startDate
        )} - ${formatOrPlaceholder(range[0].endDate)}`}
        onClick={() => setOpen(!open)}
        style={{
          padding: "10px",
          width: "250px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      />
      {open && (
        <div style={{ position: "absolute", zIndex: 1000 }}>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={range}
          />
        </div>
      )}
    </div>
  );
}
