import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Tbloutlet } from "./Tbloutlet";

@Index("Outlet_ID", ["outletId"], {})
@Entity("tblemployees", { schema: "fgwhole" })
export class Tblemployees {
  @Column("varchar", { primary: true, name: "Employee_ID", length: 50 })
  employeeId: string;

  @Column("varchar", { name: "First_Name", nullable: true, length: 50 })
  firstName: string | null;

  @Column("varchar", { name: "Last_Name", nullable: true, length: 50 })
  lastName: string | null;

  @Column("varchar", { name: "Role", nullable: true, length: 50 })
  role: string | null;

  @Column("varchar", { name: "Address", nullable: true, length: 255 })
  address: string | null;

  @Column("varchar", { name: "Outlet_ID", nullable: true, length: 50 })
  outletId: string | null;

  @Column("date", { name: "Date_of_Joining", nullable: true })
  dateOfJoining: string | null;

  @Column("tinyint", { name: "Is_Active", nullable: true, width: 1 })
  isActive: boolean | null;

  @Column("bigint", { name: "Contact_No", nullable: true })
  contactNo: string | null;

  @Column("varchar", { name: "Email", nullable: true, length: 100 })
  email: string | null;

  @Column("varchar", { name: "password", nullable: true, length: 255 })
  password: string | null;

  @ManyToOne(() => Tbloutlet, (tbloutlet) => tbloutlet.tblemployees, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "Outlet_ID", referencedColumnName: "outletId" }])
  outlet: Tbloutlet;
}
