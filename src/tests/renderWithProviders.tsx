import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import AppProviders from "@/shared/ui/Providers/AppProviders";

export function renderWithProviders(ui: ReactElement) {
  return render(<AppProviders>{ui}</AppProviders>);
}

export * from "@testing-library/react";
