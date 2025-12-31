import { Entity, Column } from "typeorm";

@Entity("tblReference")
export class Reference {
  @Column()
  Outlet_ID: string;

  @Column()
  Menu_Category_ID: string;

  @Column()
  Ref_Key: string;
}
