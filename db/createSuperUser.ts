import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

import "dotenv/config";
import { users } from "./schema";

async function createSuperUser() {
    if (!process.env.POSTGRES_URL) {
        throw new Error("POSTGRES_DATABASE is not defined");
    }
    const db = drizzle(sql);
    const prompt = require("prompt-sync")();
    const email = prompt("Email: ");
    const crypto = require('crypto');
    const uuid = crypto.randomUUID()
    db.insert(users).values({id: uuid,email:email, group: "superadmin"})
    console.log("✅ Super user created");

    process.exit(0)

}

createSuperUser().catch((err) => {
    console.error("❌ Super user creation failed");
    console.error(err);
    process.exit(1);
});