const express = require("express");
const router = express.Router();
const PollingUnitResult = require("../models/pu.model");

// Query LGA List
// Route /api/party/
router.get("/", (req, res) => {
  PollingUnitResult.getPartyList((err, data) => {
    if (err)
      res.status(200).send({
        message: err.message || "Some error occurred while retrieving parties.",
      });
    else {
      res.send({
        get: true,
        result: data,
      });
    }
  });
});

module.exports = router;
