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
-- Table structure for table `client_licenses`
--

DROP TABLE IF EXISTS `client_licenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client_licenses` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `plan_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `workspace_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `startDate` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `renewalDate` datetime(3) NOT NULL,
  `endDate` datetime(3) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `notes` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `client_licenses_client_id_plan_id_key` (`client_id`,`plan_id`),
  KEY `client_licenses_plan_id_fkey` (`plan_id`),
  KEY `client_licenses_workspace_id_fkey` (`workspace_id`),
  CONSTRAINT `client_licenses_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `client_licenses_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `plan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `client_licenses_workspace_id_fkey` FOREIGN KEY (`workspace_id`) REFERENCES `workspaces` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_licenses`
--

LOCK TABLES `client_licenses` WRITE;
/*!40000 ALTER TABLE `client_licenses` DISABLE KEYS */;
INSERT INTO `client_licenses` VALUES ('cmkca4f17000250ubsej5qmy7','cmkc9mxhi000050ubavtclj4a','ckxyz1234567890abcdef1234','cmkc9kuqn0000x4ubf7m3fo0a','2026-01-13 07:37:33.200','2026-02-13 07:37:33.200','2031-01-13 07:37:33.200',1,''),('cmkcaebqq000550ubnwpit7as','cmkcacnwm000350ubv8b4aln9','ckxyz1234567890abcdef1234','cmkc9kuqn0000x4ubf7m3fo0a','2026-01-13 07:45:15.499','2026-02-13 07:45:15.499','2031-01-13 07:45:15.499',1,''),('cmkcawzud000650ubtg7hokrm','cmkcacnwm000350ubv8b4aln9','ckxyz1234567890abcdef1235','cmkc9kuqn0000x4ubf7m3fo0a','2026-01-13 07:59:46.546','2027-01-13 07:59:46.546','2031-01-13 07:59:46.546',1,''),('cmkcb7npk000c50ubyaoc64ie','cmkc9mxhi000050ubavtclj4a','ckxyz1234567890abcdef1235','cmkc9kuqn0000x4ubf7m3fo0a','2026-01-13 08:08:04.036','2027-01-13 08:08:04.036','2031-01-13 08:08:04.036',1,''),('cmkcbfu49000f50ub7crcyt7m','cmkcbci0v000d50ubnyik7553','ckxyz1234567890abcdef1234','cmkc9kuqn0000x4ubf7m3fo0a','2026-01-13 08:14:25.590','2026-02-13 08:14:25.590','2031-01-13 08:14:25.590',1,''),('cmkcbl230000h50ubpijjtith','cmkcbci0v000d50ubnyik7553','ckxyz1234567890abcdef1235','cmkc9kuqn0000x4ubf7m3fo0a','2026-01-13 08:18:29.192','2027-01-13 08:18:29.192','2031-01-13 08:18:29.192',1,'');
/*!40000 ALTER TABLE `client_licenses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-13 13:51:58
