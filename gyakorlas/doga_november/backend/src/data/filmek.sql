-- Adatbázis létrehozása (ha még nem létezik)
CREATE DATABASE IF NOT EXISTS mozimusor_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_hungarian_ci;

USE mozimusor_db;

-- Tábla törlése, ha már létezik (újrafuttathatóság érdekében)
DROP TABLE IF EXISTS filmek;

-- Filmek tábla létrehozása
CREATE TABLE filmek (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cim VARCHAR(255) NOT NULL,
  rendezo VARCHAR(255) NOT NULL,
  megjelenesEve INT NOT NULL,
  jegyAr INT NOT NULL,
  szabadHelyek INT NOT NULL,
  poszter VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- Kezdeti tesztadatok beszúrása
INSERT INTO filmek (cim, rendezo, megjelenesEve, jegyAr, szabadHelyek, poszter) VALUES
  ('A tanú', 'Bacsó Péter', 1969, 2200, 45, './posters/a-tanu.jpg'),
  ('Macskafogó', 'Ternovszky Béla', 1986, 2500, 30, './posters/macskafogo.jpg'),
  ('Indul a bakterház', 'Mihályfy Sándor', 1979, 2000, 50, './posters/indul-a-bakterhaz.jpg'),
  ('Kontroll', 'Antal Nimród', 2003, 2800, 60, './posters/kontroll.jpg'),
  ('Szaffi', 'Dargay Attila', 1984, 2400, 25, './posters/szaffi.jpg'),
  ('Vuk', 'Dargay Attila', 1981, 2400, 40, './posters/vuk.jpg'),
  ('Csinibaba', 'Tímár Péter', 1997, 2600, 35, './posters/csinibaba.jpg'),
  ('Üvegtigris', 'Rudolf Péter', 2001, 2700, 55, './posters/uvegtigris.jpg'),
  ('Saul fia', 'Nemes Jeles László', 2015, 3000, 20, './posters/saul-fia.jpg'),
  ('Testről és lélekről', 'Enyedi Ildikó', 2017, 2900, 15, './posters/testrol-es-lelekrol.jpg');
