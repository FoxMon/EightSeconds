import React, { useState } from "react";
import BaseCardContainer from "@/components/hoc/BaseCardContainer";
import { useNavigate } from "react-router-dom";
import GlobalTheme from "@/styles/theme";
import styled, { css } from "styled-components";
import BaseValidateTextContainer from "@/components/hoc/BaseValidateTextContainer";
import {
  BigTitle,
  TitleContainer,
  EditButtonWrapper,
  EditButton,
} from "@/styles/commonStyle";
import Storage from "@/storage/storage";
import Modal from "../modal/Modal";
import { authProfilePasswordUpdate } from "@/api/authFetcher";
import { ErrorType } from "@/types/error/errorType";
import { useForm } from "react-hook-form";
import { PsEditFormInitialType } from "@/types/auth/authTypes";

const EditInput = css`
  background-color: ${GlobalTheme.colors.lightGray};
  width: 60%;
  border: 1px solid ${GlobalTheme.colors.theme};
  padding: 0.5rem;
  border-radius: 0.5rem;
  &:hover {
    background-color: ${GlobalTheme.colors.lightTwoGray};
  }
`;

interface UserInfoEditProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

function UserPsEditForm({ setIsEditing, setIsPsEditing }: UserInfoEditProps) {
  const navigate = useNavigate();
  const [erorrMessage, setErorrMessage] = useState("");
  const [isOppenModal, setIsOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<PsEditFormInitialType>({ mode: "onChange" });

  const isValid =
    !errors.currentPassword && !errors.newPassword && !errors.confirmPassword;

  const onModalCancelButtonClickEvent = () => {
    setIsOpenModal(false);
  };
  const onvalid = async (data: PsEditFormInitialType) => {
    try {
      await authProfilePasswordUpdate(
        "/api/users/password",
        data.currentPassword,
        data.newPassword
      );
      Storage.clearToken();
      setIsEditing(false);
      navigate("/auth", { replace: true });
    } catch (e) {
      const error = e as ErrorType;
      const erorrMessage = error.response.data.message;
      setErorrMessage(erorrMessage);
      setIsOpenModal(true);
    }
  };
  return (
    <BaseCardContainer width="50vh">
      <TitleContainer>
        <BigTitle>Change password</BigTitle>
      </TitleContainer>
      <InpurForm onSubmit={handleSubmit(onvalid)}>
        <InputContainer>
          ?????? ????????????
          <UserNickNameIntput
            type="password"
            placeholder="?????? ????????????"
            {...register("currentPassword", {
              required: "?????? ??????????????? ??????????????????!",
              minLength: {
                value: 8,
                message: "??????????????? 8?????? ???????????????.",
              },
            })}
          />
          {errors.currentPassword && (
            <BaseValidateTextContainer>
              {errors.currentPassword.message}
            </BaseValidateTextContainer>
          )}
        </InputContainer>
        <InputContainer>
          ????????? ????????????
          <UserNickNameIntput
            type="password"
            placeholder="????????? ????????????"
            {...register("newPassword", {
              required: "????????? ??????????????? ??????????????????!",
              pattern: {
                value:
                  /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
                message: " 8~15??? ?????? ?????????, ??????, ??????????????? ??????????????????.",
              },
            })}
          />
          {errors.newPassword && (
            <BaseValidateTextContainer>
              {errors.newPassword.message}
            </BaseValidateTextContainer>
          )}
        </InputContainer>

        <InputContainer>
          ????????? ????????????
          <UserDescriptionInput
            type="password"
            placeholder="????????? ???????????? ??????"
            {...register("confirmPassword", {
              required: "??????????????? ???????????? ????????????!",
              validate: {
                cofirmNewPassword: (value) => {
                  const { newPassword } = getValues();
                  return (
                    newPassword === value || "??????????????? ???????????? ????????????!"
                  );
                },
              },
            })}
          />
          {errors.confirmPassword && (
            <BaseValidateTextContainer>
              {errors.confirmPassword.message}
            </BaseValidateTextContainer>
          )}
        </InputContainer>

        <EditButtonWrapper>
          <EditButton width="60%" type="submit" disabled={!isValid}>
            CONFIRM
          </EditButton>
          <EditButton
            type="button"
            width="60%"
            onClick={() => setIsPsEditing(false)}
          >
            CANCEL
          </EditButton>
        </EditButtonWrapper>
      </InpurForm>
      <Modal
        isOpenModal={isOppenModal}
        isAlertModal={true}
        isShowImage={true}
        onModalCancelButtonClickEvent={onModalCancelButtonClickEvent}
      >
        {erorrMessage}
      </Modal>
    </BaseCardContainer>
  );
}
const InpurForm = styled.form`
  display: flex;
  width: 100%;
  height: 50%;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  font-size: ${GlobalTheme.fontSize.littleBig};
  input {
    ${EditInput}
  }
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;
const UserNickNameIntput = styled.input``;

const UserDescriptionInput = styled.input``;

export default UserPsEditForm;
