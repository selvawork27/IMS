-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: linea
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `workspace_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `template_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoice_number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `issue_date` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `due_date` datetime(3) NOT NULL,
  `paid_date` datetime(3) DEFAULT NULL,
  `subtotal` decimal(10,2) NOT NULL DEFAULT '0.00',
  `taxAmount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `discountAmount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `total` decimal(10,2) NOT NULL DEFAULT '0.00',
  `currency` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USD',
  `tax_rate` decimal(5,4) NOT NULL DEFAULT '0.0000',
  `status` enum('DRAFT','SENT','VIEWED','PAID','OVERDUE','CANCELLED','REFUNDED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DRAFT',
  `payment_status` enum('PENDING','PROCESSING','COMPLETED','FAILED','CANCELLED','REFUNDED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `sent_at` datetime(3) DEFAULT NULL,
  `viewed_at` datetime(3) DEFAULT NULL,
  `reminder_sent` tinyint(1) NOT NULL DEFAULT '0',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `terms` text COLLATE utf8mb4_unicode_ci,
  `tags` json NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `demo_irn` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `demo_qr_png` text COLLATE utf8mb4_unicode_ci,
  `demo_irn_created_at` datetime(3) DEFAULT NULL,
  `irn_manual` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `irn_manual_at` datetime(3) DEFAULT NULL,
  `currencieId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `invoices_invoice_number_key` (`invoice_number`),
  KEY `invoices_user_id_fkey` (`user_id`),
  KEY `invoices_client_id_fkey` (`client_id`),
  KEY `invoices_workspace_id_fkey` (`workspace_id`),
  KEY `invoices_template_id_fkey` (`template_id`),
  KEY `invoices_currencieId_fkey` (`currencieId`),
  CONSTRAINT `invoices_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `invoices_currencieId_fkey` FOREIGN KEY (`currencieId`) REFERENCES `currencies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `invoices_template_id_fkey` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `invoices_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `invoices_workspace_id_fkey` FOREIGN KEY (`workspace_id`) REFERENCES `workspaces` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` VALUES ('cmk41lle4000164ub6f3mm77i','1','cmk41lldc000064ubs0no57t4','cmk415jx7001h84ubupjzdzzx',NULL,'INV-808636-TSE','Invoice 007',NULL,'2026-01-07 13:16:48.650','2026-01-31 00:00:00.000',NULL,666.00,0.00,0.00,666.00,'USD',0.0000,'SENT','PENDING','2026-01-08 07:55:38.857',NULL,0,'',NULL,'[]','2026-01-07 13:16:48.650','2026-01-08 07:55:38.861',NULL,NULL,NULL,NULL,NULL,NULL),('cmk51cw200004dwubdddbg0v0','1','cmk51cw070003dwubfv1eb79a','cmk415jx7001h84ubupjzdzzx',NULL,'INV-868707-LCP','Invoice ',NULL,'2026-01-08 05:57:48.732','2026-01-31 00:00:00.000',NULL,1650.00,0.00,0.00,1650.00,'USD',0.0000,'SENT','PENDING','2026-01-08 07:53:38.535',NULL,0,'',NULL,'[]','2026-01-08 05:57:48.732','2026-01-08 07:53:38.539',NULL,NULL,NULL,NULL,NULL,NULL),('cmk520ei40008dwub8i92wtzq','1','cmk51cw070003dwubfv1eb79a','cmk415jx7001h84ubupjzdzzx',NULL,'INV-965716-D12','Invoice ',NULL,'2026-01-08 06:16:05.728','2026-01-31 00:00:00.000',NULL,1950.00,0.00,0.00,1950.00,'USD',0.0000,'SENT','PENDING','2026-01-08 07:45:18.497',NULL,0,'',NULL,'[]','2026-01-08 06:16:05.728','2026-01-08 07:45:18.502',NULL,NULL,NULL,NULL,NULL,NULL),('cmk55qcs800066oubnpplw189','1','cmk55qcrh00056oubuj1rjok6','cmk415jx7001h84ubupjzdzzx',NULL,'INV-215399-59M','Invoice ',NULL,'2026-01-08 08:00:15.413','2026-02-28 00:00:00.000',NULL,6000.00,0.00,0.00,6000.00,'INR',0.0000,'DRAFT','PENDING',NULL,NULL,0,'',NULL,'[]','2026-01-08 08:00:15.413','2026-01-08 08:01:32.197',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-09 10:51:49
