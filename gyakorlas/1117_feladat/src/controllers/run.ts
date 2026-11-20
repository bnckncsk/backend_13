import type { Request, Response } from "express";

export const run = (_req: Request, res: Response) => {
    res.status(200).send("Fut a szerver");
};