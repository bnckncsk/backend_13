import { Router } from "express";
import { run } from "../controllers/run.ts";

const router = Router();

router.get("/", run);

export default router;