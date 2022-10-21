import React, { useState } from "react";
import { checkDuplicationRequest } from "@/api/authFetcher";

interface InitialState {
  setErrMessage: React.Dispatch<React.SetStateAction<string>>;
  handleModalOpenButtonClick: () => void;
}

const useCheckDuplication = (initialState: InitialState) => {
  const [isDuplicated, setIsDuplicated] = useState({
    email: false,
    nickname: false,
  });
  const { setErrMessage, handleModalOpenButtonClick } = initialState;

  const handleCheckDuplication = async (
    endPoint: string,
    checkData: string
  ) => {
    try {
      if (checkData) {
        await checkDuplicationRequest(
          "api/users/validation/duplication/" + endPoint,
          checkData
        );
        setIsDuplicated((prev) => {
          return {
            ...prev,
            [endPoint]: false,
          };
        });
      }
    } catch (error) {
      if (endPoint === "email") setErrMessage("이미 사용 중인 이메일입니다.");
      if (endPoint === "nickname")
        setErrMessage("이미 사용 중인 닉네임입니다.");

      setIsDuplicated((prev) => {
        return {
          ...prev,
          [endPoint]: true,
        };
      });
      handleModalOpenButtonClick();
    }
  };
  return { isDuplicated, setIsDuplicated, handleCheckDuplication };
};

export default useCheckDuplication;
