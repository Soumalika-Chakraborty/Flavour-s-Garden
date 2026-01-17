import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { TblpurchaseOrderHdr } from "./TblpurchaseOrderHdr";

@Index("PO_ID", ["poId"], {})
@Entity("tblpurchase_payment", { schema: "fgwhole" })
export class TblpurchasePayment {
  @Column("varchar", { primary: true, name: "Invoice_No", length: 50 })
  invoiceNo: string;

  @Column("varchar", { name: "PO_ID", nullable: true, length: 50 })
  poId: string | null;

  @Column("varchar", { name: "GRN_No", nullable: true, length: 50 })
  grnNo: string | null;

  @Column("varchar", { name: "Payment_Terms", nullable: true, length: 100 })
  paymentTerms: string | null;

  @Column("decimal", {
    name: "Payment_Amount",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  paymentAmount: string | null;

  @Column("varchar", { name: "Status", nullable: true, length: 50 })
  status: string | null;

  @ManyToOne(
    () => TblpurchaseOrderHdr,
    (tblpurchaseOrderHdr) => tblpurchaseOrderHdr.tblpurchasePayments,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "PO_ID", referencedColumnName: "poId" }])
  po: TblpurchaseOrderHdr;
}
