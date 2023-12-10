import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import jest-dom for custom matchers
import HomePage from "./HomePage";

describe("HomePage", () => {
  test("renders the Hero component", () => {
    render(<HomePage />);
    const heroElement = screen.getByText(/Personal Budget/i);
    expect(heroElement).toBeInTheDocument();
  });

  test("renders content in each Paper component", () => {
    render(<HomePage />);

    const textContents = [
      "Stay on track",
      "Alerts",
      "Results",
      "Free",
    ];

    textContents.forEach((textContent) => {
      const paperElement = screen.getByText(textContent);
      expect(paperElement).toBeInTheDocument();
    });
  });
});
