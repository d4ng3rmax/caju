import * as S from "./styles";
import * as PropTypes from "prop-types";
import RegistrationCard from "../RegistrationCard";
import { Registration } from "~/types/registration";
import { RegistrationPropTypes } from "~/types/propTypes";

interface Props {
  registrations: Registration[];
  onActionComplete: () => void;
}

const Columns: React.FC<Props> = ({ registrations, onActionComplete }) => {
  const allColumns = [
    { status: "REVIEW", title: "Pronto para revisar" },
    { status: "APPROVED", title: "Aprovado" },
    { status: "REPROVED", title: "Reprovado" },
  ];

  return (
    <S.Container>
      {allColumns.map((column) => {
        const filteredRegistrations = registrations.filter(
          (registration) => registration.status === column.status
        );

        return (
          <S.Column status={column.status} key={column.title}>
            <S.TitleColumn status={column.status}>{column.title}</S.TitleColumn>
            <S.CollumContent>
              {filteredRegistrations.map((registration) => (
                <RegistrationCard
                  key={registration.id}
                  data={registration}
                  onActionComplete={onActionComplete}
                />
              ))}
            </S.CollumContent>
          </S.Column>
        );
      })}
    </S.Container>
  );
};

Columns.propTypes = {
  registrations: PropTypes.arrayOf(RegistrationPropTypes).isRequired,
  onActionComplete: PropTypes.func.isRequired,
};

export default Columns;
