const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Expenses = require("../models/expense");
const cors = require("./cors");
const { verifyUser } = require("../authenticate");

router.use(bodyParser.json());

router.options("*", cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
});
// GET route to retrieve all expenses for a particular user
router.get("/", cors.corsWithOptions, verifyUser, (req, res, next) => {
    Expenses.find({ user: req.user._id })
        .then((expenses) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(expenses);
        })
        .catch((err) => next(err));
});

// POST route to add a new expense
router.post("/", cors.corsWithOptions, verifyUser, (req, res, next) => {
    req.body.user = req.user._id; // Assuming user authentication is implemented
    Expenses.create(req.body)
        .then((expense) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({...expense, id: expense._id});
        })
        .catch((err) => next(err));
});
  
// PUT route to update an existing expense
router.put("/:expenseId", cors.corsWithOptions, verifyUser, (req, res, next) => {
    Expenses.findByIdAndUpdate(
        req.params.expenseId,
        { $set: req.body },
        { new: true }
    )
        .then((expense) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(expense);
        })
        .catch((err) => next(err));
});

router.delete(
    "/:expenseId",
    cors.corsWithOptions,
    verifyUser,
      (req, res, next) => {
          Expenses.findByIdAndDelete(req.params.expenseId)
              .then((expense) => {
                  if (expense) {
                      res.statusCode = 200;
                      res.setHeader("Content-Type", "application/json");
                      res.json({ success: true, message: "Expense deleted successfully" });
                  } else {
                      res.statusCode = 404;
                      res.setHeader("Content-Type", "application/json");
                      res.json({ success: false, message: "Expense not found" });
                  }
              })
              .catch((err) => next(err));
      }
  );

// GET route to filter expenses by month for a particular user
router.get("/filter/:month", cors.corsWithOptions, verifyUser, (req, res, next) => {
    const month = req.params.month;
    const userId = req.user._id; // Assuming user authentication is implemented

    Expenses.find({
        user: userId,
        createdAt: {
            $gte: new Date(month + "-01"),
            $lt: new Date(month + "-31"),
        },
    })
        .then((expenses) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(expenses);
        })
        .catch((err) => next(err));
});

module.exports = router;
