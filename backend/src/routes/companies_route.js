const router = require("express").Router();
const companies = require("../controller/companies_controller");
const middleware = require("../middleware");
const schemas = require("../middleware/schema");

router.post("/create", companies.createCompany);
router.get("/get-all", companies.displayAllCompanies);

module.exports = router;
