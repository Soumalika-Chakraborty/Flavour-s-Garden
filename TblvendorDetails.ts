import { Column, Entity, OneToMany } from "typeorm";
import { TblpurchaseOrderHdr } from "./TblpurchaseOrderHdr";

@Entity("tblvendor_details", { schema: "fgwhole" })
export class TblvendorDetails {
  @Column("varchar", { primary: true, name: "Vendor_ID", length: 50 })
  vendorId: string;

  @Column("varchar", { name: "Vendor_Address", nullable: true, length: 255 })
  vendorAddress: string | null;

  @Column("varchar", { name: "Vendor_Type", nullable: true, length: 50 })
  vendorType: string | null;

  @Column("bigint", { name: "Vendor_Contact", nullable: true })
  vendorContact: string | null;

  @Column("varchar", { name: "Vendor_GST_No", nullable: true, length: 50 })
  vendorGstNo: string | null;

  @OneToMany(
    () => TblpurchaseOrderHdr,
    (tblpurchaseOrderHdr) => tblpurchaseOrderHdr.vendor
  )
  tblpurchaseOrderHdrs: TblpurchaseOrderHdr[];
}
