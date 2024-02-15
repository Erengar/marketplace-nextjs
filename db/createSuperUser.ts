import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { eq } from "drizzle-orm";

import "dotenv/config";
import { users } from "./schema";

async function createSuperUser() {
    if (!process.env.POSTGRES_URL) {
        throw new Error("POSTGRES_DATABASE is not defined");
    }
    const db = drizzle(sql);
    const prompt = require("prompt-sync")();
    const email = prompt("Email: ");
    if (!email) {
        throw new Error("Email is required");
    }
    const deleting = prompt("Do you want to delete users with the same email? (y/n): ");
    if (deleting === "y") {
        await db.delete(users).where(eq(users.email, email)).execute();
        console.log("✅ Users with the same email deleted");
    }
    const crypto = require('crypto');
    const uuid = crypto.randomUUID()
    await db.insert(users).values({id: uuid,email:email, group: "superadmin"}).execute()
    console.log("✅ Super user created");

    process.exit(0)

}

createSuperUser().catch((err) => {
    console.error("❌ Super user creation failed");
    console.error(err);
    process.exit(1);
});