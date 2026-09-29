import express from "express"      // default export ezert igy importaljuk (az express helyett barmi irhato)
import router from "../routes/routes.ts"
import productsRoutes from "../controllers/product/routes.ts"
// import bodyParser from "body-parser"

const app = express()       // egy sorban egy utasításnál elhagyható a ;

app.use(express.json())     // json formátumban dolgozza fel az adatokat
app.use(express.urlencoded())       // express is tud kezelni mas formatumot
// app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("./src/app"))
app.use("/", router)

app.use("/", productsRoutes)





export default app