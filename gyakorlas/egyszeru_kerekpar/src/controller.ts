import type { Request, Response } from "express";
import { BicycleManager } from "./bicycle.ts";

const manager = new BicycleManager();
const mezok = ["nev", "leiras", "ar", "raktaron", "kep"];

export const getAll = async (_req: Request, res: Response) => {
    res.send(await manager.getAll());
};

export const getById = async (req: Request, res: Response) => {
    const bicycle = await manager.getById(Number(req.params.id));
    if (!bicycle) {
        res.status(404).send({ message: "A kerékpár nem létezik!" });
        return;
    }
    res.send(bicycle);
};

export const create = async (req: Request, res: Response) => {
    if (!helyes(req.body, true)) {
        res.status(400).send({ message: "Az adatok nem megfelelőek!" });
        return;
    }
    const id = await manager.create(req.body);
    res.status(201).send({ id });
};

export const update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!(await manager.getById(id))) {
        res.status(404).send("Az elem nem létezik");
        return;
    }
    if (!helyes(req.body, false)) {
        res.status(400).send("Az adatok nem megfelelőek!");
        return;
    }
    await manager.update(id, req.body);
    res.send("Sikeres módosítás");
};

export const remove = async (req: Request, res: Response) => {
    if (!(await manager.delete(Number(req.params.id)))) {
        res.status(404).send("A kerékpár nem létezik!");
        return;
    }
    res.status(204).send();
};

// Adatellenőrzés. mindenKell = true -> POST (minden mező kötelező)
const helyes = (data: any, mindenKell: boolean) => {
    if (!data || Object.keys(data).length == 0) return false;
    if (mindenKell && !mezok.every(m => m in data)) return false;

    return Object.keys(data).every(key => {
        const v = data[key];
        if (key == "nev" || key == "leiras" || key == "kep") return typeof v == "string" && v != "";
        if (key == "ar") return typeof v == "number" && v >= 0;
        if (key == "raktaron") return Number.isInteger(v) && v >= 0;
        return false; // ismeretlen mező (pl. id)
    });
};
