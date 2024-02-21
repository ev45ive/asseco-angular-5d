node -v
v20.10.0

npm -v
10.2.3

# Git

git -v
git version 2.42.0.windows.2

git clone https://ev45ive@bitbucket.org/ev45ive/angular-asseco-5.git

Ctrl+Shift+P
Git:Clone
https://ev45ive@bitbucket.org/ev45ive/angular-asseco-5.git

Clone from URL
Select location
Open window

npm install

> node_modules ???

## Visual studio Code

Help -> About -> 1.86.0

## Terminal

Ctrl+~

## Angular CLI

npm i -g @angular/cli
ng version
ng help

ng generate --help
ng new --help

ng new asseco --ssr true --standalone false --directory '.'

--routing --style csss

## Powershell - running scritps disabled ...

> Terminal: Select Default Profile -> Git Bash
> [+] new terminal

# NPM + Semver

https://semver.org
https://semver.npmjs.com/

npm i // package.json + updates
npm ci // package-lock.json

# Update

https://update.angular.io/

## Devtools

https://angular.dev/tools/devtools

https://angular.dev/tools/language-service

## Extensions

Angular Language Service
https://marketplace.visualstudio.com/items?itemName=Angular.ng-template

Angular 10 Snippets - Mikael Morlund
https://marketplace.visualstudio.com/items?itemName=Mikael.Angular-BeastCode

Prettier
https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

Paste JSON as Code - quicktype
https://marketplace.visualstudio.com/items?itemName=quicktype.quicktyp

## UI Toolkits

- Angular Bootstrap
- Angular Material
- Angular Zorro

## Headless

- Bootstrap
- Tailwind
- Angular CDK

# Bootstrap

npm install bootstrap@5.3.3

# Spotifyt

gipewog618@elixirsd.com

## Schematics - generators

ng generate --help
ng generate component

## Playlists outline

ng g m playlists -m app --routing --route "playlists"

ng g c playlists/containers/playlists-view

ng g c playlists/components/playlist-list
ng g c playlists/components/playlist-detail
ng g c playlists/components/playlist-editor


## Shared module 

ng g m shared -m app
ng g p shared/pipes/yesno --export 