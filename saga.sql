-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 07, 2024 at 10:06 AM
-- Wersja serwera: 5.7.39
-- Wersja PHP: 8.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `saga`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `budynek`
--

CREATE TABLE `budynek` (
  `id` int(11) NOT NULL,
  `idGracza` int(11) NOT NULL,
  `nazwa` varchar(20) NOT NULL,
  `proces` varchar(10) DEFAULT NULL,
  `procesOpis` varchar(350) DEFAULT NULL,
  `procesStart` datetime DEFAULT NULL,
  `procesStop` datetime DEFAULT NULL,
  `procesIlosc` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Wyzwalacze `budynek`
--
DELIMITER $$
CREATE TRIGGER `budynekMagazyn` AFTER DELETE ON `budynek` FOR EACH ROW BEGIN
    DECLARE drewnoZOdzysku INT;
    DECLARE welnaZOdzysku INT;
    DECLARE zelazoZOdzysku INT;

    SELECT drewno INTO drewnoZOdzysku FROM magazyn WHERE idGracza = OLD.idGracza;
    SELECT wełna INTO welnaZOdzysku FROM magazyn WHERE idGracza = OLD.idGracza;
    SELECT żelazo INTO zelazoZOdzysku FROM magazyn WHERE idGracza = OLD.idGracza;

    IF OLD.nazwa = 'chataDrwala' THEN
        SET drewnoZOdzysku = drewnoZOdzysku + 5;
        SET welnaZOdzysku = welnaZOdzysku + 1;
        SET zelazoZOdzysku = zelazoZOdzysku + 0;
    END IF;

    IF OLD.nazwa = 'farma' THEN
        SET drewnoZOdzysku = drewnoZOdzysku + 6;
        SET welnaZOdzysku = welnaZOdzysku + 2;
        SET zelazoZOdzysku = zelazoZOdzysku + 1;
    END IF;

    IF OLD.nazwa = 'dom' THEN
        SET drewnoZOdzysku = drewnoZOdzysku + 10;
        SET welnaZOdzysku = welnaZOdzysku + 4;
        SET zelazoZOdzysku = zelazoZOdzysku + 0;
    END IF;

    IF OLD.nazwa = 'kuznia' THEN
        SET drewnoZOdzysku = drewnoZOdzysku + 16;
        SET welnaZOdzysku = welnaZOdzysku + 5;
        SET zelazoZOdzysku = zelazoZOdzysku + 3;
    END IF;

    IF OLD.nazwa = 'port' THEN
        SET drewnoZOdzysku = drewnoZOdzysku + 26;
        SET welnaZOdzysku = welnaZOdzysku + 8;
        SET zelazoZOdzysku = zelazoZOdzysku + 1;
    END IF;

    UPDATE magazyn SET drewno = drewnoZOdzysku, żelazo = zelazoZOdzysku, wełna = welnaZOdzysku WHERE idGracza = OLD.idGracza;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `etap`
--

CREATE TABLE `etap` (
  `id` int(11) NOT NULL,
  `nazwaWyprawy` varchar(50) NOT NULL,
  `polecenie` varchar(400) DEFAULT NULL,
  `tekst` text NOT NULL,
  `czasTrwania` float NOT NULL,
  `opcja1id` int(11) DEFAULT NULL,
  `opcja2id` int(11) DEFAULT NULL,
  `opcja3id` int(11) DEFAULT NULL,
  `opcja1nazwa` varchar(20) DEFAULT NULL,
  `opcja2nazwa` varchar(20) DEFAULT NULL,
  `opcja3nazwa` varchar(20) DEFAULT NULL,
  `walka` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `etap`
--

INSERT INTO `etap` (`id`, `nazwaWyprawy`, `polecenie`, `tekst`, `czasTrwania`, `opcja1id`, `opcja2id`, `opcja3id`, `opcja1nazwa`, `opcja2nazwa`, `opcja3nazwa`, `walka`) VALUES
(1, 'Pierwsze kroki', 'Start', 'Wyprawa. Po raz pierwszy ty i twoi wojowie wypłynęliście aby zdobywać sławę i cenne towary, oraz swoją walecznością zawstydzić samego Tyra. Prze wami jeszcze długa podróż. Macie nadzieję, że bogowie będą wam przychylni i wasze łodzie nie potonął. Wasza droga jest raczej bezpieczna ponieważ płyniecie przez stosunkowo spokojne wody - na zachód.', 8, 2, NULL, NULL, 'Lądowanie', NULL, NULL, 0),
(2, 'Pierwsze kroki', NULL, 'Dopłynęliśmy wraz z hirdem do wybrzeża. Naszym oczom ukazuje się kamienny budynek ulokowany niedaleko wybrzeża oceanu. Nie jest z pewnością twierdzą, gdyż nie jest on otoczony wysokim murem, lecz lichym drewniano – kamiennym płotem. Nie ma także wież. Po długim czasie żeglugi nareszcie czas na atak, lecz przed tym musimy zabezpieczyć łodzie i osuszyć się.', 1, 3, NULL, NULL, 'Atak', NULL, NULL, 0),
(3, 'Pierwsze kroki', 'polecenie3.php', 'Weszliśmy do dziwnego budynku. W pierwszym momencie miejsce sprawiało wrażenie opuszczonego, a więc zaczęliśmy je przeszukiwać, by znaleźć coś wartego uwagi. Większość pomieszczeń była bez śladów bogactwa, lecz mimo tego udało się nam zdobyć trochę żelaznych przedmiotów, które mogłyby być przez naszych kowali przerobione na coś pożytecznego (+15 żelazo).\r\nW końcu dotarliśmy do wielkiej izby, wypełnionej dziwnymi, zgarbionymi mężczyznami licho ubranymi. W oczy rzuca się również brak oręża. Czy powinniśmy wszystkich zabić w podzięce dla bogów, za tą okazję, czy wziąć część z nich w niewolę i sprzedać… \r\n', 3, 4, 5, NULL, 'Zabij', 'Weź w niewolę', NULL, 0),
(4, 'Pierwsze kroki', 'polecenie4.php', 'Okazało się, że owi ludzie są kapłanami swojej religii i w dodatku są słabi i lękliwi. Nasi wojowie wykazali się bezwzględnością w mordowaniu i plądrowaniu. Myślę, że bogowie są z nas zadowoleni (+50 łaska bogów). W spływającej krwią świątyni odkryliśmy złote przedmioty i to zupełnie nie strzeżone (+3 złoto). Dziś los się do nas uśmiechnął. \r\nZostawiając za sobą pożogę i zniszczenie udaliśmy się do wioseł, aby odpłynąć ku rodzinnym brzegom.\r\n', 4, 6, NULL, NULL, 'Odpłyń', NULL, NULL, 0),
(5, 'Pierwsze kroki', 'polecenie5.php', 'Okazało się, że owi ludzie są kapłanami swojej religii i w dodatku są słabi i lękliwi. Nasi wojowie część z nich zabili, lecz zabrali również sporą część na statek aby ich sprzedać. Weźmiemy za nich trochę złota (+2 złoto). W spływającej krwią świątyni odkryliśmy złote przedmioty i to zupełnie nie strzeżone (+3 złoto). Dziś los się do nas uśmiechnął. \r\nZostawiając za sobą pożogę i zniszczenie udaliśmy się do wioseł, aby odpłynąć ku rodzinnym brzegom.\r\n', 4, 6, NULL, NULL, 'Odpłyń', NULL, NULL, 0),
(6, 'Pierwsze kroki', 'Koniec', 'Udało się nam dopłynąć przywożąc ze sobą łupy. Mam nadzieję, że kolejna wyprawa przyniesie nam sławę i bogactwo.', 8, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(11, 'Bratnia pomoc', 'Start', 'Mój daleki kuzyn z kraju Danów, prosi nas o pomoc w związku z nadchodzącą wojną z jego sąsiadem Haraldem Skąpym. Niegdyś byli oni swoimi druhami lecz w pewnym momencie podzieliła ich kwestia połowu ryb, a mianowicie wody terytorialne. Harald Skąpy oskarżał mojego kuzyna Svena iż jego rybacy wpływają na jego wody przybrzeżne i jest to powodem nieurodzaju w połowie. Niewiele myśląc zebrałem ludzi i wypłynąłem wesprzeć krewniaka. Podróż nie zanosi się na długą', 7, 12, NULL, NULL, 'Cumuj', NULL, NULL, 0),
(12, 'Bratnia pomoc', NULL, 'Gdy dopłynęliśmy do osady zostaliśmy przywitani szczodrze. Krewniak wydał na naszą cześć ucztę, rzucając kalumnie na swojego sąsiada. Warto nadmienić iż perorował on bez przerwy o wyższości łososi nad dorsze wymachując przy tym zawzięcie trzymaną rybą. Gdy biesiada chyliła się ku końcowi zapewnił nas iż za wsparcie możemy liczyć na sporą sumę złota i jego wsparcie. ', 6, 13, NULL, NULL, 'Odpocznij', NULL, NULL, 0),
(13, 'Bratnia pomoc', NULL, 'Gdy przygotowywaliśmy się do walki przyszedł do nas jarl Sven, aby ustalić strategię. Dał nam do wyboru trzy opcje ataku. Nasi wojowie mogą zaatakować z samego rama od stron portu, albo zaatakować nieprzyjaciela z lądu. Trzecią opcją jest atak z zaskoczenia nocą. Który atak jest najlepszy?', 1, 14, 15, 16, 'Port', 'Ląd ', 'Atak nocą', 0),
(14, 'Bratnia pomoc', '', 'Zaatakowaliśmy od strony portu. Na nasze nieszczęście port był dość trudny do ataku ponieważ już znajdowało się tam dużo ludzi. Widząc przybycie naszych statków zrobili prowizoryczne fortyfikacje. Walka się zaczęła.', 4, 17, NULL, NULL, 'Walka', NULL, NULL, 1),
(15, 'Bratnia pomoc', NULL, 'Zaatakowaliśmy od lądu. Całe szczęście od strony lądu osada miała tylko lichy płot który nawet nie był obsadzony zbyt wieloma strażnikami. Prawdziwa walka rozpoczęła się w osadzie. Całe szczęście nie było tam zbyt wiele osób, ponieważ większość z nich pobiegła bronić portu. Dzięki tej strategii mogliśmy atakować ich z dwóch stron.', 4, 17, NULL, NULL, 'Walka', NULL, NULL, 1),
(16, 'Bratnia pomoc', NULL, 'Po przeprawieniu się przez lasy dotarliśmy do wrogiej osady. Nasi wrogowie byli zaskoczeni. Po cichu wdarliśmy się do domu jarla gdzie był tylko on i trzech wojów. Walka jest teraz tylko formalnością.', 1, 17, NULL, NULL, 'Walka', NULL, NULL, 1),
(17, 'Bratnia pomoc', 'polecenie17.php', 'Gdy zginął wrogi jarl. Jego wojowie złożyli broń. Po przeszukaniu osady znaleźliśmy sporo złota. Jarl Sven w podziękowaniu oddał nam połowę znalezionych skarbów (złoto +10). Teraz on weźmie pod władanie zdobytą osadę. W podzięce dał nam również znaczną ilość suszonych ryb (żywność + 20). Pozostało nam tylko odpłynąć do naszej osady. ', 1, 18, NULL, NULL, 'Wypłyń', NULL, NULL, 0),
(18, 'Bratnia pomoc', NULL, 'Gdy zbieraliśmy się do odpłynięcia przybiegła do nas pewna osoba. Była to potężna wojowniczka Gunhilda. Poprosiła nas o to abyśmy zabrali ją ze sobą do naszej wioski, ponieważ ma dość ciągłego gadania o rybach, i chciałaby brać udział z nami w bitkach zamiast nudzić się w osadzie ojca. Jest ona wartościowym wojownikiem ponieważ jest ona potężnej budowy i smaga wojowników z ogromną siłą za pomocą topora. Choć nie jest ona zwinnym wojownikiem jej siła i hart ducha mogą okazać się przydatne w twoim hirdzie. ', 1, 19, 20, NULL, 'Pozwól dołączyć', 'Odmów', NULL, 0),
(19, 'Bratnia pomoc', 'polecenie19.php', 'Pozwoliliśmy Gunhildzie popłynąć z nami, na co zareagowała olbrzymią radością, niemal miażdżąc mnie gdy uścisnęła mnie z wdzięczności. Wraz z naszą towarzyszką wypłynęliśmy do naszej osady.', 7, 21, NULL, NULL, 'Odpłyń', NULL, NULL, 0),
(20, 'Bratnia pomoc', NULL, 'Nie mogliśmy pozwolić Gunhildzie z nami płynąć, aby nie osłabiać sił osady Svena. Bez namysłu pożegnaliśmy się i odpłynęliśmy w stronę naszej osady.', 7, 21, NULL, NULL, 'Odpłyń', NULL, NULL, 0),
(21, 'Bratnia pomoc', 'Koniec', 'Udało się nam bezpiecznie dopłynąć do osady. Warto dać sobie czas na odpoczynek i wyleczenie ran.', 0, NULL, NULL, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `gracz`
--

CREATE TABLE `gracz` (
  `id` int(11) NOT NULL,
  `imie` varchar(10) NOT NULL,
  `email` varchar(30) NOT NULL,
  `haslo` varchar(10) NOT NULL,
  `ostatnieLogowanie` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Wyzwalacze `gracz`
--
DELIMITER $$
CREATE TRIGGER `graczBudynek1` AFTER INSERT ON `gracz` FOR EACH ROW BEGIN
    INSERT INTO budynek(idGracza, nazwa) VALUES (NEW.id, 'dlugiDom');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `graczBudynek2` AFTER INSERT ON `gracz` FOR EACH ROW BEGIN
    INSERT INTO budynek(idGracza, nazwa) VALUES (NEW.id, 'dom');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `graczBudynek3` AFTER INSERT ON `gracz` FOR EACH ROW BEGIN
    INSERT INTO budynek(idGracza, nazwa) VALUES (NEW.id, 'farma');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `graczMagazyn` AFTER INSERT ON `gracz` FOR EACH ROW BEGIN
    INSERT INTO magazyn(idGracza, topory, miecze, tarcze, hełmy, kotwice, drewno, żelazo, wełna, żywność, skóra, złoto, łaskaBogów)
    VALUES (NEW.id, '5', '0', '0', '0', '0', '30', '10', '10', '20', '5', '0', '10');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `graczPostac1` AFTER INSERT ON `gracz` FOR EACH ROW BEGIN
    DECLARE dom INT;
    DECLARE praca INT;

    SELECT id INTO dom FROM budynek WHERE nazwa = 'dom' AND idGracza = NEW.id;
    SELECT id INTO praca FROM budynek WHERE nazwa = 'farma' AND idGracza = NEW.id;

    INSERT INTO postac(idGracza, imie, imieOjca, plec, sila, zwinnosc, idDomu, idBudynkuPracy, grafika)
    VALUES (NEW.id, 'Olafur', 'Erik', 'mezczyzna', 20, 15, dom, praca, '/img/postaci/mezczyzni/postac1.jpg');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `graczPostac2` AFTER INSERT ON `gracz` FOR EACH ROW BEGIN
    DECLARE dom INT;
    DECLARE praca INT;

    SELECT id INTO dom FROM budynek WHERE nazwa = 'dom' AND idGracza = NEW.id;
    SELECT id INTO praca FROM budynek WHERE nazwa = 'farma' AND idGracza = NEW.id;

    INSERT INTO postac(idGracza, imie, imieOjca, plec, sila, zwinnosc, idDomu, idBudynkuPracy, grafika)
    VALUES (NEW.id, 'Thorhildur', 'Harald', 'kobieta', 15, 20, dom, praca, '/img/postaci/kobiety/postac1.jpg');
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `imiemeskie`
--

CREATE TABLE `imiemeskie` (
  `id` int(11) NOT NULL,
  `imie` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `imiemeskie`
--

INSERT INTO `imiemeskie` (`id`, `imie`) VALUES
(1, 'Ragnar'),
(2, 'Bjorn'),
(3, 'Erik'),
(4, 'Leif'),
(5, 'Thor'),
(6, 'Olaf'),
(7, 'Harald'),
(8, 'Sven'),
(9, 'Frey'),
(10, 'Håkon'),
(11, 'Gunnar'),
(12, 'Rolf'),
(13, 'Ingvar'),
(14, 'Egil'),
(15, 'Njord'),
(16, 'Hrothgar'),
(17, 'Knut'),
(18, 'Ulf'),
(19, 'Odd'),
(20, 'Sigurd'),
(21, 'Gudmund'),
(22, 'Einar'),
(23, 'Frodi'),
(24, 'Asmund'),
(25, 'Orvar'),
(26, 'Valdemar'),
(27, 'Sigbjorn'),
(28, 'Ketil'),
(29, 'Hjalmar'),
(30, 'Thrand'),
(31, 'Halfdan'),
(32, 'Gorm'),
(33, 'Geir'),
(34, 'Torbjorn'),
(35, 'Sigvald'),
(36, 'Kjell'),
(37, 'Ulfar'),
(38, 'Trygve'),
(39, 'Arne'),
(40, 'Grim'),
(41, 'Asgeir'),
(42, 'Hildebrand'),
(43, 'Vali'),
(44, 'Hroar'),
(45, 'Bragi'),
(46, 'Eirikr'),
(47, 'Oddvar'),
(48, 'Ormr'),
(49, 'Vili'),
(50, 'Hallvard'),
(51, 'Frode'),
(52, 'Alaric'),
(53, 'Thorkel'),
(54, 'Ingolf'),
(55, 'Eysteinn'),
(56, 'Atli'),
(57, 'Geirmund'),
(58, 'Orin'),
(59, 'Fridgeir'),
(60, 'Hedin'),
(61, 'Holmgeir'),
(62, 'Valbrand'),
(63, 'Arnkel'),
(64, 'Bjarke'),
(65, 'Hrafn'),
(66, 'Thorgest'),
(67, 'Arnbjorn'),
(68, 'Arnor'),
(69, 'Gisli'),
(70, 'Starkad'),
(71, 'Svend'),
(72, 'Birger'),
(73, 'Eilif'),
(74, 'Hroald'),
(75, 'Kjartan'),
(76, 'Rane'),
(77, 'Sigmund'),
(78, 'Thorkell'),
(79, 'Torkel'),
(80, 'Arvid'),
(81, 'Audun'),
(82, 'Bork'),
(83, 'Grettir'),
(84, 'Hauk'),
(85, 'Ingmar'),
(86, 'Jokul'),
(87, 'Leiknir'),
(88, 'Magnus'),
(89, 'Oddleif'),
(90, 'Palnatoke'),
(91, 'Rurik'),
(92, 'Steinar'),
(93, 'Thrainn'),
(94, 'Ulfketil'),
(95, 'Valgard'),
(96, 'Aslak'),
(97, 'Armod'),
(98, 'Egill'),
(99, 'Flosi'),
(100, 'Hallbjorn'),
(101, 'Hroald'),
(102, 'Ingemar'),
(103, 'Kettil'),
(104, 'Lodin'),
(105, 'Ormur'),
(106, 'Runar'),
(107, 'Stigandr'),
(108, 'Thrain'),
(109, 'Ulfric'),
(110, 'Valthjof'),
(111, 'Arnbjorn'),
(112, 'Asbjorn'),
(113, 'Bergthor'),
(114, 'Eindridi'),
(115, 'Freyr'),
(116, 'Grimkjell'),
(117, 'Halfdan'),
(118, 'Ingvarr'),
(119, 'Kjartan'),
(120, 'Olvir'),
(121, 'Ormr'),
(122, 'Sighvat'),
(123, 'Skallagrim'),
(124, 'Thorarinn'),
(125, 'Toste'),
(126, 'Arnlaug'),
(127, 'Borkvard'),
(128, 'Eyvind'),
(129, 'Gissur'),
(130, 'Haakon'),
(131, 'Helge'),
(132, 'Jokull'),
(133, 'Leifur'),
(134, 'Magnusson'),
(135, 'Oddbjorn'),
(136, 'Pal'),
(137, 'Rognvald'),
(138, 'Sigbjorn'),
(139, 'Thorgeir'),
(140, 'Thorir'),
(141, 'Vali'),
(142, 'Arni'),
(143, 'Asgeirr'),
(144, 'Bjorn'),
(145, 'Eyolf'),
(146, 'Fridthjof'),
(147, 'Geirrod'),
(148, 'Halldor'),
(149, 'Ingolf'),
(150, 'Jon'),
(151, 'Kettil'),
(152, 'Leifur'),
(153, 'Njall'),
(154, 'Oskar'),
(155, 'Pall'),
(156, 'Ragnar'),
(157, 'Sigmundr'),
(158, 'Steingrim'),
(159, 'Thorgnyr'),
(160, 'Thorkel'),
(161, 'Ulf'),
(162, 'Vali'),
(163, 'Yngvar'),
(164, 'Arngrim'),
(165, 'Bardr'),
(166, 'Eilif'),
(167, 'Fridleif'),
(168, 'Gudmund'),
(169, 'Halfdan'),
(170, 'Ingjald'),
(171, 'Kjartan'),
(172, 'Leiknir'),
(173, 'Olafur'),
(174, 'Orvar'),
(175, 'Sigurdr'),
(176, 'Thorbiorn'),
(177, 'Ulfketil'),
(178, 'Valgard'),
(179, 'Alfr'),
(180, 'Arnketil'),
(181, 'Aslak'),
(182, 'Arnor'),
(183, 'Eigil'),
(184, 'Galti'),
(185, 'Hjorleif'),
(186, 'Ingimund'),
(187, 'Kormak'),
(188, 'Magni'),
(189, 'Ormr'),
(190, 'Runolf'),
(191, 'Steinbjorn'),
(192, 'Thrainn'),
(193, 'Ulfur'),
(194, 'Valthjof'),
(195, 'Arnbiorn'),
(196, 'Asbjorn'),
(197, 'Bergthor'),
(198, 'Eindridi'),
(199, 'Freyr'),
(200, 'Grimkjell');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `imiezenskie`
--

CREATE TABLE `imiezenskie` (
  `id` int(11) NOT NULL,
  `imie` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `imiezenskie`
--

INSERT INTO `imiezenskie` (`id`, `imie`) VALUES
(1, 'Astrid'),
(2, 'Freydis'),
(3, 'Ingrid'),
(4, 'Gudrun'),
(5, 'Helga'),
(6, 'Sigrid'),
(7, 'Thyra'),
(8, 'Brynhild'),
(9, 'Thora'),
(10, 'Sigrun'),
(11, 'Gunnhild'),
(12, 'Ragnhild'),
(13, 'Aslaug'),
(14, 'Aud'),
(15, 'Elin'),
(16, 'Solveig'),
(17, 'Yrsa'),
(18, 'Hilde'),
(19, 'Gullveig'),
(20, 'Rannveig'),
(21, 'Asgerd'),
(22, 'Jorunn'),
(23, 'Hjordis'),
(24, 'Alfhild'),
(25, 'Sigyn'),
(26, 'Bergljot'),
(27, 'Thordis'),
(28, 'Hallgerd'),
(29, 'Astridr'),
(30, 'Hildigunn'),
(31, 'Steinunn'),
(32, 'Gudny'),
(33, 'Ranveig'),
(34, 'Ingibjorg'),
(35, 'Thryth'),
(36, 'Svanhild'),
(37, 'Eydís'),
(38, 'Thorgunna'),
(39, 'Thordis'),
(40, 'Frida'),
(41, 'Unn'),
(42, 'Gunnvor'),
(43, 'Sigfrid'),
(44, 'Eir'),
(45, 'Freyja'),
(46, 'Hervor'),
(47, 'Hildr'),
(48, 'Sigridr'),
(49, 'Gudrún'),
(50, 'Alfrun'),
(51, 'Skuld'),
(52, 'Borghild'),
(53, 'Halldora'),
(54, 'Sigrida'),
(55, 'Olrun'),
(56, 'Tora'),
(57, 'Hrothild'),
(58, 'Hervor'),
(59, 'Oddrun'),
(60, 'Ingigerd'),
(61, 'Hildigunn'),
(62, 'Hrafnhild'),
(63, 'Hjordis'),
(64, 'Sesselja'),
(65, 'Solrun'),
(66, 'Thorgerd'),
(67, 'Thordis'),
(68, 'Ragnhildr'),
(69, 'Ylva'),
(70, 'Audhild'),
(71, 'Vigdis'),
(72, 'Thora'),
(73, 'Bergthora'),
(74, 'Steinunn'),
(75, 'Ingibjorg'),
(76, 'Thryth'),
(77, 'Svava'),
(78, 'Asdis'),
(79, 'Eirny'),
(80, 'Asdis'),
(81, 'Gudlaug'),
(82, 'Sigfridr'),
(83, 'Eydís'),
(84, 'Svanhild'),
(85, 'Gudrid'),
(86, 'Hervor'),
(87, 'Hervor'),
(88, 'Ingrun'),
(89, 'Ragnhildr'),
(90, 'Tora'),
(91, 'Halldora'),
(92, 'Sigrida'),
(93, 'Gullveig'),
(94, 'Unn'),
(95, 'Thorgunna'),
(96, 'Borghild'),
(97, 'Gunvor'),
(98, 'Thryth'),
(99, 'Gudny'),
(100, 'Alfhild'),
(101, 'Hildr'),
(102, 'Gudrún'),
(103, 'Steinunn'),
(104, 'Hildigunn'),
(105, 'Rannveig'),
(106, 'Helga'),
(107, 'Ingibjorg'),
(108, 'Asa'),
(109, 'Hildr'),
(110, 'Thorgunna'),
(111, 'Eirny'),
(112, 'Hrafnhild'),
(113, 'Helga'),
(114, 'Aslaug'),
(115, 'Thora'),
(116, 'Sigrid'),
(117, 'Thyra'),
(118, 'Brynhild'),
(119, 'Gunnhild'),
(120, 'Ingibjorg'),
(121, 'Ragnhildr'),
(122, 'Astrid'),
(123, 'Freydis'),
(124, 'Solveig'),
(125, 'Yrsa'),
(126, 'Hilde'),
(127, 'Aud'),
(128, 'Jorunn'),
(129, 'Gullveig'),
(130, 'Astridr'),
(131, 'Hildigunn'),
(132, 'Hjordis'),
(133, 'Alfhild'),
(134, 'Sigyn'),
(135, 'Bergljot'),
(136, 'Thordis'),
(137, 'Hallgerd'),
(138, 'Elin'),
(139, 'Eydís'),
(140, 'Thorgunna'),
(141, 'Rannveig'),
(142, 'Thordis'),
(143, 'Frida'),
(144, 'Unn'),
(145, 'Gunnvor'),
(146, 'Sigfrid'),
(147, 'Eir'),
(148, 'Freyja'),
(149, 'Hervor'),
(150, 'Hildr'),
(151, 'Sigridr'),
(152, 'Gudrún'),
(153, 'Alfrun'),
(154, 'Skuld'),
(155, 'Borghild'),
(156, 'Halldora'),
(157, 'Sigrida'),
(158, 'Olrun'),
(159, 'Tora'),
(160, 'Hrothila'),
(161, 'Hervor'),
(162, 'Oddrun'),
(163, 'Ingigerd'),
(164, 'Hildigunn'),
(165, 'Hrafnhild'),
(166, 'Hjordis'),
(167, 'Sesselja'),
(168, 'Solrun'),
(169, 'Thorgerd'),
(170, 'Thordis'),
(171, 'Ragnhildr'),
(172, 'Ylva'),
(173, 'Audhild'),
(174, 'Vigdis'),
(175, 'Thora'),
(176, 'Bergthora'),
(177, 'Steinunn'),
(178, 'Ingibjorg'),
(179, 'Thryth'),
(180, 'Svava'),
(181, 'Asdis'),
(182, 'Eirny'),
(183, 'Asdis'),
(184, 'Gudlaug'),
(185, 'Sigfridr'),
(186, 'Eydís'),
(187, 'Svanhild'),
(188, 'Gudrid'),
(189, 'Hervor'),
(190, 'Hervor'),
(191, 'Ingrun'),
(192, 'Ragnhildr'),
(193, 'Tora'),
(194, 'Halldora'),
(195, 'Sigrida'),
(196, 'Gullveig'),
(197, 'Unn'),
(198, 'Thorgunna'),
(199, 'Borghild'),
(200, 'Gunvor');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `lodz`
--

CREATE TABLE `lodz` (
  `id` int(11) NOT NULL,
  `idGracza` int(11) NOT NULL,
  `idPortu` int(11) NOT NULL,
  `nazwa` varchar(30) DEFAULT NULL,
  `typ` enum('sneka','skeida','drakar') NOT NULL,
  `iloscMiejsc` int(3) NOT NULL,
  `grafika` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `magazyn`
--

CREATE TABLE `magazyn` (
  `idGracza` int(11) NOT NULL,
  `topory` int(11) NOT NULL,
  `miecze` int(11) NOT NULL,
  `tarcze` int(11) NOT NULL,
  `hełmy` int(11) NOT NULL,
  `kotwice` int(11) NOT NULL,
  `drewno` int(11) NOT NULL,
  `żelazo` int(11) NOT NULL,
  `wełna` int(11) NOT NULL,
  `żywność` int(11) NOT NULL,
  `skóra` int(11) NOT NULL,
  `złoto` int(11) NOT NULL,
  `łaskaBogów` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `postac`
--

CREATE TABLE `postac` (
  `id` int(11) NOT NULL,
  `idGracza` int(11) NOT NULL,
  `imie` varchar(10) NOT NULL,
  `imieOjca` varchar(10) NOT NULL,
  `plec` enum('mezczyzna','kobieta') NOT NULL,
  `hp` int(4) NOT NULL DEFAULT '100',
  `maxHp` int(4) NOT NULL DEFAULT '100',
  `sila` int(4) NOT NULL,
  `zwinnosc` int(4) NOT NULL,
  `helm` tinyint(1) NOT NULL DEFAULT '0',
  `tarcza` tinyint(1) NOT NULL DEFAULT '0',
  `bron` enum('topór','miecz','0') NOT NULL DEFAULT '0',
  `idDomu` int(11) DEFAULT NULL,
  `idBudynkuPracy` int(11) DEFAULT NULL,
  `grafika` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wrog`
--

CREATE TABLE `wrog` (
  `id` int(11) NOT NULL,
  `idEtapu` int(11) NOT NULL,
  `hp` int(4) NOT NULL,
  `sila` int(4) NOT NULL,
  `zwinnosc` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `wrog`
--

INSERT INTO `wrog` (`id`, `idEtapu`, `hp`, `sila`, `zwinnosc`) VALUES
(5, 6, 100, 10, 10),
(6, 6, 100, 10, 11),
(7, 6, 100, 12, 12),
(8, 6, 100, 11, 12),
(9, 14, 120, 30, 30),
(11, 14, 120, 30, 30),
(12, 14, 120, 30, 30),
(13, 14, 120, 30, 30),
(14, 14, 120, 30, 30),
(15, 14, 120, 30, 30),
(16, 14, 120, 30, 30),
(17, 14, 120, 30, 30),
(18, 14, 120, 30, 30),
(19, 14, 120, 30, 30),
(20, 14, 120, 30, 30),
(21, 15, 120, 30, 30),
(22, 15, 120, 30, 30),
(23, 15, 120, 30, 30),
(24, 15, 120, 30, 30),
(25, 15, 120, 30, 30),
(26, 15, 120, 30, 30),
(27, 15, 120, 30, 30),
(28, 16, 120, 30, 30),
(29, 16, 120, 30, 30),
(30, 16, 120, 30, 30);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wyprawa`
--

CREATE TABLE `wyprawa` (
  `idGracza` int(11) NOT NULL,
  `idEtapu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `budynek`
--
ALTER TABLE `budynek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idGracza` (`idGracza`);

--
-- Indeksy dla tabeli `etap`
--
ALTER TABLE `etap`
  ADD PRIMARY KEY (`id`),
  ADD KEY `opcja1id` (`opcja1id`),
  ADD KEY `opcja2id` (`opcja2id`),
  ADD KEY `opcja3id` (`opcja3id`);

--
-- Indeksy dla tabeli `gracz`
--
ALTER TABLE `gracz`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `imiemeskie`
--
ALTER TABLE `imiemeskie`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `imiezenskie`
--
ALTER TABLE `imiezenskie`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `lodz`
--
ALTER TABLE `lodz`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idGracza` (`idGracza`),
  ADD KEY `idPortu` (`idPortu`);

--
-- Indeksy dla tabeli `magazyn`
--
ALTER TABLE `magazyn`
  ADD PRIMARY KEY (`idGracza`);

--
-- Indeksy dla tabeli `postac`
--
ALTER TABLE `postac`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idGracza` (`idGracza`),
  ADD KEY `idBudynkuPracy` (`idBudynkuPracy`),
  ADD KEY `idDomu` (`idDomu`);

--
-- Indeksy dla tabeli `wrog`
--
ALTER TABLE `wrog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idEtapu` (`idEtapu`);

--
-- Indeksy dla tabeli `wyprawa`
--
ALTER TABLE `wyprawa`
  ADD PRIMARY KEY (`idGracza`,`idEtapu`),
  ADD KEY `idEtapu` (`idEtapu`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `budynek`
--
ALTER TABLE `budynek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `etap`
--
ALTER TABLE `etap`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `gracz`
--
ALTER TABLE `gracz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `imiemeskie`
--
ALTER TABLE `imiemeskie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;

--
-- AUTO_INCREMENT for table `imiezenskie`
--
ALTER TABLE `imiezenskie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;

--
-- AUTO_INCREMENT for table `lodz`
--
ALTER TABLE `lodz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `postac`
--
ALTER TABLE `postac`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wrog`
--
ALTER TABLE `wrog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `budynek`
--
ALTER TABLE `budynek`
  ADD CONSTRAINT `budynek_ibfk_1` FOREIGN KEY (`idGracza`) REFERENCES `gracz` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `etap`
--
ALTER TABLE `etap`
  ADD CONSTRAINT `etap_ibfk_1` FOREIGN KEY (`opcja1id`) REFERENCES `etap` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `etap_ibfk_2` FOREIGN KEY (`opcja2id`) REFERENCES `etap` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `etap_ibfk_3` FOREIGN KEY (`opcja3id`) REFERENCES `etap` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lodz`
--
ALTER TABLE `lodz`
  ADD CONSTRAINT `lodz_ibfk_1` FOREIGN KEY (`idGracza`) REFERENCES `gracz` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lodz_ibfk_2` FOREIGN KEY (`idPortu`) REFERENCES `budynek` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `magazyn`
--
ALTER TABLE `magazyn`
  ADD CONSTRAINT `magazyn_ibfk_1` FOREIGN KEY (`idGracza`) REFERENCES `gracz` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `postac`
--
ALTER TABLE `postac`
  ADD CONSTRAINT `postac_ibfk_1` FOREIGN KEY (`idGracza`) REFERENCES `gracz` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `postac_ibfk_2` FOREIGN KEY (`idBudynkuPracy`) REFERENCES `budynek` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `postac_ibfk_3` FOREIGN KEY (`idDomu`) REFERENCES `budynek` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `wrog`
--
ALTER TABLE `wrog`
  ADD CONSTRAINT `wrog_ibfk_1` FOREIGN KEY (`idEtapu`) REFERENCES `etap` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wyprawa`
--
ALTER TABLE `wyprawa`
  ADD CONSTRAINT `wyprawa_ibfk_1` FOREIGN KEY (`idEtapu`) REFERENCES `etap` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wyprawa_ibfk_2` FOREIGN KEY (`idGracza`) REFERENCES `gracz` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
