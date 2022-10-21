import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import { BaseComponentType } from "@/types/common/baseComponentType";

const BaseIntputContainer = ({ children }: BaseComponentType) => {
  return <BaseInputContainerStyle>{children}</BaseInputContainerStyle>;
};

const BaseInputContainerStyle = styled.div`
  margin-bottom: 3rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
`;

export default BaseIntputContainer;
