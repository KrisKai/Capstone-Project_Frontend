import React from "react";
// routes
import Router from "./routes";
import ThemeCustomization from "./themes";
import ScrollTop from "./components/ScrollTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // const { isInitialized } = useAuth();

  return (
    <ThemeCustomization>
      <ScrollTop>
        <ToastContainer
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          autoClose={3000}
        />
        <Router />
      </ScrollTop>
    </ThemeCustomization>
  );
}

export default App;
