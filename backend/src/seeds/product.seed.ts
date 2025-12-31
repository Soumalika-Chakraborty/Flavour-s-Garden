import { db } from "../config/db";

export async function seedProducts() {
  await db.query(`
    INSERT INTO tblProduct VALUES
    ('PRD01','Spring Roll','CAT01',15.00,1,'img1.jpg','Veg spring roll','Gluten',1),
    ('PRD02','Butter Chicken','CAT02',45.00,1,'img2.jpg','Classic chicken curry','Dairy',0),
    ('PRD03','Choco Lava','CAT03',25.00,1,'img3.jpg','Warm chocolate cake','Eggs, Dairy',1),
    ('PRD04', 'Cold Coffee', 'CAT04', 12.00, 1, 'img4.jpg', 'Iced coffee', 'Dairy', 1),
    ('PRD05', 'Pancakes', 'CAT05', 20.00, 1, 'img5.jpg', 'Fluffy pancakes', 'Gluten', 1),
    ('PRD06', 'Greek Salad', 'CAT06', 18.00, 1, 'img6.jpg', 'Fresh veg salad', 'None', 1),
    ('PRD07', 'Tomato Soup', 'CAT07', 10.00, 1, 'img7.jpg', 'Creamy soup', 'Dairy', 1),
    ('PRD08', 'Veggie Pizza', 'CAT08', 35.00, 1, 'img8.jpg', 'Garden pizza', 'Gluten, Dairy', 1),
    ('PRD09', 'Cheese Burger', 'CAT09', 22.00, 1, 'img9.jpg', 'Double patty', 'Gluten, Dairy', 0),
    ('PRD10', 'Pesto Pasta', 'CAT10', 30.00, 1, 'img10.jpg', 'Basil pesto', 'Nuts', 1);
  `);
}
