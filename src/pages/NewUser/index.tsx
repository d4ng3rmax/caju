import { useState } from "react";
import TextField from "~/components/TextField";
import * as S from "./styles";
import Button from "~/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { isValidCpf, isValidEmail, isValidFullName } from "~/utils/validators";
import { formatCpf } from "~/utils/formatters";
import api from "~/services/api";

const NewUserPage = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    cpf: "",
  });

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (!isValidFullName(value)) {
      setErrors((prev) => ({
        ...prev,
        name: "Nome inválido. Certifique-se de incluir pelo menos um espaço.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!isValidEmail(value)) {
      setErrors((prev) => ({
        ...prev,
        email: "Email inválido. Certifique-se de usar um formato válido.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handleCpfChange = (value: string) => {
    const rawCpf = value.replace(/\D/g, "").slice(0, 11);
    setCpf(formatCpf(rawCpf));

    if (!isValidCpf(rawCpf)) {
      setErrors((prev) => ({
        ...prev,
        cpf: "CPF inválido. Verifique e tente novamente.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, cpf: "" }));
    }
  };

  const handleFormSubmit = async () => {
    if (!name || !email || !cpf || !admissionDate) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    if (errors.name || errors.email || errors.cpf) {
      alert("Certifique-se de corrigir todos os erros antes de continuar.");
      return;
    }

    try {
      const response = await api.get("/registrations");
      const registrations = response.data;

      const nextId =
        registrations.length > 0
          ? (Math.max(...registrations.map((reg: any) => Number(reg.id))) + 1).toString()
          : "1";

      const newUser = {
        id: nextId,
        employeeName: name,
        email,
        cpf: cpf.replace(/\D/g, ""),
        admissionDate,
        status: "REVIEW",
      };

      await api.post("/registrations", newUser);

      alert("Usuário cadastrado com sucesso!");
      goToHome();
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao cadastrar usuário. Por favor, tente novamente.");
    }
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={goToHome} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField
          id="name"
          placeholder="Nome"
          label="Nome"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          error={errors.name}
        />
        <TextField
          id="email"
          placeholder="Email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          error={errors.email}
        />
        <TextField
          id="cpf"
          placeholder="CPF"
          label="CPF"
          value={cpf}
          onChange={(e) => handleCpfChange(e.target.value)}
          error={errors.cpf}
        />
        <TextField
          id="admissionDate"
          label="Data de admissão"
          type="date"
          value={admissionDate}
          onChange={(e) => setAdmissionDate(e.target.value)}
        />
        <Button onClick={handleFormSubmit}>Cadastrar</Button>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
