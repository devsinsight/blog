import { screen } from "@testing-library/react";
import Footer from "./Footer";
import { renderWithProviders } from "@/tests/renderWithProviders";

describe("Footer", () => {
  it("renders copyright text", () => {
    renderWithProviders(<Footer />);

    const year = new Date().getFullYear();
    expect(
      screen.getByText(`© ${year} DevsInsight. All rights reserved.`)
    ).toBeInTheDocument();
  });

  it("renders social placeholder links", () => {
    renderWithProviders(<Footer />);

    expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /linkedin/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /twitter/i })).toBeInTheDocument();
  });
});

