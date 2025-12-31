import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("tblPurchase_Payment")
export class PurchasePayment {
  @PrimaryColumn()
  Invoice_No: string;

  @Column()
  PO_ID: string;

  @Column()
  GRN_No: string;

  @Column()
  Payment_Terms: string;

  @Column("decimal", { precision: 10, scale: 2 })
  Payment_Amount: number;

  @Column()
  Status: string;
}
