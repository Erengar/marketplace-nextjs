CREATE TABLE products (
id serial PRIMARY KEY NOT NULL,
name varchar (50) NOT NULL UNIQUE,
amount smallint,
category varchar(50),
CONSTRAINT fk_category
FOREIGN KEY(category)
REFERENCES categories(name)
);

