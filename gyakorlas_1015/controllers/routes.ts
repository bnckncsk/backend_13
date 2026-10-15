import {Router} from "express"
import { getAllBicycles, getOneBicycle, addNewBicycle, modifyBicycle, deleteBicycle } from "./controller.ts"

const router = Router()

router.get("/", getAllBicycles)
router.get("/:id", getOneBicycle)
router.post("/", addNewBicycle)
router.put("/:id", modifyBicycle)
router.delete("/:id", deleteBicycle)

export default router