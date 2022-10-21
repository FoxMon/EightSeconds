import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import { BigTitle, MediumSubTitle, MediumTitle } from "@/styles/commonStyle";
import CustomIcon from "@/components/icons/CustomIcon";

interface PropsType {
  title: string;
  memberNums: number;
  location: string;
}

const ChannelHeader = ({ title, memberNums, location }: PropsType) => {
  return (
    <TitleContainer>
      <BigTitle>Channel</BigTitle>
      <MediumTitle># {title}</MediumTitle>
      <MediumSubTitle>
        <PeopleContainer>
          <CustomIcon
            name="following"
            size="20"
            color={GlobalTheme.colors.gray}
          />
          {memberNums}
        </PeopleContainer>
        <CustomIcon name="map" size="20" color={GlobalTheme.colors.gray} />
        {location}
      </MediumSubTitle>
    </TitleContainer>
  );
};

const TitleContainer = styled.div`
  position: relative;
  padding: 2rem;
  height: 10rem;
  width: 100%;
  border-bottom: solid 1px ${GlobalTheme.colors.lightTwoGray};
  display: flex;
  flex-direction: column;
  & > * {
    margin-bottom: 1rem;
  }
`;

const PeopleContainer = styled.div`
  display: flex;
  padding-right: 1rem;
  align-items: center;
  gap: 0.5rem;
  border-right: 1px solid ${GlobalTheme.colors.gray};
`;

const Application = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export default ChannelHeader;
