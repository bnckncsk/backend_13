# Backend programozási feladat – Kerékpárkölcsönző REST API

## 1. A projekt előkészítése

A feladatot a `vezeteknev_keresztnev/backend` mappába mentse!

A mellékelt `kerekpar.ts` nevű fájlt használhatja a kerékpárok tesztadataiként.

A feladatot objektumorientált szemlélettel készítse el, a Node.js által preferált, strukturált fájlszerkezet alkalmazásával.

A kerékpár objektum mezői:

- **id:** A kerékpár egyedi azonosítója. Szám.
- **nev:** A kerékpár neve. Szöveg.
- **leiras:** A kerékpár részletes leírása. Szöveg.
- **ar:** A kerékpár napi bérleti díja forintban. Szám.
- **raktaron:** A kölcsönözhető kerékpárok darabszáma. Egész szám.
- **kep:** A kerékpárról készült kép elérési útvonala. Szöveg.

Példa egy kerékpár adataira:

```json
[
  {
    "id": 1,
    "nev": "Városi kerékpár",
    "leiras": "Kényelmes kerékpár városi közlekedéshez",
    "ar": 3500,
    "raktaron": 6,
    "kep": "./pictures/varosi.jpg"
  },
  {
    "id": 2,
    "nev": "Hegyi kerékpár",
    "leiras": "Terepezésre alkalmas, erős vázzal",
    "ar": 6000,
    "raktaron": 4,
    "kep": "./pictures/hegyi.jpg"
  }
]
```

## 2. Backend szerveralkalmazás készítése

Készítsen backend szerveralkalmazást REST API használatával!

Követelmények:

- Node.js és TypeScript használata.
- Express keretrendszer használata.
- Az adatokat a mellékelt `kerekpar.ts` fájlból olvassa be.
- A kérések és válaszok JSON formátumban történjenek.

## 3. Kerékpárok adatainak lekérdezése

Valósítsa meg az összes kerékpár, illetve egy adott kerékpár adatainak lekérdezését!

| Metódus | URL | Body | Válasz |
|---|---|---|---|
| GET | `/api/bicycle` | Üres | JSON-tömb |
| GET | `/api/bicycle/:id` | Üres | JSON-objektum |

A `GET /api/bicycle` végpont adja vissza az összes kerékpárt.

A `GET /api/bicycle/:id` végpont adja vissza az URL-ben megadott azonosítójú kerékpárt.

Ha a keresett kerékpár nem létezik, a szerver `404 NOT FOUND` státuszkóddal és megfelelő hibaüzenettel térjen vissza.

## 4. Új kerékpár rögzítése

Valósítsa meg új kerékpár adatainak rögzítését!

| Metódus | URL | Body | Válasz |
|---|---|---|---|
| POST | `/api/bicycle` | JSON | JSON-objektum |

Példa a kérés törzsére:

```json
{
  "nev": "Túra kerékpár",
  "leiras": "Hosszabb kerékpártúrákra alkalmas modell",
  "ar": 4500,
  "raktaron": 7,
  "kep": "./pictures/tura.jpg"
}
```

A szerver végezze el az alábbi műveleteket:

1. Olvassa be a kerékpárok adatait tartalmazó állományt.
2. Ellenőrizze a kapott adatok helyességét.
3. Generáljon egy egyedi azonosítót az új kerékpár számára.
4. Fűzze hozzá az új objektumot a tömbhöz.

Sikeres rögzítés esetén a szerver `201 CREATED` státuszkóddal térjen vissza.

Példaválasz:

```json
{
  "id": 21
}
```

Az azonosítót a program automatikusan határozza meg a meglévő adatok alapján. Ne feltételezze, hogy a legnagyobb azonosító mindig 20.

## 5. Kerékpár adatainak módosítása

Valósítsa meg egy adott kerékpár adatainak módosítását!

| Metódus | URL | Body | Válasz |
|---|---|---|---|
| PUT | `/api/bicycle/:id` | JSON | Szöveges üzenet |

Példa a kérés törzsére:

```json
{
  "nev": "Városi kerékpár prémium",
  "ar": 4000
}
```

A szerver csak a megadott mezőket módosítsa. A többi mező értéke maradjon változatlan.

A módosítás során:

1. Olvassa be az adatokat tartalmazó állományt.
2. Keresse meg az URL-ben megadott azonosítójú kerékpárt.
3. Ellenőrizze a kérés törzsét.
4. Módosítsa a megadott mezőket.

Hibakezelési követelmények:

- Sikeres módosítás: `200 OK`, `Sikeres módosítás` üzenet.
- Nem létező kerékpár: `404 NOT FOUND`, `Az elem nem létezik` üzenet.
- Üres vagy hibás törzs, illetve ismeretlen mező: `400 BAD REQUEST`, `Az adatok nem megfelelőek!` üzenet.
- Az `id` mező nem módosítható a kérés törzsén keresztül.

A megengedett mezők: `nev`, `leiras`, `ar`, `raktaron`, `kep`.

## 6. Kerékpár törlése

Valósítsa meg egy adott kerékpár törlését!

| Metódus | URL | Body | Válasz |
|---|---|---|---|
| DELETE | `/api/bicycle/:id` | Üres | Üres vagy hibaüzenet |

A szerver:

1. Olvassa be az adatokat tartalmazó állományt.
2. Keresse meg a törlendő kerékpárt.
3. Távolítsa el az objektumot a tömbből.

Hibakezelési követelmények:

- Sikeres törlés: `204 NO CONTENT` státuszkód, válasz törzse nélkül.
- Nem létező kerékpár: `404 NOT FOUND` státuszkód és `A kerékpár nem létezik!` hibaüzenet.

## 7. Tesztelés

A végpontokat Postman vagy más REST API-tesztelő alkalmazás segítségével ellenőrizze.

Tesztelendő esetek:

1. Az összes kerékpár lekérdezése.
2. Egy létező kerékpár lekérdezése.
3. Egy nem létező kerékpár lekérdezése.
4. Új kerékpár rögzítése.
5. Kerékpár részleges módosítása.
6. Hibás módosítási kérés kezelése.
7. Létező kerékpár törlése.
8. Nem létező kerékpár törlése.
9. Annak ellenőrzése, hogy az új adatok a szerver újraindítása után is megmaradnak-e.

## 8. Leadandó fájlok

A `vezeteknev_keresztnev/backend` mappában szerepeljen:

- `kerekpar.ts` – a kezdeti tesztadatok.
- A backend alkalmazás TypeScript-forráskódjai.
- `package.json`.
- A szükséges TypeScript- és egyéb konfigurációs fájlok.
