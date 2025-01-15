import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import SwapForm from "./components/SwapForm";

const theme = createTheme({
  palette: {
    primary: { main: "#111315" },
    secondary: { main: "#9c27b0" },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <SwapForm />
      </div>
    </ThemeProvider>
  );
};

export default App;
