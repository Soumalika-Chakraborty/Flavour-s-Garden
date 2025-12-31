export const raiseRequisition = async (req, res) => {
  const { Req_No, Item, Qty, Outlet_ID, Req_Name } = req.body;

  await db.query(
    `INSERT INTO tblRequisition 
     (Req_No, Req_Date, Item, Qty, Outlet_ID, Req_Name)
     VALUES (?, CURDATE(), ?, ?, ?, ?)`,
    [Req_No, Item, Qty, Outlet_ID, Req_Name]
  );

  res.json({ message: "Requisition sent to inventory" });
};
