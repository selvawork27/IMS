-- AlterTable
ALTER TABLE `invoices` ADD COLUMN `client_license_id` VARCHAR(191) NULL,
    ADD COLUMN `plan_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_client_license_id_fkey` FOREIGN KEY (`client_license_id`) REFERENCES `client_licenses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `Plan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
