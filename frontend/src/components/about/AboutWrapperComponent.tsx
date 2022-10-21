import React from "react";
import styled from "styled-components";
import { BaseComponentType } from "@/types/common/baseComponentType";

const AboutWrapperComponent = ({ children }: BaseComponentType) => {
  return <AboutWrapperStyle>{children}</AboutWrapperStyle>;
};

const AboutWrapperStyle = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default AboutWrapperComponent;
