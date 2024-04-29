const MongoStore = require('connect-mongo');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const app = express();

require("./database/index");
require("./strategy/local");

app.use(cors({
  origin: ['https://navigatorsyouth.netlify.app', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.urlencoded());
app.use(express.json());
app.use(session({
  secret: "joshuadaq",
  saveUninitialized: false,
  resave: false,
  cookie: { secure: false },
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://joshuadaq:Scribbles24.@cluster0.59wsybx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  })
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(passport.initialize());
app.use(passport.session());

const PORT = 3007;
app.listen(PORT, () => {
  console.log("Listening on PORT ", PORT);
});

app.post("/login", passport.authenticate('local'), (req, res) => {
  console.log("Logged in");
  res.sendStatus(200);
});

app.use((req, res, next) => {
  console.log("req data", req.user);
  if (req.user) {
    console.log(req.user);
    next();
  } else {
    res.sendStatus(401);
  }
});

app.get("/home", (req, res) => {
  res.send("hello, world");
});
