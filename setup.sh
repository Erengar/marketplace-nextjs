export PATH=$PATH:/C/"Program Files"/PostgreSQL/16/bin

queries=("DROP TABLE products;"
        "DROP TABLE categories;"
        "CREATE TABLE categories (
        name varchar(50) PRIMARY KEY NOT NULL UNIQUE
        );"
        "CREATE TABLE products (
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
        );"
        )

db="postgres://default:IXp4KEmVb3Tk@ep-still-pond-64699180.eu-central-1.postgres.vercel-storage.com:5432/verceldb"

for query in "${queries[@]}"; do
  psql -d $db -c "$query"
done