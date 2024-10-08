const AbstractRepository = require("./AbstractRepository");

class ItemRepository extends AbstractRepository {
  constructor() {
    super({ table: "item" });
  }

  async add(item, listId) {
    const [result] = await this.database.query(
      `insert into ${this.table} (todo, list_id) values (?, ?)`,
      [item.todo, listId]
    );
    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  async edit(item, itemId) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET todo = ?
      WHERE id = ?`,
      [item.todo, itemId]
    );
    return result.itemId;
  }

  async destroy(itemId) {
    const query = `
      DELETE FROM ${this.table} WHERE id = ?
    `;
    const [result] = await this.database.query(query, [itemId]);
    return result.affectedRows > 0;
  }
}

module.exports = ItemRepository;
