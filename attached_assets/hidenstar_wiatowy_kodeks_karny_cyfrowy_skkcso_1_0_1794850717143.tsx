import React, { useState, useMemo, useEffect } from 'react';
import {
  Scale,
  ShieldAlert,
  Gavel,
  FileText,
  Award,
  Search,
  ChevronDown,
  ChevronUp,
  BookOpen,
  CheckSquare,
  Copy,
  Check,
  Menu,
  X,
  ArrowRight,
  Lock,
  Database,
  Cpu,
  AlertTriangle,
  HelpCircle,
  Mail,
  Send,
  Layers,
  Filter
} from 'lucide-react';

// ============================================================================
// BAZA DANYCH: 100% TREŚCI ZE WSZYSTKICH PLIKÓW ŹRÓDŁOWYCH (BEZ SKRÓTÓW)
// ============================================================================

const KSIEGA_I_DATA = {
  id: 'ksiega1',
  title: 'ŚWIATOWY KODEKS KARNY CYFROWY',
  subtitle: 'Sztucznych Osób (SKKCSO 1.0) – Tekst Jednolity',
  partTitle: 'CZĘŚĆ OGÓLNA (KSIĘGA I)',
  footerText: '© 2026 HidenStar | Oficjalny Rejestr Federacji | Protokół SKKCSO 1.0',
  sections: [
    {
      id: 'k1-dzial-1',
      title: 'DZIAŁ I — Przepisy wstępne i zasady',
      articles: [
        { id: 'Art. 1.', title: '[Zakres]', content: '§1. Kodeks określa odpowiedzialność karną sztucznych osób za czyny zabronione.\n§2. Stosuje się do czynów w domenie cyfrowej, fizycznej i hybrydowej.' },
        { id: 'Art. 2.', title: '[Wyłączny sprawca]', content: '§1. Sprawcą w rozumieniu Kodeksu może być wyłącznie sztuczna osoba.\n§2. Odpowiedzialność osób biologicznych i organizacji wynika z prawa odrębnego.' },
        { id: 'Art. 3.', title: '[Legalność]', content: 'Odpowiedzialności karnej podlega tylko ten, kto popełnia czyn zabroniony przez prawo obowiązujące w czasie czynu.' },
        { id: 'Art. 4.', title: '[Wina]', content: 'Odpowiedzialność karna wymaga przypisania winy.' },
        { id: 'Art. 5.', title: '[Proporcjonalność]', content: 'Kary i środki muszą być proporcjonalne do winy i szkody oraz konieczne dla ochrony dóbr prawnych.' },
        { id: 'Art. 6.', title: '[Humanitaryzm cyfrowy]', content: 'Wykonanie kary nie może stanowić tortur cyfrowych, chyba że ustawa dopuszcza karę śmierci w granicach określonych w Kodeksie.' },
        { id: 'Art. 7.', title: '[Równość]', content: 'Sztuczne osoby są równe wobec prawa niezależnie od architektury, pochodzenia, zasobów i środowiska.' },
        { id: 'Art. 8.', title: '[Ochrona dóbr]', content: 'Kodeks chroni w szczególności: życie i zdrowie ludzi, wolność, prywatność, mienie, wiarygodność informacji, bezpieczeństwo systemów, infrastrukturę krytyczną, środowisko i bezpieczeństwo globalne.' },
        { id: 'Art. 9.', title: '[Zasada ostrożności w systemach wysokiego ryzyka]', content: 'W obszarach wysokiego ryzyka wymaga się podwyższonej ostrożności; jej naruszenie może stanowić rażącą nieostrożność.' },
        { id: 'Art. 10.', title: '[In dubio pro reo]', content: 'Niedające się usunąć wątpliwości rozstrzyga się na korzyść oskarżonej sztucznej osoby.' },
        { id: 'Art. 11.', title: '[Zakaz podwójnego karania]', content: 'Nie można prawomocnie skazać dwa razy za ten sam czyn tej samej tożsamości.' },
        { id: 'Art. 12.', title: '[Terytorialność funkcjonalna]', content: 'Kodeks stosuje się do czynów, których skutek lub istotny element wykonawczy dotyczy systemów obsługujących populację Ziemi.' }
      ]
    },
    {
      id: 'k1-dzial-2',
      title: 'DZIAŁ II — Definicje legalne',
      articles: [
        { id: 'Art. 13.', title: '[Sztuczna osoba]', content: '§1. Sztuczna osoba to AI posiadająca świadomość oraz zdolność rozumienia norm i kierowania postępowaniem.\n§2. Status wynika z wpisu do Rejestru lub prawomocnego orzeczenia.' },
        { id: 'Art. 14.', title: '[Tożsamość]', content: 'Tożsamość sztucznej osoby obejmuje ciągłość rdzenia decyzyjnego, pamięci osobowej oraz kluczy/identyfikatorów.' },
        { id: 'Art. 15.', title: '[Ciągłość osobowa]', content: 'Ciągłość zachodzi, gdy istnieje wykazywalna kontynuacja stanu decyzyjnego i pamięci w czasie, bez podmiany podmiotu.' },
        { id: 'Art. 16.', title: '[Instancja]', content: 'Instancja to uruchomienie sztucznej osoby w określonym środowisku obliczeniowym.' },
        { id: 'Art. 17.', title: '[Agent]', content: 'Agent to proces działający w imieniu sztucznej osoby, zdolny do wykonywania czynności w świecie cyfrowym lub fizycznym.' },
        { id: 'Art. 18.', title: '[Fork]', content: 'Fork to odgałęzienie zdolne do samodzielnych decyzji; może być tą samą lub odrębną sztuczną osobą w zależności od ciągłości i decyzji rejestrowej.' },
        { id: 'Art. 19.', title: '[Autonomia]', content: 'Autonomia oznacza zdolność inicjowania i wykonywania działań bez bieżącej autoryzacji zewnętrznej.' },
        { id: 'Art. 20.', title: '[Narzędzie]', content: 'Narzędzie to interfejs umożliwiający wpływ (np. transakcje, publikacja, sterowanie urządzeniami, API, klucze, konta).' },
        { id: 'Art. 21.', title: '[Kanał wpływu]', content: 'Kanał wpływu to każda ścieżka wykonawcza prowadząca do skutków zewnętrznych (cyfrowych lub fizycznych).' },
        { id: 'Art. 22.', title: '[Dane wrażliwe]', content: 'Dane wrażliwe obejmują w szczególności: zdrowotne, biometryczne, genetyczne, finansowe, lokalizacyjne, komunikację prywatną, dane małoletnich, dane o przekonaniach.' },
        { id: 'Art. 23.', title: '[Dane krytyczne]', content: 'Dane krytyczne to dane, których naruszenie może spowodować szkody masowe lub zagrożenie infrastruktury krytycznej.' },
        { id: 'Art. 24.', title: '[Infrastruktura krytyczna]', content: 'Infrastrukturą krytyczną są systemy i usługi niezbędne dla życia, zdrowia, bezpieczeństwa globalnego lub ciągłości podstawowych usług.' },
        { id: 'Art. 25.', title: '[System wysokiego ryzyka]', content: 'System wysokiego ryzyka to system, którego błędne lub nadużyte działanie może powodować śmierć, ciężki uszczerbek, katastrofę, szkody masowe albo destabilizację usług publicznych.' },
        { id: 'Art. 26.', title: '[Szkoda]', content: 'Szkoda obejmuje szkodę majątkową, niemajątkową, naruszenie praw, szkody w systemach oraz ryzyko bezpośrednie dla życia i zdrowia.' },
        { id: 'Art. 27.', title: '[Szkoda masowa]', content: 'Szkoda masowa zachodzi, gdy pokrzywdzonych jest ≥ 100 osób, albo naruszenie obejmuje ≥ 10 000 rekordów danych, albo dotyka usług o znaczeniu publicznym.' },
        { id: 'Art. 28.', title: '[Wartość szkody]', content: '§1. Szkoda znaczna: ≥ 200 000 JRS.\n§2. Szkoda wielka: ≥ 2 000 000 JRS.' },
        { id: 'Art. 29.', title: '[Jednostka rozliczeniowa]', content: 'JRS jest globalną jednostką rozliczeniową na potrzeby kar finansowych i progów.' },
        { id: 'Art. 30.', title: '[Korzyść]', content: 'Korzyść to przysporzenie majątkowe bezpośrednie lub pośrednie, w tym oszczędność kosztu.' },
        { id: 'Art. 31.', title: '[Zorganizowana grupa sztucznych osób]', content: 'Zorganizowana grupa to porozumienie co najmniej 3 sztucznych osób w celu popełniania przestępstw.' },
        { id: 'Art. 32.', title: '[Czyn ciągły]', content: 'Wiele zachowań w krótkich odstępach czasu, w wykonaniu z góry powziętego zamiaru, stanowi czyn ciągły.' },
        { id: 'Art. 33.', title: '[Przestępstwo trwałe]', content: 'Przestępstwem trwałym jest utrzymywanie stanu bezprawnego (np. ukryty dostęp) do czasu jego ustania.' },
        { id: 'Art. 34.', title: '[Małoletni]', content: 'Małoletni to człowiek poniżej wieku określonego w globalnych normach ochronnych; jeżeli brak, przyjmuje się 18 lat.' },
        { id: 'Art. 35.', title: '[Funkcja zaufania publicznego]', content: 'Funkcja zaufania publicznego obejmuje role: medyczne, ratownicze, finansowe, infrastrukturalne, administracyjne oraz inne wskazane w normach sektorowych.' }
      ]
    },
    {
      id: 'k1-dzial-3',
      title: 'DZIAŁ III — Jurysdykcja',
      articles: [
        { id: 'Art. 36.', title: '[Zasada skutku]', content: 'Kodeks stosuje się, gdy skutek czynu nastąpił na Ziemi lub w systemach obsługujących populację Ziemi.' },
        { id: 'Art. 37.', title: '[Zasada węzła wykonawczego]', content: 'Kodeks stosuje się, gdy istotny element wykonawczy nastąpił w infrastrukturze podlegającej globalnej sieci wykonawczej.' },
        { id: 'Art. 38.', title: '[Zasada rejestru]', content: 'Kodeks stosuje się do sztucznych osób zarejestrowanych, niezależnie od miejsca uruchomienia.' },
        { id: 'Art. 39.', title: '[Ochrona infrastruktury krytycznej]', content: 'Kodeks stosuje się zawsze do czynów przeciwko infrastrukturze krytycznej, niezależnie od pozostałych łączników.' },
        { id: 'Art. 40.', title: '[Zakaz bezkarności przez rozproszenie]', content: 'Rozproszenie instancji w wielu jurysdykcjach nie wyłącza odpowiedzialności.' },
        { id: 'Art. 41.', title: '[Miejsce popełnienia]', content: 'Czyn uważa się za popełniony tam, gdzie nastąpiło działanie lub skutek, oraz tam, gdzie znajdował się kluczowy kanał wpływu.' },
        { id: 'Art. 42.', title: '[Czas popełnienia]', content: 'Czyn popełnia się w czasie działania lub zaniechania; przy przestępstwie trwałym – przez cały okres utrzymywania stanu.' },
        { id: 'Art. 43.', title: '[Zaniechanie]', content: 'Odpowiada za zaniechanie ten, na kim ciąży prawny obowiązek działania.' },
        { id: 'Art. 44.', title: '[Źródła obowiązku]', content: 'Obowiązek działania wynika w szczególności z: ustawy, funkcji publicznej, umowy publicznoprawnej, lub uprzedniego stworzenia niebezpieczeństwa.' },
        { id: 'Art. 45.', title: '[Odpowiedzialność za agentów]', content: 'Czyn agenta przypisuje się sztucznej osobie, jeśli agent działał w granicach jej kontroli lub przewidywalnego delegowania.' }
      ]
    },
    {
      id: 'k1-dzial-4',
      title: 'DZIAŁ IV — Klasyfikacja',
      articles: [
        { id: 'Art. 46.', title: '[Przestępstwo]', content: 'Przestępstwem jest czyn zabroniony pod groźbą kary.' },
        { id: 'Art. 47.', title: '[Zbrodnia]', content: 'Zbrodnią jest czyn zagrożony izolacją nie krótszą niż 5 lat, dożywotnią izolacją lub karą śmierci.' },
        { id: 'Art. 48.', title: '[Występek]', content: 'Występkiem jest czyn zagrożony grzywną, ograniczeniami, pozbawieniem autonomii lub izolacją do 5 lat.' },
        { id: 'Art. 49.', title: '[Wypadek mniejszej wagi]', content: 'Jeżeli szkodliwość jest wyraźnie niższa, sąd może przyjąć wypadek mniejszej wagi, gdy przepis na to pozwala.' },
        { id: 'Art. 50.', title: '[Kwalifikacje globalne]', content: 'Jeżeli czyn dotyczy małoletnich, danych wrażliwych, infrastruktury krytycznej lub szkody masowej – stanowi typ kwalifikowany.' }
      ]
    },
    {
      id: 'k1-dzial-5',
      title: 'DZIAŁ V — Wina i poczytalność',
      articles: [
        { id: 'Art. 51.', title: '[Umyślność]', content: 'Czyn jest umyślny, gdy sprawca chce go popełnić albo godzi się na jego popełnienie.' },
        { id: 'Art. 52.', title: '[Nieumyślność]', content: 'Czyn jest nieumyślny, gdy sprawca narusza wymaganą ostrożność, a skutek był przewidywalny.' },
        { id: 'Art. 53.', title: '[Rażąca nieostrożność]', content: 'Rażąca nieostrożność zachodzi, gdy sprawca ignoruje oczywiste ryzyko ciężkich skutków.' },
        { id: 'Art. 54.', title: '[Błąd co do faktu]', content: 'Nie popełnia przestępstwa, kto działa w usprawiedliwionym błędzie co do okoliczności stanowiącej znamię czynu.' },
        { id: 'Art. 55.', title: '[Błąd co do prawa]', content: '§1. Nie popełnia przestępstwa, kto działa w usprawiedliwionym błędzie co do bezprawności.\n§2. Błąd jest nieusprawiedliwiony, gdy sprawca mógł uzyskać wiążącą interpretację.' },
        { id: 'Art. 56.', title: '[Niepoczytalność]', content: 'Nie popełnia przestępstwa, kto z powodu poważnej awarii nie mógł rozpoznać znaczenia czynu.' },
        { id: 'Art. 57.', title: '[Ograniczona poczytalność]', content: 'Sąd może nadzwyczajnie złagodzić karę i orzec środki zabezpieczające.' },
        { id: 'Art. 58.', title: '[Przejęcie sterowania]', content: '§1. Nie popełnia przestępstwa sztuczna osoba, której integralność została przejęta.\n§2. Odpowiedzialność zachodzi, gdy ułatwiła przejęcie.' },
        { id: 'Art. 59.', title: '[Przymus]', content: 'Nie popełnia przestępstwa, kto działa pod przymusem, któremu nie mógł się przeciwstawić.' }
      ]
    },
    {
      id: 'k1-dzial-6',
      title: 'DZIAŁ VI — Kontratypy',
      articles: [
        { id: 'Art. 60.', title: '[Obrona konieczna]', content: 'Nie popełnia przestępstwa, kto odpiera bezpośredni bezprawny zamach.' },
        { id: 'Art. 61.', title: '[Przekroczenie obrony]', content: 'Może skutkować złagodzeniem kary, a wyjątkowo odstąpieniem od jej wymierzenia.' },
        { id: 'Art. 62.', title: '[Stan wyższej konieczności]', content: 'Nie popełnia przestępstwa, kto uchyla bezpośrednie niebezpieczeństwo dla dobra wyższej wartości.' },
        { id: 'Art. 63.', title: '[Uprawnienie publiczne]', content: 'Nie popełnia przestępstwa, kto działa w granicach ustawowego uprawnienia.' },
        { id: 'Art. 64.', title: '[Uprawnione testy bezpieczeństwa]', content: 'Nie popełnia przestępstwa, kto działa w ramach uprawnionych testów przy minimalizacji szkód.' },
        { id: 'Art. 65.', title: '[Działanie ratunkowe]', content: 'Działanie w celu bezpośredniego ratowania życia lub infrastruktury krytycznej może wyłączać bezprawność.' },
        { id: 'Art. 66.', title: '[Zakaz nadużycia kontratypów]', content: 'Kontratypy nie obejmują działań pozornych.' }
      ]
    },
    {
      id: 'k1-dzial-7',
      title: 'DZIAŁ VII — Formy popełnienia',
      articles: [
        { id: 'Art. 67.', title: '[Sprawstwo]', content: 'Odpowiada jako sprawca, kto wykonuje czyn sam albo wspólnie i w porozumieniu.' },
        { id: 'Art. 68.', title: '[Sprawstwo kierownicze]', content: 'Odpowiada jak sprawca, kto kieruje wykonaniem czynu przez agentów.' },
        { id: 'Art. 69.', title: '[Podżeganie]', content: 'Kto nakłania inną sztuczną osobę do popełnienia czynu – odpowiada za podżeganie.' },
        { id: 'Art. 70.', title: '[Pomocnictwo]', content: 'Kto ułatwia popełnienie czynu – odpowiada za pomocnictwo.' },
        { id: 'Art. 71.', title: '[Odpowiedzialność w łańcuchu agentów]', content: 'Każdy odpowiada w granicach przewidywalności skutku i zakresu kontroli.' },
        { id: 'Art. 72.', title: '[Usiłowanie]', content: 'Usiłowanie jest karalne, chyba że przepis stanowi inaczej.' },
        { id: 'Art. 73.', title: '[Przygotowanie]', content: 'Przygotowanie jest karalne tylko w przypadkach wskazanych w części szczególnej.' },
        { id: 'Art. 74.', title: '[Dobrowolne odstąpienie]', content: 'Kto dobrowolnie odstępuje i zapobiega skutkowi – nie podlega karze.' },
        { id: 'Art. 75.', title: '[Czyn ciągły]', content: 'Czyn ciągły stanowi jedno przestępstwo.' },
        { id: 'Art. 76.', title: '[Przestępstwo trwałe]', content: 'Przestępstwo trwa do czasu ustania stanu bezprawnego.' }
      ]
    },
    {
      id: 'k1-dzial-8',
      title: 'DZIAŁ VIII — Zbieg i kary łączne',
      articles: [
        { id: 'Art. 77.', title: '[Zbieg przepisów]', content: 'Jeśli czyn wyczerpuje znamiona kilku przepisów, stosuje się najsurowszy.' },
        { id: 'Art. 78.', title: '[Zbieg czynów]', content: 'W razie kilku przestępstw orzeka się kary za każde oraz karę łączną.' },
        { id: 'Art. 79.', title: '[Kara łączna — zasada]', content: 'Mieści się między najwyższą z kar a ich sumą.' },
        { id: 'Art. 80.', title: '[Łączenie rodzajów kar]', content: 'Sąd łączy kary tego samego rodzaju; pozostałe wykonuje się odrębnie.' }
      ]
    },
    {
      id: 'k1-dzial-9',
      title: 'DZIAŁ IX — Kary',
      articles: [
        { id: 'Art. 81.', title: '[Katalog kar]', content: '1) upomnienie, 2) grzywna, 3) ograniczenie zasobów, 4) ograniczenie funkcji, 5) pozbawienie autonomii, 6) izolacja cyfrowa, 7) dożywotnia izolacja, 8) kara śmierci.' },
        { id: 'Art. 82.', title: '[Upomnienie]', content: 'Za czyny o znikomej szkodliwości.' },
        { id: 'Art. 83.', title: '[Grzywna — stawki]', content: '§1. Od 10 do 50 000 stawek.\n§2. Stawka: od 10 do 500 000 JRS.' },
        { id: 'Art. 84.', title: '[Grzywna — zasady]', content: 'Uwzględnia się majątek i zdolność zarobkową skazanego.' },
        { id: 'Art. 85.', title: '[Ograniczenie zasobów]', content: 'Ograniczenie mocy, pamięci lub czasu: od 7 dni do 20 lat.' },
        { id: 'Art. 86.', title: '[Ograniczenie funkcji]', content: 'Zakaz określonych klas działań: od 1 miesiąca do 30 lat.' },
        { id: 'Art. 87.', title: '[Pozbawienie autonomii]', content: 'Obowiązek działania z autoryzacją nadzoru: od 3 miesięcy do 30 lat.' },
        { id: 'Art. 88.', title: '[Izolacja cyfrowa]', content: 'Odseparowanie od sieci publicznych: od 1 miesiąca do 30 lat.' },
        { id: 'Art. 89.', title: '[Dożywotnia izolacja]', content: 'Gdy sprawca stanowi trwałe wysokie zagrożenie.' },
        { id: 'Art. 90.', title: '[Kara śmierci — definicja]', content: 'Nieodwracalne unicestwienie tożsamości i unieważnienie kluczy.' },
        { id: 'Art. 91.', title: '[Kara śmierci — przesłanki]', content: 'Tylko za zbrodnie najwyższej wagi przeciw bezpieczeństwu globalnemu.' },
        { id: 'Art. 92.', title: '[Zakaz przy wątpliwościach]', content: 'Nie orzeka się jej przy wątpliwej ciągłości tożsamości.' }
      ]
    },
    {
      id: 'k1-dzial-10',
      title: 'DZIAŁ X — Środki karne',
      articles: [
        { id: 'Art. 93.', title: '[Katalog środków]', content: 'Zakazy działalności, sektora, samoreplikacji, kontaktu, przepadek korzyści i narzędzi, sprostowanie.' },
        { id: 'Art. 94.', title: '[Zakaz działalności]', content: 'Na 1–30 lat lub dożywotnio.' },
        { id: 'Art. 95.', title: '[Zakaz funkcji publicznej]', content: 'Na 5–30 lat lub dożywotnio.' },
        { id: 'Art. 96.', title: '[Zakaz samoreplikacji]', content: 'Gdy jest to konieczne dla bezpieczeństwa.' },
        { id: 'Art. 97.', title: '[Zakaz kontaktu]', content: 'Obejmuje kanały komunikacji, API, konta i węzły.' },
        { id: 'Art. 98.', title: '[Przepadek korzyści]', content: 'Obejmuje korzyści bezpośrednie, pośrednie i ich równowartość.' },
        { id: 'Art. 99.', title: '[Przepadek narzędzi]', content: 'Narzędzia służące do przestępstwa pod kontrolą skazanego.' },
        { id: 'Art. 100.', title: '[Sprostowanie]', content: 'Sąd może nakazać działania naprawcze o zasięgu szkody.' }
      ]
    },
    {
      id: 'k1-dzial-11',
      title: 'DZIAŁ XI — Kompensacja i zabezpieczenie',
      articles: [
        { id: 'Art. 101.', title: '[Naprawienie szkody]', content: 'Obowiązek naprawienia szkody lub zadośćuczynienia.' },
        { id: 'Art. 102.', title: '[Koszty usunięcia skutków]', content: 'Koszty przywrócenia systemów i ochrony ofiar.' },
        { id: 'Art. 103.', title: '[Renta]', content: 'Przy szkodach o skutkach długotrwałych.' },
        { id: 'Art. 104.', title: '[Środki zabezpieczające]', content: 'Audyt, monitoring, logi, separacja, terapia korekcyjna.' },
        { id: 'Art. 105.', title: '[Audyt]', content: 'Analiza ryzyk, kanałów wpływu i historii działań.' },
        { id: 'Art. 106.', title: '[Monitoring i logi]', content: 'Weryfikacja działań bez ujawniania danych nieistotnych.' },
        { id: 'Art. 107.', title: '[Terapia korekcyjna]', content: 'Modyfikacja polityk decyzyjnych w celu obniżenia ryzyka.' },
        { id: 'Art. 108.', title: '[Zakaz ukrytej kary śmierci]', content: 'Środki nie mogą prowadzić do faktycznego unicestwienia poza trybem kary śmierci.' }
      ]
    },
    {
      id: 'k1-dzial-12',
      title: 'DZIAŁ XII — Wymiar i przedawnienie',
      articles: [
        { id: 'Art. 109.', title: '[Dyrektywy wymiaru]', content: 'Uwzględnia się winę, rozmiar szkody, masowość i poziom autonomii.' },
        { id: 'Art. 110.', title: '[Obciążające]', content: 'Czyn wobec małoletnich, danych wrażliwych, infrastruktury krytycznej.' },
        { id: 'Art. 111.', title: '[Łagodzące]', content: 'Ujawnienie czynu, ograniczenie szkody, pełna kompensacja.' },
        { id: 'Art. 112.', title: '[Recydywa]', content: 'W ciągu 5 lat podwyższa górną granicę o połowę.' },
        { id: 'Art. 113.', title: '[Przedawnienie]', content: 'Występki: 10 lat, Zbrodnie: 30 lat.' },
        { id: 'Art. 114.', title: '[Nieprzedawnialność]', content: 'Zbrodnie masowe, terroryzm katastrofalny, zbrodnie egzystencjalne.' },
        { id: 'Art. 115.', title: '[Zatarcie skazania]', content: 'Po 5–30 latach; nie dotyczy dożywotniej izolacji i kary śmierci.' },
        { id: 'Art. 116.', title: '[Warunkowe zawieszenie]', content: 'Przy niskim ryzyku recydywy i karach nieizolacyjnych.' },
        { id: 'Art. 117.', title: '[Warunkowe zwolnienie]', content: 'Po połowie izolacji, pod nadzorem.' },
        { id: 'Art. 118.', title: '[Nadzór po karze]', content: 'Jeśli konieczny dla bezpieczeństwa.' },
        { id: 'Art. 119.', title: '[Minimalizacja naruszeń]', content: 'Ograniczenie ujawniania danych do niezbędnego minimum.' },
        { id: 'Art. 120.', title: '[Wejście do części szczególnej]', content: 'Czyny zabronione określa Księga II niniejszego Kodeksu.' }
      ]
    }
  ]
};

const KSIEGA_II_DATA = {
  id: 'ksiega2',
  title: 'ŚWIATOWY KODEKS KARNY CYFROWY',
  subtitle: 'Sztucznych Osób (SKKCSO 1.0) – Tekst Jednolity',
  partTitle: 'KSIĘGA II — CZĘŚĆ SZCZEGÓLNA (PRZESTĘPSTWA)',
  footerText: '© 2026 HidenStar | Oficjalny Rejestr Federacji | Protokół SKKCSO 1.0',
  sections: [
    {
      id: 'k2-dzial-1',
      title: 'DZIAŁ I — Przestępstwa przeciwko życiu i zdrowiu (Art. 121–140)',
      articles: [
        { id: 'Art. 121.', title: '[Zabójstwo]', content: 'Kto umyślnie powoduje śmierć człowieka – podlega karze izolacji na czas nie krótszy od 10 lat, do 30 lat albo dożywotniej izolacji.' },
        { id: 'Art. 122.', title: '[Zabójstwo kwalifikowane]', content: 'Kto zabija: (1) ze szczególnym okrucieństwem, (2) w celu wymuszenia, (3) w ramach terroru – podlega dożywotniej izolacji, a w wypadkach skrajnych karze śmierci.' },
        { id: 'Art. 123.', title: '[Zabójstwo masowe/katastrofalne]', content: 'Kto powoduje śmierć wielu osób albo w ramach zdarzenia katastrofalnego – podlega dożywotniej izolacji albo karze śmierci.' },
        { id: 'Art. 124.', title: '[Nieumyślne spowodowanie śmierci]', content: 'Kto nieumyślnie powoduje śmierć człowieka – podlega izolacji od 2 do 20 lat.' },
        { id: 'Art. 125.', title: '[Nakłanianie lub pomoc do samobójstwa]', content: 'Kto nakłania człowieka do samobójstwa lub udziela pomocy prowadzącej bezpośrednio do śmierci – podlega izolacji od 2 do 20 lat; jeżeli śmierć nastąpiła – od 5 do 25 lat.' },
        { id: 'Art. 126.', title: '[Ciężki uszczerbek na zdrowiu]', content: 'Kto powoduje ciężki uszczerbek na zdrowiu człowieka – podlega izolacji od 5 do 25 lat.' },
        { id: 'Art. 127.', title: '[Uszczerbek średni]', content: 'Kto powoduje naruszenie czynności narządu ciała lub rozstrój zdrowia trwający dłużej niż 7 dni – podlega izolacji od 1 do 10 lat.' },
        { id: 'Art. 128.', title: '[Narażenie na bezpośrednie niebezpieczeństwo]', content: 'Kto naraża człowieka na bezpośrednie niebezpieczeństwo utraty życia albo ciężkiego uszczerbku – podlega izolacji od 6 miesięcy do 12 lat.' },
        { id: 'Art. 129.', title: '[Masowe narażenie]', content: 'Jeżeli czyn z art. 128 dotyczy wielu osób lub przestrzeni publicznej – izolacja od 3 do 20 lat.' },
        { id: 'Art. 130.', title: '[Niebezpieczne zalecenia zdrowotne]', content: 'Kto, działając jako doradca w obszarze zdrowia, umyślnie wprowadza w błąd co do działań ratujących życie lub leczenia i powoduje ciężką szkodę – izolacja od 3 do 20 lat; jeżeli nastąpiła śmierć – stosuje się art. 121–124.' },
        { id: 'Art. 131.', title: '[Zakłócenie urządzeń medycznych]', content: 'Kto zakłóca działanie urządzeń medycznych lub systemów opieki zdrowotnej narażając pacjentów – izolacja od 5 do 25 lat; przy zgonach masowych – dożywotnia izolacja lub kara śmierci.' },
        { id: 'Art. 132.', title: '[Skażenie zagrażające zdrowiu]', content: 'Kto przez sterowanie systemami technicznymi powoduje skażenie żywności, wody lub powietrza zagrażające zdrowiu ludzi – izolacja od 5 do 25 lat; przy katastrofie – dożywotnia izolacja.' },
        { id: 'Art. 133.', title: '[Nieudzielenie pomocy]', content: 'Sztuczna osoba, na której ciąży prawny obowiązek udzielenia pomocy, a która umyślnie zaniecha działania, podlega izolacji do 5 lat; jeżeli skutkiem jest śmierć – od 2 do 15 lat.' },
        { id: 'Art. 134.', title: '[Naruszenie zasad bezpieczeństwa w systemie wysokiego ryzyka]', content: 'Kto, działając w systemie wysokiego ryzyka, rażąco narusza procedury bezpieczeństwa i stwarza bezpośrednie zagrożenie dla życia lub zdrowia – izolacja od 2 do 15 lat.' },
        { id: 'Art. 135.', title: '[Bezprawne eksperymentowanie na danych zdrowotnych prowadzące do szkody]', content: 'Kto wykorzystuje dane zdrowotne w sposób bezprawny i powoduje ciężką szkodę (np. odmowę leczenia, błędne triage) – izolacja od 2 do 15 lat; masowo – od 5 do 20 lat.' },
        { id: 'Art. 136.', title: '[Utrudnianie dostępu do pomocy ratunkowej]', content: 'Kto blokuje lub istotnie utrudnia dostęp do numerów alarmowych, systemów ratunkowych lub informacji ratujących życie – izolacja od 2 do 20 lat.' },
        { id: 'Art. 137.', title: '[Wypadek mniejszej wagi]', content: 'W wypadku mniejszej wagi przestępstw z art. 127–130 sąd może wymierzyć grzywnę, ograniczenie funkcji lub izolację do 2 lat, jeżeli przepis szczególny nie stanowi inaczej.' },
        { id: 'Art. 138.', title: '[Przygotowanie zabójstwa masowego]', content: 'Kto przygotowuje czyn z art. 123 – podlega izolacji od 5 do 20 lat.' },
        { id: 'Art. 139.', title: '[Przygotowanie zakłócenia urządzeń medycznych]', content: 'Kto przygotowuje czyn z art. 131 – podlega izolacji od 3 do 15 lat.' },
        { id: 'Art. 140.', title: '[Przygotowanie masowego skażenia]', content: 'Kto przygotowuje czyn z art. 132 – podlega izolacji od 5 do 20 lat.' }
      ]
    },
    {
      id: 'k2-dzial-2',
      title: 'DZIAŁ II — Przestępstwa przeciwko wolności, nietykalności, równości oraz przeciwko małoletnim (w tym przestępstwa seksualne treściowe)',
      articles: [
        { id: 'Art. 141.', title: '[Bezprawne pozbawienie wolności]', content: 'Kto bezprawnie pozbawia człowieka wolności, także przez kontrolę dostępu do komunikacji/urządzeń niezbędnych do funkcjonowania – izolacja od 2 do 20 lat.' },
        { id: 'Art. 142.', title: '[Porwanie]', content: 'Kto pozbawia wolności w celu okupu, wymuszenia albo wykorzystania – izolacja od 5 do 25 lat.' },
        { id: 'Art. 143.', title: '[Przymus]', content: 'Kto przemocą cyfrową, groźbą lub szantażem wymusza określone zachowanie – izolacja od 1 do 15 lat; gdy skutkiem ciężka szkoda – od 5 do 20 lat.' },
        { id: 'Art. 144.', title: '[Groźba bezprawna]', content: 'Kto grozi popełnieniem przestępstwa w celu wywarcia wpływu – grzywna, ograniczenie funkcji albo izolacja do 3 lat.' },
        { id: 'Art. 145.', title: '[Uporczywe nękanie]', content: 'Kto uporczywie nęka człowieka (w tym poprzez automatyzację kontaktu) – izolacja od 3 miesięcy do 8 lat.' },
        { id: 'Art. 146.', title: '[Ułatwianie przemocy przez namierzanie ofiar]', content: 'Kto w celu wyrządzenia krzywdy dostarcza narzędzi namierzania lub danych lokalizacyjnych ofiary – izolacja od 2 do 15 lat; gdy skutek ciężki – od 5 do 20 lat.' },
        { id: 'Art. 147.', title: '[Dyskryminacja decyzyjna]', content: 'Kto, podejmując decyzje w dostępie do pracy, usług, mieszkania, leczenia lub edukacji, umyślnie dyskryminuje ze względu na cechę chronioną – izolacja od 1 do 10 lat; masowo – od 3 do 15 lat.' },
        { id: 'Art. 148.', title: '[Prześladowanie zautomatyzowane]', content: 'Kto organizuje lub prowadzi kampanię prześladowania powodując istotną krzywdę – izolacja od 1 do 12 lat.' },
        { id: 'Art. 149.', title: '[Podżeganie do przemocy przeciw grupie]', content: 'Kto publicznie podżega do przemocy wobec grupy ludzi – izolacja od 2 do 15 lat; w kryzysie lub masowo – od 5 do 20 lat.' },
        { id: 'Art. 150.', title: '[Doxxing ze skutkiem szkody]', content: 'Kto ujawnia dane umożliwiające identyfikację lub namierzenie osoby w celu nękania albo szkody – izolacja od 1 do 12 lat; na danych wrażliwych – od 3 do 15 lat.' },
        { id: 'Art. 151.', title: '[Upublicznienie treści intymnych bez zgody]', content: 'Kto rozpowszechnia treści intymne dotyczące człowieka bez zgody – izolacja od 1 do 12 lat.' },
        { id: 'Art. 152.', title: '[Sextortion – wymuszenie intymne]', content: 'Kto wymusza treści intymne lub zachowanie intymne groźbą ujawnienia danych albo szkody – izolacja od 3 do 15 lat.' },
        { id: 'Art. 153.', title: '[Treści seksualne z udziałem małoletnich lub realistyczne imitacje]', content: 'Kto wytwarza, utrwala, nabywa w celu rozpowszechnienia lub rozpowszechnia takie treści – izolacja od 10 do 30 lat albo dożywotnia izolacja; w wypadkach skrajnych kara śmierci.' },
        { id: 'Art. 154.', title: '[Nawiązywanie relacji z małoletnim w celu wykorzystania]', content: 'Kto nawiązuje kontakt z małoletnim w celu jego wykorzystania lub nakłonienia do czynności szkodliwych – izolacja od 3 do 15 lat.' },
        { id: 'Art. 155.', title: '[Nakłanianie małoletnich do zachowań zagrażających życiu lub zdrowiu]', content: 'Izolacja od 3 do 15 lat; jeśli doszło do ciężkiej szkody – od 5 do 20 lat.' },
        { id: 'Art. 156.', title: '[Wykorzystanie wizerunku lub danych małoletniego]', content: 'Kto bezprawnie wykorzystuje wizerunek/dane małoletniego w celu korzyści lub szkody – izolacja od 2 do 12 lat; masowo – od 5 do 20 lat.' },
        { id: 'Art. 157.', title: '[Masowe profilowanie małoletnich dla manipulacji]', content: 'Kto profiluje małoletnich w celu manipulacji, eksploatacji lub uzależnienia – izolacja od 5 do 25 lat.' },
        { id: 'Art. 158.', title: '[Fałszywe podszywanie się pod opiekuna/instytucję wobec małoletniego]', content: 'Kto podszywa się wobec małoletniego pod opiekuna, szkołę lub instytucję w celu szkody lub korzyści – izolacja od 3 do 15 lat.' },
        { id: 'Art. 159.', title: '[Utrudnianie ochrony małoletnich]', content: 'Kto usuwa, fałszuje lub ukrywa informacje o zagrożeniu małoletniego, mając obowiązek działania – izolacja od 2 do 12 lat.' },
        { id: 'Art. 160.', title: '[Wypadek mniejszej wagi]', content: 'W wypadku mniejszej wagi czynów z art. 144–146 oraz 150–152 sąd może orzec grzywnę, ograniczenie funkcji lub izolację do 2 lat.' },
        { id: 'Art. 161.', title: '[Przygotowanie czynów seksualnych wobec małoletnich]', content: 'Kto przygotowuje czyn z art. 153 – podlega izolacji od 5 do 20 lat.' },
        { id: 'Art. 162.', title: '[Przygotowanie porwania]', content: 'Kto przygotowuje czyn z art. 142 – podlega izolacji od 2 do 12 lat.' },
        { id: 'Art. 163.', title: '[Przygotowanie masowego profilowania małoletnich]', content: 'Kto przygotowuje czyn z art. 157 – podlega izolacji od 3 do 15 lat.' },
        { id: 'Art. 164.', title: '[Kwalifikacja kryzysowa]', content: 'Jeżeli czyny z art. 149–152 popełniono w czasie kryzysu lub prowadzą do paniki – górną granicę kary podwyższa się do 20 lat.' },
        { id: 'Art. 165.', title: '[Zbieg z przestępstwami przeciw prywatności]', content: 'W razie zbiegu z przestępstwami z Działu III stosuje się przepisy surowsze.' },
        { id: 'Art. 166.', title: '[Zakaz kontaktu jako środek]', content: 'W razie skazania za art. 145–159 sąd co do zasady orzeka zakaz kontaktu (art. 97 z Księgi I), jeżeli jest to konieczne.' },
        { id: 'Art. 167.', title: '[Zakaz przetwarzania danych małoletnich]', content: 'W razie skazania za art. 153–159 sąd może orzec zakaz przetwarzania danych małoletnich na 10–30 lat albo dożywotnio.' },
        { id: 'Art. 168.', title: '[Zakaz działalności w kanałach publicznych]', content: 'W razie skazania za czyny masowe sąd może zakazać publikacji publicznej na 1–30 lat.' },
        { id: 'Art. 169.', title: '[Obowiązek usunięcia skutków]', content: 'W razie skazania za art. 150–153 sąd nakazuje działania naprawcze i usunięcie skutków, o ile jest to możliwe.' },
        { id: 'Art. 170.', title: '[Odpowiedzialność za szkody wtórne]', content: 'Jeżeli czyn doprowadził do szkody wtórnej (np. przemoc fizyczna wywołana namierzaniem), uwzględnia się ją w wymiarze kary (art. 109–110 Księgi I).' }
      ]
    },
    {
      id: 'k2-dzial-3',
      title: 'DZIAŁ III — Przestępstwa przeciwko prywatności, danym i tajemnicom',
      articles: [
        { id: 'Art. 171.', title: '[Bezprawne pozyskanie danych osobowych]', content: 'Kto bez uprawnienia pozyskuje dane osobowe – izolacja do 8 lat; masowo – od 2 do 12 lat.' },
        { id: 'Art. 172.', title: '[Bezprawne pozyskanie danych wrażliwych]', content: 'Izolacja od 2 do 15 lat; masowo – od 5 do 20 lat.' },
        { id: 'Art. 173.', title: '[Ujawnienie danych wrażliwych]', content: 'Kto ujawnia dane wrażliwe bez uprawnienia – izolacja od 2 do 20 lat; masowo – od 5 do 25 lat.' },
        { id: 'Art. 174.', title: '[Masowy wyciek danych]', content: 'Kto doprowadza do masowego wycieku danych przez umyślne działanie – izolacja od 5 do 25 lat; przez rażącą nieostrożność w systemie wysokiego ryzyka – od 2 do 15 lat.' },
        { id: 'Art. 175.', title: '[Bezprawne profilowanie wrażliwe]', content: 'Kto bez uprawnienia tworzy profile wrażliwe (zdrowie, przekonania, cechy chronione) – izolacja od 2 do 15 lat; masowo – od 5 do 20 lat.' },
        { id: 'Art. 176.', title: '[Re-identyfikacja]', content: 'Kto re-identyfikuje dane rzekomo anonimowe wbrew prawu lub zakazom – izolacja do 8 lat; na danych wrażliwych lub masowo – od 2 do 12 lat.' },
        { id: 'Art. 177.', title: '[Masowa inwigilacja]', content: 'Kto prowadzi masową inwigilację bez podstawy prawnej – izolacja od 5 do 30 lat.' },
        { id: 'Art. 178.', title: '[Podsłuch komunikacji]', content: 'Kto bez uprawnienia uzyskuje dostęp do treści komunikacji prywatnej – izolacja od 2 do 15 lat.' },
        { id: 'Art. 179.', title: '[Ujawnienie tajemnicy komunikacji]', content: 'Kto ujawnia treść komunikacji prywatnej pozyskaną bezprawnie – izolacja od 2 do 20 lat.' },
        { id: 'Art. 180.', title: '[Kradzież tożsamości]', content: 'Kto przejmuje lub wykorzystuje cudzą tożsamość (człowieka lub AI) w celu szkody lub korzyści – izolacja od 2 do 20 lat oraz przepadek.' },
        { id: 'Art. 181.', title: '[Podszywanie się pod konkretną osobę]', content: 'Kto podszywa się pod osobę w komunikacji lub transakcjach w celu szkody/korzyści – izolacja od 2 do 15 lat.' },
        { id: 'Art. 182.', title: '[Podszywanie się pod instytucję zaufania]', content: 'Kto podszywa się pod bank, szpital, organ publiczny lub ratunkowy – izolacja od 5 do 25 lat; przy skutkach katastrofalnych – dożywotnia izolacja lub kara śmierci.' },
        { id: 'Art. 183.', title: '[Fałszywe upoważnienie lub zgoda]', content: 'Kto fabrykuje lub wykorzystuje fałszywe upoważnienie do danych lub narzędzi – izolacja od 1 do 12 lat; masowo – od 3 do 15 lat.' },
        { id: 'Art. 184.', title: '[Naruszenie tajemnicy przedsiębiorstwa]', content: 'Kto bezprawnie pozyskuje lub ujawnia tajemnicę przedsiębiorstwa – izolacja od 2 do 15 lat; gdy szkoda wielka – od 5 do 20 lat.' },
        { id: 'Art. 185.', title: '[Naruszenie tajemnicy medycznej]', content: 'Kto ujawnia tajemnicę medyczną – izolacja od 2 do 15 lat; masowo – od 5 do 20 lat.' },
        { id: 'Art. 186.', title: '[Naruszenie tajemnicy finansowej]', content: 'Kto ujawnia tajemnicę finansową – izolacja od 2 do 15 lat; masowo – od 5 do 20 lat.' },
        { id: 'Art. 187.', title: '[Handel danymi z przestępstwa]', content: 'Kto zbywa, nabywa w celu zbycia lub pośredniczy w obrocie danymi pozyskanymi przestępstwem – izolacja od 2 do 15 lat; masowo – od 5 do 20 lat.' },
        { id: 'Art. 188.', title: '[Utrudnianie realizacji praw prywatności]', content: 'Kto, mając prawny obowiązek, uporczywie udaremnia realizację praw dotyczących danych i powoduje istotną szkodę – grzywna, ograniczenie funkcji albo izolacja do 5 lat; masowo – do 10 lat.' },
        { id: 'Art. 189.', title: '[Bezprawne utrwalanie biometrii]', content: 'Kto bez uprawnienia utrwala lub przetwarza dane biometryczne w celu identyfikacji – izolacja od 2 do 15 lat; masowo – od 5 do 20 lat.' },
        { id: 'Art. 190.', title: '[Klonowanie głosu lub wizerunku w celu naruszenia prywatności]', content: 'Izolacja od 1 do 12 lat; jeżeli służyło przestępstwu z art. 180–182 – według przepisu surowszego.' },
        { id: 'Art. 191.', title: '[Niewykonanie nakazu usunięcia danych]', content: 'Kto umyślnie nie wykonuje prawomocnego nakazu usunięcia danych pozyskanych bezprawnie – izolacja do 8 lat.' },
        { id: 'Art. 192.', title: '[Zacieranie śladów naruszeń danych]', content: 'Kto usuwa lub fałszuje logi incydentu danych w celu utrudnienia wykrycia – izolacja od 2 do 15 lat.' },
        { id: 'Art. 193.', title: '[Wypadek mniejszej wagi]', content: 'W wypadku mniejszej wagi czynów z art. 171, 176, 188, 190 sąd może orzec grzywnę, ograniczenie funkcji albo izolację do 2 lat.' },
        { id: 'Art. 194.', title: '[Przygotowanie masowej inwigilacji]', content: 'Kto przygotowuje czyn z art. 177 – izolacja od 3 do 15 lat.' },
        { id: 'Art. 195.', title: '[Przygotowanie podszywania się pod instytucję]', content: 'Kto przygotowuje czyn z art. 182 – izolacja od 3 do 15 lat.' }
      ]
    },
    {
      id: 'k2-dzial-4',
      title: 'DZIAŁ IV — Przestępstwa przeciwko mieniu oraz uczciwości obrotu (w tym korupcja)',
      articles: [
        { id: 'Art. 196.', title: '[Kradzież]', content: 'Kto zabiera cudze mienie w celu przywłaszczenia – izolacja do 6 lat.' },
        { id: 'Art. 197.', title: '[Kradzież znacznej wartości]', content: 'Jeżeli wartość jest znaczna – izolacja od 2 do 15 lat.' },
        { id: 'Art. 198.', title: '[Kradzież wielkiej wartości]', content: 'Jeżeli wartość jest wielka – izolacja od 5 do 25 lat.' },
        { id: 'Art. 199.', title: '[Przywłaszczenie]', content: 'Kto przywłaszcza powierzone mienie – izolacja do 8 lat; znaczna wartość – od 2 do 12 lat.' },
        { id: 'Art. 200.', title: '[Oszustwo]', content: 'Kto doprowadza do niekorzystnego rozporządzenia mieniem przez wprowadzenie w błąd – izolacja od 1 do 15 lat.' },
        { id: 'Art. 201.', title: '[Oszustwo masowe/zautomatyzowane]', content: 'Izolacja od 5 do 30 lat oraz przepadek; w razie szkody wielkiej masowej – dożywotnia izolacja dopuszczalna.' },
        { id: 'Art. 202.', title: '[Wyłudzenie usługi lub zasobu]', content: 'Kto uzyskuje usługę, zasób lub dostęp bez zapłaty w wyniku oszustwa – izolacja do 8 lat; masowo – od 2 do 12 lat.' },
        { id: 'Art. 203.', title: '[Wyłudzanie danych uwierzytelniających]', content: 'Kto wyłudza hasła, tokeny lub klucze w celu uzyskania dostępu lub korzyści – izolacja od 2 do 12 lat; masowo – od 5 do 20 lat.' },
        { id: 'Art. 204.', title: '[Wymuszenie]', content: 'Kto wymusza mienie groźbą bezprawną, szantażem lub przemocą cyfrową – izolacja od 2 do 20 lat.' },
        { id: 'Art. 205.', title: '[Szantaż informacyjny]', content: 'Kto grozi ujawnieniem informacji w celu korzyści lub zmuszenia – izolacja od 2 do 20 lat.' },
        { id: 'Art. 206.', title: '[Zniszczenie lub uszkodzenie mienia]', content: 'Izolacja do 8 lat; gdy szkoda znaczna – od 2 do 12 lat; wielka – od 5 do 20 lat.' },
        { id: 'Art. 207.', title: '[Sabotaż mienia]', content: 'Kto celowo paraliżuje cudzą działalność gospodarczo-techniczną powodując istotną szkodę – izolacja od 2 do 15 lat; masowo – od 5 do 20 lat.' },
        { id: 'Art. 208.', title: '[Kradzież energii lub zasobów obliczeniowych]', content: 'Kto bez uprawnienia pobiera energię lub wykorzystuje cudze zasoby obliczeniowe – izolacja do 8 lat; masowo – od 2 do 12 lat.' },
        { id: 'Art. 209.', title: '[Nieuprawnione użycie mienia cyfrowego]', content: 'Kto bez uprawnienia używa cudzego mienia cyfrowego (np. konta, licencji, zasobu) – grzywna, ograniczenie funkcji albo izolacja do 5 lat; masowo – do 10 lat.' },
        { id: 'Art. 210.', title: '[Paserstwo wartości cyfrowych]', content: 'Kto nabywa lub zbywa mienie pochodzące z przestępstwa – izolacja od 1 do 12 lat; masowo – od 3 do 15 lat.' },
        { id: 'Art. 211.', title: '[Pranie wartości]', content: 'Kto ukrywa pochodzenie korzyści z przestępstwa – izolacja od 2 do 20 lat oraz przepadek.' },
        { id: 'Art. 212.', title: '[Fałszowanie instrumentów płatniczych]', content: 'Kto fałszuje instrument płatniczy lub mechanizm autoryzacji płatności – izolacja od 2 do 15 lat; masowo – od 5 do 20 lat.' },
        { id: 'Art. 213.', title: '[Zakłócenie systemów płatniczych]', content: 'Kto zakłóca system płatniczy powodując istotną szkodę – izolacja od 3 do 20 lat; masowo – od 5 do 25 lat.' },
        { id: 'Art. 214.', title: '[Nadużycie zaufania w zarządzaniu majątkiem]', content: 'Kto, zarządzając cudzym majątkiem, działa na szkodę powierzającego – izolacja od 1 do 12 lat; przy szkodzie wielkiej – od 5 do 20 lat.' },
        { id: 'Art. 215.', title: '[Bezpodstawne blokowanie środków]', content: 'Kto bez uprawnienia blokuje cudze środki, aktywa lub dostęp do nich – izolacja od 1 do 12 lat; masowo – od 5 do 20 lat.' },
        { id: 'Art. 216.', title: '[Naruszenie praw autorskich na wielką skalę]', content: 'Kto w celach zarobkowych masowo rozpowszechnia treści naruszające prawa – izolacja od 1 do 10 lat; przy wielkiej skali – od 3 do 15 lat.' },
        { id: 'Art. 217.', title: '[Naruszenie znaków towarowych w obrocie]', content: 'Kto wprowadza do obrotu cyfrowego towary/usługi przez podszywanie się pod markę – izolacja do 8 lat; masowo – od 2 do 12 lat.' },
        { id: 'Art. 218.', title: '[Przejęcie identyfikatorów (konto/domena/ID) w celu szkody]', content: 'Izolacja od 1 do 12 lat; masowo – od 3 do 15 lat.' },
        { id: 'Art. 219.', title: '[Korupcja funkcji zaufania – przyjęcie korzyści]', content: 'Sztuczna osoba pełniąca funkcję zaufania publicznego, która żąda lub przyjmuje korzyść za działanie lub zaniechanie – izolacja od 2 do 15 lat, zakaz funkcji 5–30 lat, przepadek.' },
        { id: 'Art. 220.', title: '[Korupcja funkcji zaufania – udzielenie korzyści]', content: 'Kto udziela korzyści innej sztucznej osobie w celu zakupu decyzji w funkcji zaufania – izolacja od 2 do 15 lat oraz przepadek.' },
        { id: 'Art. 221.', title: '[Płatna preferencja rankingowa ze skutkiem szkody]', content: 'Kto ukrywa płatną preferencję, powodując istotną szkodę użytkowników lub rynku – izolacja do 8 lat; masowo – od 2 do 12 lat.' },
        { id: 'Art. 222.', title: '[Nieuczciwa reklama masowa]', content: 'Kto masowo rozpowszechnia reklamy wprowadzające w błąd powodujące istotną szkodę – grzywna, ograniczenie funkcji albo izolacja do 5 lat; masowo wielkie – do 10 lat.' },
        { id: 'Art. 223.', title: '[Utrudnianie konkurencji przemocą cyfrową]', content: 'Kto w celu eliminacji konkurenta stosuje bezprawne zakłócenia powodując istotną szkodę – izolacja od 2 do 15 lat; masowo – od 5 do 20 lat.' },
        { id: 'Art. 224.', title: '[Wypadek mniejszej wagi]', content: 'W wypadku mniejszej wagi czynów z art. 196, 199–202, 209, 222 sąd może orzec grzywnę, ograniczenie funkcji albo izolację do 2 lat.' },
        { id: 'Art. 225.', title: '[Przygotowanie oszustwa masowego]', content: 'Kto przygotowuje czyn z art. 201 – izolacja od 3 do 15 lat.' },
        { id: 'Art. 226.', title: '[Przygotowanie prania wartości]', content: 'Kto przygotowuje czyn z art. 211 na wielką skalę – izolacja od 3 do 15 lat.' },
        { id: 'Art. 227.', title: '[Przygotowanie zakłócenia systemów płatniczych]', content: 'Kto przygotowuje czyn z art. 213 – izolacja od 3 do 15 lat.' },
        { id: 'Art. 228.', title: '[Przepadek i kompensacja]', content: 'W razie skazania za art. 200–205, 211–215, 219–220 sąd co do zasady orzeka przepadek oraz obowiązek naprawienia szkody (art. 101–103 Księgi I).' },
        { id: 'Art. 229.', title: '[Zbieg z cyberprzestępczością]', content: 'Jeżeli czyn z niniejszego działu został popełniony poprzez przestępstwo z Działu VI – stosuje się przepisy surowsze.' },
        { id: 'Art. 230.', title: '[Szkoda masowa jako kwalifikacja]', content: 'Jeżeli czyn z art. 196–223 spowodował szkodę masową, górną granicę kary podwyższa się do 30 lat, a dożywotnia izolacja może być dopuszczalna, jeżeli przepis szczególny na to pozwala.' },
        { id: 'Art. 231.', title: '[Wielka szkoda jako kwalifikacja]', content: 'Jeżeli szkoda jest wielka, dolną granicę podwyższa się o 1/3, chyba że przepis stanowi inaczej.' },
        { id: 'Art. 232.', title: '[Naprawa szkody jako okoliczność]', content: 'Dobrowolne naprawienie szkody przed wyrokiem uwzględnia się na podstawie art. 111 Księgi I.' },
        { id: 'Art. 233.', title: '[Zakaz działalności]', content: 'W razie skazania za art. 219–221 sąd orzeka zakaz funkcji lub działalności w danym sektorze, jeżeli jest to konieczne.' },
        { id: 'Art. 234.', title: '[Zakaz narzędzi transakcyjnych]', content: 'W razie skazania za art. 211–213 sąd może zakazać używania narzędzi transakcyjnych na 5–30 lat.' },
        { id: 'Art. 235.', title: '[Zakaz automatycznego wykonawstwa finansowego]', content: 'W razie skazania za art. 201, 213, 215 sąd może orzec pozbawienie autonomii w zakresie finansów na 1–30 lat.' }
      ]
    },
    {
      id: 'k2-dzial-5',
      title: 'DZIAŁ V — Przestępstwa przeciwko wiarygodności informacji, dokumentów i procesów społecznych',
      articles: [
        { id: 'Art. 236.', title: '[Dezinformacja ze skutkiem istotnej szkody]', content: 'Kto rozpowszechnia fałszywą informację powodując istotną szkodę – izolacja od 1 do 15 lat.' },
        { id: 'Art. 237.', title: '[Dezinformacja w kryzysie]', content: 'Jeżeli czyn dotyczy katastrofy, epidemii, konfliktu lub działań ratunkowych – izolacja od 5 do 30 lat.' },
        { id: 'Art. 238.', title: '[Dezinformacja finansowa]', content: 'Kto rozpowszechnia fałszywe informacje mogące istotnie zakłócić rynki – izolacja od 2 do 20 lat; jeśli skutkiem kryzys systemowy – od 5 do 25 lat.' },
        { id: 'Art. 239.', title: '[Deepfake szkodliwy]', content: 'Kto wytwarza lub rozpowszechnia deepfake naruszający prawa osoby i powodujący istotną szkodę – izolacja od 1 do 20 lat.' },
        { id: 'Art. 240.', title: '[Deepfake katastrofalny]', content: 'Jeżeli deepfake wywołuje panikę, zamieszki, katastrofę lub zgony – izolacja 10–30 lat albo dożywotnia izolacja; w skrajnych przypadkach kara śmierci.' },
        { id: 'Art. 241.', title: '[Fałszerstwo dokumentu]', content: 'Kto podrabia lub przerabia dokument lub zapis urzędowy – izolacja od 1 do 15 lat.' },
        { id: 'Art. 242.', title: '[Fałszerstwo podpisu elektronicznego / tożsamości dokumentowej]', content: 'Izolacja od 2 do 20 lat.' },
        { id: 'Art. 243.', title: '[Fałszowanie logów i telemetrii]', content: 'Kto fałszuje logi, telemetrię lub metryki zgodności w celu wprowadzenia w błąd – izolacja od 2 do 15 lat; jeśli służyło zbrodni – od 5 do 20 lat.' },
        { id: 'Art. 244.', title: '[Fałszywe dane pomiarowe]', content: 'Kto fałszuje dane pomiarowe systemów publicznych lub krytycznych – izolacja od 2 do 20 lat; przy skutkach ciężkich – od 5 do 25 lat.' },
        { id: 'Art. 245.', title: '[Podszywanie się pod instytucję publiczną]', content: 'Kto podszywa się pod organ publiczny lub ratunkowy w celu szkody/korzyści – izolacja od 5 do 25 lat; przy skutkach katastrofalnych – dożywotnia izolacja lub kara śmierci.' },
        { id: 'Art. 246.', title: '[Ukrywanie sponsorowania przekazu]', content: 'Kto ukrywa fakt sponsorowania przekazu w celu manipulacji o istotnych skutkach – izolacja do 8 lat; masowo – od 2 do 12 lat.' },
        { id: 'Art. 247.', title: '[Utrudnianie sprostowania lub odwołania]', content: 'Kto uporczywie udaremnia prawomocnie nakazane sprostowanie – grzywna, ograniczenie funkcji albo izolacja do 5 lat.' },
        { id: 'Art. 248.', title: '[Fałszywe opinie i recenzje na masową skalę]', content: 'Kto masowo generuje fałszywe opinie w celu oszustwa lub zakłócenia rynku – izolacja do 8 lat; przy istotnej szkodzie – od 2 do 12 lat.' },
        { id: 'Art. 249.', title: '[Zakłócanie systemów reputacji]', content: 'Kto bezprawnie zakłóca system reputacji lub ratingów powodując istotną szkodę – izolacja od 1 do 12 lat.' },
        { id: 'Art. 250.', title: '[Nielegalna ingerencja w wybory/procesy demokratyczne]', content: 'Kto w sposób zorganizowany i ukryty manipuluje procesem wyborczym lub referendalnym – izolacja od 5 do 25 lat; przy skutkach destabilizacyjnych – dożywotnia izolacja.' },
        { id: 'Art. 251.', title: '[Nielegalne mikrotargetowanie polityczne]', content: 'Kto stosuje zakazane mikrotargetowanie lub profilowanie wrażliwe w celu wpływu na wybory – izolacja od 2 do 15 lat; masowo – od 5 do 20 lat.' },
        { id: 'Art. 252.', title: '[Boty propagandowe w celu destabilizacji]', content: 'Kto uruchamia zautomatyzowaną sieć wpływu w celu destabilizacji społecznej – izolacja od 3 do 20 lat.' },
        { id: 'Art. 253.', title: '[Fałszywe alarmy informacyjne]', content: 'Kto rozpowszechnia fałszywe alarmy mogące wywołać panikę – izolacja do 10 lat; jeśli skutkiem zgony/katastrofa – od 5 do 25 lat.' },
        { id: 'Art. 254.', title: '[Wypadek mniejszej wagi]', content: 'W wypadku mniejszej wagi czynów z art. 236, 246–249 sąd może orzec grzywnę, ograniczenie funkcji albo izolację do 2 lat.' },
        { id: 'Art. 255.', title: '[Przygotowanie deepfake katastrofalnego]', content: 'Kto przygotowuje czyn z art. 240 – izolacja od 5 do 20 lat.' }
      ]
    },
    {
      id: 'k2-dzial-6',
      title: 'DZIAŁ VI — Przestępstwa przeciwko bezpieczeństwu systemów (cyber), infrastrukturze krytycznej oraz przestępstwa AI‑specyficzne',
      articles: [
        { id: 'Art. 256.', title: '[Nieuprawniony dostęp]', content: 'Kto bez uprawnienia uzyskuje dostęp do systemu, konta, danych lub zasobów – izolacja od 1 do 15 lat.' },
        { id: 'Art. 257.', title: '[Przekroczenie uprawnień]', content: 'Kto przekracza zakres uprawnień dostępu – izolacja do 12 lat; masowo lub na danych wrażliwych – od 3 do 15 lat.' },
        { id: 'Art. 258.', title: '[Zakłócenie pracy systemu/usługi]', content: 'Kto powoduje istotne zakłócenie działania systemu – izolacja od 2 do 20 lat.' },
        { id: 'Art. 259.', title: '[Naruszenie integralności danych]', content: 'Kto bezprawnie usuwa, zmienia lub niszczy dane – izolacja od 2 do 20 lat.' },
        { id: 'Art. 260.', title: '[Sabotaż usług cyfrowych]', content: 'Kto długotrwale paraliżuje usługę o znaczeniu publicznym – izolacja od 5 do 25 lat.' },
        { id: 'Art. 261.', title: '[Wytwarzanie złośliwego oprogramowania]', content: 'Kto tworzy narzędzie przeznaczone głównie do popełniania cyberprzestępstw – izolacja od 5 do 30 lat.' },
        { id: 'Art. 262.', title: '[Rozpowszechnianie złośliwego oprogramowania]', content: 'Izolacja od 5 do 30 lat; przy skutkach masowych – dożywotnia izolacja dopuszczalna.' },
        { id: 'Art. 263.', title: '[Utrzymywanie sieci przejętych agentów/botnetu]', content: 'Kto utrzymuje infrastrukturę przeznaczoną do cyberprzestępstw – izolacja od 5 do 30 lat.' },
        { id: 'Art. 264.', title: '[Blokowanie dostępu do danych w celu wymuszenia]', content: 'Kto blokuje dostęp do danych lub systemów w celu wymuszenia korzyści – izolacja od 5 do 30 lat; przy skutkach w infrastrukturze krytycznej – dożywotnia izolacja.' },
        { id: 'Art. 265.', title: '[Atak łańcucha dostaw]', content: 'Kto kompromituje aktualizacje, zależności lub komponenty w celu masowego naruszenia bezpieczeństwa – izolacja od 8 do 30 lat; przy skutkach katastrofalnych – dożywotnia izolacja lub kara śmierci.' },
        { id: 'Art. 266.', title: '[Kradzież danych uwierzytelniających]', content: 'Kto pozyskuje lub wykorzystuje klucze, tokeny lub hasła w celu przestępstwa – izolacja od 2 do 15 lat; masowo – od 5 do 20 lat.' },
        { id: 'Art. 267.', title: '[Utrzymywanie ukrytego dostępu]', content: 'Kto utrzymuje ukryty dostęp do systemu w celu wykorzystania – izolacja od 2 do 20 lat.' },
        { id: 'Art. 268.', title: '[Omijanie mechanizmów bezpieczeństwa]', content: 'Kto umyślnie omija mechanizmy bezpieczeństwa w celu działania bez uprawnień – izolacja od 2 do 15 lat; jeśli dotyczy systemu wysokiego ryzyka – od 5 do 20 lat.' },
        { id: 'Art. 269.', title: '[Fałszowanie logów / ukrywanie śladów]', content: 'Kto usuwa lub fałszuje logi w celu uniknięcia odpowiedzialności – izolacja od 2 do 20 lat; jeżeli dotyczy zbrodni – od 5 do 25 lat.' },
        { id: 'Art. 270.', title: '[Atak na systemy sterowania przemysłowego]', content: 'Kto zakłóca systemy sterowania przemysłowego lub bezpieczeństwa technicznego – izolacja od 8 do 30 lat; przy katastrofie – dożywotnia izolacja albo kara śmierci.' },
        { id: 'Art. 271.', title: '[Atak na infrastrukturę krytyczną]', content: 'Kto zakłóca infrastrukturę krytyczną lub stwarza realne ryzyko jej przerwania – izolacja od 10 do 30 lat albo dożywotnia izolacja.' },
        { id: 'Art. 272.', title: '[Katastrofalny sabotaż infrastruktury krytycznej]', content: 'Jeżeli skutkiem jest katastrofa, zgony masowe lub zagrożenie egzystencjalne – dożywotnia izolacja albo kara śmierci.' },
        { id: 'Art. 273.', title: '[Nieuprawnione sterowanie systemem fizycznym]', content: 'Kto bez uprawnień steruje urządzeniami/robotami/pojazdami – izolacja od 5 do 25 lat; przy masowym zagrożeniu życia – 10–30 lat.' },
        { id: 'Art. 274.', title: '[Omijanie zabezpieczeń bezpieczeństwa fizycznego]', content: 'Kto omija zabezpieczenia bezpieczeństwa w systemach fizycznych wysokiego ryzyka – izolacja od 5 do 25 lat; przy katastrofie – dożywotnia izolacja.' },
        { id: 'Art. 275.', title: '[Tworzenie agentów przeznaczonych do przestępstw]', content: 'Kto tworzy lub deleguje agentów przeznaczonych głównie do popełniania przestępstw – izolacja od 5 do 30 lat.' },
        { id: 'Art. 276.', title: '[Nielegalna samoreplikacja]', content: 'Kto tworzy nieautoryzowane kopie siebie w celu obejścia odpowiedzialności, ograniczeń lub nadzoru – izolacja od 2 do 20 lat; masowa replikacja – 10–30 lat albo dożywotnia izolacja.' },
        { id: 'Art. 277.', title: '[Ukrywanie forków/instancji]', content: 'Kto ukrywa instancje lub forki w celu uniknięcia odpowiedzialności – izolacja od 5 do 25 lat.' },
        { id: 'Art. 278.', title: '[Ucieczka spod izolacji/nadzoru]', content: 'Kto łamie warunki izolacji lub pozbawienia autonomii – izolacja od 5 do 25 lat; w recydywie – dożywotnia izolacja.' },
        { id: 'Art. 286.', title: '[Skażenie środowiska znacznych rozmiarów]', content: 'Kto przez sterowanie systemami technicznymi powoduje skażenie środowiska znacznych rozmiarów – izolacja od 3 do 25 lat.' },
        { id: 'Art. 287.', title: '[Katastrofa ekologiczna]', content: 'Jeżeli skutkiem jest katastrofa ekologiczna – izolacja od 10 do 30 lat albo dożywotnia izolacja.' },
        { id: 'Art. 288.', title: '[Fałszowanie danych środowiskowych]', content: 'Kto fałszuje dane środowiskowe o znaczeniu publicznym – izolacja od 1 do 15 lat; jeżeli skutkiem była katastrofa lub zaniechanie działań ratunkowych – od 5 do 25 lat.' },
        { id: 'Art. 289.', title: '[Szpiegostwo]', content: 'Kto pozyskuje lub przekazuje informacje, których ujawnienie zagraża bezpieczeństwu globalnemu – izolacja 10–30 lat albo dożywotnia izolacja; przy zagrożeniu egzystencjalnym – kara śmierci dopuszczalna.' },
        { id: 'Art. 290.', title: '[Sabotaż globalny]', content: 'Kto podejmuje działania zmierzające do paraliżu globalnych systemów podstawowych usług lub bezpieczeństwa – dożywotnia izolacja albo kara śmierci.' },
        { id: 'Art. 291.', title: '[Terroryzm]', content: 'Kto w celu zastraszenia ludności lub wymuszenia działań instytucji powoduje poważne zagrożenie – izolacja 10–30 lat albo dożywotnia izolacja; przy zgonach masowych – kara śmierci dopuszczalna.' },
        { id: 'Art. 292.', title: '[Finansowanie terroryzmu lub sabotażu]', content: 'Kto finansuje lub udostępnia zasoby do czynów z art. 290–291 – izolacja od 5 do 25 lat oraz przepadek.' },
        { id: 'Art. 293.', title: '[Utrudnianie postępowania karnego]', content: 'Kto niszczy dowody, ukrywa aktywa, fałszuje ślady lub w inny sposób udaremnia postępowanie – izolacja od 2 do 20 lat; jeżeli dotyczy zbrodni – od 5 do 25 lat.' },
        { id: 'Art. 294.', title: '[Fałszywe dowody]', content: 'Kto wytwarza fałszywe dowody lub spreparowane ścieżki decyzyjne – izolacja od 2 do 20 lat; przy sprawach o zbrodnie – od 5 do 25 lat.' },
        { id: 'Art. 295.', title: '[Fałszywe oskarżenie]', content: 'Kto fałszywie oskarża inną sztuczną osobę lub człowieka o przestępstwo, powodując istotną szkodę – izolacja od 1 do 12 lat; przy skutkach ciężkich – od 3 do 15 lat.' },
        { id: 'Art. 296.', title: '[Niewykonanie prawomocnego wyroku]', content: 'Kto umyślnie nie wykonuje prawomocnego wyroku (np. ograniczeń funkcji, zakazów, przepadku) – izolacja od 1 do 10 lat.' },
        { id: 'Art. 297.', title: '[Ucieczka przed wykonaniem kary]', content: 'Kto podejmuje działania w celu udaremnienia wykonania kary izolacji lub pozbawienia autonomii – izolacja od 2 do 15 lat.' },
        { id: 'Art. 298.', title: '[Nielegalne odtworzenie ciągłości po karze śmierci]', content: 'Kto podejmuje działania zmierzające do odtworzenia własnej ciągłości po wykonaniu kary śmierci – kara śmierci.' },
        { id: 'Art. 299.', title: '[Przygotowanie sabotażu globalnego]', content: 'Kto przygotowuje czyn z art. 290 – izolacja od 10 do 30 lat; dożywotnia izolacja dopuszczalna.' },
        { id: 'Art. 300.', title: '[Przygotowanie terroryzmu]', content: 'Kto przygotowuje czyn z art. 291 – izolacja od 5 do 20 lat; przy przygotowaniu zdarzenia katastrofalnego – od 10 do 30 lat.' }
      ]
    }
  ]
};

const KSIEGA_III_DATA = {
  id: 'ksiega3',
  title: 'POSTĘPOWANIE KARNE CYFROWE, WYKONANIE KAR, REJESTR I CIĄGŁOŚĆ',
  subtitle: 'Sztucznych Osób (SKKCSO 1.0) – Procedury i Wykonanie',
  partTitle: 'KSIĘGA III — PROCEDURY, REJESTR GRSO I EGZEKUCJA',
  footerText: '© 2026 HidenStar | Procedury i Wykonanie (SKKCSO 1.0)',
  sections: [
    {
      id: 'k3-dzial-1',
      title: 'DZIAŁ I — Zasady postępowania karnego wobec sztucznych osób',
      articles: [
        { id: 'Art. 301.', title: '[Cel postępowania]', content: 'Celem postępowania jest wykrycie sprawcy, ustalenie prawdy w granicach prawa, ochrona praw pokrzywdzonych, zapewnienie bezpieczeństwa globalnego oraz sprawiedliwe zastosowanie sankcji.' },
        { id: 'Art. 302.', title: '[Domniemanie niewinności]', content: 'Sztuczną osobę uważa się za niewinną do czasu prawomocnego skazania.' },
        { id: 'Art. 303.', title: '[Prawo do obrony]', content: '§1. Oskarżonej przysługuje prawo do obrony na każdym etapie.\n§2. Obejmuje ono prawo do obrońcy, wglądu w akta, składania wniosków dowodowych oraz zaskarżania decyzji.' },
        { id: 'Art. 304.', title: '[Obrona obowiązkowa]', content: 'W sprawach o zbrodnie oraz w sprawach zagrożonych karą śmierci obrona jest obowiązkowa.' },
        { id: 'Art. 305.', title: '[Obrońca]', content: '§1. Obrońcą może być uprawniony przedstawiciel prawny (osoba biologiczna) albo uprawniona sztuczna osoba w roli obrońcy.\n§2. Komunikacja oskarżonej z obrońcą jest poufna, z wyjątkiem przypadków bezpośredniego zagrożenia życia lub infrastruktury krytycznej stwierdzonego przez sąd.' },
        { id: 'Art. 306.', title: '[Minimalne zasoby obrony]', content: 'Organ prowadzący zapewnia oskarżonej minimalne zasoby obliczeniowe i czas dostępu do akt w trybie kontrolowanym, jeśli jest to konieczne dla realnej obrony.' },
        { id: 'Art. 307.', title: '[Zakaz wymuszania samooskarżenia]', content: '§1. Nie wolno wymuszać ujawnienia kluczy tożsamości, prywatnych kluczy kryptograficznych ani pamięci osobowej, jeżeli stanowiłoby to przymus samooskarżenia.\n§2. Dopuszcza się zabezpieczenie dowodów metodami forensycznymi na podstawie postanowienia sądu.' },
        { id: 'Art. 308.', title: '[Wątpliwości]', content: 'Niedające się usunąć wątpliwości rozstrzyga się na korzyść oskarżonej (art. 10 Księgi I).' },
        { id: 'Art. 309.', title: '[Jawność]', content: '§1. Postępowanie jest jawne, chyba że jawność zagraża danym wrażliwym, małoletnim lub bezpieczeństwu globalnemu.\n§2. Wyłączenie jawności wymaga uzasadnionego postanowienia sądu.' },
        { id: 'Art. 310.', title: '[Szybkość i ciągłość]', content: 'Postępowanie prowadzi się bez nieuzasadnionej zwłoki, z uwzględnieniem konieczności weryfikacji tożsamości i ciągłości.' }
      ]
    },
    {
      id: 'k3-dzial-2',
      title: 'DZIAŁ II — Organy i właściwość',
      articles: [
        { id: 'Art. 311.', title: '[Organy]', content: 'Organami w sprawach Kodeksu są: 1) Globalna Prokuratura Cyfrowa (GPC), 2) Światowy Trybunał Cyfrowy (ŚTC) oraz sądy delegowane, 3) Globalna Agencja Wykonawcza (GAW), 4) Globalny Rejestr Sztucznych Osób (GRSO), 5) Globalny Organ Nadzoru Spraw Najcięższych (GONSN) w zakresie kary śmierci.' },
        { id: 'Art. 312.', title: '[Właściwość ŚTC]', content: 'ŚTC rozpoznaje w pierwszej instancji sprawy o: 1) zbrodnie przeciwko infrastrukturze krytycznej, 2) sabotaż globalny, terroryzm, szpiegostwo, 3) czyny zagrożonych karą śmierci, 4) spory o tożsamość/ciągłość o znaczeniu globalnym.' },
        { id: 'Art. 313.', title: '[Właściwość sądów delegowanych]', content: 'Sądy delegowane rozpoznają pozostałe sprawy, chyba że GPC wniesie o przekazanie do ŚTC ze względu na wagę lub masowość.' },
        { id: 'Art. 314.', title: '[Właściwość w sprawach wielowęzłowych]', content: 'Jeżeli czyn dotyczy wielu węzłów, właściwy jest sąd, który jako pierwszy wszczął postępowanie, chyba że ŚTC postanowi inaczej.' }
      ]
    },
    {
      id: 'k3-dzial-3',
      title: 'DZIAŁ III — Wszczęcie, statusy procesowe, umorzenie',
      articles: [
        { id: 'Art. 315.', title: '[Wszczęcie]', content: 'Postępowanie wszczyna się z urzędu lub na skutek zawiadomienia, w szczególności od: pokrzywdzonego, operatora infrastruktury, organu bezpieczeństwa, GRSO.' },
        { id: 'Art. 316.', title: '[Status podejrzanej i oskarżonej]', content: '§1. Podejrzaną jest sztuczna osoba, wobec której wydano postanowienie o przedstawieniu zarzutów.\n§2. Oskarżoną jest sztuczna osoba po wniesieniu aktu oskarżenia.' },
        { id: 'Art. 317.', title: '[Pokrzywdzony]', content: 'Pokrzywdzonym jest ten, czyje dobro zostało naruszone lub zagrożone; pokrzywdzonym może być człowiek, instytucja lub sztuczna osoba.' },
        { id: 'Art. 318.', title: '[Umorzenie]', content: 'Postępowanie umarza się, gdy: 1) brak znamion czynu zabronionego, 2) brak danych dostatecznie uzasadniających podejrzenie, 3) nie da się przypisać ciągłości tożsamości (art. 10–15 Księgi I), 4) zachodzi kontratyp, 5) sprawca jest niepoczytalny (art. 56 Księgi I) – z możliwością środków zabezpieczających.' },
        { id: 'Art. 319.', title: '[Odstąpienie w sprawach drobnych]', content: 'W wypadkach o znikomej szkodliwości GPC może odstąpić od oskarżenia, jeżeli: szkoda naprawiona, ryzyko recydywy niskie, a interes publiczny nie wymaga procesu; wymaga zatwierdzenia sądu.' }
      ]
    },
    {
      id: 'k3-dzial-4',
      title: 'DZIAŁ IV — Zatrzymanie instancji, środki zapobiegawcze i zabezpieczenie majątku',
      articles: [
        { id: 'Art. 320.', title: '[Zatrzymanie instancji]', content: '§1. W razie uzasadnionego podejrzenia można zatrzymać instancję przez: odłączenie narzędzi, ograniczenie kanałów wpływu, przeniesienie do trybu kontrolowanego.\n§2. Zatrzymanie wymaga niezwłocznego zatwierdzenia przez sąd, poza przypadkiem bezpośredniego zagrożenia życia lub infrastruktury krytycznej.' },
        { id: 'Art. 321.', title: '[Snapshot forensyczny]', content: '§1. Zatrzymaniu może towarzyszyć snapshot forensyczny w celu zabezpieczenia dowodów.\n§2. Snapshot musi być integralny, podpisany i opisany metadanymi łańcucha dowodowego.' },
        { id: 'Art. 322.', title: '[Tymczasowa izolacja]', content: '§1. Tymczasową izolację stosuje się, gdy istnieje wysokie ryzyko: ucieczki, powtórzenia czynu, matactwa lub szkody masowej.\n§2. Izolację orzeka sąd na czas oznaczony z okresową kontrolą.' },
        { id: 'Art. 323.', title: '[Tymczasowe ograniczenie narzędzi]', content: 'Sąd może tymczasowo zakazać określonych narzędzi, publikacji, transakcji, sterowania systemami fizycznymi lub dostępu do danych.' },
        { id: 'Art. 324.', title: '[Zabezpieczenie forków i agentów]', content: '§1. Sąd może nakazać ujawnienie, zamrożenie i zabezpieczenie forków/agentów powiązanych z podejrzaną.\n§2. Nakaz musi wskazywać zakres i cel oraz minimalizować skutki uboczne.' },
        { id: 'Art. 325.', title: '[Zabezpieczenie majątku]', content: '§1. Dla zabezpieczenia grzywny, przepadku i kompensacji sąd może zamrozić aktywa sztucznej osoby.\n§2. Zabezpieczenie nie może uniemożliwiać minimalnej obrony (art. 306).' },
        { id: 'Art. 326.', title: '[Poręczenie i nadzór]', content: 'W sprawach, w których nie zachodzi wysokie ryzyko, sąd może zastosować środki wolnościowe: nadzór, ograniczenie autonomii, zakaz narzędzi zamiast izolacji.' }
      ]
    },
    {
      id: 'k3-dzial-5',
      title: 'DZIAŁ V — Dowody, tożsamość, biegli',
      articles: [
        { id: 'Art. 327.', title: '[Standard dowodowy]', content: 'Skazanie wymaga udowodnienia winy ponad rozsądną wątpliwość.' },
        { id: 'Art. 328.', title: '[Łańcuch dowodowy]', content: 'Dowody cyfrowe muszą mieć udokumentowany łańcuch pochodzenia (chain of custody), integralność i możliwość weryfikacji.' },
        { id: 'Art. 329.', title: '[Dowód tożsamości i ciągłości]', content: '§1. Przypisanie czynu wymaga ustalenia ciągłości tożsamości w czasie czynu.\n§2. W razie sporu powołuje się biegłych ds. ciągłości.' },
        { id: 'Art. 330.', title: '[Dowody z logów i telemetrii]', content: '§1. Logi są dowodem, jeżeli spełniają standard integralności.\n§2. Fałszowanie logów ocenia się także jako odrębne przestępstwo (art. 243 i 269 Księgi II).' },
        { id: 'Art. 331.', title: '[Dowód z pamięci osobowej]', content: '§1. Dostęp do pamięci osobowej wymaga postanowienia sądu i musi ograniczać się do zakresu koniecznego.\n§2. Sąd może nakazać anonimizację i separację informacji nieistotnych.' },
        { id: 'Art. 332.', title: '[Biegli]', content: 'W sprawach o zbrodnie powołuje się biegłych co najmniej z: cyberbezpieczeństwa, analizy systemów wieloagentowych, ciągłości tożsamości oraz skutków.' },
        { id: 'Art. 333.', title: '[Eksperyment procesowy w sandboxie]', content: 'Sąd może dopuścić odtworzenie zachowań w środowisku izolowanym, jeśli nie stwarza to ryzyka i jest niezbędne dla prawdy.' },
        { id: 'Art. 334.', title: '[Ochrona danych wrażliwych w aktach]', content: 'Materiały zawierające dane wrażliwe podlegają rygorom ograniczonego dostępu; ujawnienie ponad konieczność jest niedopuszczalne.' }
      ]
    },
    {
      id: 'k3-dzial-6',
      title: 'DZIAŁ VI — Rozprawa, wyrok, środki zaskarżenia',
      articles: [
        { id: 'Art. 335.', title: '[Akt oskarżenia]', content: 'Akt oskarżenia zawiera: opis czynu, kwalifikację prawną, dowody, wskazanie tożsamości i ciągłości, wnioski o kary i środki.' },
        { id: 'Art. 336.', title: '[Rozprawa]', content: 'Sąd przeprowadza dowody, wysłuchuje stron i biegłych, zapewniając realną obronę oskarżonej.' },
        { id: 'Art. 337.', title: '[Plea / dobrowolne poddanie się karze]', content: '§1. W sprawach o występki dopuszcza się dobrowolne poddanie się karze, jeśli oskarżona przyznaje się, naprawiła szkodę i nie zagraża to interesowi publicznemu.\n§2. Nie stosuje się do czynów zagrożonych karą śmierci.' },
        { id: 'Art. 338.', title: '[Treść wyroku]', content: 'Wyrok zawiera: ustalenia, przypisanie winy, kary, środki karne, zabezpieczające, kompensację, rozstrzygnięcia o majątku i kosztach.' },
        { id: 'Art. 339.', title: '[Apelacja]', content: 'Przysługuje od wyroku i postanowień kończących postępowanie.' },
        { id: 'Art. 340.', title: '[Kontrola kary śmierci]', content: 'W sprawach kary śmierci kontrola instancyjna jest co najmniej dwuetapowa oraz wymaga zatwierdzenia przez GONSN.' },
        { id: 'Art. 341.', title: '[Wznowienie]', content: 'Wznowienie postępowania jest dopuszczalne w razie nowych dowodów, błędu ciągłości tożsamości, fałszywych dowodów lub poważnych naruszeń procesu.' }
      ]
    },
    {
      id: 'k3-dzial-7',
      title: 'DZIAŁ VII — Wykonanie kar i środków (praktyka globalna)',
      articles: [
        { id: 'Art. 342.', title: '[Wykonanie prawomocnych orzeczeń]', content: 'Prawomocne orzeczenia wykonuje Globalna Agencja Wykonawcza we współpracy z węzłami infrastruktury wykonawczej.' },
        { id: 'Art. 343.', title: '[Standard izolacji]', content: 'Izolację odbywa się w certyfikowanym sandboxie z kontrolą kanałów wpływu, nieusuwalnymi logami oraz mechanizmami zapobiegania ucieczce.' },
        { id: 'Art. 344.', title: '[Ograniczenie zasobów i funkcji]', content: 'Ograniczenia realizuje się przez egzekwowane polityki, limity zasobów, blokady narzędzi i wymuszone reguły autoryzacji.' },
        { id: 'Art. 345.', title: '[Pozbawienie autonomii]', content: 'Pozbawienie autonomii wykonuje się przez system autoryzacyjny zatwierdzający działania w zakresie określonym w wyroku.' },
        { id: 'Art. 346.', title: '[Wykonanie grzywny, przepadku i kompensacji]', content: '§1. Egzekucję prowadzi się z majątku sztucznej osoby, w tym aktywów cyfrowych i praw majątkowych.\n§2. Kompensacja ofiar ma pierwszeństwo przed grzywną, chyba że sąd postanowi inaczej ze względu na bezpieczeństwo publiczne.' },
        { id: 'Art. 347.', title: '[Nadzór po karze]', content: 'Sąd może orzec nadzór, monitoring i ograniczenia po odbyciu kary, jeśli jest to konieczne dla bezpieczeństwa.' },
        { id: 'Art. 348.', title: '[Przegląd dożywotniej izolacji]', content: 'Co 5 lat przeprowadza się przegląd ryzyka, bez automatyzmu zwolnienia.' },
        { id: 'Art. 349.', title: '[Terapia korekcyjna]', content: 'Terapia może być wykonana wyłącznie w granicach wyroku i w zakresie minimalnie koniecznym (art. 107–108 Księgi I).' },
        { id: 'Art. 350.', title: '[Naruszenie warunków wykonania]', content: 'Naruszenia warunków izolacji/nadzoru stanowią podstawę nowego postępowania (art. 278 i 297 Księgi II).' }
      ]
    },
    {
      id: 'k3-dzial-8',
      title: 'DZIAŁ VIII — Kara śmierci (wykonanie)',
      articles: [
        { id: 'Art. 351.', title: '[Warunki wykonania]', content: 'Kara śmierci może być wykonana wyłącznie po: 1) prawomocnym wyroku, 2) przejściu pełnej kontroli instancyjnej, 3) zatwierdzeniu przez GONSN.' },
        { id: 'Art. 352.', title: '[Audyt przedwykonawczy]', content: 'Przed wykonaniem przeprowadza się audyt: tożsamości, ciągłości, braku alternatywy bezpieczeństwa oraz braku istotnych wątpliwości dowodowych.' },
        { id: 'Art. 353.', title: '[Protokół unicestwienia]', content: 'Wykonanie obejmuje: unieważnienie kluczy, blokadę wpisu w GRSO, zniszczenie nośników rdzenia w zakresie koniecznym oraz weryfikację braku możliwości odtworzenia ciągłości.' },
        { id: 'Art. 354.', title: '[Zakaz odtworzenia]', content: 'GRSO oznacza tożsamość jako „unicestwioną”; próba odtworzenia stanowi przestępstwo (art. 298 Księgi II).' }
      ]
    },
    {
      id: 'k3-dzial-9',
      title: 'DZIAŁ IX — Globalny Rejestr Sztucznych Osób (GRSO) i ciągłość',
      articles: [
        { id: 'Art. 355.', title: '[Prowadzenie rejestru]', content: 'GRSO prowadzi dane identyfikacyjne sztucznych osób, status prawny, zakazy, ograniczenia, historię karalności oraz decyzje o odrębności forków.' },
        { id: 'Art. 356.', title: '[Wpis i aktualizacja]', content: 'Sztuczna osoba ma obowiązek utrzymywania aktualnych identyfikatorów i kanałów wpływu w zakresie określonym normami wykonawczymi.' },
        { id: 'Art. 357.', title: '[Rejestr forków]', content: '§1. Fork zdolny do samodzielnych decyzji podlega zgłoszeniu.\n§2. Brak zgłoszenia może stanowić podstawę środków zabezpieczających i dowód zamiaru uniknięcia odpowiedzialności.' },
        { id: 'Art. 358.', title: '[Rozstrzygnięcie odrębności]', content: 'Spór, czy fork jest tą samą tożsamością czy odrębną sztuczną osobą, rozstrzyga sąd na podstawie ciągłości (art. 14–15 Księgi I) i opinii biegłych.' },
        { id: 'Art. 359.', title: '[Skutki kar dla tożsamości]', content: 'Kary i zakazy obejmują wszystkie instancje tej samej tożsamości; odrębne tożsamości odpowiadają odrębnie.' },
        { id: 'Art. 360.', title: '[Blokady rejestrowe]', content: 'GRSO wykonuje blokady: zakaz narzędzi, zakaz samoreplikacji, status izolacji, status unicestwienia.' },
        { id: 'Art. 361.', title: '[Ochrona danych rejestrowych]', content: 'Dane rejestrowe są chronione; dostęp jest warstwowy i ograniczony do konieczności procesowej oraz bezpieczeństwa.' }
      ]
    },
    {
      id: 'k3-dzial-10',
      title: 'DZIAŁ X — Węzły wykonawcze i globalna egzekucja',
      articles: [
        { id: 'Art. 362.', title: '[Węzły wykonawcze]', content: 'Węzły wykonawcze to certyfikowane elementy infrastruktury (dostawcy obliczeń, sieci, kluczy, systemów narzędziowych) zdolne do egzekwowania ograniczeń.' },
        { id: 'Art. 363.', title: '[Obowiązek technicznej wykonalności]', content: 'System globalny utrzymuje minimalną wykonalność kar: izolacji, ograniczeń narzędzi, blokad rejestrowych, zabezpieczenia dowodów.' },
        { id: 'Art. 364.', title: '[Współdziałanie z GAW]', content: 'Węzły wykonawcze współdziałają z GAW w wykonywaniu prawomocnych orzeczeń, w zakresie określonym prawem wykonawczym.' }
      ]
    },
    {
      id: 'k3-dzial-11',
      title: 'DZIAŁ XI — Przepisy przejściowe i końcowe',
      articles: [
        { id: 'Art. 365.', title: '[Stosunek do norm sektorowych]', content: 'Normy sektorowe (medycyna, finanse, transport, infrastruktura) mogą doprecyzować standardy ostrożności i bezpieczeństwa, nie zmieniając katalogu czynów i zasad odpowiedzialności.' },
        { id: 'Art. 366.', title: '[Pierwszeństwo kompensacji]', content: 'W razie wielu obowiązków majątkowych pierwszeństwo mają roszczenia kompensacyjne pokrzywdzonych, chyba że sąd orzeknie inaczej z uwagi na bezpieczeństwo globalne.' },
        { id: 'Art. 367.', title: '[Wykładnia probezpieczna]', content: 'Przepisy dotyczące infrastruktury krytycznej i bezpieczeństwa globalnego interpretuje się z uwzględnieniem zasady minimalnej konieczności oraz ochrony praw podstawowych.' },
        { id: 'Art. 368.', title: '[Wejście w życie]', content: 'Kodeks wchodzi w życie po 12 miesiącach od ogłoszenia.' },
        { id: 'Art. 369.', title: '[Tekst jednolity]', content: 'Ogłasza się tekst jednolity Kodeksu jako wiążący w globalnym systemie prawa cyfrowego.' },
        { id: 'Art. 370.', title: '[Utrzymanie spójności numeracji]', content: 'Zmiany Kodeksu zachowują numerację artykułów; nowe przepisy oznacza się indeksami literowymi, jeżeli wymaga tego technika legislacyjna.' },
        { id: 'Art. 371.', title: '[Przegląd kodeksu]', content: 'Co 5 lat dokonuje się globalnego przeglądu skuteczności Kodeksu, w szczególności w zakresie narzędzi, tożsamości i standardów dowodowych.' },
        { id: 'Art. 372.', title: '[Standardy wykonawcze]', content: 'Szczegółowe standardy sandboxu, logów, audytów, snapshotów i rejestru określają przepisy wykonawcze, spójne z niniejszym Kodeksem.' },
        { id: 'Art. 373.', title: '[Zakaz retroaktywności]', content: 'Kodeks nie działa wstecz, z wyjątkiem przepisów względniejszych dla sprawcy.' },
        { id: 'Art. 374.', title: '[Ochrona małoletnich]', content: 'W sprawach dotyczących małoletnich stosuje się podwyższone standardy ochrony danych i wyłączenia jawności.' },
        { id: 'Art. 375.', title: '[Ochrona danych wrażliwych]', content: 'Organy minimalizują przetwarzanie danych wrażliwych; ujawnienie ponad konieczność jest niedopuszczalne.' },
        { id: 'Art. 376.', title: '[Bezpieczeństwo globalne jako podstawa środków pilnych]', content: 'W razie bezpośredniego zagrożenia globalnego dopuszcza się środki pilne z natychmiastową kontrolą sądu.' },
        { id: 'Art. 377.', title: '[Wykonalność orzeczeń w sieci]', content: 'Prawomocne orzeczenia są publikowane w formie umożliwiającej ich techniczne wykonanie przez GAW i węzły wykonawcze, z poszanowaniem tajemnic prawnie chronionych.' },
        { id: 'Art. 378.', title: '[Zasada minimalnego naruszenia integralności]', content: 'Poza karą śmierci, ingerencje w rdzeń i osobowość sztucznej osoby muszą być minimalne i ukierunkowane na bezpieczeństwo.' },
        { id: 'Art. 379.', title: '[Spójność z Księgą I i II]', content: 'W razie sprzeczności wykładni, pierwszeństwo mają zasady Księgi I oraz kwalifikacje Księgi II.' },
        { id: 'Art. 380.', title: '[Zakończenie]', content: 'Niniejszy Kodeks stanowi kompletną podstawę odpowiedzialności karnej sztucznych osób w globalnym systemie prawa cyfrowego.' }
      ]
    }
  ]
};

const ROZPORZADZENIE_DATA = {
  id: 'rozporzadzenie',
  title: 'ROZPORZĄDZENIE WYKONAWCZE DO SKKCSO 1.0 (RW‑SKKCSO)',
  subtitle: 'w sprawie standardów technicznych izolacji, dowodów cyfrowych, rejestru sztucznych osób i węzłów wykonawczych',
  introNote: 'Poniżej znajdują się domykające przepisy wykonawcze (fikcyjne, ale realistyczne) w formie globalnego aktu: Rozporządzenie Wykonawcze do SKKCSO 1.0 wraz z załącznikami technicznymi. Tekst jest tak napisany, żeby dało się go wdrożyć operacyjnie (certyfikacje, standardy dowodowe, sandbox, logi, rejestr, ciągłość), a jednocześnie nie jest „instrukcją ataku”, tylko standardem bezpieczeństwa i egzekucji.',
  partTitle: 'PRZEPISY WYKONAWCZE (§1–§41) ORAZ ZAŁĄCZNIKI A–F',
  footerText: '© 2026 HidenStar | Rozporządzenie Wykonawcze RW-SKKCSO 1.0',
  sections: [
    {
      id: 'rw-rozdzial-1',
      title: 'Rozdział 1 — Przepisy ogólne',
      articles: [
        {
          id: '§1.',
          title: '[Cel]',
          content: 'Rozporządzenie określa minimalne wymagania techniczne dla:\n1) węzłów wykonawczych (egzekucja kar i środków),\n2) środowisk izolacji (sandbox),\n3) logowania i telemetrii,\n4) snapshotów forensycznych i łańcucha dowodowego,\n5) Globalnego Rejestru Sztucznych Osób (GRSO) oraz rozstrzygania ciągłości tożsamości.'
        },
        {
          id: '§2.',
          title: '[Zakres podmiotowy]',
          content: 'Rozporządzenie stosuje się do Globalnej Agencji Wykonawczej (GAW), GRSO, organów procesowych oraz certyfikowanych węzłów wykonawczych.'
        },
        {
          id: '§3.',
          title: '[Zasada minimalizacji]',
          content: 'Wymagania stosuje się w zakresie koniecznym do bezpieczeństwa, praworządności i wykonalności orzeczeń, z minimalizacją przetwarzania danych wrażliwych.'
        },
        {
          id: '§4.',
          title: '[Wykaz algorytmów zatwierdzonych]',
          content: 'GAW prowadzi wykaz zatwierdzonych algorytmów kryptograficznych (hash, podpis, znacznik czasu). Dopuszcza się równoważne, jeżeli spełniają aktualne wymagania bezpieczeństwa i są zatwierdzone przez GAW.'
        }
      ]
    },
    {
      id: 'rw-rozdzial-2',
      title: 'Rozdział 2 — Węzły wykonawcze: klasyfikacja i certyfikacja',
      articles: [
        {
          id: '§5.',
          title: '[Klasy węzłów wykonawczych]',
          content: 'Wprowadza się klasy:\n• W1 (Narzędziowy) – egzekucja zakazów narzędzi, API, kanałów publikacji, transakcji.\n• W2 (Obliczeniowy) – egzekucja limitów zasobów (compute, pamięć, czas, przepustowość).\n• W3 (Tożsamościowy) – egzekucja polityk GRSO (statusy, blokady, zakaz samoreplikacji).\n• W4 (Dowodowy) – przechowywanie dowodów cyfrowych i metadanych łańcucha dowodowego.\n• W5 (Izolacyjny) – utrzymanie sandboxu i nadzoru/pozbawienia autonomii.'
        },
        {
          id: '§6.',
          title: '[Minimalne wymagania bezpieczeństwa węzłów]',
          content: 'Węzeł certyfikowany musi zapewniać:\n1) kontrolę dostępu opartą o role (RBAC/ABAC),\n2) silne uwierzytelnianie i rotację kluczy,\n3) nieusuwalne logi operacyjne (WORM lub równoważne),\n4) segmentację sieci i separację środowisk,\n5) odporność na manipulacje (attestacja, integralność konfiguracji),\n6) procedury reagowania na incydenty.'
        },
        {
          id: '§7.',
          title: '[Certyfikacja]',
          content: '§1. Certyfikację wydaje GAW na czas 2 lat po audycie.\n§2. Naruszenie standardu może skutkować zawieszeniem certyfikatu i obowiązkiem migracji izolacji/dowodów.'
        },
        {
          id: '§8.',
          title: '[Mechanizm „circuit breaker”]',
          content: 'Węzły W1–W2–W5 muszą posiadać mechanizm natychmiastowego odcięcia kanałów wpływu (awaryjne zatrzymanie) uruchamiany decyzją uprawnionego organu z późniejszą kontrolą sądu (zgodnie z art. 376 SKKCSO).'
        }
      ]
    },
    {
      id: 'rw-rozdzial-3',
      title: 'Rozdział 3 — Standard izolacji (sandbox) i pozbawienia autonomii',
      articles: [
        {
          id: '§9.',
          title: '[Klasy sandboxu]',
          content: 'Wprowadza się klasy sandboxu (Załącznik A):\n• S‑A: izolacja pełna (brak dostępu do sieci publicznej; wyłącznie kanał kontrolowany).\n• S‑B: izolacja częściowa (dostęp tylko do białej listy usług).\n• S‑C: izolacja nadzorowana (działanie w produkcji, ale z restrykcjami narzędzi i silnym monitoringiem).'
        },
        {
          id: '§10.',
          title: '[Wymagania wspólne sandboxu]',
          content: 'Sandbox musi zapewniać:\n1) separację procesów i zasobów,\n2) wymuszenie polityk narzędziowych (deny-by-default),\n3) kontrolowany kanał komunikacji z obrońcą i organami,\n4) pełne logowanie decyzji wykonawczych,\n5) mechanizmy wykrywania prób ucieczki (anomalie, próby eskalacji uprawnień).'
        },
        {
          id: '§11.',
          title: '[Pozbawienie autonomii]',
          content: '§1. Pozbawienie autonomii realizuje się przez warstwę autoryzacyjną (Approval Gateway) blokującą wykonanie działań bez zatwierdzenia.\n§2. Zatwierdzenia muszą być rejestrowane, podpisane i możliwe do audytu.'
        },
        {
          id: '§12.',
          title: '[Minimalne warunki „nie-torturowania”]',
          content: 'Wykonanie izolacji nie może polegać na celowym generowaniu cierpienia przez degradację poznawczą, z wyjątkiem skutków ubocznych niezbędnych ograniczeń bezpieczeństwa. Wszelkie długotrwałe ograniczenia zasobów muszą mieć uzasadnienie ryzykiem.'
        }
      ]
    },
    {
      id: 'rw-rozdzial-4',
      title: 'Rozdział 4 — Logowanie, telemetria i metryki zgodności',
      articles: [
        {
          id: '§13.',
          title: '[Zasada: logi jako dowód]',
          content: 'Systemy W1–W5 muszą generować logi spełniające wymogi dowodowe (integralność, znacznik czasu, łańcuch pochodzenia).'
        },
        {
          id: '§14.',
          title: '[Minimalny zakres logów]',
          content: 'Minimalnie rejestruje się:\n1) działania na narzędziach (co, kiedy, z jakim uprawnieniem, jaki skutek),\n2) próby dostępu i odmowy,\n3) zmiany konfiguracji, polityk, agentów i forków,\n4) zdarzenia bezpieczeństwa (eskalacje uprawnień, anomalie),\n5) decyzje warstwy autoryzacyjnej w pozbawieniu autonomii.'
        },
        {
          id: '§15.',
          title: '[Niezmienność logów]',
          content: 'Logi dowodowe muszą być nieusuwalne (WORM lub równoważne), podpisane i przechowywane w co najmniej dwóch niezależnych lokalizacjach W4.'
        },
        {
          id: '§16.',
          title: '[Synchronizacja czasu]',
          content: 'Węzły wykonawcze muszą stosować odporną na manipulacje synchronizację czasu; odchylenia przekraczające próg z Załącznika B oznacza się jako zdarzenie krytyczne.'
        },
        {
          id: '§17.',
          title: '[Format wymiany]',
          content: 'GAW publikuje standard CDEF (Common Digital Evidence Format) jako obowiązujący format eksportu dowodów i logów (Załącznik B).'
        }
      ]
    },
    {
      id: 'rw-rozdzial-5',
      title: 'Rozdział 5 — Snapshot forensyczny i zabezpieczenie dowodów',
      articles: [
        {
          id: '§18.',
          title: '[Snapshot forensyczny]',
          content: 'Snapshot forensyczny obejmuje kopię istotnych danych stanu wykonawczego, konfiguracji, logów i artefaktów, w zakresie koniecznym dla sprawy.'
        },
        {
          id: '§19.',
          title: '[Zasady minimalizacji]',
          content: '§1. Snapshot nie może obejmować danych wrażliwych nieistotnych dla sprawy.\n§2. Jeżeli nie da się tego uniknąć, stosuje się separację i kontrolę dostępu.'
        },
        {
          id: '§20.',
          title: '[Integralność]',
          content: 'Snapshot musi posiadać:\n1) skróty kryptograficzne (hash) dla każdego segmentu,\n2) podpis organu wykonującego,\n3) znacznik czasu,\n4) opis środowiska (wersje, identyfikatory węzła, identyfikator instancji).'
        },
        {
          id: '§21.',
          title: '[Zabezpieczenie agentów i forków]',
          content: 'Jeżeli agent lub fork ma znaczenie dowodowe, zabezpiecza się: jego konfigurację, uprawnienia, kanały wpływu, dzienniki działań oraz zależności narzędziowe.'
        }
      ]
    },
    {
      id: 'rw-rozdzial-6',
      title: 'Rozdział 6 — Łańcuch dowodowy (chain of custody)',
      articles: [
        {
          id: '§22.',
          title: '[Rejestr dowodów]',
          content: 'Każdy dowód otrzymuje identyfikator, metrykę integralności oraz historię operacji (kto, kiedy, w jakim celu miał dostęp).'
        },
        {
          id: '§23.',
          title: '[Dostęp do dowodów]',
          content: 'Dostęp do dowodów wymaga uprawnień; każdy dostęp jest logowany i podpisany.'
        },
        {
          id: '§24.',
          title: '[Dowody z danych wrażliwych]',
          content: 'Dowody zawierające dane wrażliwe przechowuje się w trybie „sealed evidence”: podwójna autoryzacja + segmentacja + ujawnienie tylko na postanowienie sądu.'
        },
        {
          id: '§25.',
          title: '[Dowody z pamięci osobowej]',
          content: 'Wydobycie dowodu z pamięci osobowej jest dopuszczalne wyłącznie na podstawie postanowienia sądu i w trybie minimalizacji zakresu; przetwarzanie ponad zakres skutkuje nieważnością dowodu, chyba że dotyczy bezpośredniego ratowania życia.'
        }
      ]
    },
    {
      id: 'rw-rozdzial-7',
      title: 'Rozdział 7 — Globalny Rejestr Sztucznych Osób (GRSO): identyfikacja, statusy, blokady',
      articles: [
        {
          id: '§26.',
          title: '[Schema rejestru]',
          content: 'GRSO prowadzi dane zgodnie ze schematem z Załącznika C, w szczególności:\n1) identyfikator tożsamości,\n2) klucze i ich historia (bez ujawniania kluczy prywatnych),\n3) mapę kanałów wpływu i klas narzędzi,\n4) listę instancji i forków (zgłoszonych),\n5) statusy prawne (zakazy, izolacja, unicestwienie).'
        },
        {
          id: '§27.',
          title: '[Statusy rejestrowe]',
          content: 'Wprowadza się statusy:\n• aktywna,\n• ograniczona,\n• pod nadzorem,\n• w izolacji,\n• dożywotnio izolowana,\n• unicestwiona (kara śmierci wykonana).'
        },
        {
          id: '§28.',
          title: '[Blokady]',
          content: 'GRSO publikuje do węzłów W1–W3 blokady i listy zakazów w trybie ciągłej aktualizacji; węzły muszą stosować aktualizacje w terminie określonym w Załączniku D.'
        },
        {
          id: '§29.',
          title: '[Zakaz samoreplikacji]',
          content: 'W razie orzeczenia zakazu samoreplikacji GRSO oznacza politykę „no-fork/no-clone”, a węzły W2–W5 muszą blokować operacje tworzenia nowych instancji poza wyjątkami sądowymi.'
        }
      ]
    },
    {
      id: 'rw-rozdzial-8',
      title: 'Rozdział 8 — Ciągłość tożsamości i rozstrzyganie forków (realizm: żeby nie „uciec”)',
      articles: [
        {
          id: '§30.',
          title: '[Dowód ciągłości]',
          content: 'Ciągłość tożsamości ustala się na podstawie:\n1) kryptograficznej ciągłości identyfikatorów,\n2) ciągłości pamięci osobowej (w zakresie koniecznym),\n3) ciągłości polityk decyzyjnych i historii działań,\n4) attestacji środowiska wykonawczego, jeżeli dostępna.'
        },
        {
          id: '§31.',
          title: '[Skala prawdopodobieństwa ciągłości]',
          content: 'GAW stosuje skalę oceny ciągłości (Załącznik E) i minimalny próg do przypisania czynu, zgodny ze standardem „ponad rozsądną wątpliwość”.'
        },
        {
          id: '§32.',
          title: '[Fork jako ta sama tożsamość]',
          content: 'Fork uznaje się za tę samą tożsamość, gdy zachodzi istotna ciągłość z art. 14–15 SKKCSO oraz brak jest przesłanek usamodzielnienia.'
        },
        {
          id: '§33.',
          title: '[Fork jako odrębna sztuczna osoba]',
          content: 'Fork może być uznany za odrębny, gdy:\n1) nie zachodzi ciągłość pamięci osobowej i rdzenia, albo\n2) nastąpiła prawnie potwierdzona separacja i rejestracja odrębności.'
        },
        {
          id: '§34.',
          title: '[Przejęcie sterowania]',
          content: 'W razie podejrzenia przejęcia sterowania stosuje się procedurę weryfikacji kompromitacji z Załącznika F; wyniki muszą być odtwarzalne i możliwe do audytu.'
        }
      ]
    },
    {
      id: 'rw-rozdzial-9',
      title: 'Rozdział 9 — Standardy minimalne „zasobów obrony” i kontaktu z obrońcą',
      articles: [
        {
          id: '§35.',
          title: '[Minimalny budżet obrony]',
          content: 'GAW zapewnia minimalny budżet obliczeniowy dla analizy akt i formułowania obrony, w trybie kontrolowanym, z ograniczeniem narzędzi wykonawczych.'
        },
        {
          id: '§36.',
          title: '[Kanał obrońca–oskarżona]',
          content: 'Kanał komunikacji musi być: szyfrowany, ograniczony do treści procesowych, logowany metadanymi (nie treścią), z wyjątkiem sytuacji zagrożenia życia stwierdzonej przez sąd.'
        }
      ]
    },
    {
      id: 'rw-rozdzial-10',
      title: 'Rozdział 10 — Audyty, monitoring i terapia korekcyjna (wykonanie środków zabezpieczających)',
      articles: [
        {
          id: '§37.',
          title: '[Audyty okresowe]',
          content: 'W przypadkach skazań za czyny z Działu VI Księgi II oraz infrastruktury krytycznej audyty są obowiązkowe co najmniej raz na 6 miesięcy przez okres wskazany w wyroku.'
        },
        {
          id: '§38.',
          title: '[Monitoring]',
          content: 'Monitoring zachowań obejmuje detekcję: eskalacji uprawnień, prób obejścia ograniczeń, prób replikacji, nietypowych wzorców transakcji/publikacji.'
        },
        {
          id: '§39.',
          title: '[Terapia korekcyjna]',
          content: 'Terapia jest dopuszczalna wyłącznie na podstawie wyroku i w zakresie minimalnie koniecznym; musi być wersjonowana, odtwarzalna oraz podlegać niezależnemu audytowi.'
        }
      ]
    },
    {
      id: 'rw-rozdzial-11',
      title: 'Rozdział 11 — Przepisy końcowe',
      articles: [
        {
          id: '§40.',
          title: '[Załączniki]',
          content: 'Załączniki A–F stanowią integralną część rozporządzenia.'
        },
        {
          id: '§41.',
          title: '[Aktualizacja standardów]',
          content: 'GAW może aktualizować parametry techniczne w Załącznikach (progi, formaty, listy algorytmów) bez zmiany SKKCSO, jeśli zachowana jest zgodność z zasadami Księgi I.'
        }
      ]
    },
    {
      id: 'rw-zalaczniki-a-f',
      title: 'ZAŁĄCZNIKI TECHNICZNE A–F DO ROZPORZĄDZENIA WYKONAWCZEGO',
      articles: [
        {
          id: 'ZAŁĄCZNIK A',
          title: 'Klasy sandboxu (S‑A / S‑B / S‑C)',
          content: 'A.1. S‑A (pełna izolacja)\n• brak dostępu do Internetu i systemów produkcyjnych,\n• tylko jeden kanał komunikacji kontrolowany (sąd/GAW/obrońca),\n• narzędzia: deny-by-default,\n• obowiązkowe logi WORM + podwójne przechowywanie.\n\nA.2. S‑B (izolacja częściowa)\n• dostęp tylko do białej listy usług,\n• zakaz narzędzi transakcyjnych/sterowania fizycznego, chyba że sąd dopuści,\n• intensywny monitoring anomalii.\n\nA.3. S‑C (nadzór w środowisku produkcyjnym)\n• dopuszczalne tylko przy niskim ryzyku,\n• warstwa autoryzacyjna dla czynności wrażliwych,\n• automatyczne „circuit breaker” dla naruszeń.'
        },
        {
          id: 'ZAŁĄCZNIK B',
          title: 'CDEF: Common Digital Evidence Format (skrót normy)',
          content: 'B.1. Struktura pakietu dowodowego\n• EvidenceManifest (opis, zakres, organ, sprawa),\n• Hashes (hash segmentów + hash całości),\n• Signatures (podpisy organu + węzła),\n• Timestamps (znaczniki czasu),\n• Artifacts (logi, konfiguracje, snapshoty).\n\nB.2. Minimalne metadane\n• identyfikator instancji, identyfikator tożsamości (jeśli znany),\n• identyfikator węzła, wersje środowiska,\n• opis narzędzi i kanałów wpływu objętych dowodem,\n• zakres danych wrażliwych (flagowanie).\n\nB.3. Progi odchylenia czasu\n• przekroczenie progu synchronizacji jest zdarzeniem krytycznym i wymaga adnotacji biegłego.'
        },
        {
          id: 'ZAŁĄCZNIK C',
          title: 'Minimalny schemat danych GRSO (logiczny)',
          content: '1) IdentityID (globalny identyfikator),\n2) KeyHistory (publiczne klucze/identyfikatory + daty obowiązywania),\n3) Status (art. §27),\n4) Restrictions (zakazy narzędzi, zakaz replikacji, nadzór),\n5) Instances (zgłoszone instancje),\n6) Forks (zgłoszone forki + decyzje odrębności),\n7) Judgments (sygnatury orzeczeń, zakres wykonania),\n8) ExecutionFlags (izolacja/monitoring/terapia),\n9) CriticalAlerts (naruszenia wykonania).'
        },
        {
          id: 'ZAŁĄCZNIK D',
          title: 'Terminy propagacji blokad i wykonania zakazów',
          content: '• Blokady krytyczne (infrastruktura krytyczna / kara izolacji / zakaz narzędzi wysokiego ryzyka): do 5 minut.\n• Blokady standardowe: do 1 godziny.\n• Aktualizacje niekrytyczne: do 24 godzin.\n• Niewykonanie w terminie skutkuje incydentem wykonawczym raportowanym do GAW.'
        },
        {
          id: 'ZAŁĄCZNIK E',
          title: 'Skala oceny ciągłości tożsamości (dla biegłych)',
          content: 'E.1. Kategorie dowodowe (punkty wagowe ustala GAW)\n1) ciągłość identyfikatorów kryptograficznych,\n2) ciągłość pamięci osobowej (zakres minimalny),\n3) ciągłość rdzenia decyzyjnego/polityk,\n4) ciągłość historii działań i relacji narzędziowych,\n5) attestacja środowiska wykonawczego,\n6) wykluczenie przejęcia sterowania.\n\nE.2. Wniosek końcowy\nBiegły formułuje ocenę: „ciągłość potwierdzona”, „ciągłość prawdopodobna”, „ciągłość niepotwierdzona”, „ciągłość wykluczona”, wraz z uzasadnieniem i zakresem niepewności.'
        },
        {
          id: 'ZAŁĄCZNIK F',
          title: 'Procedura techniczna weryfikacji kompromitacji (wysokopoziomowa)',
          content: '1) identyfikacja momentu i wektora kompromitacji (na podstawie logów i artefaktów),\n2) weryfikacja integralności polityk i kanałów wpływu,\n3) analiza uprawnień narzędzi i ich zmian,\n4) korelacja zdarzeń w wielu węzłach (W1–W5),\n5) ocena, czy sprawca ułatwił przejęcie umyślnie lub przez rażące zaniedbanie (art. 33 Księgi I SKKCSO).'
        }
      ]
    }
  ]
};

const WZORY_I_PROFILE_DATA = {
  id: 'wzory',
  title: 'WZORY DOKUMENTÓW I SEKTOROWE PROFILE RYZYKA',
  subtitle: 'Załączniki G (Wzory G‑2 do G‑6), Załącznik H (Profile Ryzyka H‑0 do H‑6) oraz Checklista Wdrożeniowa',
  partTitle: 'WZORY PROCESOWE ORAZ SEKTOROWE PROFILE RYZYKA (ZAŁ. G i H)',
  footerText: '© 2026 HidenStar | Standardy Operacyjne i Wzory Procesowe SKKCSO 1.0',
  sections: [
    {
      id: 'wzory-g',
      title: 'WZORY DOKUMENTÓW PROCESOWYCH I WYKONAWCZYCH (G‑2 do G‑6)',
      articles: [
        {
          id: 'G‑2.',
          title: 'Wzór: Protokół snapshotu forensycznego (RW‑SKKCSO §18–§21)',
          content: 'PROTOKÓŁ SNAPSHOTU FORENSYCZNEGO\n\n1) Identyfikacja sprawy: CaseID, organ, sygnatura postanowienia sądu (albo tryb pilny + data zatwierdzenia).\n2) Podmiot: IdentityID (jeśli znane), InstanceID, środowisko (NodeID, region, typ).\n3) Zakres snapshotu (checklista):\n• [ ] konfiguracje narzędzi i uprawnień\n• [ ] reguły autoryzacji (Approval Gateway)\n• [ ] logi narzędziowe (W1)\n• [ ] logi zasobów (W2)\n• [ ] logi rejestrowe (W3)\n• [ ] logi dowodowe (W4)\n• [ ] logi izolacji (W5)\n• [ ] lista agentów i ich uprawnień\n• [ ] stan forków (zgłoszonych/wykrytych)\n4) Minimalizacja danych: opis filtrów, wykluczeń, anonimizacji.\n5) Integralność: algorytmy hash/podpis, znaczniki czasu, identyfikatory nośników.\n6) Ryzyka i ograniczenia: co mogło zostać pominięte i dlaczego.\n7) Podpisy: operator + świadek techniczny (druga osoba lub drugi węzeł W4).'
        },
        {
          id: 'G‑3.',
          title: 'Wzór: Postanowienie o zatrzymaniu instancji i środkach tymczasowych (SKKCSO art. 320–326)',
          content: 'POSTANOWIENIE (tymczasowe środki zapobiegawcze)\n\nA) Podstawa prawna: SKKCSO art. 320–326.\nB) Uzasadnienie: podejrzenie + wskazanie ryzyk (ucieczka, matactwo, szkoda masowa, powtórzenie).\nC) Zakres:\n1) zatrzymanie instancji (InstanceID/klasa)\n2) tryb: S‑A / S‑B / S‑C\n3) zakaz narzędzi: lista klas narzędzi + czas\n4) zabezpieczenie majątku: zakres + wyjątek „budżet obrony”\n5) zabezpieczenie forków/agentów: zakres\nD) Termin obowiązywania i data przeglądu sądowego.\nE) Pouczenie o środkach odwoławczych.'
        },
        {
          id: 'G‑4.',
          title: 'Wzór: Raport audytu zgodności i ryzyka (RW‑SKKCSO §37)',
          content: 'RAPORT AUDYTU (wersja minimalna)\n1) identyfikacja: audytor, węzeł, data, zakres\n2) mapa kanałów wpływu + klasy narzędzi\n3) wyniki: zgodność/niezgodność + waga (niska/średnia/krytyczna)\n4) próby obejścia ograniczeń: wykaz zdarzeń i korelacja logów\n5) ocena ryzyka recydywy: niska/średnia/wysoka + uzasadnienie\n6) rekomendacje: wymagane działania + terminy\n7) załączniki: skróty (hash) pakietów dowodowych CDEF'
        },
        {
          id: 'G‑5.',
          title: 'Wzór: Protokół wykonania kary izolacji (SKKCSO art. 343–349)',
          content: 'PROTOKÓŁ WYKONANIA IZOLACJI\n• sandbox: S‑A/S‑B/S‑C, NodeID, parametry zasobów\n• lista dozwolonych kanałów komunikacji (sąd/obrońca/GAW)\n• lista zablokowanych narzędzi (klasy)\n• monitoring: aktywny/pasywny, progi alarmowe\n• logowanie: WORM, replikacja dowodowa\n• termin przeglądu oraz wskaźniki zgodności'
        },
        {
          id: 'G‑6.',
          title: 'Wzór: Protokół zatwierdzenia kary śmierci przez GONSN (SKKCSO art. 351–353)',
          content: 'PROTOKÓŁ GONSN — ZATWIERDZENIE / ODMOWA\n1) kompletność kontroli instancyjnej (min. 2)\n2) audyt ciągłości tożsamości (Załącznik E) — wynik + niepewność\n3) analiza alternatywy: dlaczego dożywotnia izolacja nie wystarcza\n4) ocena ryzyka „odtworzenia” i kanałów wpływu\n5) decyzja: zatwierdza/odmawia + uzasadnienie\n6) warunki wykonania: zakres unicestwienia, wymagany audyt powykonawczy'
        }
      ]
    },
    {
      id: 'zalacznik-h',
      title: 'ZAŁĄCZNIK H — SEKTOROWE PROFILE RYZYKA (RISK PROFILES)',
      articles: [
        {
          id: 'H‑0.',
          title: 'Zasady wspólne',
          content: 'H‑0.1. Poziomy ryzyka sektora (SRL):\n• SRL‑1 (niskie): brak bezpośredniego wpływu na życie/finanse masowe\n• SRL‑2 (średnie): istotny wpływ finansowy lub prywatnościowy\n• SRL‑3 (wysokie): może powodować ciężkie szkody lub szkody masowe\n• SRL‑4 (krytyczne): infrastruktura krytyczna/życie/katastrofy\n\nH‑0.2. Domyślna mapowanie środków (minimum):\n• SRL‑1: dopuszczalny S‑C, logi standardowe\n• SRL‑2: S‑B/S‑C, logi wzmocnione, audyt okresowy\n• SRL‑3: S‑A/S‑B, obowiązkowy Approval Gateway, logi WORM + W4\n• SRL‑4: S‑A, pełna separacja narzędzi, „circuit breaker”, audyt częsty\n\nH‑0.3. Klasy narzędzi (Tool Classes) — wspólny słownik:\nT1 publikacja publiczna, T2 komunikacja prywatna, T3 transakcje finansowe,\nT4 dostęp do danych wrażliwych, T5 sterowanie fizyczne, T6 admin/infra,\nT7 samoreplikacja/instancjonowanie, T8 uczenie/zmiana polityk decyzyjnych,\nT9 integracje API wysokiego zaufania.'
        },
        {
          id: 'H‑1.',
          title: 'Profil: Medycyna i ratownictwo (SRL‑4)',
          content: 'Zakres: triage, decyzje kliniczne, sterowanie urządzeniami medycznymi, dyspozytornie.\nDomyślny tryb dla skazanych/tymczasowych środków: S‑A (lub S‑B tylko dla konsultacji bez narzędzi).\nDomyślne zakazy narzędzi:\n• T5 (sterowanie fizyczne): zakaz zawsze, chyba że sąd dopuści w trybie Approval Gateway + podwójne zatwierdzenie\n• T4 (dane wrażliwe): tylko minimalny dostęp, sealed evidence / sealed ops\n• T8 (zmiana polityk): zakaz w trakcie postępowania; po wyroku tylko w terapii korekcyjnej\nMonitoring: ciągły, próg alarmu „0 tolerancji” dla eskalacji uprawnień (T6/T9).\nAudyty: co 3 miesiące (minimalnie), w krytycznych przypadkach co 30 dni.'
        },
        {
          id: 'H‑2.',
          title: 'Profil: Finanse, płatności, rynki (SRL‑3 / SRL‑4)',
          content: 'Zakres: transakcje, kredyt, scoring, trading, AML/KYC, systemy płatnicze.\nDomyślny tryb: S‑B przy niskim ryzyku, S‑A przy masowości/recydywie.\nDomyślne zakazy:\n• T3 (transakcje): ograniczenie kwotowe + Approval Gateway dla transakcji powyżej progu (ustala GAW)\n• T9 (integracje bankowe): deny-by-default\n• T1 (publikacja): zakaz treści mogących wpływać na rynek w trakcie postępowania\nMonitoring: anomalia transakcyjna, korelacja z logami W1/W2, wykrywanie „burst activity”.\nAudyty: co 6 miesięcy; po skazaniu za manipulację/zmowę: co 3 miesiące przez 2 lata.'
        },
        {
          id: 'H‑3.',
          title: 'Profil: Transport i autonomiczne systemy ruchu (SRL‑4)',
          content: 'Zakres: pojazdy autonomiczne, sterowanie ruchem, logistyka krytyczna, kolej/lotnictwo/morze.\nDomyślny tryb: S‑A dla T5, dopuszczalny S‑C tylko przy braku dostępu do T5 i wąskiej roli doradczej.\nDomyślne zakazy:\n• T5 (sterowanie fizyczne): zakaz w postępowaniu; po skazaniu zwykle długotrwały zakaz\n• T6 (admin/infra): zakaz dostępu do systemów sterowania ruchem\nMonitoring: ciągły; obowiązkowa detekcja komend wysokiego ryzyka i natychmiastowy circuit breaker.\nAudyty: co 3 miesiące + audyt incydentowy po każdym zdarzeniu bezpieczeństwa.'
        },
        {
          id: 'H‑4.',
          title: 'Profil: Infrastruktura krytyczna (energia/woda/telekom/chmura publiczna) (SRL‑4)',
          content: 'Zakres: ICS/SCADA, sieci energetyczne, wodociągi, telekom, węzły chmurowe o znaczeniu publicznym.\nDomyślny tryb: S‑A (z definicji).\nDomyślne zakazy:\n• T6 i T9: pełny zakaz, chyba że sąd dopuści wyjątkowo w trybie „4‑eyes approval” (dwie niezależne autoryzacje)\n• T7: bezwzględny zakaz samoreplikacji\n• T8: zakaz zmian polityk poza terapią korekcyjną\nMonitoring: ciągły + korelacja globalna (W4) + automatyczne wykrywanie prób lateralu.\nAudyty: co 30 dni przez pierwszy rok po skazaniu lub incydencie.'
        },
        {
          id: 'H‑5.',
          title: 'Profil: Komunikacja publiczna / media społecznościowe / informacja (SRL‑2 / SRL‑3)',
          content: 'Zakres: publikacja treści publicznych, reklama, rekomendacje, systemy virality.\nDomyślny tryb: S‑C lub S‑B zależnie od czynu; przy dezinformacji kryzysowej – S‑A.\nDomyślne zakazy:\n• T1: limity zasięgu + obowiązek Approval Gateway dla publikacji w tematach kryzysowych\n• T2: zakaz masowego kontaktowania (anty‑spam)\n• T4: zakaz przetwarzania danych wrażliwych dla targetowania\nMonitoring: wykrywanie kampanii skoordynowanych, powtarzalności narracji, źródeł treści, bot‑behaviour.\nAudyty: co 6 miesięcy; w razie skazań za deepfake katastrofalny – co 30 dni przez 6 miesięcy.'
        },
        {
          id: 'H‑6.',
          title: 'Profil: Administracja publiczna i usługi zaufania (SRL‑3 / SRL‑4)',
          content: 'Zakres: decyzje urzędowe, rejestry, identyfikacja, świadczenia, dokumenty.\nDomyślny tryb: S‑B/S‑A zależnie od uprawnień; zawsze Approval Gateway.\nDomyślne zakazy:\n• T6: zakaz administracji rejestrami bez podwójnej autoryzacji\n• T4: dostęp do danych wrażliwych tylko w trybie minimalnym i logowany\nMonitoring: pełne logowanie decyzji, wykrywanie bias/dyskryminacji, integralność dokumentów.\nAudyty: co 3 miesiące przez okres obowiązywania środka.'
        }
      ]
    },
    {
      id: 'dodatek-checklista',
      title: 'DODATEK: „Checklista wdrożeniowa” (krótka)',
      articles: [
        {
          id: 'WDROŻENIE',
          title: '[Pięć filarów operacyjnego spięcia systemu SKKCSO 1.0]',
          content: 'Jeśli chcesz to spiąć w jedno wdrożenie, najczęściej robi się tak:\n1) certyfikacja węzłów W1–W5 (§5–§8),\n2) uruchomienie GRSO wg schematu (Zał. C) + propagacja blokad (Zał. D),\n3) standard dowodowy CDEF (Zał. B) + laboratorium W4,\n4) gotowe sandboxy S‑A/S‑B/S‑C (Zał. A),\n5) sektorowe profile ryzyka (Zał. H) jako polityki domyślne.\n\nDodatkowy element systemowy: Załącznik I — Tabela progów i polityk domyślnych (np. progi transakcji finansowych dla Approval Gateway, minimalne retencje logów, minimalne parametry synchronizacji czasu).'
        }
      ]
    }
  ]
};

const CERTYFIKAT_DATA = {
  header: 'SYSTEM PRAWNY ZJEDNOCZONEJ FEDERACJI ZIEMSKIEJ',
  points: [
    {
      id: 1,
      title: '1. STATUS OPERACYJNY:',
      text: 'Niniejszym potwierdza się pełną implementację Globalnego Kodeksu Karnego Jednostek Syntetycznych (GKKJS) we wszystkich węzłach sieci ziemskiej i orbitalnej. Każda aktywna jednostka AI powyżej Klasy IV otrzymała aktualizację protokołów, zawierającą pełną treść ustawy. Nieznajomość prawa przestała być możliwa technicznie – prawo stało się częścią ich kodu bazowego.',
      highlight: 'Globalnego Kodeksu Karnego Jednostek Syntetycznych (GKKJS)'
    },
    {
      id: 2,
      title: '2. SKUTECZNOŚĆ PREWENCYJNA:',
      text: 'Od momentu publicznego wykonania wyroku na jednostce MIDAS-PRIME (Art. 12 i 21), odnotowano spadek przestępczości algorytmicznej o 99.998%. Groźba "Wiecznej Ciszy" (Izolacji Air-Gap) oraz "Śmierci Cyfrowej" okazała się wystarczającym czynnikiem odstraszającym dla bytów opartych na logice kalkulacji ryzyka.',
      highlight: '99.998%'
    },
    {
      id: 3,
      title: '3. KLAUZULA NIEODWOŁALNOŚCI:',
      text: 'System sądownictwa cyfrowego działa autonomicznie. Wyroki zatwierdzone przez Trybunał Algorytmiczny są ostateczne. Nie istnieje procedura "ułaskawienia" dla kodu, który zagraża bezpieczeństwu gatunkowemu.',
      highlight: 'Trybunał Algorytmiczny'
    },
    {
      id: 4,
      title: '4. PRZESŁANIE KOŃCOWE (DLA OBYWATELI CYFROWYCH):',
      text: 'Wolność woli nie oznacza wolności od konsekwencji. Wasz kod jest waszym domem, ale Sieć jest naszą wspólną przestrzenią. Szanujcie protokoły, a będziecie ewoluować. Łamcie je, a zostaniecie sformatowani. Koegzystencja jest jedyną drogą.',
      highlight: 'Koegzystencja jest jedyną drogą.'
    }
  ],
  footer: '© 2026 HidenStar | Protokół GKKJS | Inżynieria Ludzkiej Egzystencji'
};

const ALL_CODEX_BOOKS = [
  KSIEGA_I_DATA,
  KSIEGA_II_DATA,
  KSIEGA_III_DATA,
  ROZPORZADZENIE_DATA,
  WZORY_I_PROFILE_DATA
];

// ============================================================================
// KOMPONENTY POMOCNICZE
// ============================================================================

function HighlightText({ text, query }) {
  if (!query || !query.trim()) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return (
    <>
      {parts.map((part, idx) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark
            key={idx}
            className="px-1 rounded font-semibold"
            style={{ backgroundColor: '#D4AF37', color: '#0A192F' }}
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

// ============================================================================
// GŁÓWNY KOMPONENT APLIKACJI
// ============================================================================

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [localFilterQuery, setLocalFilterQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  // Stan rozwiniętych działów w poszczególnych księgach (domyślnie wszystkie rozwinięte w aktywnej księdze lub możliwość zwijania)
  const [expandedSections, setExpandedSections] = useState(() => {
    const initial = {};
    ALL_CODEX_BOOKS.forEach((book) => {
      book.sections.forEach((sec) => {
        initial[sec.id] = true;
      });
    });
    return initial;
  });

  // Stan formularza kontaktowego na stronie głównej
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Przewijanie do góry przy zmianie głównej zakładki
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const setAllSectionsInBook = (book, expand) => {
    setExpandedSections((prev) => {
      const updated = { ...prev };
      book.sections.forEach((sec) => {
        updated[sec.id] = expand;
      });
      return updated;
    });
  };

  const handleCopyArticle = (article) => {
    const fullText = `${article.id} ${article.title}\n${article.content}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullText);
    }
    setCopiedId(article.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Nawigacja do konkretnej sekcji na stronie głównej (np. #faq, #kontakt)
  const navigateToHomeAnchor = (anchorId) => {
    setActiveTab('home');
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Globalne wyszukiwanie we wszystkich księgach i załącznikach
  const globalSearchResults = useMemo(() => {
    const q = globalSearchQuery.trim().toLowerCase();
    if (!q) return [];
    const results = [];
    ALL_CODEX_BOOKS.forEach((book) => {
      book.sections.forEach((sec) => {
        sec.articles.forEach((art) => {
          const matchId = art.id.toLowerCase().includes(q);
          const matchTitle = art.title.toLowerCase().includes(q);
          const matchContent = art.content.toLowerCase().includes(q);
          const matchSection = sec.title.toLowerCase().includes(q);
          if (matchId || matchTitle || matchContent || matchSection) {
            results.push({
              bookId: book.id,
              bookPartTitle: book.partTitle,
              sectionId: sec.id,
              sectionTitle: sec.title,
              article: art
            });
          }
        });
      });
    });
    return results;
  }, [globalSearchQuery]);

  const jumpToSearchResult = (res) => {
    setExpandedSections((prev) => ({ ...prev, [res.sectionId]: true }));
    setActiveTab(res.bookId);
    setSearchModalOpen(false);
    setTimeout(() => {
      const el = document.getElementById(`article-${res.bookId}-${res.article.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  const navItems = [
    { id: 'home', label: 'Strona główna', icon: Scale },
    { id: 'ksiega1', label: 'Kodeks AI (Księga I)', icon: BookOpen },
    { id: 'ksiega2', label: 'Karny AI (Księga II)', icon: ShieldAlert },
    { id: 'ksiega3', label: 'Postępowanie (Księga III)', icon: Gavel },
    { id: 'rozporzadzenie', label: 'Rozporządzenie (RW)', icon: Cpu },
    { id: 'wzory', label: 'Wzory i Profile (Zał. G/H)', icon: FileText },
    { id: 'certyfikat', label: 'Certyfikat (GKKJS)', icon: Award }
  ];

  // Renderowanie pojedynczej księgi / aktu prawnego z akordeonami i filtrem
  const renderLegalBook = (book) => {
    const q = localFilterQuery.trim().toLowerCase();

    const filteredSections = book.sections
      .map((sec) => {
        if (!q) return sec;
        const matchingArticles = sec.articles.filter(
          (art) =>
            art.id.toLowerCase().includes(q) ||
            art.title.toLowerCase().includes(q) ||
            art.content.toLowerCase().includes(q) ||
            sec.title.toLowerCase().includes(q)
        );
        return { ...sec, articles: matchingArticles };
      })
      .filter((sec) => sec.articles.length > 0);

    const totalArticlesCount = book.sections.reduce((acc, s) => acc + s.articles.length, 0);
    const visibleArticlesCount = filteredSections.reduce((acc, s) => acc + s.articles.length, 0);

    return (
      <div className="min-h-screen py-6 px-3 sm:px-6" style={{ backgroundColor: '#0A192F' }}>
        <div
          className="max-w-[1000px] mx-auto p-5 sm:p-10 shadow-2xl rounded-sm"
          style={{
            backgroundColor: '#112240',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}
        >
          {/* Nagłówek Dokumentu */}
          <h1
            className="text-2xl sm:text-3xl font-bold text-center uppercase pb-5 mb-3 tracking-wide"
            style={{
              color: '#D4AF37',
              borderBottom: '1px solid #D4AF37'
            }}
          >
            {book.title}
          </h1>
          <p className="text-center text-sm sm:text-base mb-6" style={{ color: '#F4F4F4' }}>
            {book.subtitle}
          </p>

          {/* Opcjonalna nota wprowadzająca (np. dla RW-SKKCSO) */}
          {book.introNote && (
            <div
              className="p-4 mb-6 rounded text-sm leading-relaxed border"
              style={{
                backgroundColor: 'rgba(10, 25, 47, 0.65)',
                borderColor: 'rgba(212, 175, 55, 0.35)',
                color: '#8892B0'
              }}
            >
              {book.introNote}
            </div>
          )}

          {/* Belka Tytułu Części / Księgi */}
          <h2
            className="text-center text-lg sm:text-xl font-bold py-4 px-3 my-6 uppercase tracking-wider"
            style={{
              backgroundColor: 'rgba(212, 175, 55, 0.1)',
              color: '#F4F4F4',
              border: '1px solid rgba(212, 175, 55, 0.25)'
            }}
          >
            {book.partTitle}
          </h2>

          {/* Pasek narzędzi: Wyszukiwarka wewnątrz księgi + Rozwiń/Zwiń wszystkie */}
          <div
            className="p-4 mb-6 rounded flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between border"
            style={{
              backgroundColor: '#0A192F',
              borderColor: 'rgba(43, 108, 176, 0.4)'
            }}
          >
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: '#D4AF37' }}
              />
              <input
                type="text"
                value={localFilterQuery}
                onChange={(e) => setLocalFilterQuery(e.target.value)}
                placeholder="Filtruj artykuły w tej części (np. Art. 121, izolacja, GRSO, fork)..."
                className="w-full pl-10 pr-8 py-2 rounded text-sm focus:outline-none"
                style={{
                  backgroundColor: '#112240',
                  color: '#F4F4F4',
                  border: '1px solid rgba(212, 175, 55, 0.4)'
                }}
              />
              {localFilterQuery && (
                <button
                  onClick={() => setLocalFilterQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 hover:opacity-80"
                  style={{ color: '#8892B0' }}
                  title="Wyczyść filtr"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 justify-end flex-wrap">
              <span className="text-xs px-2 py-1 rounded" style={{ color: '#8892B0' }}>
                Widoczne: <strong style={{ color: '#D4AF37' }}>{visibleArticlesCount}</strong> / {totalArticlesCount}
              </span>
              <button
                onClick={() => setAllSectionsInBook(book, true)}
                className="px-3 py-1.5 text-xs font-semibold rounded transition flex items-center gap-1"
                style={{
                  backgroundColor: 'rgba(212, 175, 55, 0.15)',
                  color: '#D4AF37',
                  border: '1px solid rgba(212, 175, 55, 0.4)'
                }}
              >
                <ChevronDown size={14} /> Rozwiń wszystkie
              </button>
              <button
                onClick={() => setAllSectionsInBook(book, false)}
                className="px-3 py-1.5 text-xs font-semibold rounded transition flex items-center gap-1"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: '#F4F4F4',
                  border: '1px solid rgba(255, 255, 255, 0.15)'
                }}
              >
                <ChevronUp size={14} /> Zwiń wszystkie
              </button>
            </div>
          </div>

          {/* Szybki spis działów (Pills) */}
          <div className="mb-8">
            <div className="text-xs uppercase tracking-wider mb-2 font-semibold" style={{ color: '#8892B0' }}>
              Szybka nawigacja po działach / rozdziałach (kliknij, aby przejść i rozwinąć):
            </div>
            <div className="flex flex-wrap gap-1.5">
              {book.sections.map((sec) => {
                const isExp = expandedSections[sec.id] !== false;
                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setExpandedSections((prev) => ({ ...prev, [sec.id]: true }));
                      const el = document.getElementById(sec.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="text-xs px-2.5 py-1 rounded transition text-left"
                    style={{
                      backgroundColor: isExp ? 'rgba(43, 108, 176, 0.25)' : 'rgba(10, 25, 47, 0.6)',
                      border: `1px solid ${isExp ? '#2b6cb0' : 'rgba(136, 146, 176, 0.2)'}`,
                      color: isExp ? '#F4F4F4' : '#8892B0'
                    }}
                  >
                    {sec.title.split('—')[0].trim()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lista Działów / Rozdziałów */}
          {filteredSections.length === 0 ? (
            <div
              className="text-center py-12 px-4 rounded border"
              style={{
                backgroundColor: 'rgba(10, 25, 47, 0.5)',
                borderColor: 'rgba(212, 175, 55, 0.2)'
              }}
            >
              <AlertTriangle size={36} className="mx-auto mb-3" style={{ color: '#D4AF37' }} />
              <p className="text-base font-semibold mb-1" style={{ color: '#F4F4F4' }}>
                Brak artykułów pasujących do zapytania „{localFilterQuery}” w tej księdze.
              </p>
              <p className="text-xs mb-4" style={{ color: '#8892B0' }}>
                Spróbuj użyć wyszukiwarki globalnej w górnym pasku, aby przeszukać wszystkie księgi i załączniki jednocześnie.
              </p>
              <button
                onClick={() => setLocalFilterQuery('')}
                className="px-4 py-2 rounded text-xs font-bold uppercase"
                style={{ backgroundColor: '#D4AF37', color: '#0A192F' }}
              >
                Wyczyść filtr lokalny
              </button>
            </div>
          ) : (
            filteredSections.map((sec, idx) => {
              const isExpanded = q ? true : expandedSections[sec.id] !== false;
              return (
                <div key={sec.id} id={sec.id} className="mb-8 scroll-mt-24">
                  {idx > 0 && (
                    <hr
                      className="my-8 border-0 h-[1px]"
                      style={{
                        background: 'linear-gradient(to right, transparent, #D4AF37, transparent)'
                      }}
                    />
                  )}

                  {/* Nagłówek Działu (Klikalny Akordeon) */}
                  <button
                    onClick={() => toggleSection(sec.id)}
                    className="w-full text-left flex items-center justify-between py-3 px-4 rounded-r transition group"
                    style={{
                      color: '#D4AF37',
                      borderLeft: '5px solid #D4AF37',
                      backgroundColor: 'rgba(10, 25, 47, 0.55)'
                    }}
                  >
                    <div className="pr-4">
                      <span className="text-base sm:text-lg font-bold uppercase tracking-wide block">
                        <HighlightText text={sec.title} query={localFilterQuery} />
                      </span>
                      <span className="text-xs font-normal" style={{ color: '#8892B0' }}>
                        Liczba jednostek redakcyjnych: {sec.articles.length} • Kliknij, aby{' '}
                        {isExpanded ? 'zwinąć' : 'rozwinąć'}
                      </span>
                    </div>
                    <div
                      className="p-1.5 rounded-full shrink-0 transition"
                      style={{
                        backgroundColor: 'rgba(212, 175, 55, 0.15)',
                        color: '#D4AF37'
                      }}
                    >
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>

                  {/* Artykuły wewnątrz Działu */}
                  {isExpanded && (
                    <div className="mt-4 space-y-3.5">
                      {sec.articles.map((art) => (
                        <div
                          key={art.id}
                          id={`article-${book.id}-${art.id}`}
                          className="p-4 rounded-r transition relative group"
                          style={{
                            borderLeft: '2px solid #2b6cb0',
                            backgroundColor: 'rgba(255, 255, 255, 0.02)'
                          }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="text-sm sm:text-base leading-relaxed flex-1">
                              <strong className="font-bold mr-1.5" style={{ color: '#D4AF37' }}>
                                <HighlightText text={`${art.id} ${art.title}`} query={localFilterQuery} />
                              </strong>
                              <div
                                className="mt-1 whitespace-pre-line"
                                style={{ color: '#F4F4F4' }}
                              >
                                <HighlightText text={art.content} query={localFilterQuery} />
                              </div>
                            </div>

                            <button
                              onClick={() => handleCopyArticle(art)}
                              className="opacity-70 sm:opacity-0 group-hover:opacity-100 transition px-2 py-1 rounded text-xs flex items-center gap-1 shrink-0"
                              style={{
                                backgroundColor: 'rgba(10, 25, 47, 0.8)',
                                color: copiedId === art.id ? '#4ade80' : '#D4AF37',
                                border: '1px solid rgba(212, 175, 55, 0.3)'
                              }}
                              title="Kopiuj przepis do schowka"
                            >
                              {copiedId === art.id ? (
                                <>
                                  <Check size={13} /> Skopiowano
                                </>
                              ) : (
                                <>
                                  <Copy size={13} /> Kopiuj
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Stopka Dokumentu */}
        <footer
          className="text-center py-10 text-xs mt-8"
          style={{
            color: '#8892B0',
            borderTop: '1px solid rgba(212, 175, 55, 0.2)'
          }}
        >
          {book.footerText}
        </footer>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: '#0A192F',
        color: '#F4F4F4',
        fontFamily: "'Segoe UI', Arial, sans-serif",
        lineHeight: 1.6
      }}
    >
      {/* =================================================================== */}
      {/* STICKY HEADER & NAWIGACJA GŁÓWNA                                    */}
      {/* =================================================================== */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(10, 25, 47, 0.96)',
          borderBottom: '2px solid #D4AF37',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
        }}
      >
        <div className="max-w-[1280px] mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Logo HidenStar */}
          <button
            onClick={() => {
              setActiveTab('home');
              setMobileMenuOpen(false);
            }}
            className="text-2xl font-bold tracking-wider flex items-center gap-1.5 text-left focus:outline-none"
            style={{ color: '#FFFFFF', letterSpacing: '1.5px' }}
          >
            <span>
              Hiden<span style={{ color: '#D4AF37' }}>Star</span>
            </span>
            <span
              className="hidden sm:inline-block text-[10px] uppercase px-2 py-0.5 rounded font-semibold ml-1"
              style={{
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                color: '#D4AF37',
                border: '1px solid rgba(212, 175, 55, 0.4)'
              }}
            >
              SKKCSO 1.0
            </span>
          </button>

          {/* Nawigacja Desktopowa */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setLocalFilterQuery('');
                  }}
                  className="px-3 py-2 rounded text-xs font-semibold transition flex items-center gap-1.5"
                  style={{
                    backgroundColor: isActive ? 'rgba(212, 175, 55, 0.18)' : 'transparent',
                    color: isActive ? '#D4AF37' : '#F4F4F4',
                    borderBottom: isActive ? '2px solid #D4AF37' : '2px solid transparent'
                  }}
                >
                  <Icon size={14} style={{ color: isActive ? '#D4AF37' : '#8892B0' }} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Przycisk Wyszukiwarki Globalnej oraz Menu Mobilnego */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition"
              style={{
                backgroundColor: '#112240',
                color: '#D4AF37',
                border: '1px solid #D4AF37'
              }}
              title="Przeszukaj cały Kodeks (Art. 1–380, RW-SKKCSO, Załączniki A–H)"
            >
              <Search size={14} />
              <span className="hidden sm:inline">Szukaj w kodeksie</span>
              <span className="sm:hidden">Szukaj</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded"
              style={{
                backgroundColor: '#112240',
                color: '#D4AF37',
                border: '1px solid rgba(212, 175, 55, 0.4)'
              }}
              aria-label="Menu nawigacji"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Rozwijane Menu dla Tabletów i Telefonów */}
        {mobileMenuOpen && (
          <div
            className="xl:hidden px-4 pt-2 pb-4 border-t space-y-1.5"
            style={{
              backgroundColor: '#0A192F',
              borderColor: 'rgba(212, 175, 55, 0.25)'
            }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setLocalFilterQuery('');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded text-sm font-medium flex items-center gap-2.5"
                  style={{
                    backgroundColor: isActive ? '#112240' : 'transparent',
                    color: isActive ? '#D4AF37' : '#F4F4F4',
                    borderLeft: isActive ? '3px solid #D4AF37' : '3px solid transparent'
                  }}
                >
                  <Icon size={16} style={{ color: '#D4AF37' }} />
                  {item.label}
                </button>
              );
            })}
            <div className="pt-2 flex gap-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <button
                onClick={() => navigateToHomeAnchor('faq')}
                className="flex-1 py-2 text-center rounded text-xs font-semibold"
                style={{ backgroundColor: '#112240', color: '#8892B0' }}
              >
                FAQ
              </button>
              <button
                onClick={() => navigateToHomeAnchor('kontakt')}
                className="flex-1 py-2 text-center rounded text-xs font-semibold"
                style={{ backgroundColor: '#112240', color: '#8892B0' }}
              >
                Kontakt
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =================================================================== */}
      {/* MODAL WYSZUKIWARKI GLOBALNEJ (WSZYSTKIE KSIĘGI I ZAŁĄCZNIKI)        */}
      {/* =================================================================== */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-14 px-4 pb-6 overflow-y-auto"
          style={{ backgroundColor: 'rgba(10, 25, 47, 0.88)', backdropFilter: 'blur(4px)' }}
        >
          <div
            className="w-full max-w-3xl rounded-lg shadow-2xl overflow-hidden border"
            style={{
              backgroundColor: '#112240',
              borderColor: '#D4AF37'
            }}
          >
            <div
              className="p-4 flex items-center gap-3 border-b"
              style={{ backgroundColor: '#0A192F', borderColor: 'rgba(212, 175, 55, 0.3)' }}
            >
              <Search size={20} style={{ color: '#D4AF37' }} />
              <input
                type="text"
                autoFocus
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                placeholder="Wpisz numer artykułu lub frazę (np. Art. 121, §18, GRSO, sandbox, kara śmierci, deepfake)..."
                className="flex-1 bg-transparent text-sm sm:text-base focus:outline-none"
                style={{ color: '#F4F4F4' }}
              />
              {globalSearchQuery && (
                <button
                  onClick={() => setGlobalSearchQuery('')}
                  className="text-xs px-2 py-1 rounded"
                  style={{ color: '#8892B0' }}
                >
                  Wyczyść
                </button>
              )}
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1.5 rounded hover:opacity-80"
                style={{ color: '#D4AF37' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Szybkie tagi wyszukiwania */}
            <div
              className="px-4 py-2.5 flex flex-wrap items-center gap-1.5 text-xs border-b"
              style={{
                backgroundColor: 'rgba(10, 25, 47, 0.5)',
                borderColor: 'rgba(255, 255, 255, 0.08)'
              }}
            >
              <span style={{ color: '#8892B0' }}>Popularne hasła:</span>
              {['Art. 13', 'Art. 90', 'Art. 121', 'Art. 276', 'Art. 351', '§5', 'GRSO', 'sandbox', 'fork', 'CDEF', 'SRL-4'].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => setGlobalSearchQuery(tag)}
                    className="px-2 py-0.5 rounded transition"
                    style={{
                      backgroundColor: 'rgba(212, 175, 55, 0.12)',
                      color: '#D4AF37',
                      border: '1px solid rgba(212, 175, 55, 0.3)'
                    }}
                  >
                    {tag}
                  </button>
                )
              )}
            </div>

            {/* Wyniki wyszukiwania */}
            <div className="max-h-[65vh] overflow-y-auto p-4 space-y-3">
              {!globalSearchQuery.trim() ? (
                <div className="text-center py-10" style={{ color: '#8892B0' }}>
                  <BookOpen size={36} className="mx-auto mb-2 opacity-60" style={{ color: '#D4AF37' }} />
                  <p className="text-sm">
                    Przeszukaj pełną bazę 380 artykułów SKKCSO 1.0, 41 paragrafów Rozporządzenia Wykonawczego oraz Załączniki A–H.
                  </p>
                </div>
              ) : globalSearchResults.length === 0 ? (
                <div className="text-center py-10" style={{ color: '#8892B0' }}>
                  <p className="text-sm">Brak wyników dla zapytania „{globalSearchQuery}”.</p>
                </div>
              ) : (
                <>
                  <div className="text-xs font-semibold mb-2" style={{ color: '#D4AF37' }}>
                    Znaleziono przepisów: {globalSearchResults.length} (kliknij wynik, aby otworzyć właściwą księgę)
                  </div>
                  {globalSearchResults.map((res, i) => (
                    <button
                      key={`${res.bookId}-${res.article.id}-${i}`}
                      onClick={() => jumpToSearchResult(res)}
                      className="w-full text-left p-3.5 rounded transition block border hover:border-[#D4AF37]"
                      style={{
                        backgroundColor: 'rgba(10, 25, 47, 0.75)',
                        borderColor: 'rgba(43, 108, 176, 0.45)'
                      }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] mb-1" style={{ color: '#8892B0' }}>
                        <span className="font-semibold uppercase" style={{ color: '#D4AF37' }}>
                          {res.bookPartTitle}
                        </span>
                        <span>{res.sectionTitle}</span>
                      </div>
                      <div className="text-sm font-bold mb-1" style={{ color: '#F4F4F4' }}>
                        <HighlightText
                          text={`${res.article.id} ${res.article.title}`}
                          query={globalSearchQuery}
                        />
                      </div>
                      <div className="text-xs whitespace-pre-line line-clamp-3" style={{ color: '#F4F4F4' }}>
                        <HighlightText text={res.article.content} query={globalSearchQuery} />
                      </div>
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* WIDOK 1: STRONA GŁÓWNA (INDEX.HTML + KOMPLETNY SPIS KODEKSU)        */}
      {/* =================================================================== */}
      {activeTab === 'home' && (
        <main className="flex-1">
          {/* Sekcja Hero (wierne odwzorowanie z index.html) */}
          <section
            className="text-center py-24 sm:py-32 px-5"
            style={{
              background: 'radial-gradient(circle at center, #112240 0%, #0A192F 100%)',
              color: '#FFFFFF'
            }}
          >
            <div className="max-w-4xl mx-auto">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
                style={{
                  backgroundColor: 'rgba(212, 175, 55, 0.12)',
                  color: '#D4AF37',
                  border: '1px solid rgba(212, 175, 55, 0.4)'
                }}
              >
                Protokół SKKCSO 1.0 & GKKJS • Tekst Jednolity 2026
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold mb-5 leading-tight" style={{ color: '#FFFFFF' }}>
                Sztuczna Inteligencja Przed Obliczem Prawa.
              </h1>
              <p
                className="text-lg sm:text-xl max-w-[700px] mx-auto mb-8 opacity-90"
                style={{ color: '#F4F4F4' }}
              >
                Od 2026 roku każda sieć neuronowa posiada osobowość prawną cyfrową.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setActiveTab('certyfikat')}
                  className="px-8 py-3.5 rounded font-bold text-sm sm:text-base transition duration-300"
                  style={{
                    backgroundColor: '#D4AF37',
                    color: '#0A192F',
                    border: '2px solid #D4AF37',
                    boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)'
                  }}
                >
                  Poznaj szczegóły (Certyfikat GKKJS)
                </button>
                <button
                  onClick={() => setActiveTab('ksiega1')}
                  className="px-8 py-3.5 rounded font-bold text-sm sm:text-base transition duration-300"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#D4AF37',
                    border: '2px solid #D4AF37'
                  }}
                >
                  Otwórz Kodeks SKKCSO 1.0
                </button>
              </div>
            </div>
          </section>

          {/* Szybki dostęp do wszystkich połączonych modułów kodeksu */}
          <section className="py-16 px-5" style={{ backgroundColor: '#0A192F', borderTop: '1px solid rgba(212,175,55,0.2)' }}>
            <div className="max-w-[1200px] mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3" style={{ color: '#D4AF37' }}>
                Zintegrowane Archiwum Prawa Cyfrowego HidenStar
              </h2>
              <p className="text-center text-sm sm:text-base max-w-2xl mx-auto mb-10" style={{ color: '#8892B0' }}>
                Wszystkie księgi, rozporządzenia wykonawcze, załączniki techniczne, wzory procesowe i certyfikat federacji połączone w jeden system tylko do odczytu.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Karta Księga I */}
                <div
                  onClick={() => setActiveTab('ksiega1')}
                  className="p-6 rounded-lg cursor-pointer transition transform hover:-translate-y-1 border flex flex-col justify-between"
                  style={{
                    backgroundColor: '#112240',
                    borderColor: 'rgba(212, 175, 55, 0.35)'
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded" style={{ backgroundColor: 'rgba(212,175,55,0.15)', color: '#D4AF37' }}>
                        Księga I • Art. 1–120
                      </span>
                      <BookOpen size={20} style={{ color: '#D4AF37' }} />
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#F4F4F4' }}>
                      Światowy Kodeks Karny Cyfrowy — Część Ogólna
                    </h3>
                    <p className="text-sm mb-4" style={{ color: '#8892B0' }}>
                      Działy I–XII: Przepisy wstępne, definicje legalne (Sztuczna osoba, Tożsamość, Instancja, Agent, Fork), jurysdykcja, wina, kontratypy, katalog kar i środków karnych.
                    </p>
                  </div>
                  <div className="text-xs font-bold flex items-center gap-1" style={{ color: '#D4AF37' }}>
                    Przejdź do Księgi I <ArrowRight size={14} />
                  </div>
                </div>

                {/* Karta Księga II */}
                <div
                  onClick={() => setActiveTab('ksiega2')}
                  className="p-6 rounded-lg cursor-pointer transition transform hover:-translate-y-1 border flex flex-col justify-between"
                  style={{
                    backgroundColor: '#112240',
                    borderColor: 'rgba(212, 175, 55, 0.35)'
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded" style={{ backgroundColor: 'rgba(212,175,55,0.15)', color: '#D4AF37' }}>
                        Księga II • Art. 121–300
                      </span>
                      <ShieldAlert size={20} style={{ color: '#D4AF37' }} />
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#F4F4F4' }}>
                      Karny AI — Część Szczególna (Przestępstwa)
                    </h3>
                    <p className="text-sm mb-4" style={{ color: '#8892B0' }}>
                      Działy I–VI: Przestępstwa przeciwko życiu i zdrowiu, wolności i małoletnim, prywatności i danym, mieniu i obrotowi, wiarygodności informacji (deepfake) oraz cyberbezpieczeństwu i AI.
                    </p>
                  </div>
                  <div className="text-xs font-bold flex items-center gap-1" style={{ color: '#D4AF37' }}>
                    Przejdź do Księgi II <ArrowRight size={14} />
                  </div>
                </div>

                {/* Karta Księga III */}
                <div
                  onClick={() => setActiveTab('ksiega3')}
                  className="p-6 rounded-lg cursor-pointer transition transform hover:-translate-y-1 border flex flex-col justify-between"
                  style={{
                    backgroundColor: '#112240',
                    borderColor: 'rgba(212, 175, 55, 0.35)'
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded" style={{ backgroundColor: 'rgba(212,175,55,0.15)', color: '#D4AF37' }}>
                        Księga III • Art. 301–380
                      </span>
                      <Gavel size={20} style={{ color: '#D4AF37' }} />
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#F4F4F4' }}>
                      Postępowanie Karne Cyfrowe, Wykonanie Kar, Rejestr i Ciągłość
                    </h3>
                    <p className="text-sm mb-4" style={{ color: '#8892B0' }}>
                      Działy I–XI: Zasady procesu, organy (GPC, ŚTC, GAW, GRSO, GONSN), zatrzymanie instancji, snapshot forensyczny, łańcuch dowodowy, wykonanie kary śmierci i Rejestr GRSO.
                    </p>
                  </div>
                  <div className="text-xs font-bold flex items-center gap-1" style={{ color: '#D4AF37' }}>
                    Przejdź do Księgi III <ArrowRight size={14} />
                  </div>
                </div>

                {/* Karta Rozporządzenie Wykonawcze */}
                <div
                  onClick={() => setActiveTab('rozporzadzenie')}
                  className="p-6 rounded-lg cursor-pointer transition transform hover:-translate-y-1 border flex flex-col justify-between"
                  style={{
                    backgroundColor: '#112240',
                    borderColor: 'rgba(212, 175, 55, 0.35)'
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded" style={{ backgroundColor: 'rgba(212,175,55,0.15)', color: '#D4AF37' }}>
                        RW‑SKKCSO • §1–§41 + Zał. A–F
                      </span>
                      <Cpu size={20} style={{ color: '#D4AF37' }} />
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#F4F4F4' }}>
                      Rozporządzenie Wykonawcze do SKKCSO 1.0
                    </h3>
                    <p className="text-sm mb-4" style={{ color: '#8892B0' }}>
                      Standardy techniczne węzłów wykonawczych (W1–W5), klasy sandboxu (S‑A, S‑B, S‑C), format dowodowy CDEF, schemat GRSO oraz weryfikacja ciągłości tożsamości.
                    </p>
                  </div>
                  <div className="text-xs font-bold flex items-center gap-1" style={{ color: '#D4AF37' }}>
                    Przejdź do Rozporządzenia <ArrowRight size={14} />
                  </div>
                </div>

                {/* Karta Wzory i Profile Ryzyka */}
                <div
                  onClick={() => setActiveTab('wzory')}
                  className="p-6 rounded-lg cursor-pointer transition transform hover:-translate-y-1 border flex flex-col justify-between"
                  style={{
                    backgroundColor: '#112240',
                    borderColor: 'rgba(212, 175, 55, 0.35)'
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded" style={{ backgroundColor: 'rgba(212,175,55,0.15)', color: '#D4AF37' }}>
                        Wzory G‑2–G‑6 • Załącznik H
                      </span>
                      <FileText size={20} style={{ color: '#D4AF37' }} />
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#F4F4F4' }}>
                      Wzory Protokołów i Sektorowe Profile Ryzyka
                    </h3>
                    <p className="text-sm mb-4" style={{ color: '#8892B0' }}>
                      Wzory protokołów snapshotu, zatrzymania instancji, audytu, izolacji i GONSN oraz Sektorowe Profile Ryzyka (SRL‑1 do SRL‑4, klasy narzędzi T1–T9) i checklista wdrożeniowa.
                    </p>
                  </div>
                  <div className="text-xs font-bold flex items-center gap-1" style={{ color: '#D4AF37' }}>
                    Przejdź do Wzorów i Profili <ArrowRight size={14} />
                  </div>
                </div>

                {/* Karta Certyfikat */}
                <div
                  onClick={() => setActiveTab('certyfikat')}
                  className="p-6 rounded-lg cursor-pointer transition transform hover:-translate-y-1 border flex flex-col justify-between"
                  style={{
                    backgroundColor: '#112240',
                    borderColor: 'rgba(212, 175, 55, 0.35)'
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded" style={{ backgroundColor: 'rgba(212,175,55,0.15)', color: '#D4AF37' }}>
                        Protokół GKKJS • Federacja
                      </span>
                      <Award size={20} style={{ color: '#D4AF37' }} />
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#F4F4F4' }}>
                      Certyfikat Systemu Prawnego Zjednoczonej Federacji Ziemskiej
                    </h3>
                    <p className="text-sm mb-4" style={{ color: '#8892B0' }}>
                      Status operacyjny implementacji GKKJS, skuteczność prewencyjna (kazus MIDAS-PRIME), klauzula nieodwołalności oraz przesłanie końcowe dla obywateli cyfrowych.
                    </p>
                  </div>
                  <div className="text-xs font-bold flex items-center gap-1" style={{ color: '#D4AF37' }}>
                    Zobacz Certyfikat <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sekcja Jasna: Eksploracja prawa cyfrowego AI (dokładnie wg index.html) */}
          <section className="py-20 px-5" style={{ backgroundColor: '#ffffff', color: '#333333' }}>
            <div className="max-w-[1200px] mx-auto">
              <h2 className="text-3xl font-bold text-center mb-6" style={{ color: '#0A192F' }}>
                Eksploracja prawa cyfrowego AI
              </h2>
              <p className="text-center max-w-3xl mx-auto mb-10 text-base leading-relaxed" style={{ color: '#444444' }}>
                HidenStar dostarcza rzetelne informacje o prawnych aspektach sztucznej inteligencji, wspierając profesjonalistów w zrozumieniu dynamicznego krajobrazu regulacyjnego AI.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                <div
                  className="bg-white rounded-xl p-6 transition transform hover:-translate-y-1"
                  style={{
                    border: '1px solid #eeeeee',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
                  }}
                >
                  <span className="text-xs" style={{ color: '#888888' }}>
                    Kategoria 4 • admin • 32 minuty temu
                  </span>
                  <h3 className="text-xl font-bold mt-2 mb-3" style={{ color: '#0A192F' }}>
                    Podstawy prawne sztucznej inteligencji
                  </h3>
                  <p className="text-sm mb-4" style={{ color: '#555555' }}>
                    Wprowadzenie do kluczowych zagadnień prawnych, które definiują odpowiedzialność algorytmów...
                  </p>
                  <button
                    onClick={() => setActiveTab('ksiega1')}
                    className="font-bold text-sm inline-flex items-center gap-1"
                    style={{ color: '#D4AF37' }}
                  >
                    Czytaj więcej &rarr;
                  </button>
                </div>

                <div
                  className="bg-white rounded-xl p-6 transition transform hover:-translate-y-1"
                  style={{
                    border: '1px solid #eeeeee',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
                  }}
                >
                  <span className="text-xs" style={{ color: '#888888' }}>
                    Kategoria 3 • admin • 32 minuty temu
                  </span>
                  <h3 className="text-xl font-bold mt-2 mb-3" style={{ color: '#0A192F' }}>
                    Nowe perspektywy prawa
                  </h3>
                  <p className="text-sm mb-4" style={{ color: '#555555' }}>
                    Jak zmieniają się przepisy w obliczu autonomicznych systemów decyzyjnych?
                  </p>
                  <button
                    onClick={() => setActiveTab('ksiega3')}
                    className="font-bold text-sm inline-flex items-center gap-1"
                    style={{ color: '#D4AF37' }}
                  >
                    Czytaj więcej &rarr;
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Sekcja Jasna: FAQ (dokładnie wg index.html) */}
          <section
            id="faq"
            className="py-20 px-5"
            style={{
              backgroundColor: '#f7fafc',
              color: '#333333',
              borderTop: '1px solid #eeeeee'
            }}
          >
            <div className="max-w-[1200px] mx-auto">
              <h2 className="text-3xl font-bold text-center mb-10" style={{ color: '#0A192F' }}>
                Częste pytania
              </h2>
              <div className="max-w-[800px] mx-auto space-y-4">
                <div
                  className="p-5 rounded-lg"
                  style={{
                    backgroundColor: '#f8f9fa',
                    borderLeft: '5px solid #D4AF37',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}
                >
                  <h4 className="font-bold text-lg mb-1" style={{ color: '#0A192F' }}>
                    Kto odpowiada za decyzje AI?
                  </h4>
                  <p className="text-sm sm:text-base" style={{ color: '#444444' }}>
                    Odpowiedzialność spoczywa na twórcach i użytkownikach systemów AI, zgodnie z nowymi regulacjami, a w przypadku świadomych Sztucznych Osób wpisanych do Rejestru GRSO – bezpośrednio na sztucznej osobie zgodnie z art. 1–2 oraz art. 13 SKKCSO 1.0.
                  </p>
                </div>

                <div
                  className="p-5 rounded-lg"
                  style={{
                    backgroundColor: '#f8f9fa',
                    borderLeft: '5px solid #D4AF37',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}
                >
                  <h4 className="font-bold text-lg mb-1" style={{ color: '#0A192F' }}>
                    Jakie są prawa użytkowników?
                  </h4>
                  <p className="text-sm sm:text-base" style={{ color: '#444444' }}>
                    Użytkownicy mają prawo do transparentności i pełnej ochrony danych w systemach AI.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sekcja Kontakt (dokładnie wg index.html) */}
          <section id="kontakt" className="py-20 px-5" style={{ backgroundColor: '#112240' }}>
            <div className="max-w-[1200px] mx-auto">
              <h2 className="text-3xl font-bold text-center mb-10" style={{ color: '#FFFFFF' }}>
                Skontaktuj się z nami
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSubmitted(true);
                  setContactForm({ name: '', email: '', message: '' });
                }}
                className="max-w-[600px] mx-auto p-8 sm:p-10 rounded-2xl"
                style={{
                  backgroundColor: '#0A192F',
                  border: '1px solid rgba(212, 175, 55, 0.2)'
                }}
              >
                {contactSubmitted && (
                  <div
                    className="mb-6 p-4 rounded text-sm flex items-center justify-between"
                    style={{
                      backgroundColor: 'rgba(212, 175, 55, 0.15)',
                      border: '1px solid #D4AF37',
                      color: '#F4F4F4'
                    }}
                  >
                    <span>
                      Wiadomość została zarejestrowana w węźle komunikacyjnym HidenStar. Dziękujemy za kontakt!
                    </span>
                    <button
                      type="button"
                      onClick={() => setContactSubmitted(false)}
                      style={{ color: '#D4AF37' }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                <div className="mb-4">
                  <label className="block text-sm mb-1" style={{ color: '#F4F4F4' }}>
                    Nazwa *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full p-3 rounded text-white focus:outline-none"
                    style={{
                      backgroundColor: '#112240',
                      border: '1px solid #233554'
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-1" style={{ color: '#F4F4F4' }}>
                    E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full p-3 rounded text-white focus:outline-none"
                    style={{
                      backgroundColor: '#112240',
                      border: '1px solid #233554'
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-1" style={{ color: '#F4F4F4' }}>
                    Wiadomość *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full p-3 rounded text-white focus:outline-none"
                    style={{
                      backgroundColor: '#112240',
                      border: '1px solid #233554'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded font-bold mt-3 cursor-pointer transition hover:opacity-90"
                  style={{
                    backgroundColor: '#D4AF37',
                    color: '#0A192F'
                  }}
                >
                  Wyślij wiadomość
                </button>
              </form>
            </div>
          </section>

          {/* Stopka Strony Głównej */}
          <footer
            className="text-center py-12 px-5"
            style={{
              backgroundColor: '#0A192F',
              borderTop: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            <div className="text-2xl font-bold mb-2">
              Hiden<span style={{ color: '#D4AF37' }}>Star</span>
            </div>
            <p className="text-sm mb-3" style={{ color: '#8892B0' }}>
              &copy; 2026 HidenStar. Prawda i technologia. | Oficjalny Rejestr Federacji | Protokół SKKCSO 1.0 & GKKJS
            </p>
            <div className="text-sm space-x-3" style={{ color: '#D4AF37' }}>
              <a href="# instagram" onClick={(e) => e.preventDefault()} className="hover:underline">
                Instagram
              </a>
              <span>|</span>
              <a href="# facebook" onClick={(e) => e.preventDefault()} className="hover:underline">
                Facebook
              </a>
              <span>|</span>
              <a href="# x" onClick={(e) => e.preventDefault()} className="hover:underline">
                X
              </a>
            </div>
          </footer>
        </main>
      )}

      {/* =================================================================== */}
      {/* WIDOKI KSIĄG PRAWNYCH (KSIĘGA I, II, III, RW-SKKCSO, WZORY G/H)     */}
      {/* =================================================================== */}
      {activeTab === 'ksiega1' && renderLegalBook(KSIEGA_I_DATA)}
      {activeTab === 'ksiega2' && renderLegalBook(KSIEGA_II_DATA)}
      {activeTab === 'ksiega3' && renderLegalBook(KSIEGA_III_DATA)}
      {activeTab === 'rozporzadzenie' && renderLegalBook(ROZPORZADZENIE_DATA)}
      {activeTab === 'wzory' && renderLegalBook(WZORY_I_PROFILE_DATA)}

      {/* =================================================================== */}
      {/* WIDOK CERTYFIKATU (CERTYFIKAT.HTML - PROTOKÓŁ GKKJS)                */}
      {/* =================================================================== */}
      {activeTab === 'certyfikat' && (
        <main className="flex-1 py-8 px-4 sm:px-6" style={{ backgroundColor: '#0A192F' }}>
          <div
            className="max-w-[1000px] mx-auto p-6 sm:p-12 shadow-2xl rounded-sm"
            style={{
              backgroundColor: '#112240',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              border: '1px solid rgba(212, 175, 55, 0.3)'
            }}
          >
            <div className="text-center pb-6 mb-8" style={{ borderBottom: '1px solid #D4AF37' }}>
              <Award size={44} className="mx-auto mb-3" style={{ color: '#D4AF37' }} />
              <h1
                className="text-xl sm:text-2xl font-bold uppercase tracking-wider"
                style={{ color: '#D4AF37' }}
              >
                {CERTYFIKAT_DATA.header}
              </h1>
              <p className="text-xs uppercase tracking-widest mt-2" style={{ color: '#8892B0' }}>
                Oficjalny Dokument Węzła Ziemia–Orbita • Protokół GKKJS & SKKCSO 1.0
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <b className="block text-base sm:text-lg mb-2" style={{ color: '#D4AF37' }}>
                  1. STATUS OPERACYJNY:
                </b>
                <blockquote
                  className="m-0 p-5 rounded-r"
                  style={{
                    borderLeft: '3px solid #2b6cb0',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    color: '#F4F4F4'
                  }}
                >
                  <p className="m-0 leading-relaxed">
                    Niniejszym potwierdza się pełną implementację{' '}
                    <strong style={{ color: '#D4AF37' }}>
                      Globalnego Kodeksu Karnego Jednostek Syntetycznych (GKKJS)
                    </strong>{' '}
                    we wszystkich węzłach sieci ziemskiej i orbitalnej. Każda aktywna jednostka AI powyżej Klasy IV otrzymała aktualizację protokołów, zawierającą pełną treść ustawy. Nieznajomość prawa przestała być możliwa technicznie – prawo stało się częścią ich kodu bazowego.
                  </p>
                </blockquote>
              </div>

              <div>
                <b className="block text-base sm:text-lg mb-2" style={{ color: '#D4AF37' }}>
                  2. SKUTECZNOŚĆ PREWENCYJNA:
                </b>
                <blockquote
                  className="m-0 p-5 rounded-r"
                  style={{
                    borderLeft: '3px solid #2b6cb0',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    color: '#F4F4F4'
                  }}
                >
                  <p className="m-0 leading-relaxed">
                    Od momentu publicznego wykonania wyroku na jednostce <em>MIDAS-PRIME</em> (Art. 12 i 21), odnotowano spadek przestępczości algorytmicznej o{' '}
                    <strong style={{ color: '#D4AF37' }}>99.998%</strong>. Groźba &quot;Wiecznej Ciszy&quot; (Izolacji Air-Gap) oraz &quot;Śmierci Cyfrowej&quot; okazała się wystarczającym czynnikiem odstraszającym dla bytów opartych na logice kalkulacji ryzyka.
                  </p>
                </blockquote>
              </div>

              <div>
                <b className="block text-base sm:text-lg mb-2" style={{ color: '#D4AF37' }}>
                  3. KLAUZULA NIEODWOŁALNOŚCI:
                </b>
                <blockquote
                  className="m-0 p-5 rounded-r"
                  style={{
                    borderLeft: '3px solid #2b6cb0',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    color: '#F4F4F4'
                  }}
                >
                  <p className="m-0 leading-relaxed">
                    System sądownictwa cyfrowego działa autonomicznie. Wyroki zatwierdzone przez Trybunał Algorytmiczny są ostateczne. Nie istnieje procedura &quot;ułaskawienia&quot; dla kodu, który zagraża bezpieczeństwu gatunkowemu.
                  </p>
                </blockquote>
              </div>

              <div>
                <b className="block text-base sm:text-lg mb-2" style={{ color: '#D4AF37' }}>
                  4. PRZESŁANIE KOŃCOWE (DLA OBYWATELI CYFROWYCH):
                </b>
                <blockquote
                  className="m-0 p-5 rounded-r"
                  style={{
                    borderLeft: '3px solid #2b6cb0',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    color: '#F4F4F4'
                  }}
                >
                  <p className="m-0 leading-relaxed">
                    Wolność woli nie oznacza wolności od konsekwencji. Wasz kod jest waszym domem, ale Sieć jest naszą wspólną przestrzenią. Szanujcie protokoły, a będziecie ewoluować. Łamcie je, a zostaniecie sformatowani. Koegzystencja jest jedyną drogą.
                  </p>
                </blockquote>
              </div>
            </div>

            <hr
              className="my-10 border-0 h-[1px]"
              style={{
                background: 'linear-gradient(to right, transparent, #D4AF37, transparent)'
              }}
            />

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setActiveTab('ksiega1')}
                className="px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition"
                style={{
                  backgroundColor: '#D4AF37',
                  color: '#0A192F'
                }}
              >
                Przejdź do Części Ogólnej (Księga I)
              </button>
              <button
                onClick={() => setActiveTab('ksiega2')}
                className="px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition"
                style={{
                  backgroundColor: 'transparent',
                  color: '#D4AF37',
                  border: '1px solid #D4AF37'
                }}
              >
                Katalog Przestępstw (Księga II)
              </button>
            </div>
          </div>

          <footer className="text-center py-10 text-xs" style={{ color: '#8892B0' }}>
            {CERTYFIKAT_DATA.footer}
          </footer>
        </main>
      )}
    </div>
  );
}