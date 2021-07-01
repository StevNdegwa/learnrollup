

### About `rollup`
Rollup is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application.

[Got to](https://rollupjs.org/) Rollup homepage.

### Setting up a rollup, typescript and react application

First, we initialize the application:

```shell
yarn init
```

Then, create `src` folder and, create a file, `src/index.js`.

Add a simple statement in javascript e.g.

```javascript
var a = "Hello", b = "Rollup";

console.log(a + " " + b);
```

#### 1. Install rollup 


```shell
npm i -d rollup

yarn add --dev rollup
```

#### 2. Create rollup config file
Rollup usually transpiles and bundles this file and its relative dependencies to CommonJS before requiring it.

Ways to create a config file:   

-   As a commonJS module using `require` and `module.exports`. Use `.cjs` to prevent rollup from transpiling the file. 
-   As a typescript file. Use `@rollup/plugin-typescript` plugin. Use `--configPlugin --typescript` option.
 
```javascript
// touch rollup.config.js - for linux users

// Most basic config file
import { defineConfig } from "rollup";

export default defineConfig({
    input: "./src/index.tsx",
    output: {
        dir: "dist",
        format: "iife"
    }
})

```

The config file should return a default of either:   
    -   An object   
    -   An array of objects   
    -   A promise that will resolve with either of above
    -   A function that returns either of above. The function is passed the current command line arguments.   

To enable IDE autocomplete features, you can use `defineConfig` or 

```javascript
/**
 * @type {import('rollup').RollupOptions}
 */
```

#### 3. Add build script
Got to the `package.json` file and add a scripts section with build:


```json
"scripts": {
    "build": "rollup -c rollup.config.js"
}
```

Run 

```shell
yarn build
```

We've successfully built our first application. A dist folder has been created.

#### 4. Add plugins
Plugins allow the customization of Rollup's behavior. Such as finding modules, copying files, transpiling modules. 
A List of Plugins may be found at [Awesome rollup](https://github.com/rollup/awesome).


**Note**: The order of your plugins matters

Add a plugins array in rollup:

```javascript
import nodeResolve from "@rollup/plugin-node-resolve";

export default defineConfig({
    input: "./src/index.tsx",
    output: {
        file: "dist/index.js",
        format: "iife"
    },
    plugins:[
        nodeResolve()
    ]
})
```
Before using plugins, you have to first install them.

 * Important plugins:  
        - `@rollup/plugin-node-resolve`: Locates modules.  
        - `@rollup/plugin-commonjs`: Converts CommonJS modules to ES6, so they can be included in a Rollup bundle.


#### 5. Adding typescript

Install `typescript`, `tslib` `@rollup/plugin-typescript`. Add the typescript plugin

Change input to `src/index.ts`

```javascript
typescript({
    allowSyntheticDefaultImports: true,
    jsx: "react"
})
```

#### 6. Add react

Install `react, react-dom, @types/react, @types/react-dom, @babel/preset-env, @babel/preset-react,@rollup/plugin-babel, @babel/core`

Add babel plugin:

```javascript
babel({
    babelHelpers: "bundled",
    exclude: /node_modules/,
    extensions,
    presets: [
        "@babel/preset-env",
        "@babel/preset-react"
    ]
}),
```

Add plugin `rollup-plugin-replace`. 

and 

```javascript
replace({
    "process.env.NODE_ENV": JSON.stringify("production")
})
```
This is to clear an error in react build. React uses `process` variable which is undefined.

Add a public folder and the html entlry file

Add plugin `rollup-plugin-generate-html-template` to auto-inject the resulting rollup bundle via script and link tags into an HTML template.

Create a simple react application. Edit `index.tsx`

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { Rollup } from "./components";
import "./index.css";

const App = () => {
  return (
    <div>
      <Rollup/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

Other useful plugins are:   
    - `rollup-plugin-serve` for serving the application.   
    - `rollup-plugin-livereload` used for reloading during development   
    - `rollup-plugin-embed-css` for bundling css.   
    - `rollup-plugin-copy` for copying static files.   
    - `@rollup/plugin-image` for bundling images    

Done. we've Successfull set up our application.

## Related

Here are some related projects   

https://rollupjs.org/guide/en   
https://betterprogramming.pub/the-battle-of-bundlers-6333a4e3eda9


[Awesome README](https://github.com/matiassingers/awesome-readme)