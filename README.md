# MFI CITY WEATHER FORECAST

## Description 

Nous vous proposons de développer cette petite application web fournissant un service météo très simple avec les technologies suivantes : React.js Typescript OpenLayers Yarn Docker

Voici les fonctionnalités minimum de cette application :

Afficher les emplacements des villes de Toulouse, Paris et Brest sur une carte

Pouvoir rechercher ces villes pour les afficher / zoomer rapidement sur la carte

Lors du clic sur l'emplacement d'une de ces villes afficher la température des 3 prochains jours (utiliser la valeur "daily>temp>day" fournie par l'API proposée ci-dessous)

Pour récupérer des prévisions météorologiques en temps réel vous pouvez utiliser cette API.
API doc https://openweathermap.org/api/one-call-api
NB : L'API est limité à 1000 appels / jour si vous rencontrez la limite n'hésitez pas à vous créer votre propre API key https://openweathermap.org/faq


### Déploiement : 
L'application doit être conteneurisée avec l'aide de Docker (un ou plusieurs conteneurs) et elle doit pouvoir être déployée très facilement sur n'importe quel environnement avec des commandes simples telles que:

- git clone du repository pour récupérer le code source

- docker compose up pour créer les images à partir de code source et lancer l'application


Le code source sera livré dans un repository Github public avec les explications nécessaires au bon déploiement.

## Installation with docker

- git clone project
- create a file ".env" from ".env.example"
- fill VITE_API_KEY variable
- run `docker compose up`
- go to `http://localhost:3000` or click on the uri in your terminal
- Enjoy !

## Installation in local

- git clone project
- create a file ".env" from ".env.example"
- fill VITE_API_KEY variable
- run `yarn` to install node_modules
- run `yarn dev`
- go to `http://localhost:8080` or click on the uri in your terminal
- Enjoy !


## Template Use: Mantine Vite template

### Features

This template comes with the following features:

- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)

### npm scripts

### Build and dev scripts

- `dev` – start development server
- `build` – build production version of the app
- `preview` – locally preview production build

#### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `vitest` – runs vitest tests
- `vitest:watch` – starts vitest watch
- `test` – runs `vitest`, `prettier:check`, `lint` and `typecheck` scripts

#### Other scripts

- `prettier:write` – formats all files with Prettier
