import { db } from "../config/db";

export async function seedPurchaseOrderHeader() {
  await db.query(`
    INSERT INTO tblPurchase_Order_HDR
    (PO_ID,Purchase_Order_Date,Payment_Terms,Vendor_ID,Delivery_Date,
     Total_Amount,SGST,CGST,Discount,Net_Amount,Status) VALUES
    ('PO01','2025-10-25','Net 30','VEND01','2025-10-28',500,12.5,12.5,0,525,'Received'),
    ('PO02','2025-10-25','COD','VEND02','2025-10-27',300,7.5,7.5,10,305,'Pending'),
    ('PO03','2025-10-26','Net 15','VEND03','2025-10-30',800,20,20,50,790,'Received'),
    ('PO04','2025-10-26','Net 30','VEND04','2025-10-29',200,5,5,0,210,'Cancelled'),
    ('PO05','2025-10-27','Immediate','VEND05','2025-10-27',150,3.75,3.75,5,152.5,'Received'),
    ('PO06','2025-10-27','Net 30','VEND06','2025-11-01',400,10,10,0,420,'Pending'),
    ('PO07','2025-10-28','Net 60','VEND07','2025-11-05',1000,25,25,100,950,'Pending'),
    ('PO08','2025-10-28','COD','VEND08','2025-10-29',600,15,15,20,610,'Received'),
    ('PO09','2025-10-29','Net 15','VEND09','2025-11-02',250,6.25,6.25,0,262.5,'Pending'),
    ('PO10','2025-10-29','Net 30','VEND10','2025-11-01',100,2.5,2.5,5,100,'Received');
  `);
}
