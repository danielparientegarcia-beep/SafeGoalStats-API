-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: localhost    Database: safegoalstats
-- ------------------------------------------------------
-- Server version	8.0.45-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `sesiones`
--

DROP TABLE IF EXISTS `sesiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sesiones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `expira_en` datetime NOT NULL,
  `creado_en` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `sesiones_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sesiones`
--

LOCK TABLES `sesiones` WRITE;
/*!40000 ALTER TABLE `sesiones` DISABLE KEYS */;
/*!40000 ALTER TABLE `sesiones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('admin','usuario') DEFAULT 'usuario',
  `creado_en` datetime DEFAULT CURRENT_TIMESTAMP,
  `ultimo_login` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'testuser','test@test.com','$2b$10$.W5Ea.sP7HZOaaY/WQKFge6412ly3KJRPMS.q8pKK5IP4MutBQ4pq','usuario','2026-04-10 16:49:00',NULL),(2,'testeo-gor','testeoo@gmail.com','$2b$10$We2DJUFYUcAbOqr8s9v2HewcjqqjjTvxt.PNLVWhYngsN9di/gn3C','usuario','2026-04-10 17:30:19',NULL),(3,'Dexter Morgan','dextermorgan@gmail.com','$2b$10$/AxbXfRvmk9.11ri2o9DfuiARX767G66KYj0fhRfKfCxrmhZ7wDg2','usuario','2026-04-15 18:41:26',NULL),(4,'alex','alexrubiorosa@elpuig.xeill.net','$2b$10$nlHFV0XbDsIy6CwHfQtZnOPM3fde4JSVl.yt4.hoGqRgBuRF3Z75q','usuario','2026-04-15 18:43:03',NULL),(5,'Raphinha_oro','raphael11@gmail.com','$2b$10$LlZTXN9UTG6WQu2pUjKX2uZ9oxo5SvGQWfSlQy7F3qx9Oc5ouz9sy','usuario','2026-04-22 18:57:09',NULL),(6,'Subaru','suabaru@gmail.com','$2b$10$uvflgIy79rwuTq74bgBZm.74EuPbTjJV5cCy167qeT/ZZawBnQ3yy','usuario','2026-04-24 16:22:42',NULL),(7,'alejandro','medranomartinezalejandro@gmail.com','$2b$10$wyVDCDsfmUTss7q8F5la0OGMq3TqaEnUwX4ttp1/FyeQnSWG2TBvO','usuario','2026-04-24 16:23:36',NULL),(9,'Dani','danielparientegarcia@elpuig.xeill.net','$2b$10$wvxkNTdeTnq0T.iCrfNy1.5EonvAg6ZtgjDz8SdvP3dEXfycyoLo6','usuario','2026-04-24 17:14:43',NULL),(10,'alexrubio','alexrubio@gmail.com','$2b$10$hFEk4O1.LY1XLRFuUC66L.r3SmSWdia1OmI1Mqrjl1ZQGFIn2mdyW','usuario','2026-04-29 18:35:00',NULL),(15,'Goated','goat@gmail.com','$2b$10$It/YxAYbc157Ms9pQfBrZeh2.l6v7QfAdMb9BZrE.4ALI4kfKh7ue','usuario','2026-05-06 18:40:07',NULL),(16,'antonio','antonio@gmail.com','$2b$10$zdw620ieYcHigeUHHm13TOHLHscpJfZk.ePhzksLLBRVtevEp1QmW','usuario','2026-05-06 19:34:55',NULL),(24,'TLI_deleted','dapaga2007@gmail.com','$2b$10$M4mScz/elEjt/O1hSwk0n.4lLQbAEgNDmgFcibbxVkPVtr6iuWi9i','usuario','2026-05-14 16:03:47',NULL),(25,'abc','a@a.com','$2b$10$5DntPNGarWZils78QmPA/Odo9CtXjMtXdMoB3IQa2Pyvi.59eFCYO','usuario','2026-05-14 16:40:26',NULL),(26,'usuario123','test12345@test.com','$2b$10$rJCJn./MLZtbEy5W0MFBg.c7Pgk.Hxn0eAtkUaOWlJaKE.wUaBRx2','usuario','2026-05-14 16:48:28',NULL),(27,'test123','test999@test.com','$2b$10$SypoVETMgx0GTeFaroSUE.htwiBNxbDNDJ9uBg2o5Frhh//Adl8Di','usuario','2026-05-14 16:58:08',NULL),(28,'nuevoUser','nuevo@email.com','$2b$10$In4SoOfLYC9iE8oP3GqJxeIFJOsNTbek2yWblEFi.bWtTqWFpYEdu','usuario','2026-05-15 14:34:13',NULL),(29,'usuario1','testeo@test.com','$2b$10$c6DJhWS8.46riBjPCwlTnuS05SMc1u9gG3QKwcm1CQ6D54649xKfe','usuario','2026-05-15 15:36:58',NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-15 16:54:45
