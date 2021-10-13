const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();

app.use(cors());

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// add router for all routes
const router = require("./routes/router.js");
app.use("/api", router);

// // handle unhandled 404 requests
// app.use("*", (req, res) => {
//   console.log(`\u001b[31m[ERR] Route does not exists: ${req.baseUrl}`);
// });

// fallback route for SPA
// Anything that doesnt matches the main route goes to index.html
app.use("/*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// start server
app.listen(process.env.PORT, () =>
  console.log(`\x1b[0m[LOG] Server running on port ${process.env.PORT}`)
);
