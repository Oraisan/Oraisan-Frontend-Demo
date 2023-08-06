import React from "react";
import Bridge from "./components";
import "./App.css";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider>
      <Bridge />
    </SnackbarProvider>
  );
}

export default App;
