const dal = require("./p.db");

var getFullText = function(text) {
  const DEBUG = process.env.DEBUG === 'true'; // Ensure DEBUG is defined

  if (DEBUG) console.log("postgres.dal.getFullText()");
  return new Promise(function(resolve, reject) {

    const sql = `
      SELECT title, publisher, price, category_id, stock_quantity, release_year 
      FROM games
      WHERE description ILIKE '%' || $1 || '%'
        OR make ILIKE '%' || $1 || '%'
        OR model ILIKE '%' || $1 || '%'
    `;

    if (DEBUG) console.log(sql);
    dal.query(sql, [text], (err, result) => {
      if (err) {
        // logging should go here
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        if (DEBUG) console.log(`Row count: ${result.rowCount}`);
        resolve(result.rows);
      }
    }); 
  }); 
};

module.exports = {
  getFullText,
};