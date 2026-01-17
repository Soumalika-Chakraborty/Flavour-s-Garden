import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TblsalesOrderHeader } from "./TblsalesOrderHeader";
import { Tblproduct } from "./Tblproduct";

@Index("Sales_Order_ID", ["salesOrderId"], {})
@Index("Product_Code", ["productId"], {})
@Entity("tblsales_order_details", { schema: "fgwhole" })
export class TblsalesOrderDetails {
  @Column("varchar", { name: "Sales_Order_ID", nullable: true, length: 50 })
  salesOrderId: string | null;

  @PrimaryGeneratedColumn({ type: "int", name: "SL_NO" })
  slNo: number;

  @Column("varchar", { name: "Product_ID", nullable: true, length: 50 })
  productId: string | null;

  @Column("int", { name: "Qty", nullable: true })
  qty: number | null;

  @Column("decimal", {
    name: "Amount",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  amount: string | null;

  @ManyToOne(
    () => TblsalesOrderHeader,
    (tblsalesOrderHeader) => tblsalesOrderHeader.tblsalesOrderDetails,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "Sales_Order_ID", referencedColumnName: "salesOrderId" },
  ])
  salesOrder: TblsalesOrderHeader;

  @ManyToOne(
    () => Tblproduct,
    (tblproduct) => tblproduct.tblsalesOrderDetails,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "Product_ID", referencedColumnName: "productId" }])
  product: Tblproduct;
}
