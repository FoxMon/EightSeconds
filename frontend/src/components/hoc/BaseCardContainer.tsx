import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import { BaseComponentType } from "@/types/common/baseComponentType";

interface BaseCardContaineProps extends BaseComponentType {
  width: string;
}

const BaseCardContainer = ({ children, width }: BaseCardContaineProps) => {
  return (
    <BaseCardContainerStyle itemProp={width}>{children}</BaseCardContainerStyle>
  );
};

const BaseCardContainerStyle = styled.div`
  width: ${(props) => props.itemProp};
  overflow: hidden;
  min-width: 40rem;
  min-height: 75rem;
  height: 80vh;
  border-radius: 1rem;
  background-color: ${GlobalTheme.colors.white};
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export default BaseCardContainer;
