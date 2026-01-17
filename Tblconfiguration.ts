import { Column, Entity } from "typeorm";

@Entity("tblconfiguration", { schema: "fgwhole" })
export class Tblconfiguration {
  @Column("decimal", {
    name: "SGST",
    nullable: true,
    precision: 5,
    scale: 4,
    default: () => "'0.0250'",
  })
  sgst: string | null;

  @Column("decimal", {
    name: "CGST",
    nullable: true,
    precision: 5,
    scale: 4,
    default: () => "'0.0250'",
  })
  cgst: string | null;

  @Column("timestamp", {
    primary: true,
    name: "Change_DateTime",
    default: () => "CURRENT_TIMESTAMP",
  })
  changeDateTime: Date;
}
