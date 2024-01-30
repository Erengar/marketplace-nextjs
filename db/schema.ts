import { pgTable, serial, varchar, smallint, real, uuid } from 'drizzle-orm/pg-core'

export var categories = pgTable('categories', {
    name: varchar('name', {length: 50}).primaryKey().unique().notNull(),
    description : varchar('description', {length: 1000}),
    slug: varchar('slug', {length: 50}).unique().notNull()
})

//Remake this with uuid instead of serial
export var products = pgTable('products', {
    id: serial('id').primaryKey().notNull(),
    name: varchar('name', {length: 50}).unique().notNull(),
    price: real('price').notNull(),
    amount: smallint('amount').notNull().default(1),
    image: varchar('image', {length: 100}),
    description: varchar('description', {length: 1000}),
    category: varchar('category', {length: 50}).references(() => categories.name).notNull()
})

export type CategoryType = typeof categories.$inferSelect
export type ProductType = typeof products.$inferSelect
