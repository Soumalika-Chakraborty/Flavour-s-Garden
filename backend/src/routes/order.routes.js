const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/create',async (req, res) => {
    const { Sales_Order_ID, Consumer_ID, Outlet_ID, Total_Amount, Net_Amount } = req.body;

    try {
        await db.execute(
            `INSERT INTO tblSales_Order_Header 
             (Sales_Order_ID, Consumer_ID, Outlet_ID, Total_Amount, Net_Amount, Sales_Order_Status)
                VALUES (?, ?, ?, ?, ?, 'pending')`,
            [Sales_Order_ID, Consumer_ID, Outlet_ID, Total_Amount, Net_Amount]
        );

        tblSales_Order_Details
        for(let item of items){
            await db.execute(
                `INSERT INTO tblSales_Order_Details 
                 (Sales_Order_ID, Item_ID, Quantity, Price)
                    VALUES (?, ?, ?, ?)`,
                [Sales_Order_ID, item.Item_ID, item.Quantity, item.Price]
            );
        }
        res.status(201).json({ success: true, message: 'Order sent to kitchen !' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
