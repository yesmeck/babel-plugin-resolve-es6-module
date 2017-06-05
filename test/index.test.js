import { transformFileSync } from 'babel-core';
import path from 'path';
import plugin from '../src';

describe('babel-plugin-pkg-module', () => {
  it('repalce cmd module with es6 module', () => {
    const result = transformFileSync(path.resolve(__dirname, './fixture/src/index.js'), {
      plugins: [[plugin, {
        'rc-util': {
          mainDir: 'lib',
          moduleDir: 'es',
        },
      }]],
      babelrc: false,
    });
    expect(result.code).toMatchSnapshot();
  });
});
