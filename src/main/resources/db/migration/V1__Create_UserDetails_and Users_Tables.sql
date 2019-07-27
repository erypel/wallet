create table users (
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(50) NOT NULL,
  password varchar(225) NOT NULL,
  PRIMARY KEY (id)
);

create table userdetails (
    id int(11) NOT NULL AUTO_INCREMENT,
    firstName varchar(50) NOT NULL,
    lastName varchar(50) NOT NULL,
    salt varchar(255) NOT NULL,
    email varchar(50) NOT NULL,
    userId int(11) NOT NULL,
    PRIMARY KEY (id),
    KEY fk_logins_user_id (userId),
    CONSTRAINT fk_logins_user_id FOREIGN KEY (userId) REFERENCES users (id)
);

