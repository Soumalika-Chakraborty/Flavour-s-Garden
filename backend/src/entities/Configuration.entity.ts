import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("tblConfiguration")
export class Configuration {
  @PrimaryColumn()
  Change_DateTime: Date;

  @Column("decimal", { precision: 5, scale: 4 })
  SGST: number;

  @Column("decimal", { precision: 5, scale: 4 })
  CGST: number;
}
