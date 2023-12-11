const express = require("express");
const passport = require("passport");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../models/user");
const authenticate = require("../authenticate");
const cors = require("./cors");

router.use(bodyParser.json());

/* GET users listing. */
router.options("*", cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});
router
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      User.find({})
        .then(
          (users) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(users);
          },
          (err) => next(err)
        )
        .catch((err) => next(err));
    }
  );

router.post("/signup", cors.corsWithOptions, (req, res, next) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        if (req.body.firstname) user.firstname = req.body.firstname;
        if (req.body.lastname) user.lastname = req.body.lastname;
        user
          .save()
          .then((user) => {
            passport.authenticate("local")(req, res, () => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json({ success: true, status: "Registration Successful!" });
            });
          })
          .catch((err) => {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({ err: err });
            return;
          });
      }
    }
  );
});

router.post("/login", cors.corsWithOptions, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      res.json({ success: false, status: "Login Unsuccessful!", err: info });
    }
    let token = authenticate.getToken({ _id: user._id });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        admin: user.admin,
      },
      status: "Login Successful!",
      token: token,
    });
  })(req, res, next);
});

router.get("/logout", cors.corsWithOptions, (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    var err = new Error("You are not logged in!");
    err.status = 403;
    next(err);
  }
});

router.get("/checkJWTtoken", cors.corsWithOptions, (req, res) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      return res.json({ status: "JWT invalid!", success: false, err: info });
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.json({ status: "JWT valid!", success: true, user: user });
    }
  })(req, res);
});

router.post(
  "/refreshToken",
  cors.corsWithOptions,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    const token = authenticate.getToken({ _id: req.user._id });
    if (authenticate.isTokenExpired(token)) {
      const newToken = authenticate.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.json({
        status: "new token generated",
        success: true,
        token: newToken,
      });
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.json({ status: "JWT valid!", success: true, token: token });
    }
  }
);

router.get(
  "/getUserDetails",
  cors.corsWithOptions,
  authenticate.verifyUser,
  (req, res, next) => {
    User.aggregate([
      { $match: { _id: req.user._id } },
      {
        $lookup: {
          from: "budgets",
          localField: "_id",
          foreignField: "user",
          as: "budgets",
        },
      },
      {
        $lookup: {
          from: "expenses",
          localField: "_id",
          foreignField: "user",
          as: "expenses",
        },
      },
    ])
      .then((user) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          firstname: user[0].firstname,
          lastname: user[0].lastname,
          username: user[0].username,
          budgets: user[0].budgets,
          expenses: user[0].expenses,
        });
      })
      .catch((err) => next(err));
  }
);

module.exports = router;
