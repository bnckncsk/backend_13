import express from "express";
import cors from "cors";

import routes from "../routes/routes.ts";
import animalRoutes from "../controllers/routes.ts";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/", routes);
app.use("/api/pet", animalRoutes);

export default app;