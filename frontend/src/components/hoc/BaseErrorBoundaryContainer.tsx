import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import { BaseComponentType } from "@/types/common/baseComponentType";

const BaseErrorBoundaryContanier = ({ children }: BaseComponentType) => {
  return <BaseContainer>{children}</BaseContainer>;
};

const BaseContainer = styled.div`
  height: 100%;
  text-align: center;
  background-color: ${GlobalTheme.colors.lightThreeGray};
`;

export default BaseErrorBoundaryContanier;
