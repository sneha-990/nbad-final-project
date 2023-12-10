const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const app = express();
const logger = require("morgan");
const passport = require("passport");
const usersRouter = require('./routes/users')
const budgetsRouter = require('./routes/budgets')
const expensesRouter = require('./routes/expenses')

app.use(express.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize())
app.use('/users', usersRouter);
app.use('/budgets', budgetsRouter);
app.use('/expenses', expensesRouter);

const connect = mongoose.connect(config.mongoUrl);

connect.then(
  (db) => {
    console.log(`connected to db host: ${db.connection.host}, port: ${db.connection.port}, DB name: ${db.connection.name}`);
  },
  (err) => console.log(err)
);

app.listen(3000, () => {
  console.log("server started on port 3000");
});

