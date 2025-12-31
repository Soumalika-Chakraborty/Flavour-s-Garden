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
('EMP001', 'Arjun', 'Mehta', 'Order Manager', '12 Sector B, Salt Lake', 'OUT001', '2024-01-10', 1, 9876543210, 'arjun.m@fg.com'),
('EMP002', 'Priya', 'Sharma', 'Inventory Manager', '45 Park Street, Flat 4A', 'OUT001', '2024-01-15', 1, 9876543211, 'priya.s@fg.com'),
('EMP003', 'Rohan', 'Das', 'Kitchen Staff', '89 Lake Road, South End', 'OUT002', '2024-02-01', 1, 9876543212, 'rohan.d@fg.com'),
('EMP004', 'Sanya', 'Malhotra', 'Order Manager', '102 AJC Bose Rd', 'OUT002', '2024-02-12', 1, 9876543213, 'sanya.m@fg.com'),
('EMP005', 'Vikram', 'Singh', 'Kitchen Staff', '22 Ballygunge Terrace', 'OUT003', '2024-03-05', 1, 9876543214, 'vikram.s@fg.com'),
('EMP006', 'Anjali', 'Gupta', 'Inventory Manager', '5/1 Gariahat Rd', 'OUT003', '2024-03-20', 1, 9876543215, 'anjali.g@fg.com'),
('EMP007', 'Kabir', 'Khan', 'Order Manager', '77 Shakespeare Sarani', 'OUT004', '2024-04-01', 1, 9876543216, 'kabir.k@fg.com'),
('EMP008', 'Ishita', 'Ray', 'Kitchen Staff', '14 New Town, Block C', 'OUT004', '2024-04-10', 1, 9876543217, 'ishita.r@fg.com'),
('EMP009', 'Amit', 'Verma', 'Inventory Manager', '33 Rajarhat Main Rd', 'OUT005', '2024-05-02', 1, 9876543218, 'amit.v@fg.com'),
('EMP010', 'Sneha', 'Paul', 'Order Manager', '9 Topia Rd, Sector 5', 'OUT005', '2024-05-15', 0, 9876543219, 'sneha.p@fg.com');

-- tblProduct
INSERT INTO tblProduct VALUES 
('PRD01', 'Spring Roll', 'CAT01', 15.00, 1, 'img1.jpg', 'Veg spring roll', 'Gluten', 1),
('PRD02', 'Butter Chicken', 'CAT02', 45.00, 1, 'img2.jpg', 'Classic chicken curry', 'Dairy', 0),
('PRD03', 'Choco Lava', 'CAT03', 25.00, 1, 'img3.jpg', 'Warm chocolate cake', 'Eggs, Dairy', 1),
('PRD04', 'Cold Coffee', 'CAT04', 12.00, 1, 'img4.jpg', 'Iced coffee', 'Dairy', 1),
('PRD05', 'Pancakes', 'CAT05', 20.00, 1, 'img5.jpg', 'Fluffy pancakes', 'Gluten', 1),
('PRD06', 'Greek Salad', 'CAT06', 18.00, 1, 'img6.jpg', 'Fresh veg salad', 'None', 1),
('PRD07', 'Tomato Soup', 'CAT07', 10.00, 1, 'img7.jpg', 'Creamy soup', 'Dairy', 1),
('PRD08', 'Veggie Pizza', 'CAT08', 35.00, 1, 'img8.jpg', 'Garden pizza', 'Gluten, Dairy', 1),
('PRD09', 'Cheese Burger', 'CAT09', 22.00, 1, 'img9.jpg', 'Double patty', 'Gluten, Dairy', 0),
('PRD10', 'Pesto Pasta', 'CAT10', 30.00, 1, 'img10.jpg', 'Basil pesto', 'Nuts', 1);

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
INSERT INTO tblSales_Order_Details (Sales_Order_ID, Product_Code, Qty, Amount) VALUES 
('SOH01', 'PRD01', 2, 30.00), ('SOH01', 'PRD02', 1, 45.00),
('SOH02', 'PRD08', 3, 105.00), ('SOH03', 'PRD04', 4, 48.00),
('SOH05', 'PRD10', 5, 150.00), ('SOH06', 'PRD09', 2, 44.00),
('SOH07', 'PRD07', 3, 30.00), ('SOH08', 'PRD02', 4, 180.00),
('SOH09', 'PRD01', 5, 75.00), ('SOH10', 'PRD03', 2, 50.00);

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
('C001', '12 Main St', 'Central City', 'Near Clock Tower', 110001),
('C002', '45 Lake Rd', 'Westview', 'Behind Mall', 110002),
('C003', '89 Hill St', 'Eastside', 'Apex Point', 110003),
('C004', '10 Sea Ln', 'Southport', 'Pier 9', 110004),
('C005', '22 Old Dr', 'Historic Dist', 'Old Gate', 110005),
('C006', '67 New Rd', 'Uptown', 'Station Sq', 110006),
('C007', '34 Park Ave', 'Greenland', 'City Park', 110007),
('C008', '12 Sky Bldg', 'Skylake', 'Floor 12', 110008),
('C009', '90 Mall Way', 'Central', 'Unit 4', 110009),
('C010', '44 Res Rd', 'Family Park', 'Near Clinic', 110010);

-- tblRequisition
INSERT INTO tblRequisition VALUES 
('REQ01', '2025-11-01', 'Wheat Flour', 20, 'OUT001', 'Kitchen Lead'),
('REQ02', '2025-11-01', 'Milk', 50, 'OUT002', 'Cafe Barista'),
('REQ03', '2025-11-02', 'Chicken', 30, 'OUT001', 'Head Chef'),
('REQ04', '2025-11-02', 'Tomatoes', 15, 'OUT003', 'Sous Chef'),
('REQ05', '2025-11-03', 'Butter', 10, 'OUT004', 'Pantry Manager'),
('REQ06', '2025-11-03', 'Sugar', 25, 'OUT006', 'Refreshment Team'),
('REQ07', '2025-11-04', 'Cooking Oil', 40, 'OUT001', 'Kitchen Lead'),
('REQ08', '2025-11-04', 'Basil', 2, 'OUT007', 'Italian Section'),
('REQ09', '2025-11-05', 'Salt', 5, 'OUT005', 'Grill Master'),
('REQ10', '2025-11-05', 'Coffee Beans', 10, 'OUT002', 'Barista');

-- tblIssue
INSERT INTO tblIssue VALUES 
('ISS01', '2025-11-01', 'REQ01', '2025-11-01', 'Wheat Flour', 20, 20, 'OUT001', 'Store Manager'),
('ISS02', '2025-11-02', 'REQ02', '2025-11-01', 'Milk', 50, 40, 'OUT002', 'Inventory Asst'),
('ISS03', '2025-11-02', 'REQ03', '2025-11-02', 'Chicken', 30, 30, 'OUT001', 'Store Manager'),
('ISS04', '2025-11-03', 'REQ04', '2025-11-02', 'Tomatoes', 15, 15, 'OUT003', 'Inventory Asst'),
('ISS05', '2025-11-03', 'REQ05', '2025-11-03', 'Butter', 10, 10, 'OUT004', 'Store Manager'),
('ISS06', '2025-11-04', 'REQ06', '2025-11-03', 'Sugar', 25, 25, 'OUT006', 'Inventory Asst'),
('ISS07', '2025-11-04', 'REQ07', '2025-11-04', 'Cooking Oil', 40, 40, 'OUT001', 'Store Manager'),
('ISS08', '2025-11-05', 'REQ08', '2025-11-04', 'Basil', 2, 2, 'OUT007', 'Inventory Asst'),
('ISS09', '2025-11-05', 'REQ09', '2025-11-05', 'Salt', 5, 5, 'OUT005', 'Store Manager'),
('ISS10', '2025-11-06', 'REQ10', '2025-11-05', 'Coffee Beans', 10, 8, 'OUT002', 'Inventory Asst');

-- tblInvoice_GRN
INSERT INTO tblInvoice_GRN VALUES 
(1, 'PO01', '2025-10-28', 100), (2, 'PO03', '2025-10-30', 200),
(3, 'PO05', '2025-10-27', 50), (4, 'PO08', '2025-10-29', 150),
(5, 'PO10', '2025-11-01', 30), (6, 'PO01', '2025-11-02', 10),
(7, 'PO03', '2025-11-02', 15), (8, 'PO05', '2025-11-03', 20),
(9, 'PO08', '2025-11-03', 25), (10, 'PO10', '2025-11-04', 5);

-- tblPurchase_Payment
INSERT INTO tblPurchase_Payment VALUES 
('INV001', 'PO01', 'GRN01', 'Net 30', 525.00, 'Paid'),
('INV002', 'PO03', 'GRN03', 'Net 15', 790.00, 'Paid'),
('INV003', 'PO05', 'GRN05', 'Immediate', 152.50, 'Paid'),
('INV004', 'PO08', 'GRN08', 'COD', 610.00, 'Paid'),
('INV005', 'PO10', 'GRN10', 'Net 30', 100.00, 'Pending'),
('INV006', 'PO02', 'GRN02', 'COD', 305.00, 'Pending'),
('INV007', 'PO06', 'GRN06', 'Net 30', 420.00, 'Pending'),
('INV008', 'PO07', 'GRN07', 'Net 60', 950.00, 'Pending'),
('INV009', 'PO09', 'GRN09', 'Net 15', 262.50, 'Pending'),
('INV010', 'PO01', 'GRN11', 'Net 30', 50.00, 'Paid');

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
