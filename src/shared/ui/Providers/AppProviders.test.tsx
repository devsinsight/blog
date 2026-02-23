import { render, screen } from "@testing-library/react";
import AppProviders from "./AppProviders";

describe("AppProviders", () => {
  it("renders children", () => {
    render(
      <AppProviders>
        <div>Child content</div>
      </AppProviders>
    );

    expect(screen.getByText("Child content")).toBeInTheDocument();
  });
});

