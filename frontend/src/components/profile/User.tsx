import React from "react";
import UserCard from "./UserCard";
import UserEdit from "./UserEdit";
import styled from "styled-components";

interface UserProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  userId?: string;
  isEditable?: boolean;
  onModalOpenButtonClickEvent: () => void;
  onDeleteAccountModalOpenClickEvent: () => void;
}

function User({
  isEditing,
  isEditable,
  setIsEditing,
  onModalOpenButtonClickEvent,
  onDeleteAccountModalOpenClickEvent,
}: UserProps) {
  return (
    <UserContainer>
      <UserCardContainer>
        {isEditing ? (
          <UserEdit
            setIsEditing={setIsEditing}
            onModalOpenButtonClickEvent={onModalOpenButtonClickEvent}
          />
        ) : (
          <UserCard
            isEditable={isEditable}
            setIsEditing={setIsEditing}
            onDeleteAccountModalOpenClickEvent={
              onDeleteAccountModalOpenClickEvent
            }
          />
        )}
      </UserCardContainer>
    </UserContainer>
  );
}
const UserContainer = styled.div`
  display: flex;
  margin-right: 3rem;
`;
const UserCardContainer = styled.div`
  display: flex;
`;

export default User;
