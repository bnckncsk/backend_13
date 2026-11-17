import mysql from "mysql2/promise";
import config from "../app/config.ts";

export interface IAnimal {
    id:number,
    nev: string,
    leiras: string,
    ar: number,
    raktaron: number,
    kep: string
}

export class Animal implements IAnimal {
    private _id:number;
    private _nev: string;
    private _leiras: string;
    private _ar: number;
    private _raktaron: number;
    private _kep: string;

    constructor(data: Partial<IAnimal> = {}) {
        this._id = data.id ?? 0;
        this._nev = data.nev ?? '';
        this._leiras = data.leiras ?? '';
        this._ar = data.ar ?? 0;
        this._raktaron = data.raktaron ?? 0;
        this._kep = data.kep ?? '';
    }

    get id(): number {
        return this._id;
    }
    set id(value: number) {
        this._id = value;
    }

    get nev(): string {
        return this._nev;
    }
    set nev(value: string) {
        this._nev = value;
    }

    get leiras(): string {
        return this._leiras;
    }
    set leiras(value: string) {
        this._leiras = value;
    }

    get ar(): number {
        return this._ar;
    }
    set ar(value: number) {
        if (value < 0) {
            throw new Error("Az ár nem lehet negatív!")
        }
        this._ar = value;
    }

    get raktaron(): number {
        return this._raktaron;
    }
    set raktaron(value: number) {
        if (value < 0) {
            throw new Error("A raktaron valtozo nem lehet negativ!");
        }
        this._raktaron = value;
    }

    get kep(): string {
        return this._kep;
    }
    set kep(value: string) {
        this._kep = value;
    }

    public toJSON(): IAnimal {
        return {
            id: this._id,
            nev: this._nev,
            leiras: this._leiras,
            ar : this._ar,
            raktaron: this._raktaron,
            kep: this._kep
        };
    }
}




export class AnimalManager {
    public async getAllAnimals(){
        try {
            const conn = await mysql.createConnection(config);
            const [rows]: any = await conn.query("SELECT * FROM pet");
            await conn.end();
            return rows.map((row: any) => new Animal( {...row} ))
        }
        catch (err) {
            console.error("hiba az osszes kisallat lekerdezesekor:", err);
            return [];
        }
    }

    public async getAnimalById(id: number){
        try {
            const conn = await mysql.createConnection(config);
            const [rows]: any = await conn.query("SELECT * FROM pet WHERE id = ?", [id]);
            await conn.end();
            if (!rows[0]) {
                return null
            }
            return new Animal( {...rows[0]} );
        }
        catch (err) {
            console.error("hiba az allat lekerdezesekor:", err);
            return null;
        }
    }




    public async createAnimal(data: Partial<IAnimal>){
        try {
            const conn = await mysql.createConnection(config);
            const result: any = await conn.query("INSERT INTO pet VALUES (null, ?, ?, ?, ?, ?)", [data.nev, data.leiras, data.ar, data.raktaron, data.kep]);
            await conn.end();
            return result[0].insertId;
        }
        catch (err){
            console.error("hiba az allat hozzaadasakor:", err);
            return undefined;
        }
    }

    public async updateAnimal(id: number, data: Partial<IAnimal>){
        try {
            const conn = await mysql.createConnection(config);
            const [result]: any = await conn.query("UPDATE pet SET ? WHERE id = ?", [data, id]);
            await conn.end();
            return result.affectedRows > 0;
        }
        catch (err){
            console.error("hiba az allat modositasakor:", err);
            return false;
        }
    }

    public async deleteAnimal(id: number){
        try {
            const conn = await mysql.createConnection(config);
            const [result]: any = await conn.query("DELETE FROM pet WHERE id = ?", [id]);
            await conn.end();
            return result.affectedRows > 0;
        }
        catch (err){
            console.error("hiba az allat torlesekor:", err);
            return false;
        }
    }
}