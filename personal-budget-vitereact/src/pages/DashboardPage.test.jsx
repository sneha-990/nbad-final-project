// DashboardPage.test.jsx

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DashboardPage from "./DashboardPage";

test("renders the date picker", () => {
  render(<DashboardPage />);
  const datePicker = screen.getByLabelText("Date");
  expect(datePicker).toBeInTheDocument();
});

test("fetches and displays the monthly budget and expenses", async () => {
  render(<DashboardPage />);
  const datePicker = screen.getByLabelText("Date");

  // Select a new date
  userEvent.type(datePicker, "2022-01-01");
  userEvent.tab();

  // Wait for the data to be fetched and displayed
  await waitFor(() => {
    const budgetChart = screen.getByLabelText("Budget Chart");
    const expensesChart = screen.getByLabelText("Expenses Chart");
    expect(budgetChart).toBeInTheDocument();
    expect(expensesChart).toBeInTheDocument();
  });
});
