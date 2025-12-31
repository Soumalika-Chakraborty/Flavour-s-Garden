import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("tblMenu_Categories")
export class MenuCategory {
  @PrimaryColumn()
  Menu_Category_ID: string;

  @Column()
  Category_Name: string;
}
