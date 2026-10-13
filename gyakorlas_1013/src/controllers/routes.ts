import { Router } from "express";
import { addNewAnimal, deleteAnimal, getAllAnimals, getOneAnimal, modifyAnimal } from "./controller.ts";

const router = Router()

router.get("/", getAllAnimals)
router.get("/:id", getOneAnimal)
router.post("/", addNewAnimal)
router.patch("/:id", modifyAnimal)
router.delete("/:id", deleteAnimal)

export default router