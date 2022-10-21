import React from "react";
import * as ModalStyle from "@/components/modal/index";
import { BaseComponentType } from "@/types/common/baseComponentType";

interface ModalProps extends BaseComponentType {
  isOpenModal: boolean;
  isAlertModal?: boolean;
  isShowImage?: boolean;
  onModalAcceptButtonClickEvent?: (() => void) | (() => Promise<void>);
  onModalCancelButtonClickEvent: () => void;
}

const Modal = ({
  isOpenModal,
  isAlertModal,
  isShowImage,
  onModalAcceptButtonClickEvent,
  onModalCancelButtonClickEvent,
  children,
}: ModalProps) => {
  return (
    <ModalStyle.ModalBackDrop isOpenModal={isOpenModal}>
      <ModalStyle.ModalContainer isOpenModal={isOpenModal}>
        <ModalStyle.ModalHeader>
          <ModalStyle.ModalImageContainer>
            <ModalStyle.ModalImage
              src={`${process.env.PUBLIC_URL}/images/popup-cancel.png`}
              onClick={onModalCancelButtonClickEvent}
            />
            {isShowImage && (
              <ModalStyle.ModalMainImage
                src={`${process.env.PUBLIC_URL}/images/popup-icon.png`}
              />
            )}
          </ModalStyle.ModalImageContainer>
        </ModalStyle.ModalHeader>
        <ModalStyle.ModalTextContainer>
          {children}
        </ModalStyle.ModalTextContainer>
        {isAlertModal ? (
          <ModalStyle.ModalButtonContainer>
            <ModalStyle.ModalAcceptButton
              onClick={onModalCancelButtonClickEvent}
            >
              Close
            </ModalStyle.ModalAcceptButton>
          </ModalStyle.ModalButtonContainer>
        ) : (
          <ModalStyle.ModalButtonContainer>
            <ModalStyle.ModalAcceptButton
              onClick={onModalAcceptButtonClickEvent}
            >
              ACCEPT
            </ModalStyle.ModalAcceptButton>
            <ModalStyle.ModalButton onClick={onModalCancelButtonClickEvent}>
              CANCEL
            </ModalStyle.ModalButton>
          </ModalStyle.ModalButtonContainer>
        )}
      </ModalStyle.ModalContainer>
    </ModalStyle.ModalBackDrop>
  );
};

export default Modal;
