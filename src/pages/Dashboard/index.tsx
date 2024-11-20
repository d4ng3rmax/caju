import { useEffect, useState } from "react";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import Columns from "./components/Columns";
import api from "~/services/api";
import { Registration } from "~/types/registration";
import Loading from "~/components/Loading";

const DashboardPage = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/registrations");

      const normalizedData = response.data.map((item: any) => ({
        ...item,
        id: Number(item.id),
        admissionDate: item.admissionDate || "Data não informada",
        email: item.email || "Email não fornecido",
        employeeName: item.employeeName || "Nome não fornecido",
        cpf: String(item.cpf),
      }));
      setRegistrations(normalizedData);
    } catch (error) {
      console.error("Erro ao carregar registros:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <S.Container>
      <SearchBar setRegistrations={setRegistrations} setLoading={setLoading} />
      {loading ? (
        <Loading message="Carregando registros..." />
      ) : (
        <Columns registrations={registrations} onActionComplete={fetchData} />
      )}
    </S.Container>
  );
};

export default DashboardPage;
