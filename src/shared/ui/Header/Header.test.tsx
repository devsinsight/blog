import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header";
import { renderWithProviders } from "@/tests/renderWithProviders";

describe("Header", () => {
  it("renders brand and nav links", () => {
    renderWithProviders(<Header />);

    expect(screen.getByRole("link", { name: /devsinsight/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /blog/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
  });

  it("opens and closes the drawer when toggling the hamburger", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    await user.click(screen.getByRole("button", { name: /open navigation menu/i }));

    const drawer = screen.getByRole("dialog");
    expect(within(drawer).getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(within(drawer).getByRole("link", { name: /blog/i })).toBeInTheDocument();
    expect(within(drawer).getByRole("link", { name: /about/i })).toBeInTheDocument();

    await user.click(within(drawer).getByRole("link", { name: /home/i }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

