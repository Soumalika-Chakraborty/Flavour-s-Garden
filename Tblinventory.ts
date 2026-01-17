import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Tbloutlet } from "./Tbloutlet";
import { TblpurchaseOrderDetails } from "./TblpurchaseOrderDetails";

@Index("Outlet_ID", ["outletId"], {})
@Entity("tblinventory", { schema: "fgwhole" })
export class Tblinventory {
  @Column("varchar", { primary: true, name: "Item_ID", length: 50 })
  itemId: string;

  @Column("varchar", { name: "Outlet_ID", nullable: true, length: 50 })
  outletId: string | null;

  @Column("varchar", { name: "Ingredient_Name", nullable: true, length: 100 })
  ingredientName: string | null;

  @Column("decimal", {
    name: "Current_Qty",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  currentQty: string | null;

  @Column("varchar", {
    name: "Unit_of_Measurement",
    nullable: true,
    length: 20,
  })
  unitOfMeasurement: string | null;

  @Column("decimal", {
    name: "Min_Stock_Level",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  minStockLevel: string | null;

  @Column("decimal", {
    name: "Reorder_Level",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  reorderLevel: string | null;

  @Column("varchar", { name: "Priority", nullable: true, length: 20 })
  priority: string | null;

  @Column("timestamp", {
    name: "Last_Updated",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  lastUpdated: Date | null;

  @ManyToOne(() => Tbloutlet, (tbloutlet) => tbloutlet.tblinventories, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "Outlet_ID", referencedColumnName: "outletId" }])
  outlet: Tbloutlet;

  @OneToMany(
    () => TblpurchaseOrderDetails,
    (tblpurchaseOrderDetails) => tblpurchaseOrderDetails.item
  )
  tblpurchaseOrderDetails: TblpurchaseOrderDetails[];
}
