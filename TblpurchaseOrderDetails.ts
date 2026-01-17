import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Tblgrn } from "./Tblgrn";
import { TblpurchaseOrderHdr } from "./TblpurchaseOrderHdr";
import { Tbloutlet } from "./Tbloutlet";
import { Tblinventory } from "./Tblinventory";

@Index("Outlet_ID", ["outletId"], {})
@Index("Item_ID", ["itemId"], {})
@Entity("tblpurchase_order_details", { schema: "fgwhole" })
export class TblpurchaseOrderDetails {
  @Column("varchar", { primary: true, name: "PO_ID", length: 50 })
  poId: string;

  @Column("varchar", { name: "Outlet_ID", nullable: true, length: 50 })
  outletId: string | null;

  @Column("int", { primary: true, name: "SL_NO" })
  slNo: number;

  @Column("varchar", { name: "Item_ID", nullable: true, length: 50 })
  itemId: string | null;

  @Column("int", { name: "Qty", nullable: true })
  qty: number | null;

  @Column("decimal", {
    name: "Unit_price",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  unitPrice: string | null;

  @Column("varchar", { name: "Unit_Measure", nullable: true, length: 10 })
  unitMeasure: string | null;

  @OneToMany(() => Tblgrn, (tblgrn) => tblgrn.po)
  tblgrns: Tblgrn[];

  @ManyToOne(
    () => TblpurchaseOrderHdr,
    (tblpurchaseOrderHdr) => tblpurchaseOrderHdr.tblpurchaseOrderDetails,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "PO_ID", referencedColumnName: "poId" }])
  po: TblpurchaseOrderHdr;

  @ManyToOne(
    () => Tbloutlet,
    (tbloutlet) => tbloutlet.tblpurchaseOrderDetails,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "Outlet_ID", referencedColumnName: "outletId" }])
  outlet: Tbloutlet;

  @ManyToOne(
    () => Tblinventory,
    (tblinventory) => tblinventory.tblpurchaseOrderDetails,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "Item_ID", referencedColumnName: "itemId" }])
  item: Tblinventory;
}
