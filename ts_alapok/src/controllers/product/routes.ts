import { Router } from "express";
import { getProduct, setProducts, getProductById, updateProduct } from "./controller.ts";

const router: Router = Router()
router.get("/products", getProduct)
router.get("/product/:id", getProductById)
router.post("/product", setProducts)
router.put("/product/:id", updateProduct)   // ha a product id-je megegyezik a request body-ban levo id-vel, akkor frissitjuk az adatokat


// put vs patch: a put teljesen felulirja az adatokat, a patch csak a megadott mezoket frissiti

export default router