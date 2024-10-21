-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: bookstore
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `category_id` int NOT NULL,
  `original_price` decimal(10,2) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `book_condition` varchar(50) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text,
  `subcategory_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `posted_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `subcategory_id` (`subcategory_id`),
  KEY `userid_idx` (`user_id`),
  CONSTRAINT `book_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `book_ibfk_2` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory` (`id`),
  CONSTRAINT `userid` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (19,'Gggggg',2,888.00,55.00,'new','desktop-wallpaper-ford-raptor-is-ready-for-battle-black-ford-raptor.jpg','nnnnnn',12,13,'2024-10-08 17:18:32'),(21,'The HarryPoter',1,2888.00,1787.00,'used','image1.png','novel and more ',1,16,'2024-10-08 17:18:32'),(26,'The Great Gatsby',1,500.00,400.00,'New',NULL,'A classic novel exploring themes of wealth and love.',1,18,'2024-10-18 06:49:56'),(27,'The Great Gatsby',1,500.00,400.00,'New','notfound.jpg','A classic novel exploring themes of wealth and love.',1,18,'2024-10-18 06:50:10'),(28,'Sapiens: A Brief History of Humankind',1,800.00,650.00,'New','notfound.jpg','An overview of human history and evolution.',2,18,'2024-10-18 06:51:29'),(29,'Learning Python',9,800.00,600.00,'Like New','spring.png','A comprehensive guide to Python programming.',13,18,'2024-10-18 07:38:49');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmark`
--

DROP TABLE IF EXISTS `bookmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark` (
  `id` int NOT NULL AUTO_INCREMENT,
  `book_id` int DEFAULT NULL,
  `buyer_id` int DEFAULT NULL,
  `seller_id` int DEFAULT NULL,
  `Flag` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark`
--

LOCK TABLES `bookmark` WRITE;
/*!40000 ALTER TABLE `bookmark` DISABLE KEYS */;
INSERT INTO `bookmark` VALUES (1,29,18,18,0),(2,29,15,18,0);
/*!40000 ALTER TABLE `bookmark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Fiction'),(2,'Non-Fiction'),(3,'Science'),(4,'History'),(5,'Fantasy'),(7,'+2'),(8,'School'),(9,'Bachelor'),(11,'Masters');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recommendation`
--

DROP TABLE IF EXISTS `recommendation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recommendation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `book_id` int DEFAULT NULL,
  `user_click` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_recommendation_idx` (`user_id`),
  KEY `book_id_recommendation_idx` (`book_id`),
  CONSTRAINT `book_id_recommendation` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id_recommendation` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recommendation`
--

LOCK TABLES `recommendation` WRITE;
/*!40000 ALTER TABLE `recommendation` DISABLE KEYS */;
INSERT INTO `recommendation` VALUES (1,13,19,10),(2,13,21,1),(4,13,29,3),(5,22,29,2),(6,13,26,1);
/*!40000 ALTER TABLE `recommendation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategory`
--

DROP TABLE IF EXISTS `subcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `subcategory_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategory`
--

LOCK TABLES `subcategory` WRITE;
/*!40000 ALTER TABLE `subcategory` DISABLE KEYS */;
INSERT INTO `subcategory` VALUES (1,'Literary Fiction',1),(2,'Historical Fiction',1),(3,'Science Fiction',5),(4,'Self-Help',2),(5,'Science Experiments',3),(6,'Science',7),(7,'Humanities',7),(8,'Law',7),(9,'Management',7),(10,'BBA',9),(11,'BBS',9),(12,'Engineering',9),(13,'IT',9),(14,'BHM',9),(15,'BCA',9),(16,'BA',9),(17,'Medical',9),(18,'Grade 10',8),(19,'Grade 9',8),(20,'Grade 8',8),(21,'MBA',11),(22,'MBS',11);
/*!40000 ALTER TABLE `subcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (13,'Dipson Shrestha','dipson123@gmail.com','$2y$10$li6l5WnxjnhiWKs8mUfTTuPaZIab87Svo30fBp0WMK3AYIMR8WW/6','9841289756','Pokhara','USER'),(14,'Dipson Shrestha','admin@gmail.com','$2y$10$eUXPYu71tpoaTBfF6RwnkuIA6VkkvjrrzccfyMqLkQ/gAVlqvJm1.','9841289756','Pokhara','ADMIN'),(15,'Andrew','andrew@gmail.com','$2y$10$E9OM7yW9.wwTv64O9J1fkuBHYG47Yy3ZBMjqViLYjH78hP57Q/.kq','9852147636','Kathmandu','USER'),(16,'Bob','bob@gmail.com','$2y$10$j74cjl0exf2jHVLL2Jid4.wE5AEAVUcToooP34Azv12H.z.XTgg8i','9852147637','Kathmandu','USER'),(17,'Carl','carl@gmail.com','$2y$10$cIsxW6MLOXMbXNyjXQ2RtemxjW9OVEtW6v.QlEii73303mr6WSWAm','9871456232','Pokhara','USER'),(18,'Dev','dev@gmail.com','$2y$10$oc1L.e2bEyRqhwJzXJgiWO2xa/nBtc9sYNgIwbXNMNi787hsArvFO','9863214785','Pokhara','USER'),(19,'Eve','eve@gmail.com','$2y$10$2/DhQnGqf2h3hhOCCgNYHOFZK65pLcEQqo1ppuxUYvnaT8el46Kay','963258741','Bhaktapur','USER'),(20,'Fin','fin@gmail.com','$2y$10$b4ByFtFWMtNOQk32p3BQL.5U45CiK6IqqKRoguaN4mItV2L9Xx2Qu','9862514739','Bhaktapur','USER'),(21,'heroalom','hero@gmail.com','$2y$10$M6q9CBR/B9CsBWxOsjqHpu1ezvyMZP2ZdAdFsBjhIm2QHw.HvNMTi','123123123','kalimati','ADMIN'),(22,'alom','alom@gmail.com','$2y$10$HYqfDGcrY6PclI78uPCOC.oC0dwzMuRNvVFP6ZRJ1g9JX/wg9B9Jq','1231231231','alom','USER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-21 22:07:57
