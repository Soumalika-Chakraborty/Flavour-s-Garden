import { db } from "../config/db";

export async function seedRequisition() {
  await db.query(`
    INSERT INTO tblRequisition VALUES
    ('REQ01','2025-11-01','Wheat Flour',20,'OUT001','Kitchen Lead'),
    ('REQ02','2025-11-01','Milk',50,'OUT002','Cafe Barista'),
    ('REQ03','2025-11-02','Chicken',30,'OUT001','Head Chef'),
    ('REQ04','2025-11-02','Tomatoes',15,'OUT003','Sous Chef'),
    ('REQ05','2025-11-03','Butter',10,'OUT004','Pantry Manager'),
    ('REQ06','2025-11-03','Sugar',25,'OUT006','Refreshment Team'),
    ('REQ07','2025-11-04','Cooking Oil',40,'OUT001','Kitchen Lead'),
    ('REQ08','2025-11-04','Basil',2,'OUT007','Italian Section'),
    ('REQ09','2025-11-05','Salt',5,'OUT005','Grill Master'),
    ('REQ10','2025-11-05','Coffee Beans',10,'OUT002','Barista');
  `);
}
