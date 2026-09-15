// 09.08
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





// 09.15
// Functionok/fuggvenyek

function osszead(a: number, b:number):number {
  return a + b;
}

function kiir(message: string): void {
  console.log(message);
}

function ujFelhasznalo(name: string, age: number): void {
  console.log({name, age});
} 

function udvozol(name: string = "Vendég", megszolitas?: string): string {
  if (megszolitas) {
    return `Hello ${megszolitas} ${name}!`;
  }
  return `Hello, ${name}!`;
}

console.log(udvozol("John", "Mr."));
console.log(udvozol(undefined, "Ms."));   // default erteket is lehet hasznalni
console.log(udvozol());



// arrow function
const osszeg = (a: number, b: number): number => { return a + b; };
console.log(osszeg(5, 10));



// Tipusok / interfacek

type Felhasznalo = {    // type es interface is hasznalhato tipus megadasara
  name: string;
  age: number;
  active: boolean;
};

interface Iuser {
  name: string;
  age: number;
  active: boolean;
};

const felhasznalo: Iuser = {
  name: "John Doe",
  age: 30,
  active: true
}

const value: unknown = "Hello, World!";
const strValue: string = value as string;   // as string nelkul nem mukodne --> kezelje stringkent, de ne alakitsa at a tipust
console.log(strValue.toUpperCase());


interface IDolgozo extends Iuser {
  munkakor: string;
};

const dolgozo: IDolgozo = {
  name: "Jane Smith",
  age: 25,
  active: true,
  munkakor: "Fejlesztő"
};

console.log(dolgozo);





// Classok

class UserClass {
  public name: string;
  public readonly age: number;
  private password: string;       // private: csak a classon belul elerheto
  protected role: string;         // protected: a classon belul es a leszármazottakban elerheto

  constructor(name: string, age: number, password: string, role: string) {
    this.name = name;
    this.age = age;
    this.password = password;
    this.role = role;
  }

  greet(): string {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }
  introduce(): string {
    return `Hello, my name is ${this.name}, nice to meet you.`;
  }

  getPassword(): string {
    return this.password;
  }
}

class AdminUser extends UserClass {
  constructor(name: string, age: number, password: string) {
    super(name, age, password, "admin");
  }

  //getPassword(): string {
  //  return this.password;  // hiba, mert a password private, igy a leszármazott osztályban sem elérhető
  //}

  getRole(): string {
    return this.role;
  }
}




const userClass1 = new UserClass("John Doe", 30, "password123", "admin");
console.log(userClass1.name);
console.log(userClass1.greet());
console.log(userClass1.introduce());
console.log(userClass1.getPassword());

const adminUser = new AdminUser("Jane Smith", 25, "adminpassword123");
console.log(adminUser.getRole());
console.log(adminUser.name);
console.log(adminUser.introduce());
console.log(adminUser.getPassword()); // itt mégsem crashel be, mert a getPassword()-öt örökli



class PrivateUser {
  private _name: string;
  private _age: number;
  private _password: string;
  private _role: string;       

  constructor(name: string, age: number, password: string, role: string) {
    this._name = name;
    this._age = age;
    this._password = password;
    this._role = role;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get age(): number {
    return this._age;
  }

  set age(age: number) {
    this._age = age;
  }

  get password(): string {
    return this._password;
  }

  set password(password: string) {
    this._password = password;
  }

  get role(): string {
    return this._role;
  }

  set role(role: string) {
    this._role = role;
  }

  modosit(ertek:string) {
    this._name = ertek;
  }

  greet(): string {
    return `Hello, my name is ${this._name} and I am ${this._age} years old.`;
  }
  
  introduce(): string {
    return `Hello, my name is ${this._name}, nice to meet you.`;
  }
}

const privateUser = new PrivateUser("Minta Peter", 30, "privatepassword123", "admin");
privateUser.name = "Bobocska";
console.log(privateUser.name);
console.log(privateUser.greet());
console.log(privateUser.introduce());
console.log(privateUser.password);



// Abstract class: nem lehet példányosítani, csak örökölni lehet belőle
abstract class Animal {
  abstract makeSound(): void;   // abstract method: nincs implementációja, csak a leszármazott osztályban kell implementálni

  move(): void {
    console.log("Moving along!");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}

class Cat extends Animal {
  makeSound(): void {
    console.log("Meow!");
  }
}

const dog = new Dog();
dog.makeSound();
dog.move();

const cat = new Cat();
cat.makeSound();
cat.move();



// Generikus típusok: a típus paramétert a híváskor adhatjuk meg
// ezzel tipusfuggetlen fuggvenyeket hozhatunk letre, amik barmilyen tipusra mukodnek
function identitas<T>(arg: T): T {   // generikus function: a típus paramétert a híváskor adhatjuk meg
  return arg;
}

const output1 = identitas<string>("Hello, TypeScript!");
const output2 = identitas<number>(42);

console.log(output1);
console.log(output2);

function getFirstItem<T>(arr: T[]): T | undefined { 
  return arr[0];
}

const numbersArr = [1, 2, 3, 4, 5];
const namesArr = ["Alice", "Bob", "Charlie", "David", "Eve"];
const firstNumber = getFirstItem<number>(numbersArr);
const firstName = getFirstItem<string>(namesArr);
console.log(firstNumber);
console.log(firstName);



// Generikus interfacek: a típus paramétert szintén a híváskor adhatjuk meg
interface IApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

interface IUser {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const apiResponse: IApiResponse<IUser> = {
  data: {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  status: 200,
  message: "User fetched successfully!"
};

console.log(apiResponse);