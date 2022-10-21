import React from "react";
import styled from "styled-components";
import { BaseComponentType } from "@/types/common/baseComponentType";

const BasePageComponent = ({ children }: BaseComponentType) => {
  return <BasePageComponentContainer>{children}</BasePageComponentContainer>;
};

const BasePageComponentContainer = styled.div`
  height: 100%;
  margin-left: 26rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default BasePageComponent;
