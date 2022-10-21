import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";

const ErrorPage = () => {
  return (
    <React.Fragment>
      <CustomErrorContainer>
        <CustomErrorImage
          src={`${process.env.PUBLIC_URL}/images/preview-form-img.png`}
        />
      </CustomErrorContainer>
      <CustomErrorContainer>
        <CustomTitleText>8LOGGING SERVICE</CustomTitleText>
        <CustomSubTitleText>OOPS!</CustomSubTitleText>
        <CustomContentText>
          예상치 못한 <strong>오류</strong>가 발생했습니다!
        </CustomContentText>
      </CustomErrorContainer>
      <CustomAnchor href="/">GO BACK</CustomAnchor>
    </React.Fragment>
  );
};

const CustomErrorContainer = styled.div`
  width: 100%:
`;

const CustomErrorImage = styled.img`
  width: 60%;
  height: 60%;
  border-radius: 100%;
  margin-top: 1.875rem;
`;

const CustomTitleText = styled.p`
  font-size: ${GlobalTheme.fontSize.hyperBig};
  font-family: eBold;
  line-height: 1rem;
`;

const CustomSubTitleText = styled.p`
  font-size: ${GlobalTheme.fontSize.realBig};
  font-family: eBold;
`;

const CustomContentText = styled.p`
  font-size: ${GlobalTheme.fontSize.big2};
`;

const CustomAnchor = styled.a`
  color: ${GlobalTheme.colors.theme};
  font-size: ${GlobalTheme.fontSize.moreBig};
  text-decoration: none;
  transition: 0.5s;
  border-bottom: 1px solid ${GlobalTheme.colors.theme};
  &:hover {
    color: ${GlobalTheme.colors.lightRed};
    border-bottom: 1px solid ${GlobalTheme.colors.lightRed};
  }
`;

export default ErrorPage;
