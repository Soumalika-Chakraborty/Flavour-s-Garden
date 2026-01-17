import { Column, Entity, OneToMany } from "typeorm";
import { Tblemployees } from "./Tblemployees";
import { Tblinventory } from "./Tblinventory";
import { TblpurchaseOrderDetails } from "./TblpurchaseOrderDetails";
import { Tblreference } from "./Tblreference";
import { TblsalesOrderHeader } from "./TblsalesOrderHeader";

@Entity("tbloutlet", { schema: "fgwhole" })
export class Tbloutlet {
  @Column("varchar", { primary: true, name: "Outlet_ID", length: 50 })
  outletId: string;

  @Column("varchar", { name: "Outlet_Name", length: 100 })
  outletName: string;

  @Column("varchar", { name: "Outlet_Address", nullable: true, length: 255 })
  outletAddress: string | null;

  @OneToMany(() => Tblemployees, (tblemployees) => tblemployees.outlet)
  tblemployees: Tblemployees[];

  @OneToMany(() => Tblinventory, (tblinventory) => tblinventory.outlet)
  tblinventories: Tblinventory[];

  @OneToMany(
    () => TblpurchaseOrderDetails,
    (tblpurchaseOrderDetails) => tblpurchaseOrderDetails.outlet
  )
  tblpurchaseOrderDetails: TblpurchaseOrderDetails[];

  @OneToMany(() => Tblreference, (tblreference) => tblreference.outlet)
  tblreferences: Tblreference[];

  @OneToMany(
    () => TblsalesOrderHeader,
    (tblsalesOrderHeader) => tblsalesOrderHeader.outlet
  )
  tblsalesOrderHeaders: TblsalesOrderHeader[];
}
