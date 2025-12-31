import { seedOutlet } from "./outlet.seed";
import { seedMenuCategories } from "./menuCategory.seed";
import { seedConfiguration } from "./configuration.seed";
import { seedConsumers } from "./consumer.seed";
import { seedVendors } from "./vendor.seed";
import { seedEmployees } from "./employee.seed";
import { seedProducts } from "./product.seed";
import { seedInventory } from "./inventory.seed";
import { seedAddress } from "./address.seed";
import { seedSalesOrderHeader } from "./salesOrderHeader.seed";
import { seedSalesOrderDetails } from "./salesOrderDetails.seed";
import { seedPurchaseOrderHeader } from "./purchaseOrderHeader.seed";
import { seedPurchaseOrderDetails } from "./purchaseOrderDetails.seed";
import { seedInvoiceGRN } from "./invoiceGRN.seed";
import { seedPurchasePayment } from "./purchasePayment.seed";
import { seedRequisition } from "./requisition.seed";
import { seedIssue } from "./issue.seed";
import { seedReference } from "./reference.seed";

async function runSeeds() {
  try {
    console.log("🌱 Starting database seeding...\n");

    // 1. Master / independent tables
    await seedOutlet();
    await seedMenuCategories();
    await seedConfiguration();

    // 2. Users & vendors
    await seedConsumers();
    await seedVendors();

    // 3. Dependent master data
    await seedEmployees();
    await seedProducts();
    await seedInventory();
    await seedAddress();

    // 4. Sales flow
    await seedSalesOrderHeader();
    await seedSalesOrderDetails();

    // 5. Purchase flow
    await seedPurchaseOrderHeader();
    await seedPurchaseOrderDetails();
    await seedInvoiceGRN();
    await seedPurchasePayment();

    // 6. Store operations
    await seedRequisition();
    await seedIssue();

    // 7. Mapping / reference
    await seedReference();

    console.log("\n✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error while seeding database:", error);
    process.exit(1);
  }
}

runSeeds();
