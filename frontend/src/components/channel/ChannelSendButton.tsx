import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import CustomIcon from "@/components/icons/CustomIcon";

interface ChannelSendButtonProps {
  onChannelSendButtonEvent: (e: React.FormEvent) => void;
}

const ChannelSendButton = ({
  onChannelSendButtonEvent,
}: ChannelSendButtonProps) => {
  return (
    <SendButton type="submit" onClick={onChannelSendButtonEvent}>
      <CustomIcon name="send" size="22" color={GlobalTheme.colors.theme} />
    </SendButton>
  );
};

const SendButton = styled.button`
  border: none;
  background: none;
  position: absolute;
  bottom: 3%;
  right: 5%;
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

export default ChannelSendButton;
