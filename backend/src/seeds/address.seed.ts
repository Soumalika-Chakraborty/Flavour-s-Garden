import { db } from "../config/db";

export async function seedAddress() {
  await db.query(`
    INSERT INTO tblAddress VALUES
    ('C001','12 Main St','Central City','Near Clock Tower',110001),
    ('C002','45 Lake Rd','Westview','Behind Mall',110002),
    ('C003','89 Hill St','Eastside','Apex Point',110003),
    ('C004','10 Sea Ln','Southport','Pier 9',110004),
    ('C005','22 Old Dr','Historic Dist','Old Gate',110005),
    ('C006','67 New Rd','Uptown','Station Sq',110006),
    ('C007','34 Park Ave','Greenland','City Park',110007),
    ('C008','12 Sky Bldg','Skylake','Floor 12',110008),
    ('C009','90 Mall Way','Central','Unit 4',110009),
    ('C010','44 Res Rd','Family Park','Near Clinic',110010);
  `);
}
