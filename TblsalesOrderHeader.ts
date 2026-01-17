import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Tbldelivery } from "./Tbldelivery";
import { TblsalesOrderDetails } from "./TblsalesOrderDetails";
import { Tblconsumer } from "./Tblconsumer";
import { Tbloutlet } from "./Tbloutlet";
import { TblsalesPayment } from "./TblsalesPayment";

@Index("Consumer_ID", ["consumerId"], {})
@Index("Outlet_ID", ["outletId"], {})
@Entity("tblsales_order_header", { schema: "fgwhole" })
export class TblsalesOrderHeader {
  @Column("varchar", { primary: true, name: "Sales_Order_ID", length: 50 })
  salesOrderId: string;

  @Column("date", { name: "Order_Date", nullable: true })
  orderDate: string | null;

  @Column("varchar", { name: "Consumer_ID", nullable: true, length: 50 })
  consumerId: string | null;

  @Column("varchar", { name: "Outlet_ID", nullable: true, length: 50 })
  outletId: string | null;

  @Column("varchar", { name: "Order_type", nullable: true, length: 50 })
  orderType: string | null;

  @Column("decimal", {
    name: "Total_Amount",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  totalAmount: string | null;

  @Column("varchar", { name: "Sales_Order_Status", nullable: true, length: 50 })
  salesOrderStatus: string | null;

  @Column("decimal", { name: "SGST", nullable: true, precision: 10, scale: 2 })
  sgst: string | null;

  @Column("decimal", { name: "CGST", nullable: true, precision: 10, scale: 2 })
  cgst: string | null;

  @Column("decimal", {
    name: "Discount",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  discount: string | null;

  @Column("decimal", {
    name: "Net_Amount",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  netAmount: string | null;

  @OneToMany(() => Tbldelivery, (tbldelivery) => tbldelivery.salesOrder)
  tbldeliveries: Tbldelivery[];

  @OneToMany(
    () => TblsalesOrderDetails,
    (tblsalesOrderDetails) => tblsalesOrderDetails.salesOrder
  )
  tblsalesOrderDetails: TblsalesOrderDetails[];

  @ManyToOne(
    () => Tblconsumer,
    (tblconsumer) => tblconsumer.tblsalesOrderHeaders,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "Consumer_ID", referencedColumnName: "consumerId" }])
  consumer: Tblconsumer;

  @ManyToOne(() => Tbloutlet, (tbloutlet) => tbloutlet.tblsalesOrderHeaders, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "Outlet_ID", referencedColumnName: "outletId" }])
  outlet: Tbloutlet;

  @OneToMany(
    () => TblsalesPayment,
    (tblsalesPayment) => tblsalesPayment.salesOrder
  )
  tblsalesPayments: TblsalesPayment[];
}
