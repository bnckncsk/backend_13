SET NAMES utf8mb4;

CREATE DATABASE kerekpar
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE kerekpar;

CREATE TABLE kerekparok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL,
    leiras VARCHAR(255) NOT NULL,
    ar INT NOT NULL,
    raktaron INT NOT NULL,
    kep VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO kerekparok (id, nev, leiras, ar, raktaron, kep) VALUES
(1, 'Városi kerékpár', 'Kényelmes kerékpár városi közlekedéshez', 3500, 6, './pictures/varosi.jpg'),
(2, 'Hegyi kerékpár', 'Terepezésre alkalmas, erős vázzal', 6000, 4, './pictures/hegyi.jpg'),
(3, 'Országúti kerékpár', 'Könnyű, gyors kerékpár aszfaltra', 7000, 3, './pictures/orszaguti.jpg'),
(4, 'Gyerek kerékpár', 'Biztonságos kerékpár 6-10 éveseknek', 2000, 5, './pictures/gyerek.jpg'),
(5, 'Elektromos kerékpár', 'Rásegítő motorral, 60 km hatótávval', 9000, 2, './pictures/elektromos.jpg'),
(6, 'Trekking kerékpár', 'Vegyes terepre, csomagtartóval', 5000, 5, './pictures/trekking.jpg'),
(7, 'BMX', 'Trükkökhöz és pályára', 3000, 3, './pictures/bmx.jpg'),
(8, 'Tandem kerékpár', 'Két személy számára', 8000, 1, './pictures/tandem.jpg'),
(9, 'Összecsukható kerékpár', 'Könnyen szállítható, kis helyen elfér', 4000, 4, './pictures/osszecsukhato.jpg'),
(10, 'Cruiser', 'Kényelmes, laza tempójú tengerparti kerékpár', 3800, 3, './pictures/cruiser.jpg'),
(11, 'Gravel kerékpár', 'Murvás és földutakra', 6500, 2, './pictures/gravel.jpg'),
(12, 'Fatbike', 'Széles gumikkal homokra és hóra', 7500, 2, './pictures/fatbike.jpg'),
(13, 'Női városi kerékpár', 'Mély vázas, kosárral', 3500, 4, './pictures/noi_varosi.jpg'),
(14, 'Elektromos hegyi kerékpár', 'Motoros rásegítés terepre', 11000, 2, './pictures/e_hegyi.jpg'),
(15, 'Futókerékpár', 'Pedál nélküli kerékpár kisgyerekeknek', 1500, 6, './pictures/futobicikli.jpg'),
(16, 'Teherkerékpár', 'Nagy rakodótérrel, áruszállításra', 8500, 1, './pictures/teher.jpg'),
(17, 'Fixi', 'Egysebességes, minimalista városi kerékpár', 3200, 3, './pictures/fixi.jpg'),
(18, 'Fekvőkerékpár', 'Hátradőlt üléspozícióval', 7000, 1, './pictures/fekvo.jpg'),
(19, 'Tricikli', 'Háromkerekű, stabil kerékpár', 4000, 2, './pictures/tricikli.jpg'),
(20, 'Kamasz kerékpár', '24 colos kerekekkel 10-14 éveseknek', 2500, 5, './pictures/kamasz.jpg');
