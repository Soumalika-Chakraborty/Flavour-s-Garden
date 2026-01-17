import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { TblsalesOrderHeader } from "./TblsalesOrderHeader";

@Index("Sales_Order_ID", ["salesOrderId"], {})
@Entity("tbldelivery", { schema: "fgwhole" })
export class Tbldelivery {
  @Column("varchar", { primary: true, name: "Delivery_ID", length: 50 })
  deliveryId: string;

  @Column("varchar", { name: "Sales_Order_ID", nullable: true, length: 50 })
  salesOrderId: string | null;

  @ManyToOne(
    () => TblsalesOrderHeader,
    (tblsalesOrderHeader) => tblsalesOrderHeader.tbldeliveries,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "Sales_Order_ID", referencedColumnName: "salesOrderId" },
  ])
  salesOrder: TblsalesOrderHeader;
}
