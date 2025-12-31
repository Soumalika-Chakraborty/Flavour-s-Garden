// ...existing code...
const db = require('../config/db');

const inventory = {
    findAll: async () => {
        const [rows] = await db.query('SELECT * FROM tblInventory');
        return rows;
    }, // <-- added comma
    findLowStock: async () => {
        const [rows] = await db.execute('SELECT * FROM tblInventory WHERE Current_Qty <= Reorder_Level');
        return rows;
    },

    updateStock: async (itemID, qtyChange) => {
        const sql = `UPDATE tblInventory SET Current_Qty = Current_Qty + ? WHERE Item_ID = ?`;
        return await db.execute(sql,[qtyChange, itemID]);
    }
};
module.exports = inventory;
// ...existing code...