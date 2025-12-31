import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("tblPurchase_Order_HDR")
export class PurchaseOrderHeader {
  @PrimaryColumn()
  PO_ID: string;

  @Column()
  Purchase_Order_Date: Date;

  @Column()
  Payment_Terms: string;

  @Column()
  Vendor_ID: string;

  @Column()
  Delivery_Date: Date;

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
  Status: string;
}
