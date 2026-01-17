import { Column, Entity } from "typeorm";

@Entity("tblrecipe", { schema: "fgwhole" })
export class Tblrecipe {
  @Column("varchar", { name: "Product_ID", nullable: true, length: 50 })
  productId: string | null;

  @Column("varchar", { primary: true, name: "Recipe_ID", length: 50 })
  recipeId: string;

  @Column("int", { primary: true, name: "SL_no" })
  slNo: number;

  @Column("varchar", { name: "Item_ID", nullable: true, length: 50 })
  itemId: string | null;

  @Column("varchar", { name: "Item_Name", nullable: true, length: 255 })
  itemName: string | null;

  @Column("varchar", { name: "Unit_measure", nullable: true, length: 50 })
  unitMeasure: string | null;

  @Column("decimal", {
    name: "Unit_Qty",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  unitQty: string | null;
}
