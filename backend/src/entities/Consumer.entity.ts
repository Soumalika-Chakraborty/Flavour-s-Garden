import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("tblConsumer")
export class Consumer {
  @PrimaryColumn()
  Consumer_ID: string;

  @Column()
  First_Name: string;

  @Column()
  Last_Name: string;

  @Column("bigint")
  Ph_No: number;

  @Column()
  Email: string;

  @Column()
  Password_Hash: string;

  @Column({ type: "timestamp", nullable: true })
  Last_Logged_In: Date;

  @Column()
  Default_Address: string;

  @Column()
  Default_Pin: number;

  @Column()
  Del_Address_1: string;

  @Column()
  Del_Pin: number;
}
