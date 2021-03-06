require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// const db = require("./models");
const expressJwt = require("express-jwt");

const app = express();
app.use(cors());

const rowdyResults = require("rowdy-logger").begin(app);

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(morgan("dev"));
app.use(
  express.json({
    limit: "30mb"
  })
);

app.get("/", (req, res) => {
  res.send("loading...");
});

app.use("/auth", expressJwt({ secret: process.env.JWT_SECRET }).unless({
    path: [
      { url: "/auth/login", methods: ["POST"] },
      { url: "/auth/signup", methods: ["POST"] }
    ]
  }),
  require("./controllers/auth")
);

app.use("/events", expressJwt({ secret: process.env.JWT_SECRET }),
  require("./controllers/events")
);

app.use("/agencies", expressJwt({ secret: process.env.JWT_SECRET }),
  require("./controllers/agencies")
);


app.use("/user", expressJwt({ secret: process.env.JWT_SECRET }),
  require("./controllers/user")
);

app.get("*", (req, res) => {
  res.status(404).send({
    message: "doh!"
  });
});

app.listen(process.env.PORT || 3000, () => {
  rowdyResults.print();
  console.log("On Port: 3000");
});
