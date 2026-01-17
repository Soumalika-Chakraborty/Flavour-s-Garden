import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { Tbladdress } from "./Tbladdress";
import { TblsalesOrderHeader } from "./TblsalesOrderHeader";
import { TblsalesPayment } from "./TblsalesPayment";

@Entity("tblconsumer", { schema: "fgwhole" })
export class Tblconsumer {
  @Column("varchar", { primary: true, name: "Consumer_ID", length: 50 })
  consumerId: string;

  @Column("varchar", { name: "First_Name", nullable: true, length: 50 })
  firstName: string | null;

  @Column("varchar", { name: "Last_Name", nullable: true, length: 50 })
  lastName: string | null;

  @Column("bigint", { name: "Ph_No", nullable: true })
  phNo: string | null;

  @Column("varchar", { name: "Email", nullable: true, length: 100 })
  email: string | null;

  @Column("varchar", { name: "Password_Hash", nullable: true, length: 255 })
  passwordHash: string | null;

  @Column("timestamp", { name: "Last_Logged_In", nullable: true })
  lastLoggedIn: Date | null;

  @Column("varchar", { name: "Default_Address", nullable: true, length: 255 })
  defaultAddress: string | null;

  @Column("int", { name: "Default_Pin", nullable: true })
  defaultPin: number | null;

  @Column("varchar", { name: "Del_Address_1", nullable: true, length: 255 })
  delAddress_1: string | null;

  @Column("int", { name: "Del_Pin", nullable: true })
  delPin: number | null;

  @OneToOne(() => Tbladdress, (tbladdress) => tbladdress.consumer)
  tbladdress: Tbladdress;

  @OneToMany(
    () => TblsalesOrderHeader,
    (tblsalesOrderHeader) => tblsalesOrderHeader.consumer
  )
  tblsalesOrderHeaders: TblsalesOrderHeader[];

  @OneToMany(() => TblsalesPayment, (tblsalesPayment) => tblsalesPayment.user)
  tblsalesPayments: TblsalesPayment[];
}
