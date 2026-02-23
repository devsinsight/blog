import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "./ThemeToggle";
import { renderWithProviders } from "@/tests/renderWithProviders";

const setTheme = jest.fn();

jest.mock("next-themes", () => {
  const actual = jest.requireActual("next-themes");
  return {
    ...actual,
    useTheme: () => ({
      theme: "system",
      resolvedTheme: "light",
      systemTheme: "light",
      setTheme,
    }),
  };
});

describe("ThemeToggle", () => {
  it("toggles between light and dark", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ThemeToggle />);

    const button = screen.getByRole("button", { name: /switch to dark mode/i });
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(setTheme).toHaveBeenCalledWith("dark");
  });
});
