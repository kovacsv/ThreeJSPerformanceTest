# ThreeJSPerformanceTest

## How to use?

Install dependencies (needed only once):
```
npm install
```

Start app:
```
npm run start
```

Open a browser with this url:
```
http://localhost:7000
```

## How fine-tune the parameters?

Play around with the variables in the `source/main.js` file:
- `separateObjects`: Generate separate three.js objects instead of merging them to one object.
- `gridSize`: Size of the rectangular grid. A grid size of 100 will generate 10 thousand objects.
