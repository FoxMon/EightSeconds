import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import { BigButton } from "@/styles/commonStyle";
import { ChannelOwnerType } from "@/types/channel/channelTypes";

interface ChannelEnterProps extends ChannelOwnerType {
  onEnterDecideClickEvent: () => void;
}

const ChannelEnter = ({
  email,
  nickname,
  description,
  profPic,
  onEnterDecideClickEvent,
}: ChannelEnterProps) => {
  return (
    <ChannelContainer>
      <ChannelImage src={profPic} />
      <ChannelEmail>{email}</ChannelEmail>
      <ChannelInfoContainer>
        <ChannelInfo>{nickname}</ChannelInfo>
      </ChannelInfoContainer>
      <ChannelInfoDescriptionContainer>
        {description}
      </ChannelInfoDescriptionContainer>
      <BigButton onClick={onEnterDecideClickEvent}>Enter</BigButton>
    </ChannelContainer>
  );
};

const ChannelContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const ChannelImage = styled.img`
  width: 39%;
`;

const ChannelEmail = styled.div`
  width: 100%;
`;

const ChannelInfoContainer = styled.div`
  margin-top: 1rem;
  font-size: ${GlobalTheme.fontSize.big};
`;

const ChannelInfoDescriptionContainer = styled.div`
  margin-top: 1rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
`;

const ChannelInfo = styled.div`
  font-size: ${GlobalTheme.fontSize.big};
`;

export default ChannelEnter;
