import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("tblSales_Order_Header")
export class SalesOrderHeader {
  @PrimaryColumn()
  Sales_Order_ID: string;

  @Column()
  Order_Date: Date;

  @Column()
  Consumer_ID: string;

  @Column()
  Outlet_ID: string;

  @Column()
  Order_type: string;

  @Column("decimal", { precision: 10, scale: 2 })
  Total_Amount: number;

  @Column("decimal", { precision: 10, scale: 2 })
  SGST: number;

  @Column("decimal", { precision: 10, scale: 2 })
  CGST: number;

  @Column("decimal", { precision: 10, scale: 2 })
  Discount: number;

  @Column("decimal", { precision: 10, scale: 2 })
  Net_Amount: number;

  @Column()
  Sales_Order_Status: string;
}
