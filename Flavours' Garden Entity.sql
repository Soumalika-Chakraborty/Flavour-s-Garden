CREATE TABLE tblOutlet (
    Outlet_ID VARCHAR(50) PRIMARY KEY,
    Outlet_Name VARCHAR(100) NOT NULL,
    Outlet_Address VARCHAR(255)
);

CREATE TABLE tblMenu_Categories (
    Menu_Category_ID VARCHAR(50) PRIMARY KEY,
    Category_Name VARCHAR(100) NOT NULL
);

CREATE TABLE tblConfiguration (
    Config_ID INT AUTO_INCREMENT PRIMARY KEY,
    SGST DECIMAL(5,4) DEFAULT 0.025,
    CGST DECIMAL(5,4) DEFAULT 0.025,
    Change_DateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE tblConfiguration MODIFY Config_ID INT NOT NULL;
ALTER TABLE tblConfiguration DROP PRIMARY KEY;
ALTER TABLE tblConfiguration DROP COLUMN Config_ID;
ALTER TABLE tblConfiguration ADD PRIMARY KEY (Change_DateTime);

CREATE TABLE tblConsumer (
    Consumer_ID VARCHAR(50) PRIMARY KEY,
    First_Name VARCHAR(50),
    Last_Name VARCHAR(50),
    Ph_No BIGINT,
    Email VARCHAR(100),
    Password_Hash VARCHAR(255),
    Last_Logged_In TIMESTAMP,
    Default_Address VARCHAR(255),
    Default_Pin INT
);
ALTER TABLE tblConsumer 
ADD COLUMN Del_Address_1 VARCHAR(255) AFTER Default_Pin,
ADD COLUMN Del_Pin INT AFTER Del_Address_1;

CREATE TABLE tblVendor_Details (
    Vendor_ID VARCHAR(50) PRIMARY KEY,
    Vendor_Address VARCHAR(255),
    Vendor_Type VARCHAR(50), -- grocery/vegetable
    Vendor_Contact BIGINT,
    Vendor_GST_No VARCHAR(50)
);

CREATE TABLE tblEmployees (
    Employee_ID VARCHAR(50) PRIMARY KEY,
    First_Name VARCHAR(50),
    Last_Name VARCHAR(50),
    Role VARCHAR(50),
    Outlet_ID VARCHAR(50),
    Date_of_Joining DATE,
    Is_Active BOOLEAN,
    Contact_No BIGINT,
    Email VARCHAR(100),
    Address VARCHAR(255),
    FOREIGN KEY (Outlet_ID) REFERENCES tblOutlet(Outlet_ID)
);
ALTER TABLE tblEmployees 
MODIFY COLUMN Address VARCHAR(255) AFTER Role;
ALTER TABLE tblEmployees ADD COLUMN password VARCHAR(255);

CREATE TABLE tblProduct (
    Product_ID VARCHAR(50) PRIMARY KEY,
    Product_Name VARCHAR(100),
    Menu_Category_ID VARCHAR(50),
    Price_Per_Unit DECIMAL(10,2),
    Unit INT,
    Image_Url TEXT,
    Description TEXT,
    Allergen TEXT,
    Is_Veg BOOLEAN,
    FOREIGN KEY (Menu_Category_ID) REFERENCES tblMenu_Categories(Menu_Category_ID)
);

CREATE TABLE tblInventory (
    Item_ID VARCHAR(50) PRIMARY KEY,
    Outlet_ID VARCHAR(50),
    Ingredient_Name VARCHAR(100),
    Current_Qty DECIMAL(10,2),
    Unit_of_Measurement VARCHAR(20),
    Min_Stock_Level DECIMAL(10,2),
    Reorder_Level DECIMAL(10,2),
    Priority VARCHAR(20), -- high, medium, low
    Last_Updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (Outlet_ID) REFERENCES tblOutlet(Outlet_ID)
);

CREATE TABLE tblAddress (
    Consumer_ID VARCHAR(50) Primary Key,
    Street VARCHAR(100),
    City VARCHAR(50),
    Landmark VARCHAR(100),
    Pin_Code INT,
    FOREIGN KEY (Consumer_ID) REFERENCES tblConsumer(Consumer_ID)
);


CREATE TABLE tblSales_Order_Header (
    Sales_Order_ID VARCHAR(50) PRIMARY KEY,
    Order_Date DATE,
    User_ID VARCHAR(50),
    Outlet_ID VARCHAR(50),
    Order_type VARCHAR(50), -- Delivery, Dine-in, Takeaway
    Total_Amount DECIMAL(10,2),
    SGST DECIMAL(10,2),
    CGST DECIMAL(10,2),
    Discount DECIMAL(10,2),
    Net_Amount DECIMAL(10,2),
    Sales_Order_Status VARCHAR(50), -- cancelled / executed
    FOREIGN KEY (User_ID) REFERENCES tblConsumer(Consumer_ID),
    FOREIGN KEY (Outlet_ID) REFERENCES tblOutlet(Outlet_ID)
);
ALTER TABLE tblSales_Order_Header DROP FOREIGN KEY tblsales_order_header_ibfk_1;
ALTER TABLE tblSales_Order_Header 
    CHANGE COLUMN User_ID Consumer_ID VARCHAR(50),
    MODIFY COLUMN Net_Amount DECIMAL(10,2);
ALTER TABLE tblSales_Order_Header 
    ADD CONSTRAINT fk_sales_consumer 
    FOREIGN KEY (Consumer_ID) REFERENCES tblConsumer(Consumer_ID);

CREATE TABLE tblSales_Order_Details (
    SL_NO INT AUTO_INCREMENT PRIMARY KEY,
    Sales_Order_ID VARCHAR(50),
    Product_Code VARCHAR(50),
    Qty INT,
    Amount DECIMAL(10,2),
    FOREIGN KEY (Sales_Order_ID) REFERENCES tblSales_Order_Header(Sales_Order_ID),
    FOREIGN KEY (Product_Code) REFERENCES tblProduct(Product_ID)
);

CREATE TABLE tblPurchase_Order_HDR (
    PO_ID VARCHAR(50) PRIMARY KEY,
    Purchase_Order_Date DATE,
    Payment_Terms VARCHAR(100),
    Vendor_ID VARCHAR(50),
    Delivery_Date DATE,
    Status VARCHAR(50),
    FOREIGN KEY (Vendor_ID) REFERENCES tblVendor_Details(Vendor_ID)
);
ALTER TABLE tblPurchase_Order_HDR 
    MODIFY COLUMN Purchase_Order_Date DATE NOT NULL,
    ADD COLUMN Total_Amount DECIMAL(10,2) AFTER Delivery_Date,
    ADD COLUMN SGST DECIMAL(10,2) AFTER Total_Amount,
    ADD COLUMN CGST DECIMAL(10,2) AFTER SGST,
    ADD COLUMN Discount DECIMAL(10,2) AFTER CGST,
    ADD COLUMN Net_Amount DECIMAL(10,2) AFTER Discount;

CREATE TABLE tblPurchase_Order_Details (
    PO_ID VARCHAR(50),
    SL_NO INT,
    Item_ID VARCHAR(50),
    Qty INT,
    Unit_price DECIMAL(10,2),
    Total_Amount DECIMAL(10,2),
    PRIMARY KEY (PO_ID, SL_NO),
    FOREIGN KEY (PO_ID) REFERENCES tblPurchase_Order_HDR(PO_ID),
    FOREIGN KEY (Item_ID) REFERENCES tblInventory(Item_ID)
);
ALTER TABLE tblPurchase_Order_Details 
ADD COLUMN Outlet_ID VARCHAR(50) AFTER Item_ID;
ALTER TABLE tblPurchase_Order_Details 
ADD CONSTRAINT fk_details_outlet 
FOREIGN KEY (Outlet_ID) REFERENCES tblOutlet(Outlet_ID);

CREATE TABLE tblSales_Payment (
    Transaction_id VARCHAR(50) PRIMARY KEY,
    User_id VARCHAR(50),
    Sales_order_id VARCHAR(50),
    Mode_of_Payment VARCHAR(50),
    Payment_Amount DECIMAL(10,2),
    Status VARCHAR(50), -- error / successful
    Payment_date DATE,
    FOREIGN KEY (User_id) REFERENCES tblConsumer(Consumer_ID),
    FOREIGN KEY (Sales_order_id) REFERENCES tblSales_Order_Header(Sales_Order_ID)
);

CREATE TABLE tblDelivery (
    Delivery_ID VARCHAR(50) PRIMARY KEY,
    Sales_Order_ID VARCHAR(50),
    Delivery_Date DATE,
    Status VARCHAR(50),
    Del_Address_1 VARCHAR(255),
    Del_Pin INT,
    FOREIGN KEY (Sales_Order_ID) REFERENCES tblSales_Order_Header(Sales_Order_ID)
);
ALTER TABLE tblDelivery 
    DROP COLUMN Delivery_Date,
    DROP COLUMN Status,
    DROP COLUMN Del_Address_1,
    DROP COLUMN Del_Pin;
    
CREATE TABLE tblInvoice_GRN (
    Invoice_ID INT PRIMARY KEY,
    PO_ID VARCHAR(50),
    Payment_Date DATE,
    Received_Qty INT,
    -- Linking to Purchase Order Header or Details
    FOREIGN KEY (PO_ID) REFERENCES tblPurchase_Order_HDR(PO_ID)
);

CREATE TABLE tblPurchase_Payment (
    Invoice_No VARCHAR(50) PRIMARY KEY, -- Renamed for standard SQL naming
    PO_ID VARCHAR(50),
    GRN_No VARCHAR(50),
    Payment_Terms VARCHAR(100),
    Payment_Amount DECIMAL(10,2),
    Status VARCHAR(50), -- e.g., 'Paid', 'Pending', 'Failed'
    FOREIGN KEY (PO_ID) REFERENCES tblPurchase_Order_HDR(PO_ID)
);

CREATE TABLE tblReference (
    Outlet_ID VARCHAR(50),
    Menu_Category_ID VARCHAR(50),
    Ref_Key VARCHAR(100), -- Using backticks because KEY is a reserved word in SQL
    FOREIGN KEY (Outlet_ID) REFERENCES tblOutlet(Outlet_ID),
    FOREIGN KEY (Menu_Category_ID) REFERENCES tblMenu_Categories(Menu_Category_ID)
);

CREATE TABLE tblIssue (
    Issue_No VARCHAR(50) PRIMARY KEY,
    Issue_Date DATE NOT NULL,
    Req_No VARCHAR(50),      -- Reference to the Requisition number
    Req_Date DATE,
    Item VARCHAR(100),
    Qty INT,                 -- Fixed typo: integer
    Del_Qty INT,             -- Quantity actually delivered/issued
    Outlet_ID VARCHAR(50),
    Issue_Name VARCHAR(100), -- Person who issued the items
    FOREIGN KEY (Outlet_ID) REFERENCES tblOutlet(Outlet_ID)
);

CREATE TABLE tblRequisition (
    Req_No VARCHAR(50) PRIMARY KEY,
    Req_Date DATE NOT NULL,
    Item VARCHAR(100) NOT NULL,
    Qty INT NOT NULL,            -- Corrected typo: integer
    Outlet_ID VARCHAR(50),
    Req_Name VARCHAR(100),       -- The person/department making the request
    FOREIGN KEY (Outlet_ID) REFERENCES tblOutlet(Outlet_ID)
);

CREATE TABLE tblRecipe (
    Product_ID VARCHAR(50),
    Recipe_ID VARCHAR(50),
    SL_no INT,
    Item_ID VARCHAR(50),
    Item_Name VARCHAR(255),
    Raw_Material VARCHAR(255),
    Unit_of_measurement VARCHAR(50),
    Unit_Qty DECIMAL(10, 2),
    PRIMARY KEY (Recipe_ID, SL_no)
);

ALTER TABLE tblProduct 
ADD COLUMN Recipe_ID VARCHAR(50),

ADD CONSTRAINT fk_recipe_id
FOREIGN KEY (Recipe_ID) 
REFERENCES tblRecipe(Recipe_ID);

ALTER TABLE tblProduct 
ADD COLUMN Ref_Key VARCHAR(50);

ALTER TABLE tblProduct 
DROP COLUMN Unit;

DROP TABLE IF EXISTS tblinvoice_grn, tblrequisition, tblissue;

CREATE TABLE tblStockLog (
    Product_ID VARCHAR(50),
    Product_Qty DECIMAL(10, 2),
    Recipe_ID VARCHAR(50),
    Item_ID VARCHAR(50),
    Unit_Qty DECIMAL(10, 2),
    Unit_of_Measurement VARCHAR(50),
    Total_Qty DECIMAL(10, 2) AS (Product_Qty * Unit_Qty) STORED
);

ALTER TABLE tblstocklog
ADD COLUMN Sales_Order_ID VARCHAR(50),
ADD CONSTRAINT fk_SALES_ORDER_id
FOREIGN KEY (Sales_Order_ID) 
REFERENCES tblsales_order_header(Sales_Order_ID);

DROP TABLE IF EXISTS tblrequisition;

ALTER TABLE tblRecipe 
RENAME COLUMN Unit_of_measurement TO Unit_measure;

ALTER TABLE tblStockLog 
RENAME COLUMN Unit_of_measurement TO Unit_measure;

ALTER TABLE tblstocklog
ADD CONSTRAINT fkrecipe_id
FOREIGN KEY (Recipe_ID) 
REFERENCES tblRecipe(Recipe_ID);

-- Temporarily disable checks
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE tblProduct;

-- Re-enable checks immediately
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE tblSales_Order_Details (
    Sales_Order_ID VARCHAR(50),
    SL_NO INT AUTO_INCREMENT PRIMARY KEY,
    Product_ID VARCHAR(50),
    Qty INT,
    Amount DECIMAL(10,2),
    FOREIGN KEY (Sales_Order_ID) REFERENCES tblSales_Order_Header(Sales_Order_ID),
    FOREIGN KEY (Product_ID) REFERENCES tblProduct(Product_ID)
);

ALTER TABLE tblProduct
RENAME COLUMN Description TO Product_Description;
ALTER TABLE tblProduct
DROP COLUMN Is_Veg;
ALTER TABLE tblProduct
ADD COLUMN Is_Recommended VARCHAR(50);
ALTER TABLE tblProduct
ADD COLUMN Is_Veg VARCHAR(50);

ALTER TABLE tblpurchase_order_details
ADD COLUMN Unit_Measure VARCHAR(10);

CREATE TABLE tblGRN (
    Order_Date DATE,
    PO_ID VARCHAR(50),
    Vendor_ID VARCHAR(50),
    Item_ID VARCHAR(50),
    Item_Name VARCHAR(255),
    Ordered_Qty INT,
    Received_Qty INT,
    Unit_measure VARCHAR(50),
    -- Defining the Composite Primary Key
    PRIMARY KEY (PO_ID, Item_ID),
    -- Defining Foreign Keys
    CONSTRAINT fk_grn_po FOREIGN KEY (PO_ID) 
        REFERENCES tblpurchase_order_details(PO_ID),
    CONSTRAINT fk_grn_vendor FOREIGN KEY (Vendor_ID) 
        REFERENCES tblpurchase_order_hdr(Vendor_ID)
);
ALTER TABLE tblproduct
ADD Recipe_ID VARCHAR(255)
AFTER Ref_Key;
ALTER TABLE tblsales_order_details 
RENAME COLUMN Product_Code TO Product_ID;
ALTER TABLE tblrecipe
DROP COLUMN Raw_Material;
ALTER TABLE tblStockLog
MODIFY COLUMN Sales_Order_ID VARCHAR(50) NOT NULL FIRST;
DROP TABLE IF EXISTS tblStockLog;

CREATE TABLE tblStockLog (
    Sales_Order_ID VARCHAR(50),
    Product_ID VARCHAR(50),
    Product_Qty DECIMAL(10, 2),
    Recipe_ID VARCHAR(50),
    Item_ID VARCHAR(50),
    Unit_Qty DECIMAL(10, 2),
    Unit_of_Measurement VARCHAR(50),
    Total_Qty DECIMAL(12, 2) AS (Product_Qty * Unit_Qty) STORED
);
