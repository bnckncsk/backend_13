import app from "./app.ts"
import dotenv from "dotenv"
import data from "../app/data/data.ts"
import type { Response, Request } from "express"
dotenv.config()

const PORT = process.env.PORT || 3000



// innentől megjelennek a http metódusok (get, post, put, delete, patch)

// fetch("http://localhost:3000",{method:"POST"}).then(response => response.json().then(data => console.log(data)));
// consoleban lyen bonyolultan lehetne kiirni a post kerest ( fel kell oldani a jsont )
// egy vegponton csak 1 post keres lehet

//fetch("http://localhost:3000/a",{method:"POST"}).then(response =>response.text().then(data => console.log(data)));
// ezt igy kell feloldani (sima szoveget)

app.post("/products", (req:Request, res:Response) => {
    const newProduct = {
    id: data.length > 0
    ? Math.max(...data.map(product => product.id)) + 1
    : 1,

        name: req.body.name,
        category: req.body.category,
        brand: req.body.brand,
        price: req.body.price,
        currency: req.body.currency,
        stock: req.body.stock,
        rating: req.body.rating,
        active: req.body.active,
        description: req.body.description,
        image: req.body.image
    }

    data.push(newProduct)

    res.status(201).json(newProduct)
})

app.get("/", (_req:Request, res:Response) =>{
    res.sendFile("index.html", { root: "./src/app" })
})

app.listen(PORT, () => {
    console.log(`fut a szerver a ${PORT}-on`)        // ez pedig a terminal consoleone
})

// localhost:3000en elérhető böngészőből is