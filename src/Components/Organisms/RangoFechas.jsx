import React, { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import { format, differenceInCalendarDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function RangoFechas({
  onChangeDays,
  className,
  initialRange = [],
}) {
  const [range, setRange] = useState([
    {
      startDate: initialRange[0] || new Date(),
      endDate: initialRange[1] || new Date(),
      key: "selection",
    },
  ]);

  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const prevDays = useRef(null);

  // 💡 NUEVO: actualizar rango si cambió el initialRange desde el padre
  useEffect(() => {
    if (
      initialRange.length === 2 &&
      initialRange[0] instanceof Date &&
      initialRange[1] instanceof Date
    ) {
      setRange([
        {
          startDate: initialRange[0],
          endDate: initialRange[1],
          key: "selection",
        },
      ]);
    }
  }, [initialRange]);

  // Calcular días y notificar
  useEffect(() => {
    const { startDate, endDate } = range[0];
    let newDays = 0;

    if (startDate && endDate) {
      newDays = differenceInCalendarDays(endDate, startDate) + 1;
      if (newDays < 0) newDays = 0;
    }

    if (prevDays.current !== newDays) {
      prevDays.current = newDays;
      onChangeDays?.({ dias: newDays, range: [startDate, endDate] });
    }
  }, [range, onChangeDays]);

  // Cierre al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatOrPlaceholder = (date) =>
    date ? format(date, "dd MMM yyyy") : "DD / MM / YY";

  return (
    <div style={{ position: "relative", display: "inline-block" }} ref={ref}>
      <input
        type="text"
        className={className}
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
            minDate={new Date()}
            ranges={range}
            disabledDay={(date) => {
              const day = date.getDay();
              return day === 0 || day === 6; // domingo o sábado
            }}
          />
        </div>
      )}
    </div>
  );
}
