import mysql from "mysql2/promise";

// Kapcsolat a Dockerben futó MySQL-hez
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "jelszo",
    database: "kerekpar"
});

export interface IBicycle {
    id: number,
    nev: string,
    leiras: string,
    ar: number,
    raktaron: number,
    kep: string
}

export class BicycleManager {
    async getAll() {
        const [rows] = await db.query("SELECT * FROM kerekparok");
        return rows;
    }

    async getById(id: number) {
        const [rows]: any = await db.query("SELECT * FROM kerekparok WHERE id = ?", [id]);
        return rows[0]; // ha nincs ilyen: undefined
    }

    async create(data: Partial<IBicycle>) {
        const [result]: any = await db.query("INSERT INTO kerekparok SET ?", [data]);
        return result.insertId; // az új id-t a MySQL adja (AUTO_INCREMENT)
    }

    async update(id: number, data: Partial<IBicycle>) {
        await db.query("UPDATE kerekparok SET ? WHERE id = ?", [data, id]);
    }

    async delete(id: number) {
        const [result]: any = await db.query("DELETE FROM kerekparok WHERE id = ?", [id]);
        return result.affectedRows > 0; // false, ha nem volt mit törölni
    }
}
