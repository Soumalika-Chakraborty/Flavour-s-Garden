import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Tblconsumer } from "./Tblconsumer";

@Entity("tbladdress", { schema: "fgwhole" })
export class Tbladdress {
  @Column("varchar", { primary: true, name: "Consumer_ID", length: 50 })
  consumerId: string;

  @Column("varchar", { name: "Street", nullable: true, length: 100 })
  street: string | null;

  @Column("varchar", { name: "City", nullable: true, length: 50 })
  city: string | null;

  @Column("varchar", { name: "Landmark", nullable: true, length: 100 })
  landmark: string | null;

  @Column("int", { name: "Pin_Code", nullable: true })
  pinCode: number | null;

  @OneToOne(() => Tblconsumer, (tblconsumer) => tblconsumer.tbladdress, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "Consumer_ID", referencedColumnName: "consumerId" }])
  consumer: Tblconsumer;
}
