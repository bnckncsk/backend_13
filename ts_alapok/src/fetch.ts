import { getUsers } from "./functions.js";

getUsers().then((v) => 
    console.log(v))
.catch(() => 
    console.error("hiba1"));
// errort dob, mert nem tudja kezelni a megadott weboldalt


try {
    console.log(await getUsers());
} catch {
    console.log("Hiba2");
}

// A Typescript nem garantálja, hogy megfelelő adat érkezik, emiatt nekünk kell lekezelni.