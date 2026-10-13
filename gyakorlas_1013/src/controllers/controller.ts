import data from "../app/data/data.ts"
import { Response, Request } from "express"

export const getAllAnimals = (_req: Request, res: Response) => {
    res.json(data);
}

export const getOneAnimal = (req: Request, res: Response) => {
    const animal = data.find(animal =>animal.id == Number(req.params.id))

    if (!animal) {
        res.status(404).send("A kisállat nem létezik")
        return
    }

    res.json(animal)
}

export const addNewAnimal = (req: Request, res: Response) =>{
    const newAnimal = {...req.body, id: Math.max(0, ...data.map(a =>a.id)) + 1}

    if (!newAnimal.nev || !newAnimal.leiras || !newAnimal.ar || !newAnimal.raktaron || !newAnimal.kep) {
        res.status(400).send("Az adatok nem megfelelőek!")
        return
    }

    data.push(newAnimal)
    res.status(201).json(newAnimal.id)
}

export const modifyAnimal = (req:Request, res:Response) =>{
    const animal = data.find(animal => animal.id == Number(req.params.id))

    if (!animal) {
        res.status(404).send("Az elem nem létezik")
        return
    }
    if (!req.body){
        res.status(400).send("Az adatok nem megfelelőek!")
    }

    Object.assign(animal, req.body, { id: animal.id })
    res.status(201).send("Sikeres módosítás")
    res.send(animal)
}

export const deleteAnimal = (req:Request, res: Response) => {
    const animal = data.findIndex(animal => animal.id == Number(req.params.id))

    if (!animal) {
        res.status(404).send("A kisállat nem létezik")
        return
    }

    data.splice(animal, 1)
    res.status(204).send("Kisállat törölve")
}