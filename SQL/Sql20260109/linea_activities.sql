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
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `workspace_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoice_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` enum('INVOICE_CREATED','INVOICE_UPDATED','INVOICE_SENT','INVOICE_PAID','CLIENT_CREATED','CLIENT_UPDATED','PAYMENT_RECEIVED','TEMPLATE_CREATED','USER_LOGIN','USER_LOGOUT','SETTINGS_UPDATED') COLLATE utf8mb4_unicode_ci NOT NULL,
  `action` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `metadata` json DEFAULT NULL,
  `ip_address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `activities_user_id_fkey` (`user_id`),
  KEY `activities_workspace_id_fkey` (`workspace_id`),
  KEY `activities_invoice_id_fkey` (`invoice_id`),
  CONSTRAINT `activities_invoice_id_fkey` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `activities_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `activities_workspace_id_fkey` FOREIGN KEY (`workspace_id`) REFERENCES `workspaces` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES ('cmk41llel000364ubi4wyyjd2','1','cmk415jx7001h84ubupjzdzzx','cmk41lle4000164ub6f3mm77i','INVOICE_CREATED','Created new invoice','Created invoice: INV-808636-TSE','{\"invoiceId\": \"cmk41lle4000164ub6f3mm77i\"}',NULL,NULL,'2026-01-07 13:16:48.667'),('cmk41mclb000464uba2q63zt0','1','cmk415jx7001h84ubupjzdzzx',NULL,'CLIENT_UPDATED','Updated client','Updated client: UNILUSH','{\"clientId\": \"cmk41lldc000064ubs0no57t4\"}',NULL,NULL,'2026-01-07 13:17:23.902'),('cmk41mw97000564ubkg8vf82y','1','cmk415jx7001h84ubupjzdzzx',NULL,'CLIENT_UPDATED','Updated client','Updated client: UNILUSH','{\"clientId\": \"cmk41lldc000064ubs0no57t4\"}',NULL,NULL,'2026-01-07 13:17:49.386'),('cmk41nbxw000764ubupnpderk','1','cmk415jx7001h84ubupjzdzzx','cmk41lle4000164ub6f3mm77i','INVOICE_UPDATED','Updated invoice','Updated invoice and line items: cmk41lle4000164ub6f3mm77i','{\"status\": \"DRAFT\", \"invoiceId\": \"cmk41lle4000164ub6f3mm77i\"}',NULL,NULL,'2026-01-07 13:18:09.714'),('cmk4zom3f0001dwube4ljg7m7','1','cmk415jx7001h84ubupjzdzzx',NULL,'CLIENT_UPDATED','Updated client','Updated client: UNILUSH','{\"clientId\": \"cmk41lldc000064ubs0no57t4\"}',NULL,NULL,'2026-01-08 05:10:56.472'),('cmk4zoofu0002dwubthzszjrk','1','cmk415jx7001h84ubupjzdzzx',NULL,'CLIENT_UPDATED','Updated client','Updated client: UNILUSH','{\"clientId\": \"cmk41lldc000064ubs0no57t4\"}',NULL,NULL,'2026-01-08 05:10:59.501'),('cmk51cw410007dwubl58fkq6s','1','cmk415jx7001h84ubupjzdzzx','cmk51cw200004dwubdddbg0v0','INVOICE_CREATED','Created new invoice','Created invoice: INV-868707-LCP','{\"invoiceId\": \"cmk51cw200004dwubdddbg0v0\"}',NULL,NULL,'2026-01-08 05:57:48.803'),('cmk520ek4000cdwub9hch9937','1','cmk415jx7001h84ubupjzdzzx','cmk520ei40008dwub8i92wtzq','INVOICE_CREATED','Created new invoice','Created invoice: INV-965716-D12','{\"invoiceId\": \"cmk520ei40008dwub8i92wtzq\"}',NULL,NULL,'2026-01-08 06:16:05.785'),('cmk551a0y00006oubyycrb45u','1','cmk415jx7001h84ubupjzdzzx','cmk520ei40008dwub8i92wtzq','INVOICE_SENT','Sent invoice via email','Invoice #INV-965716-D12 sent to RoyalPalm','{\"messageId\": \"<782f1033-6055-5e92-1d7a-47d08a4a041b@resend.dev>\", \"includePDF\": true, \"recipientEmail\": \"selvad274@gmail.com\"}',NULL,NULL,'2026-01-08 07:40:45.439'),('cmk5574ql00016oub0nfhf9vy','1','cmk415jx7001h84ubupjzdzzx','cmk520ei40008dwub8i92wtzq','INVOICE_SENT','Sent invoice via email','Invoice #INV-965716-D12 sent to RoyalPalm','{\"messageId\": \"<6c0f99e1-d39a-b1d4-1e6e-706d5001fb0c@resend.dev>\", \"includePDF\": true, \"recipientEmail\": \"selvad274@gmail.com\"}',NULL,NULL,'2026-01-08 07:45:18.523'),('cmk559f7400026oubfs270kll','1','cmk415jx7001h84ubupjzdzzx','cmk51cw200004dwubdddbg0v0','INVOICE_SENT','Sent invoice via email','Invoice #INV-868707-LCP sent to RoyalPalm','{\"messageId\": \"<4bc1287c-7704-b049-75a4-f766f5a0a413@resend.dev>\", \"includePDF\": true, \"recipientEmail\": \"selvad274@gmail.com\"}',NULL,NULL,'2026-01-08 07:47:05.390'),('cmk55huki00036oubjc35az7o','1','cmk415jx7001h84ubupjzdzzx','cmk51cw200004dwubdddbg0v0','INVOICE_SENT','Sent invoice via email','Invoice #INV-868707-LCP sent to RoyalPalm','{\"messageId\": \"<49c58556-62dd-9999-64a5-b75ddce6552d@resend.dev>\", \"includePDF\": true, \"recipientEmail\": \"selvad274@gmail.com\"}',NULL,NULL,'2026-01-08 07:53:38.559'),('cmk55kfeq00046oubmj1mno7k','1','cmk415jx7001h84ubupjzdzzx','cmk41lle4000164ub6f3mm77i','INVOICE_SENT','Sent invoice via email','Invoice #INV-808636-TSE sent to UNILUSH','{\"messageId\": \"<8e9df856-2f51-f8f4-5bad-ff5d67fecd0c@resend.dev>\", \"includePDF\": true, \"recipientEmail\": \"selvad274@gmail.com\"}',NULL,NULL,'2026-01-08 07:55:38.880'),('cmk55qcsm000a6oublkaosvqj','1','cmk415jx7001h84ubupjzdzzx','cmk55qcs800066oubnpplw189','INVOICE_CREATED','Created new invoice','Created invoice: INV-215399-59M','{\"invoiceId\": \"cmk55qcs800066oubnpplw189\"}',NULL,NULL,'2026-01-08 08:00:15.428'),('cmk55s01k000e6oubkmglua94','1','cmk415jx7001h84ubupjzdzzx','cmk55qcs800066oubnpplw189','INVOICE_UPDATED','Updated invoice','Updated invoice and line items: cmk55qcs800066oubnpplw189','{\"status\": \"DRAFT\", \"invoiceId\": \"cmk55qcs800066oubnpplw189\"}',NULL,NULL,'2026-01-08 08:01:32.214'),('cmk569znf000f6oub94s4eouw','1','cmk415jx7001h84ubupjzdzzx',NULL,'CLIENT_UPDATED','Updated client','Updated client: hlo Hospital test','{\"clientId\": \"cmk55qcrh00056oubuj1rjok6\"}',NULL,NULL,'2026-01-08 08:15:31.513');
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-09 10:51:51
