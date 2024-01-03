import "@testing-library/jest-dom";
import test from "node:test";
import { render, screen, expect } from "@testing-library/react";
import Navbar from "./Navbar";

test("renders learn react link", () => {
  render(<Navbar />);
  const logo = screen.getByAltText(/book logo/i);
  expect(logo).toBeInTheDocument();
});
