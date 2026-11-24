import express from "express";
import { createMovie, deleteMovie, getAllMovies, getOneMovie, updateMovie } from "./controller.ts";

const app = express()
app.use(express.json())



app.get("/api/movies", getAllMovies);
app.get("/api/movies/:id", getOneMovie);
app.post("/api/movies", createMovie);
app.put("/api/movies/:id", updateMovie);
app.delete("/api/movies/:id", deleteMovie);


app.listen(3000, () => console.log("Fut a szerver"));