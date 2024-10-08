const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const itemsRouter = require("./itemRouter");
const listsRouter = require("./listRouter");

router.use("/items", itemsRouter);
router.use("/lists", listsRouter);

/* ************************************************************************* */

module.exports = router;
