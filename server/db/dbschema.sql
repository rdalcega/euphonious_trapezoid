CREATE DATABASE IF NOT EXISTS Sphero;

USE Sphero;

CREATE TABLE IF NOT EXISTS `Users` (
  `Player_ID` INT NOT NULL AUTO_INCREMENT,
  `Player_Name` varchar(25) NOT NULL,
  `Password` varchar(25) NOT NULL,
  `Ranking` INT NOT NULL,
  PRIMARY KEY (`Player_ID`)
);

CREATE TABLE IF NOT EXISTS `Friends` (
  `Player_ID` INT NOT NULL,
  `Player_ID` INT NOT NULL
);

ALTER TABLE `Friends` ADD CONSTRAINT `Friends_fk0` FOREIGN KEY (`Player_ID`) REFERENCES `Users`(`Player_ID`);

ALTER TABLE `Friends` ADD CONSTRAINT `Friends_fk1` FOREIGN KEY (`Player_ID`) REFERENCES `Users`(`Player_ID`);