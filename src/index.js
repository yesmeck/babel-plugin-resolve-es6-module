'use strict';

const { join, dirname } = require('path');
const fs = require('fs');

const cwd = process.cwd();

const moduleDirCache = {};

function replacePath(path, { opts }) {
  const { source } = path.node;

  if (!source) { return }
  if (isRelative(source)) { return }

  const dir = getModuleDir(source, opts);
  if (!dir.moduleDir) { return };

  if (new RegExp(`/${dir.mainDir}/`).test(source.value)) {
    const module = source.value.replace(`/${dir.mainDir}/`, `/${dir.moduleDir}/`);
    const modulePath = dirname(join(cwd, `node_modules/${module}`));
    if (fs.existsSync(modulePath)) {
      source.value = module;
    }
  }
}

function isRelative(source) {
  return new RegExp('^(\./|\.\./)').test(source.value);
}

function getModuleDir(source, opts) {
  const name = source.value.split('/')[0];

  if (opts[name]) {
    return opts[name];
  }

  if (!moduleDirCache[name]) {
    const pkg = require(`${name}/package.json`);
    const mainDir = (pkg.main && dirname(pkg.main).replace(/^\.\//, ''));
    const module = pkg.module || pkg['jsnext:main']
    const moduleDir = module && dirname(module).replace(/^\.\//, '');
    moduleDirCache[name] = {
      mainDir,
      moduleDir,
    };
  }

  return moduleDirCache[name];
}

module.exports = function() {
  return {
    visitor: {
      ImportDeclaration: replacePath,
      ExportNamedDeclaration: replacePath,
    },
  };
};
