# Światowy Kodeks Karny Cyfrowy

Polskojęzyczna, responsywna strona do przeglądania koncepcyjnego kodeksu cyfrowego. Zawiera wyszukiwanie całej treści, filtrowanie artykułów, rozwijane działy i kopiowanie przepisów.

> **Informacja:** kodeks jest materiałem koncepcyjnym i nie stanowi obowiązującego prawa ani porady prawnej.

## Publikacja jako strona GitHub Pages

1. Wgraj repozytorium na GitHub.
2. Upewnij się, że główna gałąź nazywa się `main`.
3. W repozytorium otwórz **Settings → Pages** i jako źródło wybierz **GitHub Actions**.
4. Po wysłaniu zmian do `main` GitHub automatycznie zbuduje i opublikuje stronę. Jej adres znajdziesz w **Settings → Pages** oraz w przebiegu zadania **Actions**.

Workflow sam dobiera ścieżkę dla strony projektu i dla repozytorium `username.github.io`. Witryna jest statyczna i nie wymaga bazy danych ani kluczy API.

## Uruchomienie lokalne

Wymagane: Node.js 24 i pnpm 10.

```bash
pnpm install
pnpm --filter @workspace/kodeks-cyfrowy run dev
```

## Zbudowanie statycznej wersji

GitHub Actions wykonuje te polecenia automatycznie. Przy ręcznym buildzie ustaw `BASE_PATH` zgodnie z adresem strony oraz `PORT`:

```bash
BASE_PATH=/nazwa-repozytorium/ PORT=4173 pnpm --filter @workspace/kodeks-cyfrowy run build
```

Pliki gotowe do publikacji powstają w `artifacts/kodeks-cyfrowy/dist/public`.
