import React from "react";
// routes
import Router from "./routes";
import ThemeCustomization from "./themes";
import ScrollTop from "./components/ScrollTop";

function App() {
  // const { isInitialized } = useAuth();

  return (
    <ThemeCustomization>
      <ScrollTop>
        <Router />
      </ScrollTop>
    </ThemeCustomization>
  );
}

export default App;
