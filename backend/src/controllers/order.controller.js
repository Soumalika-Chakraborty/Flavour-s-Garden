import { db } from "../config/db.js";

export const createOrder = async (req, res) => {
  const {
    Sales_Order_ID,
    Consumer_ID,
    Outlet_ID,
    Total_Amount,
    Net_Amount
  } = req.body;

  await db.query(
    `INSERT INTO tblSales_Order_Header 
     (Sales_Order_ID, Consumer_ID, Outlet_ID, Total_Amount, Net_Amount, Sales_Order_Status)
     VALUES (?, ?, ?, ?, ?, 'pending')`,
    [Sales_Order_ID, Consumer_ID, Outlet_ID, Total_Amount, Net_Amount]
  );

  res.status(201).json({ message: "Order created" });
};
