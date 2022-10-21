import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import CustomIcon from "@/components/icons/CustomIcon";

interface ChannelCardPropsType {
  img: string;
  title: string;
  channelUuid: string;
  curMemberNum: string;
  locationDist: string;
  locationCity: string;
  onMoreClick: (channelUuid: string) => void;
}

function ChannelCard({
  img,
  title,
  channelUuid,
  curMemberNum,
  locationDist,
  locationCity,
  onMoreClick,
}: ChannelCardPropsType) {
  return (
    <CardContainer>
      <CardImg src={img} />
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardInfoList>
          <List>
            <CustomIcon
              name="people"
              size="15"
              color={GlobalTheme.colors.theme}
            />
            <PeopleCount>{curMemberNum}</PeopleCount>
          </List>
          <List>
            <CustomIcon name="map" size="15" color={GlobalTheme.colors.theme} />
            <Location>{locationDist}</Location>
            <Location>{locationCity}</Location>
          </List>
        </CardInfoList>
        <ButtonContainer>
          <Button
            onClick={() => {
              onMoreClick(channelUuid);
            }}
          >
            More
          </Button>
        </ButtonContainer>
      </CardContent>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  width: 27rem;
  height: 27rem;

  border-radius: 0.7rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const CardImg = styled.img`
  height: 50%;
  background-size: cover;
`;

const CardContent = styled.div`
  height: 50%;
  padding: 0.5rem 0.7rem;
  background-color: ${GlobalTheme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: ${GlobalTheme.fontSize.medium};
`;

const CardTitle = styled.h1`
  font-family: ${GlobalTheme.fontStyle.regular};
  font-size: ${GlobalTheme.fontSize.littleBig};
`;
const CardInfoList = styled.ul`
  display: flex;
  justify-content: left;
`;
const List = styled.li`
  display: flex;
  margin-right: 2rem;
  span {
    margin-left: 1rem;
  }
`;

const PeopleCount = styled.span``;
const Location = styled.span``;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const Button = styled.button`
  ${GlobalTheme.buttons}
  background:none;
  color: ${GlobalTheme.colors.theme};
  font-size: ${GlobalTheme.fontSize.littleBig};
  padding: 0.7rem 1.2rem;
  border: 0.1rem solid ${GlobalTheme.colors.theme};
  cursor: pointer;
  &:hover {
    transform: translateY(-0.3rem);
  }
  &::after {
    transform: scale(1.5);
    opacity: 0;
  }
  &:active {
    transform: translateY(-0.1rem);
  }
`;

export default ChannelCard;
