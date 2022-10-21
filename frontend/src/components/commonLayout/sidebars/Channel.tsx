import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import GlobalTheme from "@/styles/theme";
import { useRecoilState, useRecoilValue } from "recoil";
import { sidebarChannelsState } from "@/recoil/atoms/channelState";
import { loginUserIdState } from "@/recoil/atoms/authState";
import CustomIcon from "@/components/icons/CustomIcon";
import { getAuthInformationById } from "@/api/authFetcher";

interface ChannelContainerProps {
  isToggle: boolean;
}

const Channel: React.FC = () => {
  const [isToggle, setIsToggle] = useState(false);
  const loginUserId = useRecoilValue(loginUserIdState);
  const [sidebarChannels, setSidebarChannels] =
    useRecoilState(sidebarChannelsState);

  const navigate = useNavigate();

  const handleRefreshButtonClick = async () => {
    const res = await getAuthInformationById(
      "/api/users/userinfo",
      loginUserId
    );
    setSidebarChannels(res.channels);
  };

  const handleChannelMoveClick = (channel: string) => () => {
    navigate(`/channels/${channel}`);
  };

  useEffect(() => {
    handleRefreshButtonClick();
  }, []);

  return (
    <ChannelsContainer>
      <TitleContainer>
        <ChannelsTitle>
          Channel
          <RefreshButton onClick={handleRefreshButtonClick}>
            <CustomIcon
              name="refresh"
              size="25"
              color={GlobalTheme.colors.gray}
            />
          </RefreshButton>
        </ChannelsTitle>
        <ToggleIcon onClick={() => setIsToggle(!isToggle)}>
          {!isToggle ? (
            <CustomIcon
              name="toggleDown"
              size="25"
              color={GlobalTheme.colors.theme}
            />
          ) : (
            <CustomIcon
              name="toggleUp"
              size="25"
              color={GlobalTheme.colors.theme}
            />
          )}
        </ToggleIcon>
      </TitleContainer>

      <ChannelContainer isToggle={!isToggle}>
        {sidebarChannels
          .filter((channel) => channel.position !== 2)
          .map((channel, index) => {
            return (
              <ChannelLink
                key={index}
                onClick={handleChannelMoveClick(channel._id)}
              >
                <ChannelImg src={channel.img} />
                <FlowContent>
                  <ChannelTitle>
                    <Title>{channel.title}</Title>
                    <Title>{channel.title}</Title>
                    <Title>{channel.title}</Title>
                  </ChannelTitle>
                </FlowContent>
              </ChannelLink>
            );
          })}
      </ChannelContainer>
    </ChannelsContainer>
  );
};
const flow = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-50rem, 0);
  }
`;

const ChannelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: ${GlobalTheme.fontSize.default}
  magin-top: 20rem;
`;

const ChannelLink = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 4rem;
  text-decoration: none;
  margin-bottom: 3rem;
  color: ${GlobalTheme.colors.gray};
`;

const FlowContent = styled.div`
  overflow: hidden;
  height: 4rem;
  width: 60%;
  line-height: 4rem;
  margin-left: 0.5rem;
`;
const ChannelTitle = styled.div`
  white-space: nowrap;
  &:hover {
    animation: ${flow} 7s linear infinite;
  }
`;

const RefreshButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.1s ease;
  &:active {
    transform: rotate(-1turn);
  }
`;

const Title = styled.span`
  display: inline-block;
  width: 20rem;
  margin-right: 5rem;
`;
const ChannelImg = styled.img`
  width: 7rem;
  height: 3.5rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
`;

const ChannelsTitle = styled.div`
  width: 100%;
  font-size: ${GlobalTheme.fontSize.moreBig};
  font-weight: bold;
  text-align: left;
`;
const TitleContainer = styled.div`
  display: flex;
  margin-top: 5rem;
  margin-bottom: 3rem;
`;
const ChannelContainer = styled.div<ChannelContainerProps>`
  display: flex;
  overflow: auto;
  padding-top: 1rem;
  &::-webkit-scrollbar {
    display: none;
  }

  &:hover {
    &::-webkit-scrollbar {
      display: block;
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background: ${GlobalTheme.colors.theme};
      border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
      background: ${GlobalTheme.colors.lightThreeGray};
    }
  }
  ${(props) =>
    props.isToggle
      ? `visibility: hidden;
  height: 0vh;`
      : `visibility: visible;
  height: 30vh;`}
  flex-direction: column;
  transition: all 0.4s;
  &:active {
    transform: translateY(-0.1rem);
  }
`;
const ToggleIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    scale: 1.2;
  }
`;

export default Channel;
