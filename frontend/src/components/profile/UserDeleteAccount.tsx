import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import BaseInputContainer from "@/components/hoc/BaseInputContainer";
import BaseValidateTextContainer from "@/components/hoc/BaseValidateTextContainer";
import { useForm } from "react-hook-form";
import { EditButton } from "@/styles/commonStyle";

interface Props {
  onvalid: () => void;
  curUserEmail?: string;
}
interface confirmChecktype {
  confirmCheck: string;
}

const UserDeleteAccount = ({ onvalid, curUserEmail }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<confirmChecktype>({ mode: "onChange" });
  const isValid = !errors.confirmCheck;
  return (
    <UserDeleteAccountContainer onSubmit={handleSubmit(onvalid)}>
      <TitleContainer>Delete Account</TitleContainer>
      <BodyContainer>
        <TextAreaContainer>
          정말 회원탈퇴를 하시겠습니까? <br />
          탈퇴를 하게 되면 모든 데이터가 삭제되며 서비스 이용이 불가능하게
          됩니다. 또한, 해당 이메일로 재가입이 불가능합니다.
        </TextAreaContainer>
        <BaseInputContainer>
          <ConfirmInput
            placeholder="계속 진행하시려면 이메일을 입력하세요."
            type="text"
            {...register("confirmCheck", {
              validate: {
                cofirmEmail: (value) => {
                  return (
                    curUserEmail === value || "이메일이 일치하지 않습니다!"
                  );
                },
              },
            })}
          ></ConfirmInput>

          <BaseValidateTextContainer>
            {errors.confirmCheck?.message}
          </BaseValidateTextContainer>
        </BaseInputContainer>
        <EditButton width="20%" type="submit" disabled={!isValid}>
          Delete
        </EditButton>
      </BodyContainer>
    </UserDeleteAccountContainer>
  );
};

const UserDeleteAccountContainer = styled.form`
  width: 100%;
`;

const TitleContainer = styled.div`
  margin: 2rem;
`;
const BodyContainer = styled.div``;
const TextAreaContainer = styled.div`
  margin: 2rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
`;
const ConfirmInput = styled.input`
  ${GlobalTheme.input}
  width: 80%;
  font-size: ${GlobalTheme.fontSize.littleBig};
  box-sizing: border-box;
  line-height: 3rem;
  box-shadow: 1px 1px 3px ${GlobalTheme.colors.gray};
`;
export default UserDeleteAccount;
