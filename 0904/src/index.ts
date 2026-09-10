//////////////  TÍPUSOK



let name : string = "Pepe";

let age : number = 45;
let price : number = 12.5;

let isActive : boolean = true;

let bigNumber : bigint = 756296326532n;

const id : symbol = Symbol("id");   // uj, egyedi tipust hoz letre
                                    // amire lehet hivakozni
let obj = {
  [id]: "valami",     // a szimbolumot egyedi tipusaval igy kell definialni
}

console.log(obj[id])    // igy hivjuk meg

let obj2 = {
  id: "még valami",   // nem szimbolumkent, hanem stringkent definialjuk
}

console.log(obj2["id"]);  // ezert itt igy hivjuk meg 


let fuggv : symbol = Symbol("fuggv")
class Osztaly{
  [fuggv]() {
    return "Osztaly fuggveny";
  }
}

let o : any = new Osztaly();

let osztalyNev = o[fuggv]();
console.log(osztalyNev);


let valami : any = "Hello";       // any: akarhanyszor atirhato mas tipusra is
console.log(valami);
valami = 10;
console.log(valami);
valami = true;
console.log(valami);


let valami2 : unknown = "Hello";
console.log(valami2);

if (typeof valami2 === "string") {      // az unknown vizsgalhato, atirhato es kezelheto
  console.log(valami2.toUpperCase());
}

valami2 = 10;
console.log(valami2);
valami2 = true;
console.log(valami2);


let valami3 : null = null;
let valami4 : undefined = undefined;

console.log(valami3);
console.log(valami4);




///////////  TÖMBÖK

const numbers : number[] = [1, 2, 3, 4, 5];   // tomb deklaralas
const names : string[] = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

const numbers2 : Array<number> = [6, 7, 8, 9, 10];  // igy is deklaralhato

numbers.forEach((num: number) => {        // tomb bejarasa
  console.log(num);
});

names.forEach((name: string) => {
  console.log(name);
});

for (const num of numbers2) {             // sima for ciklussal is bejarhato
  console.log(num);
}


// tuple
const user : {name: string; age: number} = {
  name: "Alice",
  age: 30
};
const user2: [string, number][] = [["Bob", 25], ["David", 30], ["John", 23]];


// csak tsx-el fut
// num Role {
//  ADMIN = 'Admin', 
//  USER = 'User',
//  GUEST= 'Guest'
// ;
// 
// onst userRole: Role = Role.ADMIN;
// 
// onsole.log(userRole);


// Tipusok / tipusdefinialas

type User = {
  id: number,
  name: string,
  email: string,
  isActive: boolean;
};

const users : User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@gmail.com",
    isActive: true
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@gmail.com",
    isActive: false
  }
];


// Interfacek

interface User2 {
  id: number,
  name: string,
  email?: string,
  isActive: boolean;
}

class UserService implements User2 {
  id: number;
  name: string;
  email?: string;
  isActive: boolean;

  constructor(id: number, name: string, email: string, isActive: boolean) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.isActive = isActive;
  }
}
const user3 : User2 = new UserService(1, "John Doe", "john@example.com", true);
// user.id = 2      deklaralas utan nem valtoztathato, mert readonly


const users2 : User2[] = [
  { id: 1, name: "John Doe", email: "johndoe@gmail.com", isActive: true },
  { id: 2, name: "Jane Smith", email: "janesmith@gmail.com", isActive: false }
];



let valtozo : number | string;
valtozo = 10;
valtozo = "abc";    // mindketto elfogadott



let literal : "bal" | "jobb";
literal = "bal";
literal = "jobb";
// literal = "barmi mas"      hibat dob


// A typeok kombinalhatoak
type szemely = {name: string};
type dolgozo = {dolgozoid: number};

type dolgozoSzemely = szemely & dolgozo;

const dolgozo1: dolgozoSzemely = {
  name: "John Doe",
  dolgozoid: 12345
};

console.log(dolgozo1)