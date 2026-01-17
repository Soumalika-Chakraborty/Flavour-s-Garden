import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Tblgrn } from "./Tblgrn";
import { TblpurchaseOrderDetails } from "./TblpurchaseOrderDetails";
import { TblvendorDetails } from "./TblvendorDetails";
import { TblpurchasePayment } from "./TblpurchasePayment";

@Index("Vendor_ID", ["vendorId"], {})
@Entity("tblpurchase_order_hdr", { schema: "fgwhole" })
export class TblpurchaseOrderHdr {
  @Column("varchar", { primary: true, name: "PO_ID", length: 50 })
  poId: string;

  @Column("date", { name: "Purchase_Order_Date" })
  purchaseOrderDate: string;

  @Column("varchar", { name: "Payment_Terms", nullable: true, length: 100 })
  paymentTerms: string | null;

  @Column("varchar", { name: "Vendor_ID", nullable: true, length: 50 })
  vendorId: string | null;

  @Column("date", { name: "Delivery_Date", nullable: true })
  deliveryDate: string | null;

  @Column("decimal", { name: "SGST", nullable: true, precision: 10, scale: 2 })
  sgst: string | null;

  @Column("decimal", { name: "CGST", nullable: true, precision: 10, scale: 2 })
  cgst: string | null;

  @Column("decimal", {
    name: "Discount",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  discount: string | null;

  @Column("decimal", {
    name: "Total_Amount",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  totalAmount: string | null;

  @Column("decimal", {
    name: "Net_Amount",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  netAmount: string | null;

  @Column("varchar", { name: "Status", nullable: true, length: 50 })
  status: string | null;

  @OneToMany(() => Tblgrn, (tblgrn) => tblgrn.vendor)
  tblgrns: Tblgrn[];

  @OneToMany(
    () => TblpurchaseOrderDetails,
    (tblpurchaseOrderDetails) => tblpurchaseOrderDetails.po
  )
  tblpurchaseOrderDetails: TblpurchaseOrderDetails[];

  @ManyToOne(
    () => TblvendorDetails,
    (tblvendorDetails) => tblvendorDetails.tblpurchaseOrderHdrs,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "Vendor_ID", referencedColumnName: "vendorId" }])
  vendor: TblvendorDetails;

  @OneToMany(
    () => TblpurchasePayment,
    (tblpurchasePayment) => tblpurchasePayment.po
  )
  tblpurchasePayments: TblpurchasePayment[];
}
