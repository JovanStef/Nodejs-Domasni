-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: code_academy
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `surname` varchar(30) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `age` int(2) NOT NULL,
  `isActive` tinyint(1) DEFAULT NULL,
  `password` varchar(64) NOT NULL DEFAULT 'password',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Trpe','Trpeski','Trpeski_trpe@gmail.com',28,1,'password'),(2,'Martin','Martinovski','martin@gmail.com',20,0,'password'),(3,'Simona','Simonovska','simona@gmail.com',28,1,'password'),(4,'Marija','Kuzmanoska','huanamari@gmail.com',18,1,'password'),(5,'Marija','Stojkovska','marija@gmail.com',25,1,'password'),(6,'Petar','Petrovski','petar@gmail.com',22,0,'password'),(7,'Simona','Simonovska','simona@gmail.com',28,1,'password'),(8,'Code','Academy','code@gmail.com',23,1,'password'),(9,'Code2','Academy2','code2@gmail.com',23,1,'password'),(10,'Martin','Martinovski','martin@gmail.com',20,0,'password'),(14,'Drn','Drnov','drndrndrn@gmail.com',28,1,'password'),(15,'Trpe','Trpeski','Trpeski_trpe@gmail.com',28,1,'password'),(16,'Maaaarija','Stojkovska','ghtyr@gmail.com',25,1,'password'),(17,'Simona','Simonovska','imon@gmail.com',28,1,'imon'),(18,'Salmona','Simonovska','gigi@gmail.com',128,1,'$2a$08$5rUab4saF9KcmcZIb78.OuMkcbCJc.kgz7av/OsaoIcUUGaV2PGXi');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-05  8:35:07
