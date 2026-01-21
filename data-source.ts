import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Tbladdress } from "./Tbladdress";
import { Tblconfiguration } from "./Tblconfiguration";
import { Tblconsumer } from "./Tblconsumer";
import { Tbldelivery } from "./Tbldelivery";
import { Tblemployees } from "./Tblemployees";
import { Tblgrn } from "./Tblgrn";
import { Tblinventory } from "./Tblinventory";
import { TblmenuCategories } from "./TblmenuCategories";
import { Tbloutlet } from "./Tbloutlet";
import { Tblproduct } from "./Tblproduct";
import { TblpurchaseOrderDetails } from "./TblpurchaseOrderDetails";
import { TblpurchaseOrderHdr } from "./TblpurchaseOrderHdr";
import { TblpurchasePayment } from "./TblpurchasePayment";
import { Tblrecipe } from "./Tblrecipe";
import { Tblreference } from "./Tblreference";
import { TblsalesOrderDetails } from "./TblsalesOrderDetails";
import { TblsalesOrderHeader } from "./TblsalesOrderHeader";
import { TblsalesPayment } from './TblsalesPayment';
import { Tblstocklog } from "./Tblstocklog";
import { TblvendorDetails } from "./TblvendorDetails";

dotenv.config({ path: ".env.local" });

export const AppDataSource = new DataSource({
    type: (process.env.DB_TYPE as any) || "mysql",
    driver: require('mysql2'),
    host: process.env.DB_HOST || "127.0.0.1",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || "fgwhole",
    entities: [
        Tbladdress,
        Tblconfiguration,
        Tblconsumer,
        Tbldelivery,
        Tblemployees,
        Tblgrn,
        Tblinventory,
        TblmenuCategories,
        Tbloutlet,
        Tblproduct,
        TblpurchaseOrderDetails,
        TblpurchaseOrderHdr,
        TblpurchasePayment,
        Tblrecipe,
        Tblreference,
        TblsalesOrderDetails,
        TblsalesOrderHeader,
        TblsalesPayment,
        Tblstocklog,
        TblvendorDetails
    ],
    synchronize: false, // Always false when using existing tables
    logging: true,
});

export const getDataSource = async () => {
    if (!AppDataSource.isInitialized) {
        try {
            await AppDataSource.initialize();
            console.log("Data Source has been initialized!");
        } catch (err) {
            console.error("Error during Data Source initialization", err);
            throw err;
        }
    }
    return AppDataSource;
};