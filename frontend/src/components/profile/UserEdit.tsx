import React, { useState } from "react";
import styled from "styled-components";
import UserInfoEditForm from "./UserInfoEditForm";
import UserPsEditForm from "./UserPsEditForm";

interface UserCardEditProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  onModalOpenButtonClickEvent: () => void;
}

function UserEdit({
  setIsEditing,
  onModalOpenButtonClickEvent,
}: UserCardEditProps) {
  const [isPsEditing, setIsPsEditing] = useState(false);
  return (
    <EditCardContainer>
      {isPsEditing ? (
        <UserPsEditForm
          setIsEditing={setIsEditing}
          setIsPsEditing={setIsPsEditing}
        />
      ) : (
        <UserInfoEditForm
          setIsEditing={setIsEditing}
          setIsPsEditing={setIsPsEditing}
          onModalOpenButtonClickEvent={onModalOpenButtonClickEvent}
        />
      )}
    </EditCardContainer>
  );
}

const EditCardContainer = styled.div``;

export default UserEdit;
