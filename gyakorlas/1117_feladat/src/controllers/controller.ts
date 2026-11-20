import type { Request, Response } from "express";
import { AnimalManager } from "./animal.ts";

const animalManager = new AnimalManager();
const valid = ["nev", "nev", "leiras", "ar", "raktaron", "kep"]

export const getAnimals = async (_req: Request, res: Response) => {
    res.send(await animalManager.getAllAnimals());
};

export const getAnimalById = async (req: Request, res: Response) => {
    const {id} = req.params;
    const animal = await animalManager.getAnimalById(Number(id));
    if (!animal) {
        res.status(404).send("Az állat nem létezik");
        return;
    }
    res.send(animal);
};

export const createAnimal = async (req: Request, res: Response) => {
    const data = req.body;

    if (!data || !valid.every(key => checkValid(key, data[key]))) {
        res.status(400).send("A megadott adatok nem megfelelőek!");
        return;
    }
    const id = await animalManager.createAnimal(data);
    res.status(201).send({ id });
};

export const updateAnimal = async (req: Request, res: Response) => {
    const {id} = req.params;
    const data = req.body;

    if (!data || !Object.keys(data).every(key => checkValid(key, data[key]))) {
        res.status(400).send("Az adatok nem megfelelőek!");
        return;
    }

    const updated = await animalManager.updateAnimal(Number(id), data);
    if (!updated) {
        res.status(404).send("Az elem nem létezik!");
        return;
    }


    res.send("Sikeres módosítás");
};

export const deleteAnimal = async (req: Request, res: Response) => {
    const {id} = req.params;

    const deleted = await animalManager.deleteAnimal(Number(id));
    if (!deleted) {
        res.status(404).send("A kisállat nem létezik!");
        return;
    }
    res.status(204).send();
};


const checkValid = (key: string, value: any) => {
    if (key == "nev" || key == "leiras" || key == "kep") 
        return typeof value == "string";
    if (key == "ar" || key == "raktaron") 
        return typeof value == "number" && value >= 0;

    return false;
}