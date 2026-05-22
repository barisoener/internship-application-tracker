import { Application } from "../types/Application";
import { pool } from "../config/db";


export const getAllApplications = async () => {

    const result = await pool.query(
        "SELECT * FROM applications ORDER BY id ASC"
    );

    return result.rows;
};



export const getApplicationById = async (id: number) => {

    const result = await pool.query(
        "SELECT * FROM applications WHERE id = $1",
        [id]
    );

    return result.rows[0];
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

export const updateApplication = async (
    id: number,
    company: string,
    position: string,
    status: string
) => {

    const result = await pool.query(
        `
        UPDATE applications
        SET company = $1,
            position = $2,
            status = $3
        WHERE id = $4
        RETURNING *
        `,
        [company, position, status, id]
    );

    return result.rows[0];
};

export const deleteApplication = async (id: number) => {

    const result = await pool.query(
        `
        DELETE FROM applications
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
};