export type Registration = {
  id: number;
  admissionDate: string;
  email: string;
  employeeName: string;
  status: "REVIEW" | "APPROVED" | "REPROVED";
  cpf: string;
};