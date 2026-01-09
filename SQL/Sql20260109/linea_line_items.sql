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
-- Table structure for table `line_items`
--

DROP TABLE IF EXISTS `line_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `line_items` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoice_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` decimal(10,2) NOT NULL DEFAULT '1.00',
  `unit_price` decimal(10,2) NOT NULL,
  `amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `sku` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unit` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'item',
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `line_items_invoice_id_fkey` (`invoice_id`),
  KEY `line_items_product_id_fkey` (`product_id`),
  CONSTRAINT `line_items_invoice_id_fkey` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `line_items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `line_items`
--

LOCK TABLES `line_items` WRITE;
/*!40000 ALTER TABLE `line_items` DISABLE KEYS */;
INSERT INTO `line_items` VALUES ('cmk41nbxo000664ub39c7fn2t','cmk41lle4000164ub6f3mm77i','SimpliRad™ RIS-PACS',1.00,666.00,666.00,NULL,'item',NULL,'2026-01-07 13:18:09.708','2026-01-07 13:18:09.708',NULL),('cmk51cw2h0005dwubhmkfl6g3','cmk51cw200004dwubdddbg0v0','InnoHMS / Academics',1.00,1200.00,1200.00,NULL,'item',NULL,'2026-01-08 05:57:48.732','2026-01-08 05:57:48.732',NULL),('cmk51cw2h0006dwub2nyqaiyw','cmk51cw200004dwubdddbg0v0','SimpliConnect™',1.00,450.00,450.00,NULL,'item',NULL,'2026-01-08 05:57:48.732','2026-01-08 05:57:48.732',NULL),('cmk520eib0009dwubuyrj6gzy','cmk520ei40008dwub8i92wtzq','SimpliConnect™',1.00,1200.00,1200.00,NULL,'item',NULL,'2026-01-08 06:16:05.728','2026-01-08 06:16:05.728',NULL),('cmk520eic000adwubvbzhseqs','cmk520ei40008dwub8i92wtzq','SimpliRad™ RIS-PACS',1.00,450.00,450.00,NULL,'item',NULL,'2026-01-08 06:16:05.728','2026-01-08 06:16:05.728',NULL),('cmk520eic000bdwubhjw1vni3','cmk520ei40008dwub8i92wtzq','InnoHMS / Academics',1.00,300.00,300.00,NULL,'item',NULL,'2026-01-08 06:16:05.728','2026-01-08 06:16:05.728',NULL),('cmk55s01a000b6oubfrtmt694','cmk55qcs800066oubnpplw189','SimpliRad™ RIS-PACS',1.00,1200.00,1200.00,NULL,'item',NULL,'2026-01-08 08:01:32.206','2026-01-08 08:01:32.206',NULL),('cmk55s01a000c6oub4evzhlum','cmk55qcs800066oubnpplw189','SimpliConnect™',1.00,300.00,300.00,NULL,'item',NULL,'2026-01-08 08:01:32.206','2026-01-08 08:01:32.206',NULL),('cmk55s01a000d6oubny7dw8ti','cmk55qcs800066oubnpplw189','InnoHMS / Academics',10.00,450.00,4500.00,NULL,'item',NULL,'2026-01-08 08:01:32.206','2026-01-08 08:01:32.206',NULL);
/*!40000 ALTER TABLE `line_items` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-09 10:51:50
