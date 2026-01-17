import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { TblmenuCategories } from "./TblmenuCategories";
import { TblsalesOrderDetails } from "./TblsalesOrderDetails";

@Index("Menu_Category_ID", ["menuCategoryId"], {})
@Entity("tblproduct", { schema: "fgwhole" })
export class Tblproduct {
  @Column("varchar", { primary: true, name: "Product_ID", length: 50 })
  productId: string;

  @Column("varchar", { name: "Product_Name", nullable: true, length: 100 })
  productName: string | null;

  @Column("varchar", { name: "Menu_Category_ID", nullable: true, length: 50 })
  menuCategoryId: string | null;

  @Column("decimal", {
    name: "Price_Per_Unit",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  pricePerUnit: string | null;

  @Column("text", { name: "Image_Url", nullable: true })
  imageUrl: string | null;

  @Column("text", { name: "Product_Description", nullable: true })
  productDescription: string | null;

  @Column("text", { name: "Allergen", nullable: true })
  allergen: string | null;

  @Column("varchar", { name: "Ref_Key", nullable: true, length: 50 })
  refKey: string | null;

  @Column("varchar", { name: "Recipe_ID", nullable: true, length: 255 })
  recipeId: string | null;

  @Column("varchar", { name: "Is_Recommended", nullable: true, length: 50 })
  isRecommended: string | null;

  @Column("varchar", { name: "Is_Veg", nullable: true, length: 50 })
  isVeg: string | null;

  @ManyToOne(
    () => TblmenuCategories,
    (tblmenuCategories) => tblmenuCategories.tblproducts,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "Menu_Category_ID", referencedColumnName: "menuCategoryId" },
  ])
  menuCategory: TblmenuCategories;

  @OneToMany(
    () => TblsalesOrderDetails,
    (tblsalesOrderDetails) => tblsalesOrderDetails.product
  )
  tblsalesOrderDetails: TblsalesOrderDetails[];
}
