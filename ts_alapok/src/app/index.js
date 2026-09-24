async function getProducts() {
    const response = await fetch("http://localhost:3000/products");

    if (response.ok) {
        return await response.json();
    }
}

async function createTable() {
    const products = await getProducts();

    const oldTable = document.querySelector("table"); if (oldTable) { oldTable.remove(); }

    const table = document.createElement('table');

    const header = document.createElement('tr');

    header.innerHTML = `
        <th>ID</th>
        <th>Név</th>
        <th>Kategória</th>
        <th>Márka</th>
        <th>Ár</th>
        <th>Készlet</th>
        <th>Értékelés</th>
        <th>Aktív</th>
    `;

    table.appendChild(header);

    products.forEach(product => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.brand}</td>
            <td>${product.price} ${product.currency}</td>
            <td>${product.stock}</td>
            <td>${product.rating}</td>
            <td>${product.active}</td>
        `;

        table.appendChild(row);
    });

    document.body.appendChild(table);
}



function createForm() {
    const urlap = document.createElement("form");
    
    urlap.innerHTML = `
        <h2>Új termék hozzáadása</h2>
    
        <label>
            Név:
            <input type="text" name="name" required>
        </label>
        <br><br>
    
        <label>
            Kategória:
            <input type="text" name="category" required>
        </label>
        <br><br>
    
        <label>
            Márka:
            <input type="text" name="brand" required>
        </label>
        <br><br>
    
        <label>
            Ár:
            <input type="number" name="price" required>
        </label>
        <br><br>
    
        <label>
            Pénznem:
            <input type="text" name="currency" value="HUF" required>
        </label>
        <br><br>
    
        <label>
            Készlet:
            <input type="number" name="stock" required>
        </label>
        <br><br>
    
        <label>
            Értékelés:
            <input type="number" name="rating" min="0" max="5" step="0.1" required>
        </label>
        <br><br>
    
        <label>
            Aktív:
            <input type="checkbox" name="active" checked>
        </label>
        <br><br>
    
        <label>
            Leírás:
            <textarea name="description"></textarea>
        </label>
        <br><br>
    
        <label>
            Kép:
            <input type="text" name="image">
        </label>
        <br><br>
    
        <button type="submit">Termék hozzáadása</button>
    `;
    
    urlap.addEventListener("submit", async (event) => {
        event.preventDefault();
    
        const formData = new FormData(urlap);
    
        const newProduct = {
            name: formData.get("name"),
            category: formData.get("category"),
            brand: formData.get("brand"),
            price: Number(formData.get("price")),
            currency: formData.get("currency"),
            stock: Number(formData.get("stock")),
            rating: Number(formData.get("rating")),
            active: formData.get("active") === "on",
            description: formData.get("description"),
            image: formData.get("image")
        };
    
        const response = await fetch("http://localhost:3000/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });
    
        if (response.ok) {
            alert("A termék sikeresen hozzáadva!");
        
            urlap.reset();
        
            await createTable();
        } else {
            alert("Hiba történt a termék hozzáadásakor!");
        }
    });
    
    document.body.appendChild(urlap);
}

createForm();
createTable();