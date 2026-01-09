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
-- Table structure for table `analytics_snapshots`
--

DROP TABLE IF EXISTS `analytics_snapshots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `analytics_snapshots` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `workspace_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `period` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `totalRevenue` decimal(10,2) NOT NULL DEFAULT '0.00',
  `totalInvoices` int NOT NULL DEFAULT '0',
  `totalClients` int NOT NULL DEFAULT '0',
  `paidInvoices` int NOT NULL DEFAULT '0',
  `pendingInvoices` int NOT NULL DEFAULT '0',
  `overdueInvoices` int NOT NULL DEFAULT '0',
  `revenueGrowth` decimal(5,4) DEFAULT NULL,
  `invoiceGrowth` decimal(5,4) DEFAULT NULL,
  `clientGrowth` decimal(5,4) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `analytics_snapshots_user_id_workspace_id_date_period_key` (`user_id`,`workspace_id`,`date`,`period`),
  KEY `analytics_snapshots_workspace_id_fkey` (`workspace_id`),
  CONSTRAINT `analytics_snapshots_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `analytics_snapshots_workspace_id_fkey` FOREIGN KEY (`workspace_id`) REFERENCES `workspaces` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analytics_snapshots`
--

LOCK TABLES `analytics_snapshots` WRITE;
/*!40000 ALTER TABLE `analytics_snapshots` DISABLE KEYS */;
INSERT INTO `analytics_snapshots` VALUES ('cmk419p4o00003oubr8c5ai1n','1','cmk415jx7001h84ubupjzdzzx','2026-01-06','monthly',0.00,0,0,0,0,0,NULL,NULL,NULL,'2026-01-07 13:07:33.614','2026-01-07 13:07:33.614'),('cmk4yqmmz0000dwub6m4upgty','1','cmk415jx7001h84ubupjzdzzx','2026-01-07','monthly',0.00,1,1,0,0,0,NULL,NULL,NULL,'2026-01-08 04:44:30.870','2026-01-08 04:44:30.870'),('cmk6eox8e0000foubt01c582s','1','cmk415jx7001h84ubupjzdzzx','2026-01-08','monthly',0.00,4,3,0,3,0,NULL,NULL,NULL,'2026-01-09 04:58:51.317','2026-01-09 04:58:51.317');
/*!40000 ALTER TABLE `analytics_snapshots` ENABLE KEYS */;
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
