CREATE TABLE `test1`.`user` ( `id` INT NOT NULL AUTO_INCREMENT , `username` VARCHAR(45) NOT NULL , `email` VARCHAR(45) NOT NULL , `password` VARCHAR(150) NOT NULL , `role` VARCHAR(20)  NOT NULL,  `status` VARCHAR(10) NOT NULL DEFAULT 'active' , PRIMARY KEY (`id`)) ENGINE = InnoDB;