import { useState, useCallback } from "react";

type ModalReturnType = [
  isOpenModal: boolean,
  isAccepted: boolean,
  handleModalOpenButtonClick: () => void,
  handleAcceptButtonClick: () => void,
  handleModalCloseButtonClick: () => void
];

const useModal = (initialState: boolean): ModalReturnType => {
  const [isOpenModal, setIsOpenModal] = useState(initialState);
  const [isAccepted, setIsAccepted] = useState(initialState);

  const handleModalOpenButtonClick = useCallback(() => {
    setIsOpenModal(true);
  }, [setIsOpenModal]);

  const handleAcceptButtonClick = useCallback(() => {
    setIsAccepted(true);
    setIsOpenModal(false);
  }, [setIsAccepted, setIsOpenModal]);

  const handleModalCloseButtonClick = useCallback(() => {
    setIsOpenModal(false);
    setIsAccepted(false);
  }, [setIsOpenModal, setIsAccepted]);

  return [
    isOpenModal,
    isAccepted,
    handleModalOpenButtonClick,
    handleAcceptButtonClick,
    handleModalCloseButtonClick,
  ];
};

export default useModal;
