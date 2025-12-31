export const createDelivery = async (req, res) => {
  const { Delivery_ID, Sales_Order_ID } = req.body;

  await db.query(
    `INSERT INTO tblDelivery (Delivery_ID, Sales_Order_ID)
     VALUES (?, ?)`,
    [Delivery_ID, Sales_Order_ID]
  );

  res.json({ message: "Delivery created" });
};
