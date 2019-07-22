CREATE TABLE IF NOT EXISTS wallets (
    id INT(11) AUTO_INCREMENT NOT NULL,
    publicKey VARCHAR(511) NOT NULL,
    privateKey VARCHAR(511) NOT NULL,
    userId int(11),
    KEY fk_wallets_user_id (userId),
    CONSTRAINT fk_wallets_user_id FOREIGN KEY (userId) REFERENCES users (id),
    CONSTRAINT pk_wallets PRIMARY KEY (id)
);