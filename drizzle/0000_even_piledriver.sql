CREATE TABLE IF NOT EXISTS "categories" (
	"name" varchar(50) PRIMARY KEY NOT NULL,
	"description" varchar(1000),
	"slug" varchar(50) NOT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name"),
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"price" real NOT NULL,
	"amount" smallint DEFAULT 1 NOT NULL,
	"image" varchar(100),
	"description" varchar(1000),
	"category" varchar(50) NOT NULL,
	CONSTRAINT "products_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "slug_idx" ON "categories" ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "id_idx" ON "products" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "category_idx" ON "products" ("category");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_category_categories_name_fk" FOREIGN KEY ("category") REFERENCES "categories"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
