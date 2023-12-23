CREATE TABLE products (
id serial PRIMARY KEY NOT NULL,
name varchar (50) NOT NULL UNIQUE,
price numeric(10,2) NOT NULL,
amount smallint,
image varchar(100),
description varchar(1000),
category varchar(50),
CONSTRAINT fk_category
FOREIGN KEY(category)
REFERENCES categories(name)
);

CREATE TABLE categories (
name varchar(50) PRIMARY KEY NOT NULL
);