CREATE TABLE IF NOT EXISTS "categories" (
	"name" varchar(50) PRIMARY KEY NOT NULL,
	"description" varchar(1000),
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"price" real NOT NULL,
	"amount" smallint DEFAULT 1 NOT NULL,
	"image" varchar(100),
	"description" varchar(1000),
	"category" varchar(50) NOT NULL,
	CONSTRAINT "products_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_category_categories_name_fk" FOREIGN KEY ("category") REFERENCES "categories"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;