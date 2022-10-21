import React from "react";
import {
  UseFormRegister,
  UseFormWatch,
  FieldErrorsImpl,
} from "react-hook-form";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import BaseIntputContainer from "@/components/hoc/BaseInputContainer";
import BaseValidateTextContainer from "@/components/hoc/BaseValidateTextContainer";
import { AuthFormInitialType } from "@/types/auth/authTypes";

interface Props {
  register: UseFormRegister<AuthFormInitialType>;
  watch: UseFormWatch<AuthFormInitialType>;
  errors: Partial<FieldErrorsImpl<AuthFormInitialType>>;
  onRegisterSubmitEvent: (e: React.FormEvent) => void;
  onCheckDuplicationEvent: (endPoint: string, checkData: string) => void;
  onSendVerficationCodeClickEvent: (email: string) => void;
  isDuplicated: {
    email: boolean;
    nickname: boolean;
  };
  isVerified: boolean;
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthReigster: React.FC<Props> = ({
  register,
  watch,
  errors,
  onRegisterSubmitEvent,
  onCheckDuplicationEvent,
  onSendVerficationCodeClickEvent,
  isDuplicated,
  isVerified,
  setIsVerified,
}) => {
  const curPassword = watch("password");
  const confirmPassword = watch("confirmPassword");
  const curEmail = watch("email");
  return (
    <RegistrationFormContainer onSubmit={onRegisterSubmitEvent}>
      <BaseIntputContainer>
        <RegistrationInput
          {...register("email", {
            required: true,
            pattern: /^\S+@\S+$/i,
            onBlur: (e) => onCheckDuplicationEvent("email", e.target.value),
          })}
          placeholder="이메일"
          isDuplicated={isDuplicated.email}
          disabled={isVerified && true}
        />
        {errors.email && (
          <BaseValidateTextContainer>
            올바른 이메일을 입력해주세요.
          </BaseValidateTextContainer>
        )}
        {isVerified ? (
          <VerifiedEmailButton
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsVerified(false);
            }}
          >
            인증확인
          </VerifiedEmailButton>
        ) : (
          <EmailVerificationButton
            type="button"
            onClick={() => {
              onSendVerficationCodeClickEvent(curEmail);
            }}
            disabled={!curEmail || errors?.email ? true : false}
          >
            인증요청
          </EmailVerificationButton>
        )}
      </BaseIntputContainer>
      <BaseIntputContainer>
        <RegistrationInput
          {...register("nickname", {
            required: true,
            minLength: 4,
            onBlur: (e) => onCheckDuplicationEvent("nickname", e.target.value),
          })}
          placeholder="닉네임"
          isDuplicated={isDuplicated.nickname}
        />
        {errors?.nickname && (
          <BaseValidateTextContainer>
            닉네임을 4글자 이상 사용해주세요.
          </BaseValidateTextContainer>
        )}
      </BaseIntputContainer>
      <BaseIntputContainer>
        <RegistrationInput
          {...register("password", {
            required: true,
            maxLength: 15,
            minLength: 8,
            pattern: /^.(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
          })}
          placeholder="비밀번호"
          type="password"
        />
        {errors.password && (
          <BaseValidateTextContainer>
            8~15자 영문 소문자, 숫자, 특수문자를 사용해주세요.
          </BaseValidateTextContainer>
        )}
      </BaseIntputContainer>
      <BaseIntputContainer>
        <RegistrationInput
          {...register("confirmPassword", {
            required: true,
          })}
          placeholder="비밀번호 재확인"
          type="password"
        />
        {confirmPassword && curPassword !== confirmPassword && (
          <BaseValidateTextContainer>
            비밀번호가 일치하지 않습니다.
          </BaseValidateTextContainer>
        )}
      </BaseIntputContainer>
      <RegistrationButtonContainer>
        <RegistrationButton type="submit">회원가입</RegistrationButton>
      </RegistrationButtonContainer>
    </RegistrationFormContainer>
  );
};

const RegistrationFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 1rem;
  margin-top: 5rem;
`;

const RegistrationInput = styled.input<{ isDuplicated?: boolean }>`
  width: 100%;
  outline: ${GlobalTheme.input.outline};
  font-size: ${GlobalTheme.fontSize.littleBig};
  border-radius: ${GlobalTheme.input.borderRadius};
  padding: ${GlobalTheme.input.padding};
  box-sizing: border-box;
  line-height: 3rem;
  border: ${GlobalTheme.input.border};
  box-shadow: 1px 1px 3px ${GlobalTheme.colors.gray};
  border-color: ${(props) => props.isDuplicated && "red"};
`;

const RegistrationButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const RegistrationButton = styled.button`
  ${GlobalTheme.buttons}
  width: 70%;
  line-height: 4rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
  color: ${GlobalTheme.colors.white};
  background-color: ${GlobalTheme.colors.theme};
  text-align: center;
  cursor: pointer;
  margin-bottom: 2rem;
  &:disabled {
    color: ${GlobalTheme.colors.lightGray};
    background-color: ${GlobalTheme.colors.gray};
  }
`;

const EmailVerificationButton = styled.button`
  ${GlobalTheme.buttons}
  border: 1px solid ${GlobalTheme.colors.theme};
  position: absolute;
  top: 18.5rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
  color: ${GlobalTheme.colors.theme};
  background-color: ${GlobalTheme.colors.white};
  right: 6rem;
  height: 3rem;
  cursor: pointer;
  &:disabled {
    color: ${GlobalTheme.colors.gray};
    border-color: ${GlobalTheme.colors.gray};
  }
`;

const VerifiedEmailButton = styled(EmailVerificationButton)`
  ${GlobalTheme.buttons}
  border: 1px solid green;
  color: green;
`;

export default AuthReigster;
