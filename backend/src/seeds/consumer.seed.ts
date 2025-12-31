import { db } from "../config/db";

export async function seedConsumers() {
  await db.query(`
    INSERT INTO tblConsumer VALUES
    ('C101','John','Doe',9000000001,'john@mail.com','hash1',NOW(),'12 Main St',110001,'Home',110001),
    ('C102','Jane','Smith',9000000002,'jane@mail.com','hash2',NOW(),'45 Lake Rd',110002,'Office',110002),
    ('C103','Alice','Brown',9000000003,'alice@mail.com','hash3',NOW(),'89 Hill St',110003,'Gym',110003),
    ('C104','Bob','White',9000000004,'bob@mail.com','hash4',NOW(),'10 Sea Ln',110004,'Home',110004),
    ('C105','Charlie','Green',9000000005,'charlie@mail.com','hash5',NOW(),'22 Old Dr',110005,'School',110005),
    ('C106', 'David', 'Blue', 9000000006, 'david@mail.com', 'hash6', NOW(), '67 New Rd', 110006, 'Home', 110006),
    ('C107', 'Eve', 'Black', 9000000007, 'eve@mail.com', 'hash7', NOW(), '34 Park Ave', 110007, 'Work', 110007),
    ('C108', 'Frank', 'Grey', 9000000008, 'frank@mail.com', 'hash8', NOW(), '12 Sky Bldg', 110008, 'Home', 110008),
    ('C109', 'Grace', 'Yellow', 9000000009, 'grace@mail.com', 'hash9', NOW(), '90 Mall Way', 110009, 'Shop', 110009),
    ('C110', 'Henry', 'Pink', 9000000010, 'henry@mail.com', 'hash10', NOW(), '44 Res Rd', 110010, 'Home', 110010);
  `);
}
