import { db } from "../config/db";

export async function seedIssue() {
  await db.query(`
    INSERT INTO tblIssue VALUES
    ('ISS01','2025-11-01','REQ01','2025-11-01','Wheat Flour',20,20,'OUT001','Store Manager'),
    ('ISS02','2025-11-02','REQ02','2025-11-01','Milk',50,40,'OUT002','Inventory Asst'),
    ('ISS03','2025-11-02','REQ03','2025-11-02','Chicken',30,30,'OUT001','Store Manager'),
    ('ISS04','2025-11-03','REQ04','2025-11-02','Tomatoes',15,15,'OUT003','Inventory Asst'),
    ('ISS05','2025-11-03','REQ05','2025-11-03','Butter',10,10,'OUT004','Store Manager'),
    ('ISS06','2025-11-04','REQ06','2025-11-03','Sugar',25,25,'OUT006','Inventory Asst'),
    ('ISS07','2025-11-04','REQ07','2025-11-04','Cooking Oil',40,40,'OUT001','Store Manager'),
    ('ISS08','2025-11-05','REQ08','2025-11-04','Basil',2,2,'OUT007','Inventory Asst'),
    ('ISS09','2025-11-05','REQ09','2025-11-05','Salt',5,5,'OUT005','Store Manager'),
    ('ISS10','2025-11-06','REQ10','2025-11-05','Coffee Beans',10,8,'OUT002','Inventory Asst');
  `);
}
