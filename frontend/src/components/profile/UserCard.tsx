import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import { curUserState } from "@/recoil/atoms/authState";
import { useRecoilValue } from "recoil";
import BaseCardContainer from "@/components/hoc/BaseCardContainer";
import { BigTitle, TitleContainer } from "@/styles/commonStyle";
import Follow from "@/components/profile/Follow";
import FollowList from "@/components/profile/FollowList";

interface ImgProps {
  img?: string;
}
interface UserCardProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteAccountModalOpenClickEvent: () => void;
  isEditable?: boolean;
}

function UserCard({
  isEditable,
  setIsEditing,
  onDeleteAccountModalOpenClickEvent,
}: UserCardProps) {
  const curUser = useRecoilValue(curUserState);

  const handlerEditClick = () => {
    setIsEditing(true);
  };

  return (
    <BaseCardContainer width="50vh">
      <TitleContainer>
        <BigTitle>
          {isEditable ? `My` : `${curUser.nickname}'s`} Profile
        </BigTitle>
      </TitleContainer>
      <Img img={curUser?.profPic} />
      {isEditable && <FollowList />}

      <InforContainer>
        <UserNicname>{curUser?.nickname}</UserNicname>
        <UserEmail>{curUser?.email}</UserEmail>
        <UserDescription>{curUser?.description}</UserDescription>
        {!isEditable && <Follow></Follow>}
        {isEditable && (
          <>
            <Button onClick={handlerEditClick}>Edit</Button>
            <Button onClick={onDeleteAccountModalOpenClickEvent}>
              Delete Account
            </Button>
          </>
        )}
      </InforContainer>
    </BaseCardContainer>
  );
}

const Img = styled.div<ImgProps>`
  width: 7rem;
  height: 7rem;
  background-image: url(${(props) => props.img});
  background-size: cover;
  border-radius: 100%;
  margin-bottom: 2rem;
`;
const InforContainer = styled.div`
  display: flex;
  background-color: ${GlobalTheme.colors.lightThreeGray};
  border-radius: 1rem;
  width: 80%;
  height: 50%;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding: 1rem;
  font-size: ${GlobalTheme.fontSize.medium};
`;

const UserNicname = styled.h3``;

const UserEmail = styled.span``;

const UserDescription = styled.span``;

const Button = styled.button`
  ${GlobalTheme.buttons}
  background-color:${GlobalTheme.colors.theme};
  color: ${GlobalTheme.colors.white};
  width: 80%;
  font-size: 1.5rem;
  padding: 1rem 2rem;
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

export default UserCard;
