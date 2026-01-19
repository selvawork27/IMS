import "dotenv/config"

import {
  SubscriptionStatus,
  BillingCycle,
  PlanStatus,
  BillingType,
} from "@prisma/client"

import bcrypt from "bcryptjs"
import { prisma } from "../src/lib/prisma"

/* ===================== SEED ===================== */
async function main() {
  /* ===================== USER ===================== */
  const adminPassword = await bcrypt.hash("admin123", 10)

  await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@gmail.com",
      password: adminPassword,
      subscriptionStatus: SubscriptionStatus.FREE,
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
    },
  })

  /* ===================== CURRENCIES ===================== */
  await prisma.currencie.createMany({
    data: [
      { code: "USD", name: "US Dollar", symbol: "$", decimals: 2 },
      { code: "INR", name: "Indian Rupee", symbol: "₹", decimals: 2 },
    ],
    skipDuplicates: true,
  })

  /* ===================== PRODUCT ===================== */
  const product = await prisma.product.createMany({
    data:[ {
      name: "InnoHMS / Academics",
      sku: "SR-ACA-001",
      basePrice: 500,
      description:
        "Online academic platform for healthcare professional interactive learning.",
      isActive: true,
    },
    {
      name: "Simplirad",
      sku: "SR-ACA-002",
      basePrice: 1000,
      description:
        "AI Radiology workflow: Integrated image magnet (RIS PACS)",
      isActive: true,
    },
      {
      name: "Simpliconnect",
      sku: "SR-ACA-003",
      basePrice: 1500,
      description:
        "Simpliconnect: Efficient referrals, orders",
      isActive: true,
    },
]
  })

  /* ===================== SUB PRODUCTS ===================== */
  await prisma.subProduct.createMany({
    data: [
      {
        productId: 1,
        name: "Doctor Charge",
        baseRate: 500,
        billingType: BillingType.FIXED,
      },
      {
        productId: 1,
        name: "Service Charge",
        baseRate: 1500,
        billingType: BillingType.FIXED,
      },
      {
        productId: 1,
        name: "Developer Charge",
        baseRate: 2500,
        billingType: BillingType.FIXED,
      },
      {
        productId: 2,
        name: "Doctor Charge",
        baseRate: 500,
        billingType: BillingType.FIXED,
      },
      {
        productId: 2,
        name: "Service Charge",
        baseRate: 1500,
        billingType: BillingType.FIXED,
      },
      {
        productId: 2,
        name: "Developer Charge",
        baseRate: 2500,
        billingType: BillingType.FIXED,
      },
      {
        productId: 3,
        name: "Doctor Charge",
        baseRate: 500,
        billingType: BillingType.FIXED,
      },
      {
        productId: 3,
        name: "Service Charge",
        baseRate: 1500,
        billingType: BillingType.FIXED,
      },
      {
        productId: 3,
        name: "Developer Charge",
        baseRate: 2500,
        billingType: BillingType.FIXED,
      },
    ],
  })

  /* ===================== PLANS ===================== */
  await prisma.plan.createMany({
    data: [
      {
        id: "basic-yearly-plan",
        name: "Basic Yearly",
        code: "BASICY",
        description: "This is the basic yearly plan",
        price: 15000.99,
        currency: "INR",
        billingCycle: BillingCycle.YEARLY,
        startDate: new Date("2026-01-01"),
        endDate: new Date("2027-01-01"),
        autoRenew: true,
        renewalPrice: 1500.99,
        status: PlanStatus.ACTIVE,
      },
      {
        id: "basic-monthly-plan",
        name: "Basic Monthly",
        code: "BASICM",
        description: "This is the basic monthly plan",
        price: 1250.99,
        currency: "INR",
        billingCycle: BillingCycle.MONTHLY,
        startDate: new Date("2026-01-01"),
        endDate: new Date("2027-01-01"),
        autoRenew: true,
        renewalPrice: 1250.99,
        status: PlanStatus.ACTIVE,
      },
    ],
    skipDuplicates: true,
  })

  console.log("✅ Database seeded successfully")
}

/* ===================== RUN ===================== */
main()
  .catch((e) => {
    console.error("❌ Seeder failed", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
