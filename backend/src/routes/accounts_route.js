const router = require("express").Router();
const account = require("../controller/accounts_controller");
// const middleware = require("../middleware");
// const schemas = require("../middleware/schema");
const { PROPERTY_TYPE } = require("../services/constant");

router.post("/login", account.loginAccount);
router.post("/create", account.createAccount);
router.post("/logout", account.logoutAccount);
router.post("/change-password", account.changePassword);
router.post("/check", account.checkAccountSession);

module.exports = router;
