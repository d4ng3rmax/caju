import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7); /* Fundo mais escuro */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Spinner = styled.div`
  border: 6px solid rgba(255, 255, 255, 0.3); /* Cor do anel exterior */
  border-top: 6px solid #fff; /* Cor do anel superior */
  border-radius: 50%;
  width: 50px; /* Tamanho do spinner */
  height: 50px; /* Tamanho do spinner */
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.div`
  color: #fff;
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const Loading: React.FC<{ message?: string }> = ({ message }) => (
  <Overlay>
    <Spinner />
    {message && <LoadingText>{message}</LoadingText>}
  </Overlay>
);

export default Loading;
