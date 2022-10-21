import React from "react";
import CustomRouter from "@/router/CustomRouter";
import GlobalStyle from "@/styles/globalStyle";
import CommonErrorBoundary from "@/components/errorBoundary/CommonErrorBoundary";

function App() {
  return (
    <React.Fragment>
      <CommonErrorBoundary>
        <CustomRouter />
      </CommonErrorBoundary>
      <GlobalStyle />
    </React.Fragment>
  );
}

export default App;
