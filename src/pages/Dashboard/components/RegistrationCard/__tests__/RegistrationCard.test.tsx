import { render, screen } from "@testing-library/react";
import RegistrationCard from "../index";

describe("RegistrationCard Component", () => {
  const mockData = {
    id: 1,
    employeeName: "Test User",
    email: "test@example.com",
    cpf: "123.456.789-00",
    status: "REVIEW",
    admissionDate: "2023-10-22",
  };

  it("renders correctly with required fields", () => {
    render(<RegistrationCard data={mockData} onActionComplete={jest.fn()} />);

    expect(screen.getByTestId("employee-name")).toHaveTextContent("Test User");
    expect(screen.getByTestId("employee-email")).toHaveTextContent("test@example.com");
    expect(screen.getByTestId("employee-cpf")).toHaveTextContent("123.456.789-00");
    expect(screen.getByTestId("admission-date")).toHaveTextContent("2023-10-22");
  });
});
