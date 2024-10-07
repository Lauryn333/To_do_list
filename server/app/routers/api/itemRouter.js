const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  browse,
  read,
  edit,
  add,
  destroy,
} = require("../../controllers/itemActions");

// Route to get a list of items
router.get("/", browse);

// Route to get a specific item by ID
router.get("/:id", read);

router.put("/:itemId", edit);

// Route to add a new item
router.post("/:listId", add);

router.delete("/:itemId", destroy);

/* ************************************************************************* */

module.exports = router;
