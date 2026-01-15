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
('EMP001','Arjun','Mehta','Order Manager','OUT001','2024-01-10',1,9876543210,'arjun.m@fg.com','12 Sector B, Salt Lake','Arjun@2024'),
('EMP002','Priya','Sharma','Inventory Manager','OUT001','2024-01-15',1,9876543211,'priya.s@fg.com','45 Park Street','Priya#123'),
('EMP003','Rohan','Das','Kitchen Staff','OUT002','2024-02-01',1,9876543212,'rohan.d@fg.com','89 Lake Road','Rohan@Pass'),
('EMP005','Vikram','Singh','Kitchen Staff','OUT003','2024-03-05',1,9876543214,'vikram.s@fg.com','22 Ballygunge Terrace','Vikram!789'),
('EMP006','Anjali','Gupta','Inventory Manager','OUT003','2024-03-20',1,9876543215,'anjali.g@fg.com','5/1 Gariahat Rd','Anjali@99'),
('EMP007','Kabir','Khan','Order Manager','OUT004','2024-04-01',1,9876543216,'kabir.k@fg.com','77 Shakespeare Sarani','Kabir#Pass'),
('EMP008','Ishita','Ray','Kitchen Staff','OUT004','2024-04-10',1,9876543217,'ishita.r@fg.com','14 New Town, Block C','Ishita*08'),
('EMP009','Amit','Verma','Inventory Manager','OUT005','2024-05-02',1,9876543218,'amit.v@fg.com','33 Rajarhat Main Rd','Amit@2024'),
('EMP010','Sneha','Paul','Order Manager','OUT005','2024-05-15',0,9876543219,'sneha.p@fg.com','9 Topia Rd, Sector 5','Sneha_123');
    
SET FOREIGN_KEY_CHECKS = 0;

-- tblProduct
INSERT INTO tblProduct
(Product_ID, Product_Name, Menu_Category_ID, Ref_Key, Recipe_ID, Price_Per_Unit, Product_Description, Allergen, Is_Veg, Is_Recommended, Image_Url)
VALUES
('P001', 'Biryani', 'CAT02', 'WBK101CAT02', 'RD-0012', 200,
 'Aromatic basmati rice cooked with spices and vegetables.', 
 'may trigger allergies', 'Yes', 'Yes', NULL),

('P002', 'Chicken Biryani', 'CAT02', 'WBK101CAT02', 'RD-0013', 280,
 'Classic chicken biryani cooked with fragrant spices.', 
 'may trigger allergies', 'No', 'Yes', NULL),

('P003', 'Chowmein', 'CAT02', 'WBK102CAT02', 'RD-0014', 180,
 'Stir-fried noodles tossed with vegetables and sauces.', 
 'may trigger allergies', 'Yes', 'Yes', NULL),

('P004', 'Chicken Chowmein', 'CAT02', 'WBK102CAT02', 'RD-0015', 220,
 'Noodles stir-fried with chicken and oriental sauces.', 
 'may trigger allergies', 'No', 'No', NULL),

('P005', 'Momo Veg', 'CAT01', 'WBK103CAT01', 'RD-0016', 150,
 'Soft steamed dumplings filled with seasoned vegetables.', 
 'may trigger allergies', 'Yesyes', 'Yes', NULL),

('P006', 'Chicken Momo', 'CAT01', 'WBK103CAT01', 'RD-0017', 180,
 'Steamed dumplings filled with minced chicken.', 
 'may trigger allergies', 'No', 'Yes', NULL),

('P007', 'Pasta Alfredo', 'CAT10', 'WBK102CAT10', 'RD-0018', 250,
 'Creamy alfredo pasta with herbs and cheese.', 
 'may trigger allergies', 'Yes', 'Yes', NULL),

('P008', 'Pasta Arrabiata', 'CAT10', 'WBK102CAT10', 'RD-0019', 240,
 'Spicy tomato-based pasta with garlic and herbs.', 
 'may trigger allergies', 'Yes', 'No', NULL),

('P009', 'Donuts Classic', 'CAT03', 'WBK103CAT03', 'RD-0020', 100,
 'Soft fluffy donuts glazed with sugar.', 
 'may trigger allergies', 'Yes', 'Yes', NULL),

('P010', 'Chocolate Donuts', 'CAT03', 'WBK103CAT03', 'RD-0021', 120,
 'Chocolate glazed donuts with rich cocoa flavor.', 
 'may trigger allergies', 'Yes', 'Yes', NULL),

('P011', 'Brownie', 'CAT03', 'WBK101CAT03', 'RD-0022', 140,
 'Dense chocolate brownie with rich cocoa.', 
 'may trigger allergies', 'Yes', 'Yes', NULL),

('P012', 'Cheesecake', 'CAT03', 'WBK101CAT03', 'RD-0023', 220,
 'Creamy cheesecake with biscuit base.', 
 'may trigger allergies', 'Yes', 'Yes', NULL),

('P013', 'Garlic Bread', 'CAT02', 'WBK103CAT02', 'RD-0024', 120,
 'Toasted bread with garlic butter and herbs.', 
 'may trigger allergies', 'Yes', 'No', NULL),

('P014', 'Paneer Roll', 'CAT02', 'WBK103CAT02', 'RD-0025', 180,
 'Soft roll filled with spiced paneer.', 
 'may trigger allergies', 'Yes', 'Yes', NULL),

('P015', 'Chicken Roll', 'CAT02', 'WBK103CAT02', 'RD-0026', 210,
 'Juicy chicken wrapped in a soft flatbread.', 
 'may trigger allergies', 'No', 'Yes', NULL);
 
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
('SOH01', '2025-11-01', 'C101', 'OUT001', 'Dine-in', 100.00, 2.50, 2.50, 5.00, 95.00, 'executed'),
('SOH02', '2025-11-01', 'C102', 'OUT001', 'Delivery', 150.00, 3.75, 3.75, 0.00, 157.50, 'executed'),
('SOH03', '2025-11-02', 'C103', 'OUT002', 'Takeaway', 50.00, 1.25, 1.25, 2.00, 50.50, 'executed'),
('SOH04', '2025-11-02', 'C104', 'OUT003', 'Dine-in', 80.00, 2.00, 2.00, 10.00, 74.00, 'cancelled'),
('SOH05', '2025-11-03', 'C105', 'OUT004', 'Delivery', 200.00, 5.00, 5.00, 20.00, 190.00, 'executed'),
('SOH06', '2025-11-03', 'C106', 'OUT005', 'Dine-in', 120.00, 3.00, 3.00, 0.00, 126.00, 'executed'),
('SOH07', '2025-11-04', 'C107', 'OUT006', 'Takeaway', 45.00, 1.13, 1.13, 5.00, 42.26, 'executed'),
('SOH08', '2025-11-04', 'C108', 'OUT007', 'Dine-in', 300.00, 7.50, 7.50, 30.00, 285.00, 'executed'),
('SOH09', '2025-11-05', 'C109', 'OUT001', 'Delivery', 90.00, 2.25, 2.25, 0.00, 94.50, 'executed'),
('SOH10', '2025-11-05', 'C110', 'OUT002', 'Dine-in', 110.00, 2.75, 2.75, 10.00, 105.50, 'executed');

-- tblSales_Order_Details (Auto-Increment SL_NO)
INSERT INTO tblSales_Order_Details (Sales_Order_ID, Product_ID, Qty, Amount) VALUES 
('SOH01', 'P001', 2, 30.00), ('SOH01', 'P002', 1, 45.00),
('SOH02', 'P008', 3, 105.00), ('SOH03', 'P004', 4, 48.00),
('SOH05', 'P010', 5, 150.00), ('SOH06', 'P009', 2, 44.00),
('SOH07', 'P007', 3, 30.00), ('SOH08', 'P002', 4, 180.00),
('SOH09', 'P001', 5, 75.00), ('SOH10', 'P003', 2, 50.00);

-- tblPurchase_Order_HDR
INSERT INTO tblPurchase_Order_HDR (PO_ID, Purchase_Order_Date, Payment_Terms, Vendor_ID, Delivery_Date, Total_Amount, SGST, CGST, Discount, Net_Amount, Status) VALUES 
('PO01', '2025-10-25', 'Net 30', 'VEND01', '2025-10-28', 500.0, 12.5, 12.5, 0.0, 525.0, 'Received'),
('PO02', '2025-10-25', 'COD', 'VEND02', '2025-10-27', 300.0, 7.5, 7.5, 10.0, 305.0, 'Pending'),
('PO03', '2025-10-26', 'Net 15', 'VEND03', '2025-10-30', 800.0, 20.0, 20.0, 50.0, 790.0, 'Received'),
('PO04', '2025-10-26', 'Net 30', 'VEND04', '2025-10-29', 200.0, 5.0, 5.0, 0.0, 210.0, 'Cancelled'),
('PO05', '2025-10-27', 'Immediate', 'VEND05', '2025-10-27', 150.0, 3.75, 3.75, 5.0, 152.5, 'Received'),
('PO06', '2025-10-27', 'Net 30', 'VEND06', '2025-11-01', 400.0, 10.0, 10.0, 0.0, 420.0, 'Pending'),
('PO07', '2025-10-28', 'Net 60', 'VEND07', '2025-11-05', 1000.0, 25.0, 25.0, 100.0, 950.0, 'Pending'),
('PO08', '2025-10-28', 'COD', 'VEND08', '2025-10-29', 600.0, 15.0, 15.0, 20.0, 610.0, 'Received'),
('PO09', '2025-10-29', 'Net 15', 'VEND09', '2025-11-02', 250.0, 6.25, 6.25, 0.0, 262.5, 'Pending'),
('PO10', '2025-10-29', 'Net 30', 'VEND10', '2025-11-01', 100.0, 2.5, 2.5, 5.0, 100.0, 'Received');

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
('INV01', 'PO01', 'GRN01', 'Net 30', 525.00, 'Paid'),
('INV02', 'PO03', 'GRN03', 'Net 15', 790.00, 'Paid'),
('INV03', 'PO05', 'GRN05', 'Immediate', 152.50, 'Paid'),
('INV04', 'PO08', 'GRN08', 'COD', 610.00, 'Paid'),
('INV05', 'PO10', 'GRN10', 'Net 30', 100.00, 'Pending'),
('INV06', 'PO02', 'GRN02', 'COD', 305.00, 'Pending'),
('INV07', 'PO06', 'GRN06', 'Net 30', 420.00, 'Pending'),
('INV08', 'PO07', 'GRN07', 'Net 60', 950.00, 'Pending'),
('INV09', 'PO09', 'GRN09', 'Net 15', 262.50, 'Pending'),
('INV10', 'PO01', 'GRN11', 'Net 30', 50.00, 'Paid');

-- tblReference
INSERT INTO tblReference VALUES 
('OUT001', 'CAT01', 'REF01'), ('OUT001', 'CAT02', 'REF02'),
('OUT002', 'CAT04', 'REF03'), ('OUT002', 'CAT10', 'REF04'),
('OUT003', 'CAT07', 'REF05'), ('OUT004', 'CAT05', 'REF06'),
('OUT005', 'CAT09', 'REF07'), ('OUT006', 'CAT04', 'REF08'),
('OUT007', 'CAT10', 'REF09'), ('OUT001', 'CAT03', 'REF10');

INSERT INTO tblPurchase_Order_Details VALUES 
('PO01', 'OUT001', 1, 'INV01', 10, 50.00), ('PO02', 'OUT002', 1, 'INV03', 20, 15.00),
('PO03', 'OUT001', 1, 'INV02', 8, 100.00), ('PO04', 'OUT004', 1, 'INV06', 5, 40.00),
('PO05', 'OUT003', 1, 'INV05', 15, 10.00), ('PO06', 'OUT001', 1, 'INV01', 8, 50.00),
('PO07', 'OUT001', 1, 'INV10', 10, 100.00), ('PO08', 'OUT006', 1, 'INV08', 20, 30.00),
('PO09', 'OUT002', 1, 'INV04', 5, 50.00), ('PO10', 'OUT005', 1, 'INV07', 10, 10.00);

INSERT INTO tblRecipe 
(product_id, recipe_id, sl_no, item_id, item_name, unit_measure, unit_qty)
VALUES
-- Recipe RD-0012 (Product P001)
('P001', 'RD-0012', 1, 'R101', 'Salt', 'gm', 2),
('P001', 'RD-0012', 2, 'R102', 'Sugar', 'kg', 5),
('P001', 'RD-0012', 3, 'R103', 'Fine Oil', 'litres', 5),
('P001', 'RD-0012', 4, 'R104', 'Flour', 'kg', 50),
('P001', 'RD-0012', 5, 'R105', 'Noodles', 'kg', 2),

-- Recipe RD-0013 (Product P002)
('P002', 'RD-0013', 1, 'R106', 'Meat', 'kg', 4),
('P002', 'RD-0013', 2, 'R101', 'Salt', 'gm', 3),
('P002', 'RD-0013', 3, 'R103', 'Fine Oil', 'litres', 2),

-- Recipe RD-0014 (Product P003)
('P003', 'RD-0014', 1, 'R107', 'Milk', 'litres', 6),
('P003', 'RD-0014', 2, 'R102', 'Sugar', 'kg', 1),

-- Recipe RD-0015 (Product P004)
('P004', 'RD-0015', 1, 'R108', 'Eggs', 'dozen', 7),
('P004', 'RD-0015', 2, 'R101', 'Salt', 'gm', 1),

-- Recipe RD-0016 (Product P005)
('P005', 'RD-0016', 1, 'R109', 'Cream', 'litres', 8),
('P005', 'RD-0016', 2, 'R102', 'Sugar', 'kg', 2),
('P005', 'RD-0016', 3, 'R107', 'Milk', 'litres', 4);

INSERT INTO tblStockLog
(sales_order_id, product_id, product_qty, recipe_id, item_id, unit_qty, uniT_measure, total_qty)
VALUES
-- SOH01 (Product P001 x2)
('SOH01', 'P001', 2, 'RD-0012', 'R101', 2, 'gm', 4),
('SOH01', 'P001', 2, 'RD-0012', 'R102', 5, 'kg', 10),
('SOH01', 'P001', 2, 'RD-0012', 'R103', 5, 'litres', 10),

-- SOH02 (Product P002 x3)
('SOH02', 'P002', 3, 'RD-0013', 'R106', 4, 'kg', 12),
('SOH02', 'P002', 3, 'RD-0013', 'R101', 3, 'gm', 9),
('SOH02', 'P002', 3, 'RD-0013', 'R103', 2, 'litres', 6),

-- SOH03 (Product P003 x4)
('SOH03', 'P003', 4, 'RD-0014', 'R107', 6, 'litres', 24),
('SOH03', 'P003', 4, 'RD-0014', 'R102', 1, 'kg', 4),

-- SOH04 (Product P004 x5)
('SOH04', 'P004', 5, 'RD-0015', 'R108', 7, 'dozen', 35),
('SOH04', 'P004', 5, 'RD-0015', 'R101', 1, 'gm', 5),

-- SOH05 (Product P005 x6)
('SOH05', 'P005', 6, 'RD-0016', 'R109', 8, 'litres', 48),
('SOH05', 'P005', 6, 'RD-0016', 'R102', 2, 'kg', 12),
('SOH05', 'P005', 6, 'RD-0016', 'R107', 4, 'litres', 24),

-- Extra variation
('SOH06', 'P001', 1, 'RD-0012', 'R104', 50, 'kg', 50),
('SO07H', 'P002', 2, 'RD-0013', 'R106', 4, 'kg', 8);