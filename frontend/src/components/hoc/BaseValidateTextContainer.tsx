import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import { BaseComponentType } from "@/types/common/baseComponentType";

const BaseValidateTextContainer = ({ children }: BaseComponentType) => {
  return <BaseContainer>{children}</BaseContainer>;
};

const BaseContainer = styled.div`
  width: 100%;
  text-align: center;
  font-size: ${GlobalTheme.fontSize.default};
  color: ${GlobalTheme.colors.lightRed};
`;

export default BaseValidateTextContainer;
