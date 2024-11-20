import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

export const Title = styled.h3`
  margin-bottom: 10px;
`;

export const Message = styled.p`
  margin-bottom: 20px;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:first-child {
      background: #f5f5f5;
    }

    &:last-child {
      background: #007bff;
      color: white;
    }
  }
`;
