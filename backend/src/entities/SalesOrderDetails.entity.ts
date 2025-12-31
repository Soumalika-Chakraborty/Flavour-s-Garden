import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tblSales_Order_Details")
export class SalesOrderDetails {
  @PrimaryGeneratedColumn()
  SL_NO: number;

  @Column()
  Sales_Order_ID: string;

  @Column()
  Product_Code: string;

  @Column()
  Qty: number;

  @Column("decimal", { precision: 10, scale: 2 })
  Amount: number;
}
