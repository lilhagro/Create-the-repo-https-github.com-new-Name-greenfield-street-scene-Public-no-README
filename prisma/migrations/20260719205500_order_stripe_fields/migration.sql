-- AlterTable
ALTER TABLE "Order" ADD COLUMN "stripeSessionId" TEXT;
ALTER TABLE "Order" ADD COLUMN "stripePaymentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_stripeSessionId_key" ON "Order"("stripeSessionId");
