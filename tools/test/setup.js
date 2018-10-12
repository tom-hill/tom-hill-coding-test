import '@babel/polyfill';

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import hook from 'css-modules-require-hook';
import sass from 'node-sass';
import path from 'path';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

const jsdom = require('jsdom');

const { JSDOM } = jsdom;

global.document = new JSDOM('');
global.window = document.window;
global.expect = chai.expect;
global.sinon = sinon;
global.mount = Enzyme.mount;
global.render = Enzyme.render;
global.shallow = Enzyme.shallow;
global.navigator = {
  userAgent: 'node.js',
};

hook({
  extensions: ['.scss'],
  generateScopedName: '[name]_[local]',
  preprocessCss: (css, filepath) => {
    const scss = sass.renderSync({
      data: css,
      includePaths: [path.resolve(filepath, '..')]
    });

    return scss.css;
  }
});
