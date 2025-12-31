import { db } from "../config/db";

export async function seedMenuCategories() {
  await db.query(`
    INSERT INTO tblMenu_Categories VALUES
    ('CAT01', 'Appetizers'),
    ('CAT02', 'Main Course'),
    ('CAT03', 'Desserts'),
    ('CAT04', 'Beverages'),
    ('CAT05', 'Breakfast'),
    ('CAT06', 'Salads'),
    ('CAT07', 'Soups'),
    ('CAT08', 'Pizzas'),
    ('CAT09', 'Burgers'),
    ('CAT10', 'Pasta');
  `);
}
