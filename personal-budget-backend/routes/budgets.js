const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Budget = require("../models/budget");
const cors = require("./cors");
const { verifyUser } = require("../authenticate");

router.use(bodyParser.json());

/* GET users listing. */
router.options("*", cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

// GET route to filter budget data by month for a particular user
router.get("/", cors.corsWithOptions, verifyUser, (req, res, next) => {
  Budget.find({ user: req.user._id })
    .then((budget) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(budget);
    })
    .catch((err) => next(err));
});

// POST route to add a new expense
router.post("/", cors.corsWithOptions, verifyUser, (req, res, next) => {
  req.body.user = req.user._id; // Assuming user authentication is implemented
  Budget.create(req.body)
    .then((budget) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(budget);
    })
    .catch((err) => next(err));
});

// PUT route to update an existing expense
router.put("/:budgetId", cors.corsWithOptions, verifyUser, (req, res, next) => {
  Budget.findByIdAndUpdate(
    req.params.budgetId,
    { $set: req.body },
    { new: true }
  )
    .then((budget) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(budget);
    })
    .catch((err) => next(err));
});

// DELETE route to delete a budget
router.delete(
  "/:budgetId",
  cors.corsWithOptions,
  verifyUser,
    (req, res, next) => {
        Budget.findByIdAndDelete(req.params.budgetId)
            .then((budget) => {
                if (budget) {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({ success: true, message: "Budget deleted successfully" });
                } else {
                    res.statusCode = 404;
                    res.setHeader("Content-Type", "application/json");
                    res.json({ success: false, message: "Budget not found" });
                }
            })
            .catch((err) => next(err));
    }
);

// GET route to filter expenses by month for a particular user
router.get(
  "/filter/:month",
  cors.corsWithOptions,
  verifyUser,
  (req, res, next) => {
    const month = req.params.month;
    const userId = req.user._id; // Assuming user authentication is implemented

    Budget.find({
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
  }
);

module.exports = router;
