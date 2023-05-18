const router = require("express").Router();
const companies = require("../controller/enrolls_controller");
// const middleware = require("../middleware");
// const schemas = require("../middleware/schema");

router.post("/create", companies.createEnrollment);
router.get("/get-all", companies.displayAllEnrollments);
router.post("/get-one", companies.displayEnrollmentInfo);

module.exports = router;
