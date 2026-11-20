import { Router } from "express";

import { getAnimals, getAnimalById, createAnimal, updateAnimal, deleteAnimal} from "./controller.ts";

const router = Router();

router.get("/", getAnimals);
router.get("/:id", getAnimalById);
router.post("/", createAnimal);
router.patch("/:id", updateAnimal);
router.delete("/:id", deleteAnimal);

export default router;