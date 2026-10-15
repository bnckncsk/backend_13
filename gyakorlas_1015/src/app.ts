import express from "express";
import bicycleRoutes from "../controllers/routes.ts"

const app = express()

app.use(express.json())

app.use("/api/bicycle", bicycleRoutes)

export default app