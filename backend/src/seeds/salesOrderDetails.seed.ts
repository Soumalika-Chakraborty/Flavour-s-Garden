import { db } from "../config/db";

export async function seedSalesOrderDetails() {
  await db.query(`
    INSERT INTO tblSales_Order_Details
    (Sales_Order_ID, Product_Code, Qty, Amount) VALUES
    ('SOH01','PRD01',2,30.00),
    ('SOH01','PRD02',1,45.00),
    ('SOH02','PRD08',3,105.00),
    ('SOH03','PRD04',4,48.00),
    ('SOH05','PRD10',5,150.00),
    ('SOH06','PRD09',2,44.00),
    ('SOH07','PRD07',3,30.00),
    ('SOH08','PRD02',4,180.00),
    ('SOH09','PRD01',5,75.00),
    ('SOH10','PRD03',2,50.00);
  `);
}
