CREATE DATABASE IF NOT EXISTS test;
USE test;

CREATE TABLE `profiles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) DEFAULT NULL,
  `followers` INT DEFAULT NULL,
  `following` INT DEFAULT NULL,
  `public_repos` INT DEFAULT NULL,
  `total_stars` INT DEFAULT NULL,
  `total_forks` INT DEFAULT NULL,
  `top_language` VARCHAR(100) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
)