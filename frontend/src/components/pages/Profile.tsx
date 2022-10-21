import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import useModal from "@/hooks/useModal";
import { curUserState, loginUserIdState } from "@/recoil/atoms/authState";
import User from "@/components/profile/User";
import Modal from "@/components/modal/Modal";
import DeleteAccountModal from "@/components/modal/Modal";
import UserImageUpdate from "@/components/profile/UserImageUpdate";
import UserDeleteAccount from "@/components/profile/UserDeleteAccount";
import ChannelHistory from "../profile/ChannelHistory";
import BasePageComponent from "@/components/hoc/BasePageComponent";
import {
  authProfileImageUpdate,
  deleteAccountRequest,
} from "@/api/authFetcher";
import { getAuthInformationById } from "@/api/authFetcher";
import Storage from "@/storage/storage";
import { imageResize } from "@/util/imageResizeUtil";

function Profile() {
  const navigate = useNavigate();
  const params = useParams();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [curUser, setCurUser] = useRecoilState(curUserState);
  const loginUserId = useRecoilValue(loginUserIdState);

  const [
    isOpenModal,
    ,
    handleModalOpenButtonClick,
    ,
    handleModalCloseButtonClick,
  ] = useModal(false);

  const [
    isOpenDeleteAccountlModal,
    ,
    handleDeleteAccountModalOpenButtonClick,
    handleAcceptDeleteClick,
    handleDeleteAccountModalCloseButtonClick,
  ] = useModal(false);

  const fetchProfileOwner = async (curUserId: string) => {
    const res = await getAuthInformationById("/api/users/userinfo", curUserId);
    setCurUser(res);
  };

  const handleProfileImageUploadSubmit = async ({
    uploadImg,
  }: {
    uploadImg: File[];
  }) => {
    const file = uploadImg[0];
    const copress = await imageResize(file);
    await authProfileImageUpdate("api/users/profpic", copress);
    handleModalCloseButtonClick();
    setIsEditing(false);
    navigate("/profile", { replace: true });
  };

  const handleDeleteAccountSubmit = async () => {
    await deleteAccountRequest("/api/auth/withdrawal");
    handleAcceptDeleteClick();
    Storage.clearToken();
    navigate("/", { replace: true });
  };
  const handleDeleteAccountCancelClick = () => {
    handleDeleteAccountModalCloseButtonClick();
  };

  useEffect(() => {
    if (!Storage.getToken()) {
      navigate("/auth", { replace: true });
      return;
    }
    if (params.userId) {
      const userId = params.userId;
      fetchProfileOwner(userId);
    } else {
      const userId = loginUserId;
      fetchProfileOwner(userId);
    }
  }, [params, navigate]);

  return (
    <BasePageComponent>
      <User
        isEditable={curUser._id === loginUserId}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onDeleteAccountModalOpenClickEvent={
          handleDeleteAccountModalOpenButtonClick
        }
        onModalOpenButtonClickEvent={handleModalOpenButtonClick}
      />
      <ChannelHistory />
      <Modal
        isOpenModal={isOpenModal}
        isAlertModal={true}
        onModalCancelButtonClickEvent={handleModalCloseButtonClick}
      >
        <UserImageUpdate
          onProfileImageUploadSubmit={handleProfileImageUploadSubmit}
          curImage={curUser.profPic}
        />
      </Modal>
      <Modal
        isOpenModal={isOpenDeleteAccountlModal}
        isAlertModal={true}
        isShowImage={true}
        onModalCancelButtonClickEvent={handleDeleteAccountCancelClick}
      >
        <UserDeleteAccount
          curUserEmail={curUser.email}
          onvalid={handleDeleteAccountSubmit}
        ></UserDeleteAccount>
      </Modal>
    </BasePageComponent>
  );
}

export default Profile;
