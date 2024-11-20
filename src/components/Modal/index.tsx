import React from "react";
import * as S from "./styles";

type ModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, title, message, onConfirm, onClose }) => {
  if (!isOpen) return null;

  return (
    <S.Overlay>
      <S.ModalContainer>
        <S.Title>{title}</S.Title>
        <S.Message>{message}</S.Message>
        <S.Actions>
          <button onClick={onClose}>Cancelar</button>
          <button onClick={onConfirm}>Confirmar</button>
        </S.Actions>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default Modal;
