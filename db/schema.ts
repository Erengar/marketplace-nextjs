import {
  pgTable,
  serial,
  varchar,
  smallint,
  real,
  uuid,
  index,
} from "drizzle-orm/pg-core";

export var categories = pgTable(
  "categories",
  {
    name: varchar("name", { length: 50 }).primaryKey().unique().notNull(),
    description: varchar("description", { length: 1000 }),
    slug: varchar("slug", { length: 50 }).unique().notNull(),
  },
  (table) => {
    return {
      slugIdx: index("slug_idx").on(table.slug),
    };
  }
);

//Remake this with uuid instead of serial
export var products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    name: varchar("name", { length: 50 }).unique().notNull(),
    price: real("price").notNull(),
    amount: smallint("amount").notNull().default(1),
    image: varchar("image", { length: 100 }),
    description: varchar("description", { length: 1000 }),
    category: varchar("category", { length: 50 })
      .references(() => categories.name)
      .notNull(),
  },
  (table) => {
    return {
      idIdx: index("id_idx").on(table.id),
      categoryIdx: index("category_idx").on(table.category),
    };
  }
);

/*
export var users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 20 }).unique().notNull(),
    email: varchar("email", { length: 50 }).unique().notNull(),
    password: varchar("password", { length: 20 }).notNull(),
    location: varchar("location", { length: 50 }).references(() => location.id),
  },
  table => {
    return {
      usernameIdx: index("username_idx").on(table.username),
      emailIdx: index("email_idx").on(table.email)
    }
  }
)

export var location = pgTable(
  'location', 
  {
    id: serial('id').primaryKey(),
    country: varchar('country', {length: 50}).notNull(),
    city: varchar('city', {length: 50}).notNull(),
    address: varchar('address', {length: 100}).notNull()
  },
  table => {
    return {
      idIdx: index('id_idx').on(table.id)
    }
  }
)*/

export type CategoryType = typeof categories.$inferSelect;
export type ProductType = typeof products.$inferSelect;