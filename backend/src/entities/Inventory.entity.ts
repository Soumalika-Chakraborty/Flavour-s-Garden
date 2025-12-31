import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("tblInventory")
export class Inventory {
  @PrimaryColumn()
  Item_ID: string;

  @Column()
  Outlet_ID: string;

  @Column()
  Ingredient_Name: string;

  @Column("decimal", { precision: 10, scale: 2 })
  Current_Qty: number;

  @Column()
  Unit_of_Measurement: string;

  @Column("decimal", { precision: 10, scale: 2 })
  Min_Stock_Level: number;

  @Column("decimal", { precision: 10, scale: 2 })
  Reorder_Level: number;

  @Column()
  Priority: string;

  @Column()
  Last_Updated: Date;
}
