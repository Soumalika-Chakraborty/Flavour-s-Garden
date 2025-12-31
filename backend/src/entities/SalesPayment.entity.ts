import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("tblSales_Payment")
export class SalesPayment {
  @PrimaryColumn()
  Transaction_id: string;

  @Column()
  User_id: string;

  @Column()
  Sales_order_id: string;

  @Column()
  Mode_of_Payment: string;

  @Column("decimal", { precision: 10, scale: 2 })
  Payment_Amount: number;

  @Column()
  Status: string;

  @Column()
  Payment_date: Date;
}
