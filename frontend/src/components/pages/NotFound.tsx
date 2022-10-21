import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <NotFoundContainer>
      <NotFoundTitleContainer>
        <Title1>4</Title1>
        <NotFoundImg
          src={`${process.env.PUBLIC_URL}/images/notfound-img.png`}
        />
        <Title2>4</Title2>
      </NotFoundTitleContainer>
      <NotFoundTextContainer>
        <NotFoundText>죄송합니다. 페이지를 찾을 수 없습니다.</NotFoundText>
        <NotFoundText>
          요청하신 페이지가 삭제되었거나 잘못된 주소를 입력하셨습니다.
        </NotFoundText>
      </NotFoundTextContainer>
      <ButtonContainer>
        <BackButton onClick={() => navigate(-1)}>이전 페이지</BackButton>
        <BackButton onClick={() => window.location.replace("/")}>
          홈으로
        </BackButton>
      </ButtonContainer>
    </NotFoundContainer>
  );
};

export default NotFound;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: fixed;
  background-color: ${GlobalTheme.colors.lightTwoGray};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
const NotFoundTitleContainer = styled.div`
  position: relative;
  text-align: center;
`;
const NotFoundImg = styled.img`
  width: 70%;
`;

const NotFoundTitle = styled.span`
  position: absolute;
  color: #178e6e;
  font-size: 40rem;
  font-weight: bold;
  z-index: -1;
`;

const Title1 = styled(NotFoundTitle)`
  left: 43rem;
`;
const Title2 = styled(NotFoundTitle)`
  right: 47rem;
`;

const NotFoundTextContainer = styled.div`
  font-size: ${GlobalTheme.fontSize.moreBig};
  line-height: 5rem;
  text-align: center;
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 5rem;
`;
const BackButton = styled.button`
  ${GlobalTheme.buttons}
  margin-top: 5rem;
  height: 5rem;
  width: 12rem;
  color: ${GlobalTheme.colors.white};
  background-color: ${GlobalTheme.colors.theme};
  font-size: ${GlobalTheme.fontSize.big};
  cursor: pointer;
`;

const NotFoundText = styled.div`
  width: auto;
`;
