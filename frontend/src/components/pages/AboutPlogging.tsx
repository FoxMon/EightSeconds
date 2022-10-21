import React, { useRef } from "react";
import styled from "styled-components";
import useScroll from "@/hooks/useScroll";
import useChartData from "@/hooks/useChartData";
import Dots from "@/styles/Dots";
import BasePageComponent from "@/components/hoc/BasePageComponent";
import AboutWrapperComponent from "@/components/about/AboutWrapperComponent";
import {
  createAboutFirstConent,
  createAboutSecondContent,
  createAboutThirdContent,
  createAboutFourthContent,
} from "@/components/about/aboutPloggingComponent";

const AboutPlogging = () => {
  const dataNames = ["korea_sea_monitor", "microplastic", "trash_rot"];
  const outerDivRef = useRef<HTMLDivElement>(null);
  const [scrollIndex] = useScroll(1, outerDivRef);
  const [barChartInfo] = useChartData(dataNames[0], {
    labels: [],
    data: [],
  });
  const [multiLineChartInfo] = useChartData(dataNames[1], {
    labels: [],
    data1: [],
    data2: [],
    data3: [],
  });

  const { data1, data2, data3 } = multiLineChartInfo;

  return (
    <BasePageComponent>
      <Outer ref={outerDivRef}>
        <Dots scrollIndex={scrollIndex} />
        <AboutWrapperComponent>
          {createAboutFirstConent()}
        </AboutWrapperComponent>
        <AboutWrapperComponent>
          {createAboutSecondContent({
            labels: barChartInfo.labels,
            data: barChartInfo.data,
          })}
        </AboutWrapperComponent>
        <AboutWrapperComponent>
          {createAboutThirdContent({
            labels: multiLineChartInfo.labels,
            data1: data1,
            data2: data2,
            data3: data3,
          })}
        </AboutWrapperComponent>
        <AboutWrapperComponent>
          {createAboutFourthContent()}
        </AboutWrapperComponent>
      </Outer>
    </BasePageComponent>
  );
};
const Outer = styled.div`
  height: 100vh;
  overflow-y: auto;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
}
`;

export default AboutPlogging;
