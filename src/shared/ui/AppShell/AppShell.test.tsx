import { screen } from "@testing-library/react";
import AppShell from "./AppShell";
import { renderWithProviders } from "@/tests/renderWithProviders";

describe("AppShell", () => {
  it("renders children", () => {
    renderWithProviders(
      <AppShell>
        <p>Test Content</p>
      </AppShell>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("includes a main landmark", () => {
    renderWithProviders(
      <AppShell>
        <p>Child</p>
      </AppShell>
    );

    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders default footer when not provided", () => {
    renderWithProviders(
      <AppShell>
        <p>Child</p>
      </AppShell>
    );

    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
  });

  it("renders custom footer when provided", () => {
    renderWithProviders(
      <AppShell footer={<div>Custom Footer</div>}>
        <p>Child</p>
      </AppShell>
    );

    expect(screen.getByText("Custom Footer")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /github/i })).not.toBeInTheDocument();
  });
});
