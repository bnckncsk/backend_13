import data from "../../app/data/data.ts"
import type { Response, Request } from "express"
import { Product, Products } from "./product.ts"

// hasznaljuk a product.tsben levo osztalyt a getProducthoz, 
// majd kuldjuk vissza a szervernek a setProducts segitsegevel

export const getProduct = (_req:Request, res:Response) => {
    const products = new Products(data);
    res.send(products.allProductsData);
}

export const setProducts = (req:Request, res:Response) => {
    const products = new Products(data);
    const product = products.createProduct(req.body);
    res.send(product);
}
