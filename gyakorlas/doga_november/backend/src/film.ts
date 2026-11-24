import mysql from "mysql2/promise";

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "jelszo",
    database: "mozimusor_db"
});

export interface IFilm{
    id: number,
    cim: string,
    rendezo: string,
    megjelenesEve: number,
    jegyAr: number,
    szabadHelyek: number,
    poszter: string
};

export class FilmManager{
    async getAllMovies() {
        const [rows] = await db.query("SELECT * FROM filmek");
        return rows;
    }

    async getOneMovie(id: number) {
        const [rows]: any = await db.query("SELECT * FROM filmek WHERE id = ?", [id]);
        return rows[0];
    }

    async createMovie(data: Partial<IFilm>) {
        const [result]: any = await db.query("INSERT INTO filmek SET ?", [data]);
        return result.insertId;
    }

    async updateMovie(data: Partial<IFilm>, id: number) {
        await db.query("UPDATE filmek SET ? WHERE id = ?", [data, id]);
    }

    async deleteMovie(id: number) {
        const [result]: any = await db.query("DELETE FROM filmek WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }
}