import { db } from "../config/db";

export async function seedInventory() {
  await db.query(`
    INSERT INTO tblInventory VALUES
    ('INV01','OUT001','Wheat Flour',100,'Kg',10,20,'High',NOW()),
    ('INV02','OUT001','Chicken',50,'Kg',5,10,'High',NOW()),
    ('INV03','OUT002','Milk',200,'Ltr',20,40,'Medium',NOW()),
    ('INV04', 'OUT002', 'Coffee Beans', 30.00, 'Kg', 2.00, 5.00, 'Medium', NOW()),
    ('INV05', 'OUT003', 'Tomatoes', 40.00, 'Kg', 5.00, 8.00, 'High', NOW()),
    ('INV06', 'OUT004', 'Butter', 25.00, 'Kg', 3.00, 6.00, 'High', NOW()),
    ('INV07', 'OUT005', 'Salt', 15.00, 'Kg', 2.00, 4.00, 'Low', NOW()),
    ('INV11', 'OUT111', 'Sugar', 55.55, 'Kg', 5.55, 11.11, 'Low', NOW()),
    ('INV12', 'OUT122', 'Basil Leaves ', 77.77, 'Kg ', 7.77, 15.55, 'Medium ', NOW()),
    ('INV13', 'OUT133 ', 'Cooking Oil ', 99.99 , 'Ltr' , 9999 , NULL , NULL , NULL);
  `);
}
