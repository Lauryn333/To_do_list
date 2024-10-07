// Import access to database tables
const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const items = await tables.item.readAll();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const item = await tables.item.read(req.params.id);
    if (item == null) {
      res.sendStatus(404);
    } else {
      res.json(item);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const { itemId } = req.params;
  const item = req.body;

  try {
    const response = await tables.item.edit(item, itemId);
    res.status(201).json({ response, item });
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const { listId } = req.params;
  const item = req.body;

  try {
    const insertId = await tables.item.add(item, listId);
    res.status(201).json({ insertId, item });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const response = await tables.item.destroy(itemId);
    if (response) {
      res.json({ message: "Item deleted successfully" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
