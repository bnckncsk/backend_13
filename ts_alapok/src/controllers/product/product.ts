interface IProduct {
    id: number;
    name: string;
    category: string;
    brand: string; 
    price: number;
    currency: string;
    stock: number;
    rating: number;
    active: boolean;
    description: string;
    image: string;
}


// Olyan osztály, amely ebbol az interfacebol van implementalva
// amikor inicializalva van, a konstruktorat fel tudjuk tolteni adatokkal

class Product implements IProduct{
    id: number;
    name: string;
    category: string;
    brand: string; 
    price: number;
    currency: string;
    stock: number;
    rating: number;
    active: boolean;
    description: string;
    image: string;

    constructor(id: number,
        name: string,
        category: string,
        brand: string,
        price: number,
        currency: string,
        stock: number,
        rating: number,
        active: boolean,
        description: string,
        image: string
    ) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.brand = brand;
        this.price = price;
        this.currency = currency;
        this.stock = stock;
        this.rating = rating;
        this.active = active;
        this.description = description;
        this.image = image;
    }
}