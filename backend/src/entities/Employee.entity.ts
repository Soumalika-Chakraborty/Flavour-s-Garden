import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("tblEmployees")
export class Employee {
  @PrimaryColumn()
  Employee_ID: string;

  @Column()
  First_Name: string;

  @Column()
  Last_Name: string;

  @Column()
  Role: string;

  @Column()
  Address: string;

  @Column()
  Outlet_ID: string;

  @Column()
  Date_of_Joining: Date;

  @Column()
  Is_Active: boolean;

  @Column("bigint")
  Contact_No: number;

  @Column()
  Email: string;
}
