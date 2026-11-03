import type { Request, Response } from "express"

export const run = (_req:Request, res:Response) => {
    res.json({
        message: "Hello, fut a szerver!"
    })
}