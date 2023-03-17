import React from 'react';
// routes
import Router from "./routes";
// hooks
import useAuth from "./hooks/useAuth";
import RtlLayout from "./components/RtlLayout";
import NotistackProvider from "./components/NotistackProvider";
import LoadingScreen, { ProgressBarStyle } from "./components/LoadingScreen";


function App() {
  const { isInitialized } = useAuth();

  return (
    <RtlLayout>
      <NotistackProvider>
        <ProgressBarStyle />
        {/* <Settings /> */}
        {isInitialized ? <Router /> : <LoadingScreen />}
      </NotistackProvider>
    </RtlLayout>
  );
}

export default App;
