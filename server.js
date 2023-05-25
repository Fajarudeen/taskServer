const express = require("express");

const cors = require("cors");

const CONNECTDB = require("../server/config/db");

CONNECTDB();

const app = express();

app.use(express.json());

app.use(cors());

const UserAuth = require("../server/routes/userauth");

const ContactAuth = require("../server/routes/cntactAuth");

app.use("/api/v1/userauth", UserAuth);

app.use("/api/v1/contactauth", ContactAuth);

app.listen(3002, () => {
  console.log("server started at 3002");
});
