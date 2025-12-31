import * as mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Soumalika@2004",
  database: "flavourgarden",
});

