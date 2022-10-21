import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import ChannelInfo from "@/components/channelDetail/ChannelInfo";
import { useNavigate } from "react-router-dom";
import { ChannelDetailType } from "@/types/channel/channelTypes";
import { loginUserIdState, curUserState } from "@/recoil/atoms/authState";
import { useRecoilValue } from "recoil";
import LoadingCycle from "@/components/loading/LoadingCycle";

interface Props {
  isShowMore: boolean;
  setIsShowMore: React.Dispatch<React.SetStateAction<boolean>>;
  channelDetailInfo: ChannelDetailType[];
  isLoading: boolean;
  onEnterdCancleClickEvent?: (selectedChannelId: string) => void;
  selectedChannelId: string;
  channelStatus?: number;
}

const ChannelHistoryDetail = ({
  isShowMore,
  setIsShowMore,
  channelDetailInfo,
  isLoading,
  onEnterdCancleClickEvent,
  selectedChannelId,
  channelStatus,
}: Props) => {
  const loginUserId = useRecoilValue(loginUserIdState);
  const curUser = useRecoilValue(curUserState);
  const ownerId = curUser._id;
  const isLoginUserChannel = ownerId === loginUserId;
  const navigate = useNavigate();

  return (
    <ChannelDetailBackground isShowMore={isShowMore}>
      <ChannelDetailContainer>
        {isLoading && <LoadingCycle />}
        {channelDetailInfo.map((info) => (
          <ChannelInfo
            key={info._id}
            title={info.title}
            spec={info.spec}
            imgUrl={info.imgUrl}
            locationCity={info.locationCity}
            locationDist={info.locationDist}
            memberNum={info.memberNum}
            ownerInfo={info.ownerInfo}
            membersInfo={info.membersInfo}
            setIsShowMore={setIsShowMore}
          />
        ))}

        <ChannelDetailButtonContainer>
          {channelStatus === 2 && isLoginUserChannel ? (
            <Button
              onClick={() => {
                if (onEnterdCancleClickEvent) {
                  onEnterdCancleClickEvent(selectedChannelId);
                }
              }}
            >
              신청취소
            </Button>
          ) : (
            ""
          )}
          {channelStatus !== 2 && isLoginUserChannel ? (
            <Button
              onClick={() => navigate(`/channels/${channelDetailInfo[0]._id}`)}
            >
              채널
            </Button>
          ) : (
            ""
          )}
          <BackButton
            onClick={() => {
              setIsShowMore(false);
            }}
          >
            Close
          </BackButton>
        </ChannelDetailButtonContainer>
      </ChannelDetailContainer>
    </ChannelDetailBackground>
  );
};

const ChannelDetailBackground = styled.div<{ isShowMore: boolean }>`
  display: ${(props) => (props.isShowMore ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ChannelDetailContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100rem;
  height: 60rem;
  background-color: ${GlobalTheme.colors.white};
  box-shadow: 1px 1px 3px ${GlobalTheme.colors.gray};
  border-radius: 8px;
`;

const ChannelDetailButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 8rem;
`;

const Button = styled.button`
  ${GlobalTheme.buttons}
  width: 30rem;
  height: 4rem;
  background-color: ${GlobalTheme.colors.theme};
  color: ${GlobalTheme.colors.white};
  font-size: ${GlobalTheme.fontSize.littleBig};
  cursor: pointer;
`;

const BackButton = styled(Button)`
  color: ${GlobalTheme.colors.theme};
  background-color: ${GlobalTheme.colors.white};
  border: 1px solid ${GlobalTheme.colors.theme};
`;

export default ChannelHistoryDetail;
