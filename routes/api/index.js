const router = require("express").Router();
const googleRoutes = require("./google");

// Book routes
router.use("/google", googleRoutes);

module.exports = router;
