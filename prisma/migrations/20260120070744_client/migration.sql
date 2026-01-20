/*
  Warnings:

  - You are about to drop the column `ttags` on the `templates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `templates` DROP COLUMN `ttags`,
    ADD COLUMN `tags` JSON NOT NULL;
