import { createGlobalStyle } from "styled-components";
import EliceDigitalBaeumOTF_Bold from "@/styles/fonts/EliceDigitalBaeumOTF_Bold.otf";
import EliceDigitalBaeumOTF_Regular from "@/styles/fonts/EliceDigitalBaeumOTF_Regular.otf";

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: "eRegular";
        src: local("EliceDigitalBaeumOTF_Regular"), url(${EliceDigitalBaeumOTF_Regular}) format('opentype'); 
    }
    @font-face {
        font-family: "eBold";
        src: local("EliceDigitalBaeumOTF_Bold"), url(${EliceDigitalBaeumOTF_Bold}) format('opentype'); 
    }
`;

export default GlobalStyle;
