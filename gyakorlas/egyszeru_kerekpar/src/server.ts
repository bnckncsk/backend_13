import express from "express";
import type { Request, Response, NextFunction } from "express";
import { getAll, getById, create, update, remove } from "./controller.ts";

const app = express();
app.use(express.json());

app.get("/api/bicycle", getAll);
app.get("/api/bicycle/:id", getById);
app.post("/api/bicycle", create);
app.put("/api/bicycle/:id", update);
app.delete("/api/bicycle/:id", remove);

// Hibás JSON törzs esetén 400
app.use((_err: any, _req: Request, res: Response, _next: NextFunction) => {
    res.status(400).send("Az adatok nem megfelelőek!");
});

app.listen(3000, () => console.log("Szerver fut: http://localhost:3000"));
