import { integer, numeric, pgEnum, pgTable, serial, uniqueIndex, varchar, smallint, real } from 'drizzle-orm/pg-core'

export const categories = pgTable('categories', {
    name: varchar('name', {length: 50}).primaryKey().unique().notNull()
})

export const products = pgTable('products', {
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
