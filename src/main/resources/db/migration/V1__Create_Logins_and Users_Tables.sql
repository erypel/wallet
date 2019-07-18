create table users (
  id int(11) NOT NULL AUTO_INCREMENT,
  firstName varchar(50) NOT NULL,
  lastName varchar(50) NOT NULL,
  username varchar(50) NOT NULL,
  password varchar(50) NOT NULL,
  email varchar(50) NOT NULL,
  PRIMARY KEY (id)
);

create table logins (
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(20) NOT NULL,
  password varchar(50) NOT NULL,
  user int(11) NOT NULL,
  PRIMARY KEY (id),
  KEY fk_logins_user_id (user),
  CONSTRAINT fk_logins_user_id FOREIGN KEY (user) REFERENCES users (id)
);

