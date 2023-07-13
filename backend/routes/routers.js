const express = require("express");
const router = express.Router();

const { getUV } = require("../controllers/UV");

router.post("/getUV", getUV);

module.exports = router;
