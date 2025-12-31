import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("tblIssue")
export class Issue {
  @PrimaryColumn()
  Issue_No: string;

  @Column()
  Issue_Date: Date;

  @Column()
  Req_No: string;

  @Column()
  Req_Date: Date;

  @Column()
  Item: string;

  @Column()
  Qty: number;

  @Column()
  Del_Qty: number;

  @Column()
  Outlet_ID: string;

  @Column()
  Issue_Name: string;
}
