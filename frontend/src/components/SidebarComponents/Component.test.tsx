import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Component from "./Component";

import { compTypes } from "../../config/components";

describe("Sidebar Components", () => {
  test("button", () => {
    render(<Component type={'button'} name={compTypes['button'].name} icon={compTypes['button'].icon} style={{ cursor: 'pointer' }} />);
    expect(screen.getByText(compTypes['button'].name)).toBeDefined();
  });
});