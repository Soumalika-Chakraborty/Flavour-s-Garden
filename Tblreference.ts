import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Tbloutlet } from "./Tbloutlet";
import { TblmenuCategories } from "./TblmenuCategories";

@Index("Outlet_ID", ["outletId"], {})
@Index("Menu_Category_ID", ["menuCategoryId"], {})
@Entity("tblreference", { schema: "fgwhole" })
export class Tblreference {
  @Column("varchar", { name: "Outlet_ID", nullable: true, length: 50 })
  outletId: string | null;

  @Column("varchar", { name: "Menu_Category_ID", nullable: true, length: 50 })
  menuCategoryId: string | null;

  @Column("varchar", { primary: true, name: "Ref_Key", length: 100 })
  refKey: string;

  @ManyToOne(() => Tbloutlet, (tbloutlet) => tbloutlet.tblreferences, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "Outlet_ID", referencedColumnName: "outletId" }])
  outlet: Tbloutlet;

  @ManyToOne(
    () => TblmenuCategories,
    (tblmenuCategories) => tblmenuCategories.tblreferences,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "Menu_Category_ID", referencedColumnName: "menuCategoryId" },
  ])
  menuCategory: TblmenuCategories;
}
