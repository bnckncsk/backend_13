export interface IProduct {
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

export class Product implements IProduct{
    private _id: number;
    private _name: string;
    private _category: string;
    private _brand: string; 
    private _price: number;
    private _currency: string;
    private _stock: number;
    private _rating: number;
    private _active: boolean;
    private _description: string;
    private _image: string;
    constructor(data: Partial<IProduct> = {}
    ) {
        this._id = data.id ?? 0;
        this._name = data.name ?? '';
        this._category = data.category ?? '';
        this._brand = data.brand ?? '';
        this._currency = data.currency ?? 'HUF';
        this._active = data.active ?? true;
        this._description = data.description ?? '';
        this._image = data.image ?? '';

        this._price = Math.max(0, data.price ?? 0);
        this._stock = Math.max(0, data.stock ?? 0);
        this._rating = Math.min(5, Math.max(0, data.rating ?? 0.0));
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get category(): string {
        return this._category;
    }

    get brand(): string {
        return this._brand;
    }

    get price(): number {
        return this._price;
    }

    get currency(): string {
        return this._currency;
    }

    get stock(): number {
        return this._stock;
    }

    get rating(): number {
        return this._rating;
    }

    get active(): boolean {
        return this._active;
    }

    get description(): string {
        return this._description;
    }

    get image(): string {
        return this._image;
    }

    set name(value: string) {
        this._name = value;
    }

    set category(value: string) {
        this._category = value;
    }

    set brand(value: string) {
        this._brand = value;
    }

    set price(value: number) {
        if (value < 0) {
            throw new Error("Price cannot be negative");
        }
        this._price = value;
    }

    set currency(value: string) {
        this._currency = value;
    }

    set stock(value: number) {
        if (value < 0) {
            throw new Error("Stock cannot be negative");
        }
        this._stock = value;
    }

    set rating(value: number) {
        if (value < 0 || value > 5) {
            throw new Error("Rating must be between 0 and 5");
        }
        this._rating = value;
    }

    set active(value: boolean) {
        this._active = value;
    }

    set description(value: string) {
        this._description = value;
    }

    set image(value: string) {
        this._image = value;
    }


    get formattedPrice(): string {
    return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: this._currency,
      maximumFractionDigits: 0
    }).format(this._price);
  }



  // --- Üzleti logikai metódusok ---

  public reduceStock(amount: number): boolean {
    if (amount <= 0 || this._stock < amount) return false;
    this._stock -= amount;
    return true;
  }

  public increaseStock(amount: number): void {
    if (amount > 0) this._stock += amount;
  }

  public applyDiscount(percentage: number): void {
    if (percentage < 0 || percentage > 100) {
      throw new Error("A kedvezménynek 0 és 100% között kell lennie!");
    }
    const discountAmount = (this._price * percentage) / 100;
    this._price = Math.round(this._price - discountAmount);
  }

  // Segédfunkció az adatok tiszta JSON-ná alakításához (pl. API-nak való visszaküldéshez)
  public toJSON(): IProduct {
    return {
      id: this._id,
      name: this._name,
      category: this._category,
      brand: this._brand,
      price: this._price,
      currency: this._currency,
      stock: this._stock,
      rating: this._rating,
      active: this._active,
      description: this._description,
      image: this._image,
    };
  }
}



// osztaly ami Product elemekbol epul fel es szeretenk kiegesziteni
// olyan fuggvenyekkel, mint pl product torlese, stb.

export class Products{
    private _products: Product[] = [];

    constructor(data: Partial<IProduct>[] = []) {
        this._products = data.map(p => new Product(p));
    }


    // getterek

    get allProductsData() : IProduct[] {
        return this._products.map(p =>p.toJSON());
    }

    createProduct(data: Partial<IProduct>): Product {
        const newProduct = new Product(data);
        this._products.push(newProduct);
        return newProduct;
    }

    getProductById(id: number): Product | undefined {
        return this._products.find(p => p.id === id);
    }

    updateProduct(id: number, data: Partial<IProduct>): boolean {
        const product = this.getProductById(id);
        if (!product) return false;

        Object.assign(product, data);

        Object.keys(data).forEach((key) => {
            const propKey = key as keyof IProduct;
            if (propKey !== 'id' && data[propKey] !== undefined) {
                (product as any)[propKey] = data[propKey];
            }
        });
        return true;
    }

    addProduct(data: Partial<IProduct>): Product {
        const newProduct = new Product(data);
        this._products.push(newProduct);
        return newProduct;
    }
}