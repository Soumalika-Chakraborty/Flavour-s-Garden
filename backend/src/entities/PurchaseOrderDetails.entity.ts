import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("tblPurchase_Order_Details")
export class PurchaseOrderDetails {
  @PrimaryColumn()
  PO_ID: string;

  @PrimaryColumn()
  SL_NO: number;

  @Column()
  Item_ID: string;

  @Column()
  Outlet_ID: string;

  @Column()
  Qty: number;

  @Column("decimal", { precision: 10, scale: 2 })
  Unit_price: number;

  @Column("decimal", { precision: 10, scale: 2 })
  Total_Amount: number;
}
