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

-- tblMenu_Categories
INSERT INTO tblMenu_Categories VALUES 
('CAT01', 'Appetizers'), ('CAT02', 'Main Course'), ('CAT03', 'Desserts'),
('CAT04', 'Beverages'), ('CAT05', 'Breakfast'), ('CAT06', 'Salads'),
('CAT07', 'Soups'), ('CAT08', 'Pizzas'), ('CAT09', 'Burgers'), ('CAT10', 'Pasta');

-- tblConfiguration
INSERT INTO tblConfiguration (SGST, CGST, Change_DateTime) VALUES 
(0.0250, 0.0250, '2025-01-01 10:00:00'), (0.0250, 0.0250, '2025-02-01 10:00:00'),
(0.0300, 0.0300, '2025-03-01 10:00:00'), (0.0300, 0.0300, '2025-04-01 10:00:00'),
(0.0250, 0.0250, '2025-05-01 10:00:00'), (0.0250, 0.0250, '2025-06-01 10:00:00'),
(0.0250, 0.0250, '2025-07-01 10:00:00'), (0.0250, 0.0250, '2025-08-01 10:00:00'),
(0.0250, 0.0250, '2025-09-01 10:00:00'), (0.0250, 0.0250, '2025-10-01 10:00:00');

-- tblVendor_Details
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


-- tblConsumer
INSERT INTO tblConsumer VALUES 
('C101', 'John', 'Doe', 9000000001, 'john@mail.com', 'hash1', NOW(), '12 Main St', 110001, 'Home', 110001),
('C102', 'Jane', 'Smith', 9000000002, 'jane@mail.com', 'hash2', NOW(), '45 Lake Rd', 110002, 'Office', 110002),
('C103', 'Alice', 'Brown', 9000000003, 'alice@mail.com', 'hash3', NOW(), '89 Hill St', 110003, 'Gym', 110003),
('C104', 'Bob', 'White', 9000000004, 'bob@mail.com', 'hash4', NOW(), '10 Sea Ln', 110004, 'Home', 110004),
('C105', 'Charlie', 'Green', 9000000005, 'charlie@mail.com', 'hash5', NOW(), '22 Old Dr', 110005, 'School', 110005),
('C106', 'David', 'Blue', 9000000006, 'david@mail.com', 'hash6', NOW(), '67 New Rd', 110006, 'Home', 110006),
('C107', 'Eve', 'Black', 9000000007, 'eve@mail.com', 'hash7', NOW(), '34 Park Ave', 110007, 'Work', 110007),
('C108', 'Frank', 'Grey', 9000000008, 'frank@mail.com', 'hash8', NOW(), '12 Sky Bldg', 110008, 'Home', 110008),
('C109', 'Grace', 'Yellow', 9000000009, 'grace@mail.com', 'hash9', NOW(), '90 Mall Way', 110009, 'Shop', 110009),
('C110', 'Henry', 'Pink', 9000000010, 'henry@mail.com', 'hash10', NOW(), '44 Res Rd', 110010, 'Home', 110010);

-- tblEmployees
INSERT INTO tblEmployees VALUES 
('EMP001','Arjun','Mehta','Order Manager','12 Sector B, Salt Lake','OUT001','2024-01-10',1,9876543210,'arjun.m@fg.com','Arjun@2024'),
('EMP002','Priya','Sharma','Inventory Manager','45 Park Street','OUT001','2024-01-15',1,9876543211,'priya.s@fg.com','Priya#123'),
('EMP003','Rohan','Das','Kitchen Staff','89 Lake Road','OUT002','2024-02-01',1,9876543212,'rohan.d@fg.com','Rohan@Pass'),
('EMP005','Vikram','Singh','Kitchen Staff','22 Ballygunge Terrace','OUT003','2024-03-05',1,9876543214,'vikram.s@fg.com','Vikram!789'),
('EMP006','Anjali','Gupta','Inventory Manager','5/1 Gariahat Rd','OUT003','2024-03-20',1,9876543215,'anjali.g@fg.com','Anjali@99'),
('EMP007','Kabir','Khan','Order Manager','77 Shakespeare Sarani','OUT004','2024-04-01',1,9876543216,'kabir.k@fg.com','Kabir#Pass'),
('EMP008','Ishita','Ray','Kitchen Staff','14 New Town, Block C','OUT004','2024-04-10',1,9876543217,'ishita.r@fg.com','Ishita*08'),
('EMP009','Amit','Verma','Inventory Manager','33 Rajarhat Main Rd','OUT005','2024-05-02',1,9876543218,'amit.v@fg.com','Amit@2024'),
('EMP010','Sneha','Paul','Order Manager','9 Topia Rd, Sector 5','OUT005','2024-05-15',0,9876543219,'sneha.p@fg.com','Sneha_123');
    
SET FOREIGN_KEY_CHECKS = 0;

-- tblProduct
INSERT INTO tblProduct
VALUES
('P001', 'Biryani', 'CAT02', 200,NULL, 'Aromatic basmati rice cooked with spices and vegetables.', 'may trigger allergies', 'WBK101CAT02', 'RD-0012',
 'Yes', 'Yes'),

('P002', 'Chicken Biryani', 'CAT02', NULL, 'Classic chicken biryani cooked with fragrant spices.','may trigger allergies', 280, 'WBK101CAT02', 'RD-0013',
  'No', 'Yes'),

('P003', 'Chowmein', 'CAT02',180,NULL,'Stir-fried noodles tossed with vegetables and sauces.', 'may trigger allergies', 'WBK102CAT02', 'RD-0014', 
 'Yes', 'Yes'),

('P004', 'Chicken Chowmein', 'CAT02', 220,NULL,'Noodles stir-fried with chicken and oriental sauces.','may trigger allergies',  'WBK102CAT02', 'RD-0015',
 'No', 'No'),

('P005', 'Momo Veg', 'CAT01',150, NULL,'Soft steamed dumplings filled with seasoned vegetables.', 'may trigger allergies', 'WBK103CAT01', 'RD-0016', 
 'Yes', 'Yes'),

('P006', 'Chicken Momo', 'CAT01',180, NULL,'Steamed dumplings filled with minced chicken.','may trigger allergies', 'WBK103CAT01', 'RD-0017', 
  'No', 'Yes'),

('P007', 'Pasta Alfredo', 'CAT10',250,NULL,'Creamy alfredo pasta with herbs and cheese.','may trigger allergies','WBK102CAT10', 'RD-0018', 
  'Yes', 'Yes'),

('P008', 'Pasta Arrabiata', 'CAT10',240, NULL, 'Spicy tomato-based pasta with garlic and herbs.','may trigger allergies',  'WBK102CAT10', 'RD-0019', 
  'Yes', 'No'),

('P009', 'Donuts Classic', 'CAT03',100,NULL, 'Soft fluffy donuts glazed with sugar.','may trigger allergies',  'WBK103CAT03', 'RD-0020', 
 'Yes', 'Yes'),

('P010', 'Chocolate Donuts', 'CAT03', 120, NULL,'Chocolate glazed donuts with rich cocoa flavor.','may trigger allergies',   'WBK103CAT03', 'RD-0021',
 'Yes', 'Yes'),

('P011', 'Brownie', 'CAT03', 140, NULL,'Dense chocolate brownie with rich cocoa.','may trigger allergies',  'WBK101CAT03', 'RD-0022',
 'Yes', 'Yes'),

('P012', 'Cheesecake', 'CAT03',220, NULL,'Creamy cheesecake with biscuit base.','may trigger allergies',  'WBK101CAT03', 'RD-0023', 
  'Yes', 'Yes'),

('P013', 'Garlic Bread', 'CAT02', 120,NULL, 'Toasted bread with garlic butter and herbs.','may trigger allergies', 'WBK103CAT02', 'RD-0024',
  'Yes', 'No'),

('P014', 'Paneer Roll', 'CAT02',180,NULL, 'Soft roll filled with spiced paneer.','may trigger allergies',  'WBK103CAT02', 'RD-0025',  
 'Yes', 'Yes'),

('P015', 'Chicken Roll', 'CAT02',210, NULL, 'Juicy chicken wrapped in a soft flatbread.', 'may trigger allergies',  'WBK103CAT02', 'RD-0026',  
'No', 'Yes');
 
 SET FOREIGN_KEY_CHECKS = 1;


-- tblInventory
INSERT INTO tblInventory VALUES 
('INV01', 'OUT001', 'Wheat Flour', 100.00, 'Kg', 10.00, 20.00, 'High', NOW()),
('INV02', 'OUT001', 'Chicken', 50.00, 'Kg', 5.00, 10.00, 'High', NOW()),
('INV03', 'OUT002', 'Milk', 200.00, 'Ltr', 20.00, 40.00, 'Medium', NOW()),
('INV04', 'OUT002', 'Coffee Beans', 30.00, 'Kg', 2.00, 5.00, 'Medium', NOW()),
('INV05', 'OUT003', 'Tomatoes', 40.00, 'Kg', 5.00, 8.00, 'High', NOW()),
('INV06', 'OUT004', 'Butter', 25.00, 'Kg', 3.00, 6.00, 'High', NOW()),
('INV07', 'OUT005', 'Salt', 15.00, 'Kg', 2.00, 4.00, 'Low', NOW()),
('INV08', 'OUT006', 'Sugar', 50.00, 'Kg', 5.00, 10.00, 'Low', NOW()),
('INV09', 'OUT007', 'Basil', 5.00, 'Kg', 0.50, 1.00, 'Medium', NOW()),
('INV10', 'OUT001', 'Cooking Oil', 80.00, 'Ltr', 10.00, 15.00, 'High', NOW());

-- tblSales_Order_Header
INSERT INTO tblSales_Order_Header VALUES 
('SOH01', '2025-11-01', 'C101', 'OUT001', 'Dine-in', 100.00, 'executed', 2.50, 2.50, 5.00, 95.00),
('SOH02', '2025-11-01', 'C102', 'OUT001', 'Delivery', 150.00,'executed', 3.75, 3.75, 0.00, 157.50),
('SOH03', '2025-11-02', 'C103', 'OUT002', 'Takeaway', 50.00,'executed', 1.25, 1.25, 2.00, 50.50),
('SOH04', '2025-11-02', 'C104', 'OUT003', 'Dine-in', 80.00, 'cancelled', 2.00, 2.00, 10.00, 74.00),
('SOH05', '2025-11-03', 'C105', 'OUT004', 'Delivery', 200.00,'executed', 5.00, 5.00, 20.00, 190.00),
('SOH06', '2025-11-03', 'C106', 'OUT005', 'Dine-in', 120.00,'executed', 3.00, 3.00, 0.00, 126.00),
('SOH07', '2025-11-04', 'C107', 'OUT006', 'Takeaway', 45.00,'executed', 1.13, 1.13, 5.00, 42.26),
('SOH08', '2025-11-04', 'C108', 'OUT007', 'Dine-in', 300.00,'executed', 7.50, 7.50, 30.00, 285.00),
('SOH09', '2025-11-05', 'C109', 'OUT001', 'Delivery', 90.00,'executed', 2.25, 2.25, 0.00, 94.50),
('SOH10', '2025-11-05', 'C110', 'OUT002', 'Dine-in', 110.00,'executed', 2.75, 2.75, 10.00, 105.50);

-- tblSales_Order_Details (Auto-Increment SL_NO)
INSERT INTO tblSales_Order_Details (Sales_Order_ID, Product_ID, Qty, Amount) VALUES 
('SOH01', 'P001', 2, 30.00), ('SOH01', 'P002', 1, 45.00),
('SOH02', 'P008', 3, 105.00), ('SOH03', 'P004', 4, 48.00),
('SOH05', 'P010', 5, 150.00), ('SOH06', 'P009', 2, 44.00),
('SOH07', 'P007', 3, 30.00), ('SOH08', 'P002', 4, 180.00),
('SOH09', 'P001', 5, 75.00), ('SOH10', 'P003', 2, 50.00);

-- tblPurchase_Order_HDR
INSERT INTO tblPurchase_Order_HDR  VALUES 
('PO01', '2025-10-25', 'Net 30', 'VEND01', '2025-10-28', 12.5, 12.5, 0.0,500.0,525.0, 'Received'),
('PO02', '2025-10-25', 'COD', 'VEND02', '2025-10-27', 7.5, 7.5, 10.0, 300.0,305.0, 'Pending'),
('PO03', '2025-10-26', 'Net 15', 'VEND03', '2025-10-30', 20.0, 20.0, 50.0, 800.0, 790.0, 'Received'),
('PO04', '2025-10-26', 'Net 30', 'VEND04', '2025-10-29',  5.0, 5.0, 0.0,200.0, 210.0, 'Cancelled'),
('PO05', '2025-10-27', 'Immediate', 'VEND05', '2025-10-27', 3.75, 3.75, 5.0, 150.0, 152.5, 'Received'),
('PO06', '2025-10-27', 'Net 30', 'VEND06', '2025-11-01', 10.0, 10.0, 0.0, 400.0, 420.0, 'Pending'),
('PO07', '2025-10-28', 'Net 60', 'VEND07', '2025-11-05', 25.0, 25.0, 100.0, 1000.0, 950.0, 'Pending'),
('PO08', '2025-10-28', 'COD', 'VEND08', '2025-10-29', 15.0, 15.0, 20.0, 600.0, 610.0, 'Received'),
('PO09', '2025-10-29', 'Net 15', 'VEND09', '2025-11-02', 6.25, 6.25, 0.0, 250.0, 262.5, 'Pending'),
('PO10', '2025-10-29', 'Net 30', 'VEND10', '2025-11-01', 2.5, 2.5, 5.0, 100.0, 100.0, 'Received');

-- tblAddress (Using Consumer_ID as PK per your script)
INSERT INTO tblAddress VALUES 
('C101', '12 Main St', 'Central City', 'Near Clock Tower', 110001),
('C102', '45 Lake Rd', 'Westview', 'Behind Mall', 110002),
('C103', '89 Hill St', 'Eastside', 'Apex Point', 110003),
('C104', '10 Sea Ln', 'Southport', 'Pier 9', 110004),
('C105', '22 Old Dr', 'Historic Dist', 'Old Gate', 110005),
('C106', '67 New Rd', 'Uptown', 'Station Sq', 110006),
('C107', '34 Park Ave', 'Greenland', 'City Park', 110007),
('C108', '12 Sky Bldg', 'Skylake', 'Floor 12', 110008),
('C109', '90 Mall Way', 'Central', 'Unit 4', 110009),
('C110', '44 Res Rd', 'Family Park', 'Near Clinic', 110010);


-- tblPurchase_Payment
INSERT INTO tblPurchase_Payment VALUES 
('IN001', 'PO01', 'GRN01', 'Net 30', 525.00, 'Paid'),
('IN002', 'PO03', 'GRN03', 'Net 15', 790.00, 'Paid'),
('IN003', 'PO05', 'GRN05', 'Immediate', 152.50, 'Paid'),
('IN004', 'PO08', 'GRN08', 'COD', 610.00, 'Paid'),
('IN005', 'PO10', 'GRN10', 'Net 30', 100.00, 'Pending'),
('IN006', 'PO02', 'GRN02', 'COD', 305.00, 'Pending'),
('IN007', 'PO06', 'GRN06', 'Net 30', 420.00, 'Pending'),
('IN008', 'PO07', 'GRN07', 'Net 60', 950.00, 'Pending'),
('IN009', 'PO09', 'GRN09', 'Net 15', 262.50, 'Pending'),
('IN010', 'PO01', 'GRN11', 'Net 30', 50.00, 'Paid');

-- tblReference
INSERT INTO tblReference VALUES 
('OUT001', 'CAT01', 'WBK101CAT01'), ('OUT001', 'CAT02', 'WBK101CAT02'),
('OUT002', 'CAT04', 'WBK101CAT04'), ('OUT002', 'CAT10', 'WBK101CAT10'),
('OUT003', 'CAT07', 'WBK101CAT07'), ('OUT004', 'CAT05', 'WBK101CAT05'),
('OUT005', 'CAT09', 'WBK101CAT09'), ('OUT006', 'CAT04', 'WBK101CAT04'),
('OUT007', 'CAT10', 'WBK101CAT10'), ('OUT001', 'CAT03', 'WBK101CAT03');

INSERT INTO tblPurchase_Order_Details VALUES 
('PO01', 'OUT001', 1, 'INV01', 10, 50.00,'Kg'), ('PO02', 'OUT002', 1, 'INV03', 20, 15.00,'Ltr'),
('PO03', 'OUT001', 1, 'INV02', 8, 100.00,'Kg'), ('PO04', 'OUT004', 1, 'INV06', 5, 40.00,'Kg'),
('PO05', 'OUT003', 1, 'INV05', 15, 10.00,'Kg'), ('PO06', 'OUT001', 1, 'INV01', 8, 50.00,'Kg'),
('PO07', 'OUT001', 1, 'INV10', 10, 100.00,'Ltr'), ('PO08', 'OUT006', 1, 'INV08', 20, 30.00,'Kg'),
('PO09', 'OUT002', 1, 'INV04', 5, 50.00,'kg'), ('PO10', 'OUT005', 1, 'INV07', 10, 10.00,'Kg');

INSERT INTO tblRecipe 
VALUES
-- Recipe RD-0012 (Product P001)
('P001', 'RD-0012', 1, 'INV07', 'Salt', 'gm', 2),
('P001', 'RD-0012', 2, 'INV08', 'Sugar', 'Kg', 5),
('P001', 'RD-0012', 3, 'INV10', 'Fine Oil', 'Ltr', 5),
('P001', 'RD-0012', 4, 'INV01', 'Flour', 'Kg', 50),
('P001', 'RD-0012', 5, 'INV12', 'Noodles', 'Kg', 2),

-- Recipe RD-0013 (Product P002)
('P002', 'RD-0013', 1, 'INV13', 'Meat', 'Kg', 4),
('P002', 'RD-0013', 2, 'INV07', 'Salt', 'gm', 3),
('P002', 'RD-0013', 3, 'INV10', 'Fine Oil', 'Ltr', 2),

-- Recipe RD-0014 (Product P003)
('P003', 'RD-0014', 1, 'INV03', 'Milk', 'Ltr', 6),
('P003', 'RD-0014', 2, 'INVO8', 'Sugar', 'Kg', 1),

-- Recipe RD-0015 (Product P004)
('P004', 'RD-0015', 1, 'INV14', 'Eggs', 'dozen', 7),
('P004', 'RD-0015', 2, 'INV07', 'Salt', 'gm', 1),

-- Recipe RD-0016 (Product P005)
('P005', 'RD-0016', 1, 'INV15', 'Cream', 'Ltr', 8),
('P005', 'RD-0016', 2, 'INV08', 'Sugar', 'Kg', 2),
('P005', 'RD-0016', 3, 'INV03', 'Milk', 'Ltr', 4);

INSERT INTO tblStockLog 
(Sales_Order_ID, Product_ID, Product_Qty, Recipe_ID, Item_ID, Unit_Qty, Unit_measure)
VALUES
('SOH01','PO01', 2, 'RD-0012', 'INV07', 2, 'gm'),
('SOH01','PO01', 2, 'RD-0012', 'INV08', 5, 'Kg'),
('SOH01','PO01', 2, 'RD-0012', 'INV10', 5, 'Ltr'),
('SOH01','PO01', 2, 'RD-0012', 'INV01', 2, 'Kg'),
('SOH01','PO01', 2, 'RD-0012', 'INV12', 2, 'Kg');
