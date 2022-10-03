import React from "react";
import styled from "styled-components";
import GlobalStyle from "@/styles/globalStyle";
import GlobalTheme from "@/styles/theme";

function App() {
  return (
    <React.Fragment>
      <CustomDiv>EliceDigitalBaeumOTF_Regular</CustomDiv>
      <CustomDiv2>EliceDigitalBaeumOTF_Bold</CustomDiv2>
      <GlobalStyle />
    </React.Fragment>
  );
}
const CustomDiv = styled.div`
  font-family: ${GlobalTheme.fontStyle.regular};
  font-size: ${GlobalTheme.fontSize.moreBig};
`;

const CustomDiv2 = styled.div`
  font-family: ${GlobalTheme.fontStyle.bold};
`;

export default App;
