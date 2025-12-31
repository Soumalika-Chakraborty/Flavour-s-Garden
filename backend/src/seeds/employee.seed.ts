import { db } from "../config/db";

export async function seedEmployees() {
  await db.query(`
    INSERT INTO tblEmployees VALUES
    ('EMP001','Arjun','Mehta','Order Manager','12 Sector B, Salt Lake','OUT001','2024-01-10',1,9876543210,'arjun.m@fg.com'),
    ('EMP002','Priya','Sharma','Inventory Manager','45 Park Street','OUT001','2024-01-15',1,9876543211,'priya.s@fg.com'),
    ('EMP003','Rohan','Das','Kitchen Staff','89 Lake Road','OUT002','2024-02-01',1,9876543212,'rohan.d@fg.com'),
    ('EMP005', 'Vikram', 'Singh', 'Kitchen Staff', '22 Ballygunge Terrace', 'OUT003', '2024-03-05', 1, 9876543214, 'vikram.s@fg.com'),
    ('EMP006', 'Anjali', 'Gupta', 'Inventory Manager', '5/1 Gariahat Rd', 'OUT003', '2024-03-20', 1, 9876543215, 'anjali.g@fg.com'),
    ('EMP007', 'Kabir', 'Khan', 'Order Manager', '77 Shakespeare Sarani', 'OUT004', '2024-04-01', 1, 9876543216, 'kabir.k@fg.com'),
    ('EMP008', 'Ishita', 'Ray', 'Kitchen Staff', '14 New Town, Block C', 'OUT004', '2024-04-10', 1, 9876543217, 'ishita.r@fg.com'),
    ('EMP009', 'Amit', 'Verma', 'Inventory Manager', '33 Rajarhat Main Rd', 'OUT005', '2024-05-02', 1, 9876543218, 'amit.v@fg.com'),
    ('EMP010', 'Sneha', 'Paul', 'Order Manager', '9 Topia Rd, Sector 5', 'OUT005', '2024-05-15', 0, 9876543219, 'sneha.p@fg.com');
  `);
}

