import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("tblProduct")
export class Product {
  @PrimaryColumn()
  Product_ID: string;

  @Column()
  Product_Name: string;

  @Column()
  Menu_Category_ID: string;

  @Column("decimal", { precision: 10, scale: 2 })
  Price_Per_Unit: number;

  @Column()
  Unit: number;

  @Column("text")
  Image_Url: string;

  @Column("text")
  Description: string;

  @Column("text")
  Allergen: string;

  @Column()
  Is_Veg: boolean;
}
