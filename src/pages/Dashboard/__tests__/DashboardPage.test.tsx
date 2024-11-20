import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DashboardPage from "../index";

describe("DashboardPage Component", () => {
  it("renders correctly", () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId("ready-to-review")).toBeInTheDocument();
  });
});
