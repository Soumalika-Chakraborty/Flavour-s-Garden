import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("outlet")
export class Outlet {
  @PrimaryGeneratedColumn()
  outlet_id: number;

  @Column()
  outlet_name: string;

  @Column()
  address: string;

  @Column()
  contact_number: string;
}
