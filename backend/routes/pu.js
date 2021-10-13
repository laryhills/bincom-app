const express = require("express");
const router = express.Router();
const db = require("../lib/database.js");
const PollingUnitResult = require("../models/pu.model");

// Create PU Result
// Route /api/pu/
router.post("/", (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(200).send({
      message: "Content can not be empty!",
      save: false,
    });
  }

  const result = new PollingUnitResult({
    polling_unit_uniqueid: req.body.polling_unit_uniqueid,
    party_abbreviation: req.body.party_abbreviation,
    party_score: req.body.party_score,
    entered_by_user: req.body.entered_by_user,
    date_entered: req.body.date_entered,
    user_ip_address: req.body.user_ip_address,
  });

  // Save Polling Unit in the database
  PollingUnitResult.create(result, (err, data) => {
    if (err)
      res.status(200).send({
        message: err.message || "Some error occurred while saving Result.",
        save: false,
      });
    else
      res.send({
        save: true,
        message: "Save of Result Succesful",
        result: data,
      });
  });
});

// Query PU List
// Route /api/pu/list
router.get("/list", (req, res) => {
  PollingUnitResult.getPuList((err, data) => {
    if (err)
      res.status(200).send({
        message:
          err.message || "Some error occurred while retrieving polling units.",
        get: false,
      });
    else {
      res.send({
        get: true,
        result: data,
      });
    }
  });
});
// Query PU List By LGA
// Route /api/pu/list/:lga_id
router.get("/list/:lga_id", (req, res) => {
  if (!req.params) {
    res.status(200).send({
      message: "Content can not be empty!",
      get: false,
    });
  }
  const lga_id = req.params.lga_id;
  PollingUnitResult.getPuListByLGA(lga_id, (err, data) => {
    if (err)
      res.status(200).send({
        message:
          err.message || "Some error occurred while retrieving polling units.",
        get: false,
      });
    else {
      res.send({
        get: true,
        result: data,
      });
    }
  });
});

// Query A PU Result
// Route /api/pu/:pu_unique_id:
router.get("/:pu_unique_id", (req, res) => {
  if (!req.params) {
    res.status(200).send({
      message: "Content can not be empty!",
      find: false,
    });
  }
  const pu_unique_id = req.params.pu_unique_id;

  PollingUnitResult.findById(pu_unique_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(200).send({
          message: `Could not find result for Polling Unit`,
          find: false,
        });
      } else {
        res.status(200).send({
          message: "Error retrieving result for Polling Unit ",
          find: false,
        });
      }
    } else res.send({ find: true, result: data });
  });
});

module.exports = router;
