import React, { useState, useEffect } from "react";
import { curUserState } from "@/recoil/atoms/authState";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import {
  authFollowRequest,
  authUnFollowRequest,
  authFollowingRequest,
} from "@/api/authFetcher";

export default function Follow() {
  const curUser = useRecoilValue(curUserState);
  const [followed, setFollowed] = useState(false);
  const curUserId = curUser._id;
  const handleFollowClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!followed) {
      await authFollowRequest("/api/follow", curUser._id);
      setFollowed(true);
    } else {
      await authUnFollowRequest("/api/follow", curUser._id);
      setFollowed(false);
    }
  };

  useEffect(() => {
    if (curUserId) {
      (async () => {
        const { datas } = await authFollowingRequest("/api/follow", curUserId);
        setFollowed(datas.isFollowed);
      })();
    }
  }, [curUserId]);
  return (
    <FollowButton onClick={handleFollowClick} itemScope={followed}>
      Follow
    </FollowButton>
  );
}

const FollowButton = styled.button`
  ${GlobalTheme.buttons}
  background-color:${(props) =>
    props.itemScope ? GlobalTheme.colors.theme : "none"};
  color: ${(props) =>
    props.itemScope ? GlobalTheme.colors.white : GlobalTheme.colors.theme};
  border: 1px solid ${GlobalTheme.colors.theme};
  transition: all 0.3s;
  width: 50%;
  font-size: 1.5rem;
  padding: 1rem 2rem;
  cursor: pointer;
`;
