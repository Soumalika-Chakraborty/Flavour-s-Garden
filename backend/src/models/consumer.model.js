const db = require("../config/db");

const consumer = {
  gwtAll:async () => {
    const [rows] = await db.query("SELECT * FROM tblConsumers");
    return rows;
  },
    findById: async (id) => {
    const [rows] = await db.query("SELECT * FROM tblConsumers WHERE Consumer_ID = ?", [id]);
    return rows[0];
  },
  create: async (Data) => {
    const sql = `INSERT INTO tblConsumers 
                 (Consumer_ID, First_Name, Last_Name, Ph_No, Email, Default_Address,Default_Pin) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      Data.Consumer_ID,
      Data.First_Name,
      Data.Last_Name,
      Data.Ph_No,
      Data.Email,
      Data.Default_Address,
      Data.Default_Pin
    ];
    const [result] = await db.query(sql, params);
    return result;
  }
};
module.exports = Consumer;