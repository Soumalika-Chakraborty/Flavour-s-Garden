import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { TblpurchaseOrderDetails } from "./TblpurchaseOrderDetails";
import { TblpurchaseOrderHdr } from "./TblpurchaseOrderHdr";

@Index("fk_grn_vendor", ["vendorId"], {})
@Entity("tblgrn", { schema: "fgwhole" })
export class Tblgrn {
  @Column("date", { name: "Order_Date", nullable: true })
  orderDate: string | null;

  @Column("varchar", { primary: true, name: "PO_ID", length: 50 })
  poId: string;

  @Column("varchar", { name: "Vendor_ID", nullable: true, length: 50 })
  vendorId: string | null;

  @Column("varchar", { primary: true, name: "Item_ID", length: 50 })
  itemId: string;

  @Column("varchar", { name: "Item_Name", nullable: true, length: 255 })
  itemName: string | null;

  @Column("int", { name: "Ordered_Qty", nullable: true })
  orderedQty: number | null;

  @Column("int", { name: "Received_Qty", nullable: true })
  receivedQty: number | null;

  @Column("varchar", { name: "Unit_Measure", nullable: true, length: 50 })
  unitMeasure: string | null;

  @ManyToOne(
    () => TblpurchaseOrderDetails,
    (tblpurchaseOrderDetails) => tblpurchaseOrderDetails.tblgrns,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "PO_ID", referencedColumnName: "poId" }])
  po: TblpurchaseOrderDetails;

  @ManyToOne(
    () => TblpurchaseOrderHdr,
    (tblpurchaseOrderHdr) => tblpurchaseOrderHdr.tblgrns,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "Vendor_ID", referencedColumnName: "vendorId" }])
  vendor: TblpurchaseOrderHdr;
}
