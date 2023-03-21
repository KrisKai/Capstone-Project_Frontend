import React from 'react';
// routes
import Router from "./routes";
import RtlLayout from "./components/RtlLayout";
import NotistackProvider from "./components/NotistackProvider";
import LoadingScreen, { ProgressBarStyle } from "./components/LoadingScreen";


function App() {
  // const { isInitialized } = useAuth();

  return (
    <RtlLayout>
      <NotistackProvider>
        <ProgressBarStyle />
        {/* <Settings /> */}
        <Router />
      </NotistackProvider>
    </RtlLayout>
  );
}

export default App;
