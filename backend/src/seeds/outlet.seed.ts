import { db } from "../config/db";

export async function seedOutlet() {
  await db.query(`
    INSERT INTO tblOutlet VALUES
    ('OUT001', 'Downtown Garden', '123 Main St, Central'),
    ('OUT002', 'Lakeside Bistro', '45 North Shore, Westside'),
    ('OUT003', 'Hills Cafe', '89 Mountain Road, Eastview'),
    ('OUT004', 'Airport Plaza', 'Terminal 2, International'),
    ('OUT005', 'Beachside Grill', '10 Ocean Drive, South'),
    ('OUT006', 'Corporate Hub', 'Floor 1, Tech Park'),
    ('OUT007', 'Old Town Kitchen', '22 Heritage Lane'),
    ('OUT008', 'The Rooftop', 'Apex Tower, Floor 40'),
    ('OUT009', 'Garden Express', 'Subway Mall Unit 4'),
    ('OUT010', 'Family Diner', '56 Residency Road');
  `);
}
