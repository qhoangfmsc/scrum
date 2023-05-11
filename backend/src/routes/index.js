const express = require("express");
const router = express.Router();
const account_route = require("./account_route");
const companies_route = require("./companies_route");

router.use("/comment", account_route);
router.use("/companies", companies_route);

module.exports = router;
