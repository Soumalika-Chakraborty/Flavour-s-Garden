import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Tblconsumer } from "./Tblconsumer";
import { TblsalesOrderHeader } from "./TblsalesOrderHeader";

@Index("User_id", ["userId"], {})
@Index("Sales_order_id", ["salesOrderId"], {})
@Entity("tblsales_payment", { schema: "fgwhole" })
export class TblsalesPayment {
  @Column("varchar", { primary: true, name: "Transaction_id", length: 50 })
  transactionId: string;

  @Column("varchar", { name: "User_id", nullable: true, length: 50 })
  userId: string | null;

  @Column("varchar", { name: "Sales_order_id", nullable: true, length: 50 })
  salesOrderId: string | null;

  @Column("varchar", { name: "Mode_of_Payment", nullable: true, length: 50 })
  modeOfPayment: string | null;

  @Column("decimal", {
    name: "Payment_Amount",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  paymentAmount: string | null;

  @Column("varchar", { name: "Status", nullable: true, length: 50 })
  status: string | null;

  @Column("date", { name: "Payment_date", nullable: true })
  paymentDate: string | null;

  @ManyToOne(() => Tblconsumer, (tblconsumer) => tblconsumer.tblsalesPayments, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "User_id", referencedColumnName: "consumerId" }])
  user: Tblconsumer;

  @ManyToOne(
    () => TblsalesOrderHeader,
    (tblsalesOrderHeader) => tblsalesOrderHeader.tblsalesPayments,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "Sales_order_id", referencedColumnName: "salesOrderId" },
  ])
  salesOrder: TblsalesOrderHeader;
}
