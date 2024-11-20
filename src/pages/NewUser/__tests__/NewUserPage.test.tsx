import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NewUserPage from "../index";

describe("NewUserPage Component", () => {
  it("renders all input fields and buttons", () => {
    render(
      <MemoryRouter>
        <NewUserPage />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Nome")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("CPF")).toBeInTheDocument();
    expect(screen.getByLabelText("Data de admissão")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar")).toBeInTheDocument();
  });
});
