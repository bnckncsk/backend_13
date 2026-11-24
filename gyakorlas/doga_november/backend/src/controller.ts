import type { Request, Response } from "express";
import { FilmManager } from "./film.ts";

const manager = new FilmManager();
const mezok = ["cim", "rendezo", "megjelenesEve", "jegyAr", "szabadHelyek", "poszter"];


export const getAllMovies = async (_req: Request, res: Response) => {
    res.send(await manager.getAllMovies());
}

export const getOneMovie = async (req:Request, res:Response) =>{
    const film = await manager.getOneMovie(Number(req.params.id));
    if (!film) {
        res.status(404).send("A film nem létezik!");
        return;
    }
    res.send(film);
}

export const createMovie = async (req:Request, res:Response) => {
    if (!validalas(req.body) || !mezok.every(m => m in req.body)) {
        res.status(400).send("Az adatok nem megfelelőek!");
        return;
    }

    const id = await manager.createMovie(req.body);
    res.status(201).send( {id} );
}

export const updateMovie = async (req: Request, res: Response) =>{
    if (!validalas(req.body)) {
        res.status(400).send("Az adatok nem megfelelőek!");
        return;
    }

    const film = await manager.getOneMovie(Number(req.params.id))
    if (!film){
        res.status(404).send("A film nem létezik!");
        return;
    }

    await manager.updateMovie(req.body, Number(req.params.id));
    res.status(200).send("Sikeres módosítás");
}

export const deleteMovie = async (req:Request, res: Response) =>{
    if (! (await manager.deleteMovie(Number(req.params.id)))) {
        res.status(404).send("A film nem létezik!");
        return;
    }

    res.status(204).send();
}



const validalas = (data: any) => {
    if (!data || Object.keys(data).length == 0)
        return false;

    return Object.keys(data).every(key => {
        const adat = data[key];

        if (key == "cim" || key == "rendezo" || key == "poszter")
            return typeof adat == "string" && adat != "";

        if (key == "megjelenesEve" || key == "jegyAr" || key == "szabadHelyek")
            return typeof adat == "number" && adat >= 0;

        return false;
    })
}