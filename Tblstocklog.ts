import { Column, Entity } from "typeorm";

@Entity("tblstocklog", { schema: "fgwhole" })
export class Tblstocklog {
  @Column("varchar", { primary: true, name: "Sales_Order_ID", length: 50 })
  salesOrderId: string;

  @Column("varchar", { primary: true, name: "Product_ID", length: 50 })
  productId: string;

  @Column("decimal", {
    name: "Product_Qty",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  productQty: string | null;

  @Column("varchar", { name: "Recipe_ID", nullable: true, length: 50 })
  recipeId: string | null;

  @Column("varchar", { primary: true, name: "Item_ID", length: 50 })
  itemId: string;

  @Column("decimal", {
    name: "Unit_Qty",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  unitQty: string | null;

  @Column("varchar", { name: "Unit_measure", nullable: true, length: 50 })
  unitMeasure: string | null;

  @Column("decimal", {
    name: "Total_Qty",
    nullable: true,
    precision: 12,
    scale: 2,
  })
  totalQty: string | null;
}
