const router = require("express").Router();
const insertController = require("../controllers/insertController");

router.post("/roles", insertController.insertRoles);

module.exports = router;
