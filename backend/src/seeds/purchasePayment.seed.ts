import { db } from "../config/db";

export async function seedPurchasePayment() {
  await db.query(`
    INSERT INTO tblPurchase_Payment VALUES
    ('INV001','PO01','GRN01','Net 30',525,'Paid'),
    ('INV002','PO03','GRN03','Net 15',790,'Paid'),
    ('INV003','PO05','GRN05','Immediate',152.5,'Paid'),
    ('INV004','PO08','GRN08','COD',610,'Paid'),
    ('INV005','PO10','GRN10','Net 30',100,'Pending'),
    ('INV006','PO02','GRN02','COD',305,'Pending'),
    ('INV007','PO06','GRN06','Net 30',420,'Pending'),
    ('INV008','PO07','GRN07','Net 60',950,'Pending'),
    ('INV009','PO09','GRN09','Net 15',262.5,'Pending'),
    ('INV010','PO01','GRN11','Net 30',50,'Paid');
  `);
}
