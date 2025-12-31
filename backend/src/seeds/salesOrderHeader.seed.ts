import { db } from "../config/db";

export async function seedSalesOrderHeader() {
  await db.query(`
    INSERT INTO tblSales_Order_Header VALUES
    ('SOH01','2025-11-01','C101','OUT001','Dine-in',100.00,2.50,2.50,5.00,95.00,'executed'),
    ('SOH02','2025-11-01','C102','OUT001','Delivery',150.00,3.75,3.75,0.00,157.50,'executed'),
    ('SOH03','2025-11-02','C103','OUT002','Takeaway',50.00,1.25,1.25,2.00,50.50,'executed'),
    ('SOH04','2025-11-02','C104','OUT003','Dine-in',80.00,2.00,2.00,10.00,74.00,'cancelled'),
    ('SOH05','2025-11-03','C105','OUT004','Delivery',200.00,5.00,5.00,20.00,190.00,'executed'),
    ('SOH06','2025-11-03','C106','OUT005','Dine-in',120.00,3.00,3.00,0.00,126.00,'executed'),
    ('SOH07','2025-11-04','C107','OUT006','Takeaway',45.00,1.13,1.13,5.00,42.26,'executed'),
    ('SOH08','2025-11-04','C108','OUT007','Dine-in',300.00,7.50,7.50,30.00,285.00,'executed'),
    ('SOH09','2025-11-05','C109','OUT001','Delivery',90.00,2.25,2.25,0.00,94.50,'executed'),
    ('SOH10','2025-11-05','C110','OUT002','Dine-in',110.00,2.75,2.75,10.00,105.50,'executed');
  `);
}

