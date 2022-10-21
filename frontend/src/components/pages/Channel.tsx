import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContextMenu } from "react-contexify";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import { loginUserIdState } from "@/recoil/atoms/authState";
import { sidebarChannelsState } from "@/recoil/atoms/channelState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentChannelDetailRequest,
  channelJoinAcceptRequet,
  channelJoinRejectRequet,
  channelDeleteRequest,
} from "@/api/channelFetcher";
import {
  MainChannelType,
  ChannelLogObjectType,
  waitListType,
  ChannelMemberType,
} from "@/types/channel/channelTypes";
import useModal from "@/hooks/useModal";
import Modal from "@/components/modal/Modal";
import BasePageComponent from "@/components/hoc/BasePageComponent";
import ChannelHeader from "@/components/channel/ChannelHeader";
import MemberList from "@/components/channel/MemberList";
import ChannelSendButton from "@/components/channel/ChannelSendButton";
import ContextMenu from "@/components/contextMenu/ContextMenu";
import ChannelEdit from "@/components/channel/ChannelEdit";
import { TextOne, TextTwo } from "@/styles/commonStyle";
import {
  customSocket,
  customSocketConnectRequest,
  customSocketCreateRequest,
  customSocketUpdateRequest,
  customSocketDeleteRequest,
  customSocketLeaveRequest,
} from "@/util/customSocket";

const CONTEXT_MENU_ID = "CONTEXT_MENU_ID";

function Channel() {
  const [channelContent, setChannelContent] = useState<string>("");
  const [chatLogs, setChatLogs] = useState<Array<ChannelLogObjectType>>([]);
  const [channelData, setChannelData] = useState<MainChannelType[]>([]);
  const [modalMessage, setModalMessage] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [waitList, setWaitList] = useState<waitListType[]>([]);
  const [memberList, setMemberList] = useState<ChannelMemberType[]>([]);
  const [isShowWaitList, setIsShowWaitList] = useState(false);
  const [selectedChat, setSelectedChat] = useState("");
  const [isChatLogEditMode, setIsChatLogEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loginUserId = useRecoilValue(loginUserIdState);

  const { channelId } = useParams();
  const setSidebarChannels = useSetRecoilState(sidebarChannelsState);
  const navigate = useNavigate();
  const [
    isOpenModal,
    ,
    handleModalOpenButtonClick,
    ,
    handleModalCloseButtonClick,
  ] = useModal(false);
  const [
    isOpenAcceptModal,
    ,
    handleAcceptModalOpenButtonClick,
    handleAcceptButtonClick,
    handleAcceptModalCloseButtonClick,
  ] = useModal(false);
  const [
    isOpenAlertModal,
    ,
    handleAlertModalOpenButtonClick,
    ,
    handleAlertModalCloseButtonClick,
  ] = useModal(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const prepareScroll = (waitTime: number) => {
    setTimeout(scrollToBottom, waitTime);
  };
  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current?.scrollHeight;
    }
  };

  const { show } = useContextMenu({
    id: CONTEXT_MENU_ID,
  });

  const menuItems = ["수정하기", "삭제하기"];

  useEffect(() => {
    prepareScroll(500);
    (async () => {
      const res = await currentChannelDetailRequest(
        `/api/channels/${channelId}/main`
      );
      if (res.success) {
        setChannelData([res.datas]);
        setIsOwner(res.datas.ownerInfo.ownerId === loginUserId);
        if (res.datas.waitList) setWaitList(res.datas.waitList);
        if (res.datas.membersInfo) setMemberList(res.datas.membersInfo);
      } else {
        setChannelData([]);
        handleModalOpenButtonClick();
        setModalMessage(res.message);
      }
    })();
    channelId && customSocketConnectRequest("enter-chat", channelId);

    customSocket.on("receive-chatLog", (data) => {
      setChatLogs(data);
    });
    customSocket.on("receive-create-chat", (data) => {
      prepareScroll(200);
      setChatLogs((prev) => {
        return [...prev, data];
      });
    });
    customSocket.on("receive-modify-chat", (data) => {
      setChatLogs((prev) => {
        return prev.map((chat) => (chat._id === data._id ? data : chat));
      });
    });
    customSocket.on("receive-remove-chat", (data) => {
      setChatLogs((prev) => {
        return prev.filter((chat) => chat._id !== data._id);
      });
    });
    customSocket.on("receive-remove-member", (data) => {
      setMemberList((prev) =>
        prev.filter((member) => member.memberId !== data.userId)
      );
      setSidebarChannels((prev) =>
        prev.filter((channel) => channel._id !== channelId)
      );
    });
    setIsShowWaitList(false);
    return () => {
      customSocket.removeAllListeners();
      customSocket.emit("escape-room");
    };
  }, [channelId]);

  const handleChannelContentChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setChannelContent(e.target.value);
    },
    [channelContent, setChannelContent]
  );

  const handleChannelSendButtonClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (channelId && channelContent) {
      customSocketCreateRequest("create-chat", loginUserId, channelContent);
      setChannelContent("");
    }
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleChannelJoinPermissionButtonClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>, waitingId: string) => {
      setIsLoading(true);
      if (channelData[0].memberNum === memberList.length) {
        setIsLoading(false);
        setModalMessage("채널 인원이 꽉 찼습니다.");
        handleAlertModalOpenButtonClick();
        return;
      }
      if (e.target instanceof HTMLButtonElement) {
        if (e.target.name === "accept") {
          const res = await channelJoinAcceptRequet(
            `/api/channels/${channelId}/waiting`,
            waitingId
          );
          if (res.success) {
            const newMember = waitList.find(
              (member) => member.userId === waitingId
            );
            if (newMember) {
              setMemberList((prev) => [
                ...prev,
                {
                  memberId: newMember.userId,
                  memberNickname: newMember.nickname,
                  memberPic: newMember.profPic,
                },
              ]);
            }
            setWaitList((prev) =>
              prev.filter((member) => member.userId !== waitingId)
            );
          }
        } else if (e.target.name === "reject") {
          const res = await channelJoinRejectRequet(
            `/api/channels/${channelId}/waiting`,
            waitingId
          );
          if (res.success) {
            setWaitList((prev) =>
              prev.filter((member) => member.userId !== waitingId)
            );
          }
        }
        setIsLoading(false);
      }
    },
    [memberList, setMemberList, waitList, setWaitList]
  );

  const handleChannelLeaveButtonClick = async () => {
    customSocketLeaveRequest("remove-member", loginUserId);
    navigate("/channels", { replace: true });
  };

  const handleChannelDeleteButtonClick = async () => {
    const res = await channelDeleteRequest(`/api/channels/${channelId}/delete`);
    if (res.success) {
      setSidebarChannels((prev) =>
        prev.filter((channel) => channel._id !== channelId)
      );
      navigate("/channels", { replace: true });
    }
  };

  const handleShowContextMenuClick =
    (channelId: string, userId: string) => (e: React.MouseEvent) => {
      if (userId !== loginUserId) return;
      setSelectedChat(channelId);
      show(e);
    };

  const handleChatLogConfirmClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editInputRef.current) {
      const chatMessage = editInputRef.current.value;
      if (!chatMessage) {
        setIsChatLogEditMode(false);
        return;
      }
      if (channelId) {
        customSocketUpdateRequest("modify-chat", selectedChat, chatMessage);
        setIsChatLogEditMode(false);
      }
    }
  };

  const handleChatLogCancelClick = () => {
    setIsChatLogEditMode(false);
  };

  const handleContextMenuuClick = (itemName: string) => async () => {
    switch (itemName) {
      case "수정하기":
        setIsChatLogEditMode(true);
        break;

      case "삭제하기":
        if (channelId) customSocketDeleteRequest("remove-chat", selectedChat);
        break;

      default:
        throw new Error("This function is not implemented");
    }
  };

  return (
    <BasePageComponent>
      {channelData &&
        channelData.map((data) => {
          return (
            <React.Fragment key={data._id}>
              <ChannelContainer>
                <ChannelHeader
                  title={data.title}
                  memberNums={memberList.length}
                  location={`${data.locationDist} ${data.locationCity}`}
                />
                <ChatForm>
                  <ContentContainer ref={chatRef}>
                    {chatLogs.map((chat) => (
                      <UserContainer
                        key={chat._id}
                        onContextMenu={handleShowContextMenuClick(
                          chat._id,
                          chat.userId
                        )}
                      >
                        <UserImg itemProp={chat.userInfo.profPic} />
                        <UserInfo
                          onContextMenu={
                            loginUserId === chat.userId ? show : undefined
                          }
                        >
                          <ContentInfoContainer>
                            <TextOne>{chat.userInfo.nickname}</TextOne>
                            <TextTwo>{chat.createdAt}</TextTwo>
                          </ContentInfoContainer>
                          <TextTwo>{chat.chat}</TextTwo>
                          {selectedChat === chat._id && isChatLogEditMode && (
                            <ChannelEdit
                              editInputRef={editInputRef}
                              onChatLogEditConfirmClickEvent={
                                handleChatLogConfirmClick
                              }
                              onChatLogEditCancelClickEvent={
                                handleChatLogCancelClick
                              }
                            />
                          )}
                        </UserInfo>
                      </UserContainer>
                    ))}
                  </ContentContainer>
                  <ChatInput
                    ref={inputRef}
                    placeholder="메시지 입력"
                    onChange={handleChannelContentChange}
                  />
                  <ChannelSendButton
                    onChannelSendButtonEvent={handleChannelSendButtonClick}
                  />
                </ChatForm>
              </ChannelContainer>
              <MemberList
                channelMemberList={memberList}
                waitMemberList={waitList}
                isOwner={isOwner}
                ownerId={data.ownerInfo.ownerId}
                isShowWaitList={isShowWaitList}
                isLoading={isLoading}
                setIsShowWaitList={setIsShowWaitList}
                setModalMessage={setModalMessage}
                onAcceptModalOpenButtonClickEvent={
                  handleAcceptModalOpenButtonClick
                }
                onChannelJoinPermissionButtonClickEvent={
                  handleChannelJoinPermissionButtonClick
                }
              />
            </React.Fragment>
          );
        })}
      <Modal
        isOpenModal={isOpenModal}
        isAlertModal={true}
        isShowImage={true}
        onModalCancelButtonClickEvent={() => {
          handleModalCloseButtonClick;
          navigate("/profile", { replace: true });
        }}
      >
        {modalMessage}
      </Modal>
      <Modal
        isOpenModal={isOpenAcceptModal}
        isShowImage={true}
        onModalCancelButtonClickEvent={handleAcceptModalCloseButtonClick}
        onModalAcceptButtonClickEvent={() => {
          isOwner
            ? handleChannelDeleteButtonClick()
            : handleChannelLeaveButtonClick();
          handleAcceptButtonClick();
        }}
      >
        {modalMessage}
      </Modal>
      <Modal
        isOpenModal={isOpenAlertModal}
        isShowImage={true}
        isAlertModal={true}
        onModalCancelButtonClickEvent={handleAlertModalCloseButtonClick}
      >
        {modalMessage}
      </Modal>
      <ContextMenu
        items={menuItems}
        onContextMenuClickEvent={handleContextMenuuClick}
      />
    </BasePageComponent>
  );
}

const ChannelContainer = styled.div`
  overflow: hidden;
  width: 70%;
  height: 90%;
  background-color: ${GlobalTheme.colors.white};
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const ChatForm = styled.form`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: start;
  overflow: hidden;
`;

const ChatInput = styled.input`
  position: absolute;
  bottom: 2%;
  padding: 0rem 2rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
  width: 90%;
  height: 4rem;
  margin-top: 2rem;
  border-radius: 4px;
  border: 1.2px solid ${GlobalTheme.colors.theme};
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 88%;
  padding: 1rem 0rem 0rem 3rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: block;
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${GlobalTheme.colors.theme};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: ${GlobalTheme.colors.lightTwoGray};
  }
`;

const UserContainer = styled.div`
  margin-botton: 2rem;
  display: flex;
  width: 70%;
  align-items: center;
  gap: 3rem;
  padding-bottom: 1rem;
`;

const UserImg = styled.div`
  width: 3rem;
  height: 3rem;
  background-image: url(${(props) => props.itemProp});
  background-size: cover;
  border-radius: 100%;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentInfoContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export default Channel;
