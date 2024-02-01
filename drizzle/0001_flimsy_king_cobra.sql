CREATE INDEX IF NOT EXISTS "slug_idx" ON "categories" ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "id_idx" ON "products" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "category_idx" ON "products" ("category");