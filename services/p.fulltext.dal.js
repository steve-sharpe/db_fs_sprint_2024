const dal = require("./p.db");

var getFullText = function(text) {
  const DEBUG = process.env.DEBUG === 'true'; // Ensure DEBUG is defined

  if (DEBUG) console.log("postgres.dal.getFullText()");

  return new Promise(function(resolve, reject) {
    // First, get the column names from the 'games' table
    const columnQuery = `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'games'
    `;

    dal.query(columnQuery, [], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        return reject(err);
      }

      const columns = result.rows.map(row => row.column_name);
      const conditions = columns.map(column => `${column}::text ILIKE '%' || $1 || '%'`).join(' OR ');

      const sql = `
        SELECT *
        FROM games
        WHERE ${conditions}
      `;

      if (DEBUG) console.log(sql);

      dal.query(sql, [text], (err, result) => {
        if (err) {
          if (DEBUG) console.log(err);
          return reject(err);
        } else {
          if (DEBUG) console.log(`Row count: ${result.rowCount}`);
          resolve(result.rows);
        }
      });
    });
  });
};

module.exports = {
  getFullText,
};