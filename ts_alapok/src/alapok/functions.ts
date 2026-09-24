import type { IUser } from "./interface.js";

export async function getUsers(): Promise<IUser[]> {
    const response = await fetch("https://example.com/api/users", {method: "POST", headers:{"Content-Type": "application/json"}, body: JSON.stringify({id: 1, name: "Béla", email: "bela@gmail.com"})});
    
    if(!response.ok) {
        throw new Error("HTTP error!");
    }

    const users : IUser[] = await response.json();
    return users; 
}