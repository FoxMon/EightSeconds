import styled from "styled-components";
import React from "react";
import GlobalTheme from "@/styles/theme";

interface DotProps {
  num?: number;
  scrollIndex?: number;
}
const Dot = ({ num, scrollIndex }: DotProps) => {
  return (
    <DotDiv
      itemProp={scrollIndex === num ? GlobalTheme.colors.theme : "transparent"}
    ></DotDiv>
  );
};

const Dots = ({ scrollIndex }: DotProps) => {
  return (
    <DotsContainer>
      <DotsDiv>
        <Dot num={1} scrollIndex={scrollIndex}></Dot>
        <Dot num={2} scrollIndex={scrollIndex}></Dot>
        <Dot num={3} scrollIndex={scrollIndex}></Dot>
        <Dot num={4} scrollIndex={scrollIndex}></Dot>
      </DotsDiv>
    </DotsContainer>
  );
};

export default Dots;

const DotDiv = styled.div`
  width: 1rem;
  height: 1rem;
  border: 1px solid ${GlobalTheme.colors.theme};
  border-radius: 100%;
  background-color: ${(props) => props.itemProp};
  transitionduration: 1000;
  transition: background-color 0.5s;
`;

const DotsContainer = styled.div`
  position: fixed;
  top: 40%;
  right: 5%;
`;

const DotsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 20;
  height: 10rem;
`;
