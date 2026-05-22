import { Pool } from "pg";

export const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "Baris",
    password: "Blutmakin1.",
    database: "application_tracker"
});

pool.connect()
    .then(() => {
        console.log("Connected to PostgreSQL!");
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });