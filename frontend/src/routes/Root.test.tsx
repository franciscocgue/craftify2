import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Root from "./Root";
import { BrowserRouter } from "react-router-dom";

describe('Page "Projects list"', () => {

    render(<BrowserRouter>
        <Root />
    </BrowserRouter>);

    test('has "new project" button', () => {
        expect(screen.getByRole('button', {
            name: /create project/i
        })).toBeDefined();
    })
});