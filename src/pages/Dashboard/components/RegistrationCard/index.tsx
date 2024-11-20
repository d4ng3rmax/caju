import { useState } from "react";
import { RegistrationPropTypes } from "~/types/propTypes";
import Modal from "~/components/Modal";
import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import * as PropTypes from "prop-types";
import { updateRegistration, deleteRegistration } from "~/services/api";
import { Registration } from "~/types/registration";
import { toast } from "react-toastify";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

type Props = {
  data: Registration;
  onActionComplete: () => void;
};

const RegistrationCard: React.FC<Props> = ({ data, onActionComplete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<"DELETE" | "APPROVE" | "REPROVE" | "REVIEW" | null>(null);

  const handleUpdateStatus = async (newStatus: "REVIEW" | "APPROVED" | "REPROVED") => {
    try {
      const updatedData = { ...data, status: newStatus };
      await updateRegistration(data.id, updatedData);
      onActionComplete();
      toast.success(`Status atualizado para ${newStatus}`);
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      toast.error("Erro ao atualizar status");
    } finally {
      setIsModalOpen(false);
    }
  };


  const handleDelete = async () => {
    try {
      await deleteRegistration(data.id);
      onActionComplete();
      toast.success("Registro excluído com sucesso");
    } catch (error) {
      console.error("Erro ao deletar registro:", error);
      toast.error("Erro ao excluir registro");
    } finally {
      setIsModalOpen(false);
    }
  };

  const openModal = (action: "DELETE" | "APPROVE" | "REPROVE" | "REVIEW") => {
    setCurrentAction(action);
    setIsModalOpen(true);
  };

  const getModalMessage = () => {
    switch (currentAction) {
      case "DELETE":
        return "Tem certeza que deseja excluir este registro?";
      case "APPROVE":
        return "Tem certeza que deseja aprovar este registro?";
      case "REPROVE":
        return "Tem certeza que deseja reprovar este registro?";
      case "REVIEW":
        return "Tem certeza que deseja revisar novamente este registro?";
      default:
        return "";
    }
  };

  const getNewStatus = (): "REVIEW" | "APPROVED" | "REPROVED" => {
    switch (currentAction) {
      case "APPROVE":
        return "APPROVED";
      case "REPROVE":
        return "REPROVED";
      case "REVIEW":
        return "REVIEW";
      default:
        throw new Error("Ação inválida");
    }
  };

  return (
    <>
      <S.Card>
        <S.IconAndText>
          <HiOutlineUser />
          <h3>{data.employeeName}</h3>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineMail />
          <p>{data.email}</p>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineCalendar />
          <span>{data.admissionDate}</span>
        </S.IconAndText>
        <S.Actions>
          {data.status === "REVIEW" && (
            <>
              <ButtonSmall
                bgcolor="rgb(255, 145, 154)"
                onClick={() => openModal("REPROVE")}
              >
                Reprovar
              </ButtonSmall>
              <ButtonSmall
                bgcolor="rgb(155, 229, 155)"
                onClick={() => openModal("APPROVE")}
              >
                Aprovar
              </ButtonSmall>
            </>
          )}
          {["REPROVED", "APPROVED"].includes(data.status) && (
            <ButtonSmall
              bgcolor="#ff8858"
              onClick={() => openModal("REVIEW")}
            >
              Revisar novamente
            </ButtonSmall>
          )}
          <HiOutlineTrash onClick={() => openModal("DELETE")} />
        </S.Actions>
      </S.Card>
      <Modal
        isOpen={isModalOpen}
        title={
          currentAction === "DELETE"
            ? "Excluir Registro"
            : "Atualizar Status"
        }
        message={getModalMessage()}
        onConfirm={
          currentAction === "DELETE"
            ? handleDelete
            : () => handleUpdateStatus(getNewStatus())
        }
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

RegistrationCard.propTypes = {
  data: RegistrationPropTypes.isRequired,
  onActionComplete: PropTypes.func.isRequired,
};

export default RegistrationCard;
