<img alt="cupcake-logo" src="http://funkyimg.com/i/2KN2G.png" width="350">

# Cupcake Sprinkles

Design tokens for the Cupcake design system.

---

## Getting started

1. Clone this repo

```bash
$ git clone https://github.com/Cupcake-Design-System/Cupcake-Sprinkles.git
$ cd Cupcake-Sprinkles
```

2. Install Dependencies

```bash
$ npm install
```

3. Generate sass tokens

```bash
$ npm run default
```

4. Generate extended tokens for other formats

```bash
$ npm run extended
```


### Workflow
Everything's ready to get started right away:
- Any changes should happen in the /tokens folder. 
- All values *MUST* be established first in the _aliases.yml file.
- These _aliases.yml file is rendered as variables with the !default flag for easy theming. 
- Individual files generate maps linked to the variables. We then use those for writing sass in our core repo.