import { db } from "../config/db";

export async function seedVendors() {
  await db.query(`
    INSERT INTO tblVendor_Details VALUES
    ('VEND01', 'Fresh Farms, NY', 'vegetable', 9876543210, 'GSTIN001'),
    ('VEND02', 'Global Grocers', 'grocery', 9876543211, 'GSTIN002'),
    ('VEND03', 'Meat Masters', 'poultry', 9876543212, 'GSTIN003'),
    ('VEND04', 'Dairy Delights', 'dairy', 9876543213, 'GSTIN004'),
    ('VEND05', 'Spice Route', 'spices', 9876543214, 'GSTIN005'),
    ('VEND06', 'Baker Choice', 'bakery', 9876543215, 'GSTIN006'),
    ('VEND07', 'Ocean Catch', 'seafood', 9876543216, 'GSTIN007'),
    ('VEND08', 'Agro Fresh', 'vegetable', 9876543217, 'GSTIN008'),
    ('VEND09', 'Clean Sip Co.', 'beverages', 9876543218, 'GSTIN009'),
    ('VEND10', 'Pack & Go', 'packaging', 9876543219, 'GSTIN010');
  `);
}
