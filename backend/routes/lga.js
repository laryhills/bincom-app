const express = require("express");
const router = express.Router();
const PollingUnitResult = require("../models/pu.model");

// Query LGA List
// Route /api/lga/list
router.get("/list", (req, res) => {
  PollingUnitResult.getLGAList((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving lga.",
      });
    else {
      res.send({
        get: true,
        result: data,
      });
    }
  });
});

// Query A LGA Result
// Route /api/lga/:lga_id:
router.get("/:lga_id", (req, res) => {
  if (!req.params) {
    res.status(200).send({
      message: "Content can not be empty!",
      find: false,
    });
  }
  const lga_id = req.params.lga_id;

  PollingUnitResult.findByLGA(lga_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(200).send({
          message: `Could not find results`,
          find: false,
        });
      } else {
        res.status(200).send({
          message: "Error retrieving results",
          find: false,
        });
      }
    } else
      res.send({
        result: data,
        message: "Retrieved results",
        find: true,
      });
  });
});

module.exports = router;
