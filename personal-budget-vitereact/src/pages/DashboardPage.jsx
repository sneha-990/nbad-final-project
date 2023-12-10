import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { BarChart } from "@mui/x-charts";

const DashboardPage = () => {
  const [monthlyBudget, setMonthlyBudget] = useState();
  const [monthlyExpenses, setMonthlyExpenses] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const isArrayValid = (array) => {
    return array !== undefined ? monthlyBudget.categories.length !== 0 : false;
  };

  useEffect(() => {
    console.log(selectedDate);
    fetch("http://localhost:3000/users/getUserDetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const filteredBudgets = data.budgets.filter((budget) => {
          const date = new Date(budget.month);
          return (
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear()
          );
        });
        const filteredExpenses = data.expenses.filter((expense) => {
          const date = new Date(expense.month);
          return (
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear()
          );
        });
        setMonthlyBudget({
          categories: filteredBudgets.map((budget) => budget.category),
          amounts: filteredBudgets.map((budget) => budget.amount),
        });
        setMonthlyExpenses({
          categories: filteredExpenses.map((expense) => expense.category),
          amounts: filteredExpenses.map((expense) => expense.amount),
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedDate]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "80vw",
        alignItems: "center",
        justifyItems: "center",
        justifyContent: "center",
        marginTop: "2vh",
        marginLeft: "10vw",
        padding: "auto",
        alignContent: "center",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date"
          onChange={(value) => setSelectedDate(new Date(value))}
        />
      </LocalizationProvider>
      <Grid
        container
        spacing={2}
        direction="row"
        sx={{
          alignItems: "center",
          justifyItems: "center",
          justifyContent: "center",
          alignContent: "center",
          padding: "auto",
          margin: "auto",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        {console.log(monthlyBudget)}
        {isArrayValid(monthlyBudget?.categories) &&
          isArrayValid(monthlyBudget?.amounts) && (
            <>
              <Grid item xs={6} sx={{ marginLeft: "1vw" }}>
                <BarChart
                  width={800}
                  height={250}
                  series={[
                    {
                      data: monthlyBudget.amounts,
                      label: "budget",
                      type: "bar",
                    },
                  ]}
                  xAxis={[
                    { scaleType: "band", data: monthlyBudget.categories },
                  ]}
                />
              </Grid>
              <Grid item xs={6} sx={{ marginLeft: "10vw" }}>
                <BarChart
                  width={800}
                  height={250}
                  series={[
                    {
                      data: monthlyExpenses.amounts,
                      label: "Expenses",
                      type: "bar",
                    },
                  ]}
                  xAxis={[
                    { scaleType: "band", data: monthlyExpenses.categories },
                  ]}
                />
              </Grid>
            </>
          )}
      </Grid>
    </Box>
  );
};

export default DashboardPage;
