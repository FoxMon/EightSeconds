import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterFontWrapper>
          <FooterFont>TEAM</FooterFont>
          <FooterFont>8LOGGING</FooterFont>
        </FooterFontWrapper>
        <FooterTeamWrapper>
          <FooterTeamTitle>8LOGGING Team</FooterTeamTitle>
          <FooterTeamContent>The team</FooterTeamContent>
          <FooterTeamContent>8 Seconds</FooterTeamContent>
          <FooterTeamContent>Project</FooterTeamContent>
        </FooterTeamWrapper>
      </FooterContainer>
      <FooterCopyRightContainer>
        © Photo, Inc. 2022. We love our users!
      </FooterCopyRightContainer>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  margin-left: 26rem;
  background-color: ${GlobalTheme.colors.lightThreeGray};
`;

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 0.7px solid ${GlobalTheme.colors.black};
  height: auto;
  font-family: ${GlobalTheme.fontStyle.bold};
`;

const FooterFontWrapper = styled.div`
  width: auto;
  padding: 2rem;
  padding-left: 3.5rem;
`;

const FooterFont = styled.div`
  font-size: ${GlobalTheme.fontSize.hyperBig};
`;

const FooterTeamWrapper = styled.div`
  width: auto;
  padding: 3rem;
  padding-right: 10rem;
`;

const FooterTeamTitle = styled.div`
  margin-bottom: 1rem;
  font-size: ${GlobalTheme.fontSize.big};
`;

const FooterTeamContent = styled.div`
  font-family: ${GlobalTheme.fontStyle.regular};
  font-size: ${GlobalTheme.fontSize.littleBig};
  margn-bottom: 1rem;
`;

const FooterCopyRightContainer = styled.div`
  padding: 2rem 1rem 1rem 2rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
`;

export default Footer;
