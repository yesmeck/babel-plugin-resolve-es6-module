# babel-plugin-resolve-es6-module

Resolve import source to ES6 module dir.


## How it works

This plugin will look for import statements where the `module` provides ES6 module build, then replace the module path to ES6 version, e.g.

```javascript
import ScrollableInkTabBar from  'rc-tabs/lib/ScrollableInkTabBar';
```

will be transformed to

```javascript
import ScrollableInkTabBar from  'rc-tabs/es/ScrollableInkTabBar';
```

## Usage

Install the plugin

```bash
$ npm install --save-dev babel-plugin-resolve-es6-module
```

Specify the plugin in your .babelrc

```json
{
  "plugins": ["resolve-es6-module"]
}
```

In case some packages don't specify `main` and `module` in `package.json`, you can use options to specify these dirs manually.

```json
{
  "plugins": [["resolve-es6-module", {
     "rc-util": {
       "mainDir": "lib",
       "moduleDir": "es",
     },
  }]]
}
```

## License

MIT
