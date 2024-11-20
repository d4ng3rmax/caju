import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchBar } from "../index";

describe("SearchBar Component", () => {
  it("renders correctly", () => {
    render(
      <MemoryRouter>
        <SearchBar setRegistrations={jest.fn()} setLoading={jest.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Digite um CPF válido")).toBeInTheDocument();
    expect(screen.getByText("Nova Admissão")).toBeInTheDocument();
  });
});
