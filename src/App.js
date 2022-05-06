import "./App.css";

import React, { useState, useMemo, createContext } from "react";

import "./Progress.css";
import MainView from "./pages/MainView";
import { Route, Routes, HashRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const ColorModeContext = createContext({ toggleColorMode: () => {} });

const App = () => {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <React.StrictMode>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <HashRouter>
            <Routes>
              <Route path="/" element={<MainView />} />
              <Route path="/weatherApp" element={<MainView />} />
              <Route path="/weatherApp/day/:day" element={<MainView />} />
            </Routes>
          </HashRouter>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </React.StrictMode>
  );
};

export default App;
export { ColorModeContext };
