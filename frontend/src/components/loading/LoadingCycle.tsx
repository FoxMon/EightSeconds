import React from "react";
import styled, { keyframes } from "styled-components";
import GlobalTheme from "@/styles/theme";

const LoadingCycle = () => {
  return (
    <LoadingBox>
      <Circle></Circle>
      <Circle></Circle>
      <Circle></Circle>
    </LoadingBox>
  );
};

export default LoadingCycle;

const cycle = keyframes`
from {
  opacity: 1;
  transform: scale(1);
  background-color: ${GlobalTheme.colors.theme};
}
to {
  opacity: 0.8;
  transform: scale(.75);
}
  
`;

const LoadingBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  z-index: 1;
`;

const Circle = styled.div`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  transtion: background-color 2s;
  :nth-child(1) {
    animation: ${cycle} 0.4s ease 0s infinite alternate;
    background-color: white;
  }
  :nth-child(2) {
    animation: ${cycle} 0.4s ease 0.2s infinite alternate;
    background-color: white;
  }
  :nth-child(3) {
    animation: ${cycle} 0.4s ease 0.4s infinite alternate;
    background-color: white;
  }
`;
