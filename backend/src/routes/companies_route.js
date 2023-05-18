const router = require("express").Router();
const companies = require("../controller/companies_controller");
// const middleware = require("../middleware");
// const schemas = require("../middleware/schema");

router.post("/create", companies.createCompany);
router.post("/update", companies.modifyCompany);
router.post("filter", companies.filtering);
router.get("/get-all", companies.displayAllCompanies);
router.get("/get-one", companies.displayCompanyInfo);

module.exports = router;
