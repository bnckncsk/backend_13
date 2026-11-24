# Backend programozási feladat -- Filmnyilvántartó és moziműsor REST API (MySQL adatbázissal)

## 1. A projekt és az adatbázis előkészítése

A feladatot a `vezeteknev_keresztnev/backend` mappába mentse!  
A feladatot objektumorientált szemlélettel készítse el, a Node.js által preferált, strukturált fájlszerkezet alkalmazásával.

### Adatbázis létrehozása
Hozzon létre egy MySQL adatbázist `mozimusor_db` néven (UTF-8 karakterkódolással, pl. `utf8mb4_hungarian_ci`), és benne egy `filmek` nevű táblát a következő szerkezettel:

| Mező neve | Típus / Megkötés | Leírás |
| :--- | :--- | :--- |
| **id** | `INT`, `PRIMARY KEY`, `AUTO_INCREMENT` | A film egyedi azonosítója. |
| **cim** | `VARCHAR(255)`, `NOT NULL` | A film címe. |
| **rendezo** | `VARCHAR(255)`, `NOT NULL` | A film rendezője. |
| **megjelenesEve** | `INT`, `NOT NULL` | A bemutató éve. |
| **jegyAr** | `INT`, `NOT NULL` | A mozijegy ára forintban. |
| **szabadHelyek** | `INT`, `NOT NULL` | A rendelkezésre álló szabad ülőhelyek száma. |
| **poszter** | `VARCHAR(255)`, `NOT NULL` | A film poszterképének elérési útvonala. |

Töltse fel a `filmek` táblát néhány kezdeti tesztadattal (pl. az alábbi példa alapján)!  
Az adatbázis és a tábla létrehozását, valamint a tesztadatok beszúrását tartalmazó SQL parancsokat mentse el egy `adatbazis.sql` nevű fájlba is!

Példa a táblában szereplő adatokra (JSON formátumban):

```json
[
  {
    "id": 1,
    "cim": "A tanú",
    "rendezo": "Bacsó Péter",
    "megjelenesEve": 1969,
    "jegyAr": 2200,
    "szabadHelyek": 45,
    "poszter": "./posters/a-tanu.jpg"
  },
  {
    "id": 2,
    "cim": "Macskafogó",
    "rendezo": "Ternovszky Béla",
    "megjelenesEve": 1986,
    "jegyAr": 2500,
    "szabadHelyek": 30,
    "poszter": "./posters/macskafogo.jpg"
  }
]
```

## 2. Backend szerveralkalmazás készítése

Készítsen backend szerveralkalmazást REST API használatával!

Követelmények:
- Node.js és TypeScript használata.
- Express keretrendszer használata.
- MySQL adatbázis használata (`mysql2` csomag vagy ORM segítségével).
- Az adatbázis-kapcsolat adatait (host, felhasználónév, jelszó, adatbázis neve) környezeti változókban (`.env` fájlban) tárolja!
- A kérések és válaszok JSON formátumban történjenek.

## 3. Filmek adatainak lekérdezése

Valósítsa meg az összes film, illetve egy adott film adatainak lekérdezését az adatbázisból!

| Metódus | URL | Body | Válasz |
| :--- | :--- | :--- | :--- |
| GET | `/api/movies` | Üres | JSON-tömb |
| GET | `/api/movies/:id` | Üres | JSON-objektum |

A `GET /api/movies` végpont adja vissza az összes filmet.  
A `GET /api/movies/:id` végpont adja vissza az URL-ben megadott azonosítójú filmet. Ha a keresett film nem létezik az adatbázisban, a szerver `404 NOT FOUND` státuszkóddal és `A film nem létezik!` hibaüzenettel térjen vissza.

## 4. Új film rögzítése

Valósítsa meg új film adatainak rögzítését az adatbázisba!

| Metódus | URL | Body | Válasz |
| :--- | :--- | :--- | :--- |
| POST | `/api/movies` | JSON | JSON-objektum |

Példa a kérés törzsére:

```json
{
  "cim": "Kontroll",
  "rendezo": "Antal Nimród",
  "megjelenesEve": 2003,
  "jegyAr": 2800,
  "szabadHelyek": 60,
  "poszter": "./posters/kontroll.jpg"
}
```

A szerver végezze el az alábbi műveleteket:
1. Ellenőrizze a kapott adatok helyességét.
2. Szúrja be az új rekordot a `filmek` táblába.
3. Kérje le az adatbázis által generált egyedi azonosítót (`insertId`).

Sikeres rögzítés esetén a szerver `201 CREATED` státuszkóddal térjen vissza, és a válasz tartalmazza az új film azonosítóját.

Példaválasz:

```json
{
  "id": 12
}
```

Hibás vagy hiányzó adatok esetén a szerver `400 BAD REQUEST` státuszkóddal és `Az adatok nem megfelelőek!` hibaüzenettel térjen vissza.

A kötelező mezők: `cim`, `rendezo`, `megjelenesEve`, `jegyAr`, `szabadHelyek`, `poszter`.  
A cím, a rendező és a poszter nem lehet üres szöveg; a megjelenés éve és a jegyár pozitív szám, a szabad helyek száma pedig nemnegatív egész szám legyen.

## 5. Film adatainak módosítása

Valósítsa meg egy adott film adatainak módosítását az adatbázisban!

| Metódus | URL | Body | Válasz |
| :--- | :--- | :--- | :--- |
| PUT | `/api/movies/:id` | JSON | Szöveges üzenet |

Példa a kérés törzsére:

```json
{
  "jegyAr": 3000,
  "szabadHelyek": 42
}
```

A szerver csak a megadott mezőket módosítsa. A többi mező értéke maradjon változatlan.

A módosítás során:
1. Ellenőrizze a kérés törzsét.
2. Keresse meg az URL-ben megadott azonosítójú filmet az adatbázisban.
3. Frissítse a megadott mezőket az adatbázisban.

Hibakezelési követelmények:
- Sikeres módosítás: `200 OK`, `Sikeres módosítás` üzenet.
- Nem létező film: `404 NOT FOUND`, `A film nem létezik!` üzenet.
- Üres vagy hibás törzs, illetve ismeretlen mező: `400 BAD REQUEST`, `Az adatok nem megfelelőek!` üzenet.
- Az `id` mező nem módosítható a kérés törzsén keresztül. A megengedett mezők: `cim`, `rendezo`, `megjelenesEve`, `jegyAr`, `szabadHelyek`, `poszter`.

## 6. Film törlése

Valósítsa meg egy adott film törlését az adatbázisból!

| Metódus | URL | Body | Válasz |
| :--- | :--- | :--- | :--- |
| DELETE | `/api/movies/:id` | Üres | Üres vagy hibaüzenet |

A szerver:
1. Keresse meg a törlendő filmet az adatbázisban.
2. Törölje a rekordot a `filmek` táblából.

Hibakezelési követelmények:
- Sikeres törlés: `204 NO CONTENT` státuszkód, válasz törzse nélkül.
- Nem létező film: `404 NOT FOUND` státuszkód és `A film nem létezik!` hibaüzenet.

## 7. Tesztelés

A végpontokat Postman vagy más REST API-tesztelő alkalmazás segítségével ellenőrizze.

Tesztelendő esetek:
1. Az összes film lekérdezése.
2. Egy létező film lekérdezése.
3. Egy nem létező film lekérdezése.
4. Új film rögzítése.
5. Hibás adatokkal küldött új film kezelése.
6. Film részleges módosítása.
7. Hibás módosítási kérés kezelése.
8. Létező film törlése.
9. Nem létező film törlése.

## 8. Leadandó fájlok

A `vezeteknev_keresztnev/backend` mappában szerepeljen:
- `adatbazis.sql` -- az adatbázis és a tábla létrehozását, valamint a kezdeti tesztadatok beszúrását tartalmazó SQL-fájl.
- A backend alkalmazás TypeScript-forráskódjai.
- `package.json`.
- `.env` (vagy `.env.example`) -- az adatbázis-kapcsolat konfigurációs fájlja.
- A szükséges TypeScript- és egyéb konfigurációs fájlok.
