import { Column, Entity, OneToMany } from "typeorm";
import { Tblproduct } from "./Tblproduct";
import { Tblreference } from "./Tblreference";

@Entity("tblmenu_categories", { schema: "fgwhole" })
export class TblmenuCategories {
  @Column("varchar", { primary: true, name: "Menu_Category_ID", length: 50 })
  menuCategoryId: string;

  @Column("varchar", { name: "Category_Name", length: 100 })
  categoryName: string;

  @OneToMany(() => Tblproduct, (tblproduct) => tblproduct.menuCategory)
  tblproducts: Tblproduct[];

  @OneToMany(() => Tblreference, (tblreference) => tblreference.menuCategory)
  tblreferences: Tblreference[];
}
