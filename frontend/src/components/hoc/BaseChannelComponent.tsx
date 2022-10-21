import React from "react";
import styled from "styled-components";
import { BaseComponentType } from "@/types/common/baseComponentType";

const BaseChannelComponent = ({ children }: BaseComponentType) => {
  return <BaseChannelComponentStyle>{children}</BaseChannelComponentStyle>;
};

const BaseChannelComponentStyle = styled.div`
  height: 100%;
  margin-left: 26rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default BaseChannelComponent;
