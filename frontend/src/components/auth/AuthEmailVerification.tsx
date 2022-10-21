import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import BaseValidateTextContainer from "@/components/hoc/BaseValidateTextContainer";

interface Props {
  verificationCode: string;
  setVerificationCode: React.Dispatch<React.SetStateAction<string>>;
  errMessage: string;
  emailToSend: string;
}

const AuthEmailVerification = ({
  verificationCode,
  setVerificationCode,
  errMessage,
  emailToSend,
}: Props) => {
  return (
    <EmailVerificationContainer>
      <Title>이메일 인증</Title>
      <Text>{emailToSend}로 전송된 인증코드를 입력해주세요.</Text>
      <CodeInput
        placeholder="enter code"
        value={verificationCode}
        onChange={(e) => {
          setVerificationCode(e.target.value);
        }}
      ></CodeInput>
      {errMessage && (
        <BaseValidateTextContainer>{errMessage}</BaseValidateTextContainer>
      )}
    </EmailVerificationContainer>
  );
};

const EmailVerificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;
const Title = styled.div`
  margin-bottom: 2rem;
`;
const Text = styled.div`
  font-size: ${GlobalTheme.fontSize.littleBig};
`;
const CodeInput = styled.input`
  width: 30rem;
  height: 2rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
  text-align: center;
  padding: 1rem;
  border: ${GlobalTheme.input.border};
  box-shadow: 1px 1px 3px ${GlobalTheme.colors.gray};
  outline: ${GlobalTheme.input.outline};
  border-radius: 4px;
`;

export default AuthEmailVerification;
