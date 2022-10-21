import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";

interface ChannelEditProps {
  editInputRef: React.RefObject<HTMLInputElement>;
  onChatLogEditConfirmClickEvent: (e: React.FormEvent) => void;
  onChatLogEditCancelClickEvent: () => void;
}

const ChannelEdit = ({
  editInputRef,
  onChatLogEditConfirmClickEvent,
  onChatLogEditCancelClickEvent,
}: ChannelEditProps) => {
  return (
    <ChatEditContainer>
      <ChatEditInput ref={editInputRef} placeholder="내용을 입력하세요" />
      <ChatEditButton type="submit" onClick={onChatLogEditConfirmClickEvent}>
        Confirm
      </ChatEditButton>
      <ChatEditButton onClick={onChatLogEditCancelClickEvent}>
        Cancel
      </ChatEditButton>
    </ChatEditContainer>
  );
};

const ChatEditContainer = styled.form`
  width: auto;
`;

const ChatEditInput = styled.input`
  display: block;
  border-radius: 4px;
  padding: 1rem;
  height: 1.2rem;
  font-size: ${GlobalTheme.fontSize.medium};
  border: 1.2px solid ${GlobalTheme.colors.theme};
`;

const ChatEditButton = styled.button`
  display: inline;
  margin-top: 0.275rem;
  padding: 1rem;
  font-size: ${GlobalTheme.fontSize.medium};
  color: ${GlobalTheme.colors.theme};
  background-color: ${GlobalTheme.colors.white};
  border: 1px solid ${GlobalTheme.colors.theme};
  border-radius: 4px;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    background-color: ${GlobalTheme.colors.theme};
    color: ${GlobalTheme.colors.white};
  }
`;

export default ChannelEdit;
