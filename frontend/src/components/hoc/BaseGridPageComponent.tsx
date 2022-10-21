import React from "react";
import styled from "styled-components";
import { BaseComponentType } from "@/types/common/baseComponentType";

const BaseGridPageComponent = ({ children }: BaseComponentType) => {
  return <BasePageComponentContainer>{children}</BasePageComponentContainer>;
};

const BasePageComponentContainer = styled.div`
  height: 100%;
  margin-left: 26rem;
  display: block;
  align-items: center;
`;

export default BaseGridPageComponent;
