import { db } from "../config/db"; // adjust path if needed

export async function seedPurchaseOrderDetails() {
  await db.query(`
    INSERT INTO tblPurchase_Order_Details
    (PO_ID, Outlet_ID, SL_NO, Item_ID, Qty, Unit_price, Total_Amount)
    VALUES
      ('PO01', 'OUT001', 1, 'INV01', 10, 50.00, 500.00),
      ('PO02', 'OUT002', 1, 'INV03', 20, 15.00, 300.00),
      ('PO03', 'OUT001', 1, 'INV02', 8, 100.00, 800.00),
      ('PO04', 'OUT004', 1, 'INV06', 5, 40.00, 200.00),
      ('PO05', 'OUT003', 1, 'INV05', 15, 10.00, 150.00),
      ('PO06', 'OUT001', 1, 'INV01', 8, 50.00, 400.00),
      ('PO07', 'OUT001', 1, 'INV10', 10, 100.00, 1000.00),
      ('PO08', 'OUT006', 1, 'INV08', 20, 30.00, 600.00),
      ('PO09', 'OUT002', 1, 'INV04', 5, 50.00, 250.00),
      ('PO10', 'OUT005', 1, 'INV07', 10, 10.00, 100.00);
  `);
}


