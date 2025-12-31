import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("tblVendor_Details")
export class Vendor {
  @PrimaryColumn()
  Vendor_ID: string;

  @Column()
  Vendor_Address: string;

  @Column()
  Vendor_Type: string;

  @Column("bigint")
  Vendor_Contact: number;

  @Column()
  Vendor_GST_No: string;
}
