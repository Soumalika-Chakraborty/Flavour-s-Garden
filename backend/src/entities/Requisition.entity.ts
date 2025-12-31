import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("tblRequisition")
export class Requisition {
  @PrimaryColumn()
  Req_No: string;

  @Column()
  Req_Date: Date;

  @Column()
  Item: string;

  @Column()
  Qty: number;

  @Column()
  Outlet_ID: string;

  @Column()
  Req_Name: string;
}
