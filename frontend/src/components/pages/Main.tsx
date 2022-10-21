import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import BasePageComponent from "@/components/hoc/BasePageComponent";

function Main() {
  const navigate = useNavigate();

  return (
    <BasePageComponent>
      <MainContent>
        <MainContentTitle>
          Join plogging for a Pleasant environment For Everyone
        </MainContentTitle>
        <MainContentMinTitle>
          We are help for health in the world. We make world a better place
        </MainContentMinTitle>
        <ButtonContainer>
          <Button
            onClick={() => navigate("/channels")}
            color={GlobalTheme.colors.white}
            itemProp={GlobalTheme.colors.theme}
          >
            Explore our service
          </Button>
          <Button
            onClick={() => navigate("/about")}
            color={GlobalTheme.colors.theme}
            itemProp={GlobalTheme.colors.white}
          >
            About Plogging
          </Button>
        </ButtonContainer>
        <ImgContainer>
          <MainImg src="mainPloggingImg2.png" />
          <MainImg src="mainPloggingImg.png" />
        </ImgContainer>
      </MainContent>
    </BasePageComponent>
  );
}

export default Main;

const MainContent = styled.div`
  width: 70%;
  margin: 0 0 0 10rem;
`;

const MainContentTitle = styled.h1`
  font-family: ${GlobalTheme.fontStyle.bold};
  font-size: 4.5rem;
  line-height: 1.2;
  width: 55rem;
  margin-bottom: 2rem;
`;

const MainContentMinTitle = styled.h3`
  font-size: ${GlobalTheme.fontSize.littleBig};
  margin-bottom: 4rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 3rem;
  margin-bottom: 4rem;
`;

const Button = styled.button`
  ${GlobalTheme.buttons}
  background-color:${(props) => props.itemProp};
  color: ${(props) => props.color};
  font-size: 1.5rem;
  padding: 1rem 3rem;
  cursor: pointer;
  &:hover {
    transform: translateY(-0.3rem);
  }
  &::after {
    transform: scale(1.5);
    opacity: 0;
  }
  &:active {
    transform: translateY(-0.1rem);
  }
`;

const ImgContainer = styled.div`
  display: flex;
  gap: 12%;
`;

const MainImg = styled.img`
  width: 40%;
`;
