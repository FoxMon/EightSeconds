import React, { useState } from "react";
import styled from "styled-components";
import { curUserState } from "@/recoil/atoms/authState";
import { useRecoilState } from "recoil";
import GlobalTheme from "@/styles/theme";
import ChannelHistoryCard from "./ChannelHistoryCard";
import { BigTitle } from "@/styles/commonStyle";
import {
  currentChannelDetailRequest,
  channelEnteredCancelRequest,
} from "@/api/channelFetcher";
import { ChannelDetailType } from "@/types/channel/channelTypes";
import { ErrorType } from "@/types/error/errorType";
import { getAuthInformationById } from "@/api/authFetcher";
import ChannelHistoryDetail from "./ChannelHistoryDetail";
import Modal from "../modal/Modal";
import useModal from "@/hooks/useModal";

function ChannelHistory() {
  const [curUser, setCurUser] = useRecoilState(curUserState);
  const [resMessage, setResMessage] = useState("");
  const channels = curUser.channels;
  const [tabIndex, setTabIndex] = useState(0);
  const TapMenu = ["생성 채널", "가입 채널", "가입 대기 채널"];
  const [selectedChannelId, setSelectedChannelId] = useState<string>("");
  const [isShowMore, setIsShowMore] = useState(false);
  const [channelDetailInfo, setChannelDetailInfo] = useState<
    ChannelDetailType[]
  >([]);
  const [
    isOpenModal,
    ,
    handleModalOpenButtonClick,
    ,
    handleModalCloseButtonClick,
  ] = useModal(false);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfileOwner = async (curUserId: string) => {
    const res = await getAuthInformationById("/api/users/userinfo", curUserId);
    setCurUser(res);
  };

  const handleMoreClick = async (channelUuid: string, index?: number) => {
    const res = await currentChannelDetailRequest(
      `/api/channels/${channelUuid}`
    );
    setChannelDetailInfo([res.datas]);
    setSelectedChannelId(res.datas._id);
    setIsShowMore(true);
    if (typeof index === "number") {
      setIndex(index);
    }
  };

  const handleChannelCancellation = async (selectedChannelId: string) => {
    setIsLoading(true);
    try {
      await channelEnteredCancelRequest(
        `/api/channels/${selectedChannelId}/enter`
      );
      handleModalOpenButtonClick();
      setIsShowMore(false);
      fetchProfileOwner(curUser._id);
      setResMessage("취소 완료");
    } catch (error) {
      const err = error as ErrorType;
      const errorMessage = err.response.data.message;
      setResMessage(errorMessage);
    }
    setIsLoading(false);
  };

  return (
    <ChannelHistoryContainer>
      <TitleContainer>
        <BigTitle>Channel</BigTitle>
        <ChannelTaps>
          {TapMenu.map((menu, index) => {
            return (
              <Tab
                onClick={() => {
                  setTabIndex(index);
                }}
                key={index}
                style={{
                  borderBottom:
                    tabIndex === index
                      ? `2px solid ${GlobalTheme.colors.theme}`
                      : "none",
                  color:
                    tabIndex === index
                      ? GlobalTheme.colors.black
                      : GlobalTheme.colors.gray,
                }}
              >
                {menu}
              </Tab>
            );
          })}
        </ChannelTaps>
      </TitleContainer>
      <CardContainer>
        {channels.map((ch) =>
          ch.position === tabIndex ? (
            <ChannelHistoryCard
              key={ch._id}
              img={ch.img}
              title={ch.title}
              channelUuid={ch._id}
              curMemberNum={`${ch.curMemberNum}/${ch.memberNum}`}
              locationDist={ch.locationDist}
              locationCity={ch.locationCity}
              onMoreClick={handleMoreClick}
              index={ch.position}
            />
          ) : (
            ""
          )
        )}
      </CardContainer>
      <ChannelHistoryDetail
        isShowMore={isShowMore}
        isLoading={isLoading}
        setIsShowMore={setIsShowMore}
        channelDetailInfo={channelDetailInfo}
        selectedChannelId={selectedChannelId}
        onEnterdCancleClickEvent={handleChannelCancellation}
        channelStatus={index}
      />
      <Modal
        isOpenModal={isOpenModal}
        isAlertModal={true}
        isShowImage={false}
        onModalCancelButtonClickEvent={handleModalCloseButtonClick}
      >
        {resMessage}
      </Modal>
    </ChannelHistoryContainer>
  );
}

const ChannelTaps = styled.div`
  display: flex;
  margin-left: 2rem;
  height: 3rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
  margin-top: 3.8rem;
`;
const Tab = styled.div`
  margin-right: 3rem;
  cursor: pointer;
`;

const ChannelHistoryContainer = styled.div`
  overflow: hidden;
  background-color: blue;
  min-width: 60rem;
  width: 45%;
  height: 80vh;
  min-height: 75rem;
  border-radius: 1rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const TitleContainer = styled.div`
  padding: 2rem;
  height: 8rem;
  width: 100%;
  border-bottom: solid 1px ${GlobalTheme.colors.lightTwoGray};
  margin-bottom: 2rem;
`;

const CardContainer = styled.div`
  display: flex;
  height: 100%;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 0 10% 10% 10%;
  gap: 2rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  &:: {
    ::after {
      content: "";
      flex: auto;
    }
  }
`;

export default ChannelHistory;
