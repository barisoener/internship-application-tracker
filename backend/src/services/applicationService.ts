import { Application } from "../types/Application";
import { pool } from "../config/db";

export const getAllApplications = async () => {

    const result = await pool.query(
        "SELECT * FROM applications ORDER BY id ASC"
    );

    return result.rows;
};

export const addApplication =async ( company: string,position: string, status: string) => {
    const result = await pool.query(
        `
        INSERT INTO applications (company, position, status)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [company, position, status]
    );

    return result.rows[0];
};