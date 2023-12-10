// src/mocks/handlers.js

import { rest } from 'msw';

const handlers = [
  rest.get('http://localhost:3000/users/getUserDetails', (req, res, ctx) => {
    return res(
      ctx.json({
        budgets: [
          { month: "2022-01-01", category: "Food", amount: 100 },
          { month: "2022-01-01", category: "Rent", amount: 500 },
        ],
        expenses: [
          { month: "2022-01-01", category: "Groceries", amount: 50 },
          { month: "2022-01-01", category: "Utilities", amount: 100 },
        ],
      }),
    );
  }),
];

export { handlers };
