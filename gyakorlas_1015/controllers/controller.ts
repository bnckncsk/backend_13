import data from "../src/data/kerekpar.ts"
import { Request, Response } from "express"

export const getAllBicycles = (_req: Request, res: Response) => {
    res.send(data);
}

export const getOneBicycle = (req: Request, res: Response) => {
    const bicycle = data.find(b =>b.id === Number(req.params.id))

    if (!bicycle) {
        res.status(404).send("A kerékpár nem létezik")
        return
    }

    res.send(bicycle)
}

export const addNewBicycle = (req: Request, res: Response) => {
    const newBicycle = {
        ...req.body,
        id: Math.max(0, ...data.map(b => b.id)) + 1
    }

    if (!newBicycle.nev || !newBicycle.leiras || !newBicycle.ar || !newBicycle.raktaron || !newBicycle.kep) {
        res.status(400).send("A megadott adatok nem megfelelőek!")
        return
    }

    data.push(newBicycle)
    res.status(201).json( {id: newBicycle.id} )
}

export const modifyBicycle = (req: Request, res: Response) => {
    const bicycle = data.find(b => b.id === Number(req.params.id))

    if (!bicycle) {
        res.status(404).send("Az elem nem létezik")
        return
    }

    const allowed = ["nev", "leiras", "ar", "raktaron", "kep"]
    const keys = Object.keys(req.body)
    if (keys.length === 0 ||!keys.every(k => allowed.includes(k))){
        res.status(400).send("Az adatok nem megfelelőek!")
        return
    }

    Object.assign(bicycle, req.body, { id: bicycle.id })
    res.status(200).send("Sikeres módosítás")
}

export const deleteBicycle = (req: Request, res: Response) =>{
    const index = data.findIndex(b => b.id === Number(req.params.id))

    if (index === -1) {
        res.status(404).send("A kerékpár nem létezik!")
        return
    }

    data.splice(index, 1)
    res.status(204).send()
}