import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("tblAddress")
export class Address {
  @PrimaryColumn()
  Consumer_ID: string;

  @Column()
  Street: string;

  @Column()
  City: string;

  @Column()
  Landmark: string;

  @Column()
  Pin_Code: number;
}
