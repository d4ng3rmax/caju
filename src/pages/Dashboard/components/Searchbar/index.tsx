import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import * as PropTypes from "prop-types";
import Button from "~/components/Buttons";
import TextField from "~/components/TextField";
import { IconButton } from "~/components/Buttons/IconButton";
import routes from "~/router/routes";
import api from "~/services/api";
import { Registration } from "~/types/registration";
import * as S from "./styles";
import { toast } from "react-toastify";
import { formatCpf } from "~/utils/formatters";
import { isValidCpf } from "~/utils/validators";

type Props = {
  setRegistrations: (registrations: Registration[]) => void;
  setLoading: (loading: boolean) => void;
};

export const SearchBar: React.FC<Props> = ({ setRegistrations, setLoading }) => {
  const [cpf, setCpf] = useState<string>("");
  const history = useHistory();

  const fetchRegistrations = async (endpoint: string) => {
    try {
      setLoading(true);

      const response = await api.get(endpoint);
      const normalizedData = response.data.map((item: any) => ({
        ...item,
        id: Number(item.id),
        cpf: String(item.cpf),
      }));

      setRegistrations(normalizedData);
    } catch (error) {
      console.error("Erro ao carregar registros:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value: string) => {
    const formattedCpf = value.replace(/\D/g, "");

    if (formattedCpf.length > 11) return;

    setCpf(formatCpf(formattedCpf));

    if (formattedCpf.length === 11) {
      if (!isValidCpf(formattedCpf)) {
        toast.error("CPF inválido. Por favor, verifique e tente novamente.");
        return;
      }

      await fetchRegistrations(`/registrations?cpf=${formattedCpf}`);
    }
  };

  const handleRefresh = async () => {
    setCpf("");
    await fetchRegistrations("/registrations");
  };

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  return (
    <S.Container>
      <TextField
        value={cpf}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Digite um CPF válido"
      />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={handleRefresh}>
          <HiRefresh />
        </IconButton>
        <Button onClick={goToNewAdmissionPage}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};

SearchBar.propTypes = {
  setRegistrations: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};
