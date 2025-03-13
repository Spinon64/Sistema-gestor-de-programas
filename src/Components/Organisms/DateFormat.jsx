import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Crear un tema personalizado directamente
const customTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "1px", // Margen inferior
          marginTop: "1px", // Margen superior
          // Estilos para el input
          "& .MuiInputBase-root": {
            height: "30px", // Ajusta la altura
            width: "200px", // Ajusta el ancho
            fontSize: "14px", // Ajusta el tamaño de la fuente
          },
        },
      },
    },
  },
});

export default function DateFormat() {
  return (
    <ThemeProvider theme={customTheme}>
      {" "}
      {/* Usar el tema personalizado */}
      <DatePicker
        format="DD/MM/YYYY"
        slotProps={{
          textField: {
            size: "small", // Tamaño pequeño
            sx: {
              // Estilos adicionales con sx
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px", // Bordes redondeados
                borderColor: "#2196f3", // Color del borde
              },
            },
          },
        }}
      />
    </ThemeProvider>
  );
}
