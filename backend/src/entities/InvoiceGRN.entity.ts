import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("tblInvoice_GRN")
export class InvoiceGRN {
  @PrimaryColumn()
  Invoice_ID: number;

  @Column()
  PO_ID: string;

  @Column()
  Payment_Date: Date;

  @Column()
  Received_Qty: number;
}
