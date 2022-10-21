import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import EliceDigitalBaeumOTF_Bold from "@/styles/fonts/EliceDigitalBaeumOTF_Bold.otf";
import EliceDigitalBaeumOTF_Regular from "@/styles/fonts/EliceDigitalBaeumOTF_Regular.otf";
import GlobalTheme from "./theme";
const GlobalStyle = createGlobalStyle`
    ${normalize}
    @font-face {
        font-family: "eRegular";
        src: local("EliceDigitalBaeumOTF_Regular"), url(${EliceDigitalBaeumOTF_Regular}) format('opentype'); 
    }
    @font-face {
        font-family: "eBold";
        src: local("EliceDigitalBaeumOTF_Bold"), url(${EliceDigitalBaeumOTF_Bold}) format('opentype'); 
    }
   
    h1,h2,h3,h4,h5,ul{
        margin:0;
        padding:0;
    }
  
    html,
    body, 
    #root, 
    .App {
        font-family: "eRegular"; 
        width: 100%; 
        height: 100%; 
        box-sizing:border-box; 
        font-size: 62.5%; 
    }
    body{
        background-color:${GlobalTheme.colors.lightThreeGray}
        
    }
`;

export default GlobalStyle;
