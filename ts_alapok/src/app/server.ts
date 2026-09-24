import express from "express"      // default export ezert igy importaljuk (az express helyett barmi irhato)
import type {Request, Response} from "express"
import data from "./data/data.ts"

const app = express()       // egy sorban egy utasításnál elhagyható a ;

app.use(express.json())     // json formátumban dolgozza fel az adatokat

app.use(express.static("./src/app"))

// app.get("/", (_req:Request, res:Response) => {   // ha a req nincs hasznalva, alahuzast kell ele tenni
//     res.json({
//         message: "hello fut a szerver"      // ez megjelenik az oldalon
//     })
// })

// innentől megjelennek a http metódusok (get, post, put, delete, patch)

app.post("/", (_req:Request, res:Response) =>{
    res.json({
        message: "hello, ez egy POST kérés" // postmanen keresztul elerheto pl
    })
})
// fetch("http://localhost:3000",{method:"POST"}).then(response => response.json().then(data => console.log(data)));
// consoleban lyen bonyolultan lehetne kiirni a post kerest ( fel kell oldani a jsont )
// egy vegponton csak 1 post keres lehet

app.post("/a", (_req:Request, res:Response) =>{
    res.send("szöveg szöveg")
})
//fetch("http://localhost:3000/a",{method:"POST"}).then(response =>response.text().then(data => console.log(data)));
// ezt igy kell feloldani (sima szoveget)

app.get("/products", (_req:Request, res:Response) => {
    res.json(data)
})

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

app.listen(3000, () => {
    console.log("fut a szerver")        // ez pedig a terminal consoleone
})

// localhost:3000en elérhető böngészőből is