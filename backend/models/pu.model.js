const db = require("../lib/database.js");

// constructor
const PollingUnitResult = function (result) {
  this.polling_unit_uniqueid = result.polling_unit_uniqueid;
  this.party_abbreviation = result.party_abbreviation;
  this.party_score = result.party_score;
  this.entered_by_user = result.entered_by_user;
  this.date_entered = result.date_entered;
  this.user_ip_address = result.user_ip_address;
};

PollingUnitResult.create = (newResult, result) => {
  db.query("INSERT INTO announced_pu_results SET ?", newResult, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log(`created result at ${newResult.date_entered}`);
    result(null, { status: "success" });
  });
};

PollingUnitResult.findById = (pu_unique_id, result) => {
  db.query(
    `SELECT *, SUM(party_score) as total_party_score 
    FROM announced_pu_results WHERE polling_unit_uniqueid = ${pu_unique_id}
    GROUP BY announced_pu_results.party_abbreviation
    ORDER BY total_party_score DESC`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found polling_unit result");
        result(null, res);
        return;
      }

      // not found
      result({ kind: "not_found" }, null);
    }
  );
};
PollingUnitResult.findByLGA = (lga_id, result) => {
  db.query(
    `SELECT *, SUM(party_score) as total_party_score FROM announced_pu_results 
    WHERE polling_unit_uniqueid 
    IN (SELECT uniqueid FROM polling_unit WHERE lga_id = ${lga_id}) 
    GROUP BY announced_pu_results.party_abbreviation
    ORDER BY total_party_score DESC;`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found lga result");
        result(null, res);
        return;
      }

      // not found
      result({ kind: "not_found" }, null);
    }
  );
};

PollingUnitResult.getLGAList = (result) => {
  db.query(
    `SELECT lga_name, lga_id FROM lga 
    ORDER BY lga_name ASC;`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res);
        return;
      }

      // not found
      result({ kind: "not_found" }, null);
    }
  );
};

PollingUnitResult.getPuList = (result) => {
  db.query(
    `SELECT polling_unit_name, polling_unit_number, uniqueid FROM polling_unit 
    WHERE lga_id != 0
    ORDER BY uniqueid ASC;`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res);
        return;
      }

      // not found
      result({ kind: "not_found" }, null);
    }
  );
};
PollingUnitResult.getPartyList = (result) => {
  db.query(
    `SELECT partyname FROM party 
    ORDER BY partyname ASC;`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res);
        return;
      }

      // not found
      result({ kind: "not_found" }, null);
    }
  );
};

PollingUnitResult.getPuListByLGA = (lga_id, result) => {
  db.query(
    `SELECT polling_unit_name, polling_unit_number, uniqueid FROM polling_unit 
    WHERE lga_id = ${lga_id}
    ORDER BY uniqueid ASC;`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res);
        return;
      }

      // not found
      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = PollingUnitResult;
