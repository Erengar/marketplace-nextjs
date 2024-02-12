import {
    pgTable,
    serial,
    varchar,
    smallint,
    real,
    uuid,
    index,
    text,
    timestamp,
    integer,
    primaryKey,
    jsonb
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { CartItemType } from "@/app/schemas";

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
    },
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
            .references(() => categories.name, { onDelete: "set null" })
            .notNull(),
    },
    (table) => {
        return {
            idIdx: index("id_idx").on(table.id),
            categoryIdx: index("category_idx").on(table.category),
        };
    },
);


export var users = pgTable("user", {
    id: text("id").notNull().primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    cart: jsonb("cart").$type<CartItemType[]>()
});

export var accounts = pgTable(
    "account",
    {
        userID: text("userID")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount["type"]>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    }),
);

export var sessions = pgTable("session", {
    sessionToken: text("sessionToken").notNull().primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export var verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (vt) => ({
        compoundkey: primaryKey({ columns: [vt.identifier, vt.token] }),
    }),
);

export type CategoryType = typeof categories.$inferSelect;
export type ProductType = typeof products.$inferSelect;
export type UserType = typeof users.$inferSelect;
export type AccountType = typeof accounts.$inferSelect;
export type SessionType = typeof sessions.$inferSelect;
export type VerificationTokenType = typeof verificationTokens.$inferSelect;