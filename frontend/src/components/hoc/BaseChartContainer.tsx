import React from "react";
import styled from "styled-components";
import { BaseComponentType } from "@/types/common/baseComponentType";

const BaseChartContainer = ({ children }: BaseComponentType) => {
  return <ChartContainer>{children}</ChartContainer>;
};

const ChartContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 3rem;
`;

export default BaseChartContainer;
