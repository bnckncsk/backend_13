import express from "express";
import petRoutes from "../controllers/routes.ts"

const app = express()

app.use(express.json())

app.use("/pet", petRoutes)


export default app