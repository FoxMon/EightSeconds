import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomIcon from "@/components/icons/CustomIcon";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import { curUserState } from "@/recoil/atoms/authState";
import { useRecoilValue } from "recoil";
import { authFollowingRequest } from "@/api/authFetcher";
import { TextOne, TextTwo, SmallButton, BigTitle } from "@/styles/commonStyle";
import Modal from "../modal/Modal";

interface UserContentType {
  nickname: string;
  email: string;
  profPic: string;
  _id: "string";
}

export default function FollowList() {
  const [followList, setFollowList] = useState<Array<UserContentType>>([]);
  const curUser = useRecoilValue(curUserState);
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();

  const handleFollowingClick = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsShow(true);
    const { datas } = await authFollowingRequest(
      "/api/follow/list",
      curUser._id
    );
    setFollowList(datas);
  };
  return (
    <>
      <FriendListIconContainer>
        <FriendListIcon onClick={handleFollowingClick}>
          <CustomIcon
            name="following"
            size="15"
            color={GlobalTheme.colors.white}
          />
          <Following>팔로잉</Following>
        </FriendListIcon>
      </FriendListIconContainer>
      <Modal
        isOpenModal={isShow}
        isAlertModal={true}
        isShowImage={false}
        onModalCancelButtonClickEvent={() => setIsShow(false)}
      >
        <BigTitle>팔로잉</BigTitle>
        <UsersContainer>
          {followList.map((user) => (
            <UserContainer key={user.nickname}>
              <UserImg itemProp={user.profPic}></UserImg>
              <UserInfo>
                <TextOne>{user.nickname}</TextOne>
                <TextTwo>{user.email}</TextTwo>
              </UserInfo>
              <SmallButton onClick={() => navigate(`/profile/${user._id}`)}>
                프로필
              </SmallButton>
            </UserContainer>
          ))}
        </UsersContainer>
      </Modal>
    </>
  );
}

const FriendListIconContainer = styled.div`
  display: flex;
  margin-bottom: 3rem;
  gap: 1rem;
`;
const FriendListIcon = styled.div`
  border-radius: 0.4rem;
  display: flex;
  justify-content: center;
  padding: 0.7rem 1rem;
  gap: 1rem;
  align-items: center;
  cusor: pointer;
  background-color: ${GlobalTheme.colors.theme};
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

const Following = styled.div`
  font-size: ${GlobalTheme.fontSize.medium};
  color: ${GlobalTheme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const UsersContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
  height: 45rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const UserContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  width: 70%;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${GlobalTheme.colors.black};
`;
const UserImg = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  background-image: url(${(props) => props.itemProp});
  background-size: cover;
  border-radius: 100%;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
