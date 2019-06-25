# node.js-electron-template
Build cross platform desktop apps with Node.js , JavaScript, HTML, and CSS.

```
Exe installer x86 x64 compiler include ,
logs include.
one instance include.
icon include.
menu include
exe compile script include.
emit between windows include.
```

scripts:

```
npm run compile  - for compile the files
npm run start  - for start the project.
npm run dist - for make and exe x64 + x86 exe cross platform desktop app.
```

all your js files supposed to be under
app/js/babel.

main.js file is creating the electron app.
for use angular application you only need to create one and 
```
ng build --prod
```
and copy the files to app folders - the main.js already using the index.html

you can remove the jquery and use angular instead.

## Getting Started

In order to install the application clone the repo.

Open cmd at project root and type
```
npm i
```


### Prerequisites

```
* Node
```

global npm :
```
npm i -g @babel/cli
npm i -g @babel/core
npm i -g @babel/preset-env
npm i -g electron
npm i -g electron-packager
```


### Dev Installing

**Setting up a deveplopment env**

Clone this repo.
```
git clone https://github.com/bmatoki/node.js-electron-template.git
```

Install the node dependencies for each service.

```
npm i 

```

### coding style 

Each code addition must be in line with the eslint and tslint in the project.
Those extend the airbnb style guide.

## Deployment

To install a production ready application you can follow the [Dev Installing](#dev-installing) after installing/validating Prerequisites are met.

## Uninstalling

Uninstall steps:
 * node - simply delete the files.


## Built With

* node.js.
* electron

## To run the tests.

```
npm run test

```


## Authors

* Boaz Matoki
