import data from "../../app/data/data.ts"
import type { Response, Request } from "express"
import { Product, Products, type IProduct } from "./product.ts"

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

export const getProductById = (req:Request, res:Response):void => {
    const products = new Products(data);
    if (!req.params.id) {
        res.status(400).send("Product ID is required")
        return
    }
    const productId: number = parseInt(req.params.id as string)
    const product: Product | undefined = products.getProductById(productId)
    if (product){
        res.send(product)
        return
    }
    res.status(404).send("Product not found")
}

export const updateProduct = (req:Request, res:Response):void => {
    const products = new Products(data);
    const productId: number = parseInt(req.params.id as string)

    const product = products.getProductById(productId)

    if (!product) {
        products.addProduct(req.body)
        res.send(products.allProductsData[products.allProductsData.length - 1])
        return
    }

    const updatedProduct: Product = new Product(req.body)
    products.updateProduct(productId, updatedProduct)
    res.send(products.allProductsData)
}

// feladat: kulcsok lekérése egy függvénnyel ami az új adatokat is lekéri
// ellenőrizzük hogy minden kulcs megvan e és van értéke

export const productsExist = (req: Request, res: Response) => {
    const products = new Products(data);
    const productKeys = Object.keys(products.allProductsData) as (keyof IProduct)[]

    for (const key of productKeys) {
        if (key === 'id') continue;

        if (!(key in req.body) || req.body[key] === undefined || req.body[key] === null || req.body[key] === '') {
            return res
                .status(400)
                .send(`Missing or invalid value for property: ${String(key)}`);
        }
    }

    return true;
}