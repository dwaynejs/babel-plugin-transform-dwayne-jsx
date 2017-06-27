const _ = require('lodash');
const transformDwayneHtml = require('transform-dwayne-html');

module.exports = ({ types: t }) => ({
  inherits: require('babel-plugin-syntax-jsx'),
  visitor: {
    JSXElement(path, state) {
      const {
        opts: options,
        file: {
          code,
          log: { filename }
        }
      } = state;

      options.unscopables = _.get(options, 'unscopables', ['require']);
      options.useES6 = !!_.get(options, 'useES6', true);

      const {
        start,
        end,
        loc: {
          start: loc
        }
      } = path.node;
      const tmplVarName = generateScopeVar('_tmpl', path, options);
      const mixinVarName = generateScopeVar('_mixin', path, options);
      const transformerOpts = _.assign({}, options, {
        filename,
        sourceType: 'embed',
        inputSourceMap: null,
        jsxMode: true,
        startLine: loc.line,
        startColumn: loc.column,
        startPosition: start,
        tmplVarName,
        mixinVarName,
        keepScope: false
      });
      const transformed = transformDwayneHtml(code.slice(start, end), transformerOpts);

      path.replaceWithSourceString(transformed.code);

      if (transformed.generatedTmplVar) {
        path.scope.push({
          id: t.identifier(tmplVarName),
          kind: options.useES6
            ? 'let'
            : 'var'
        });
      }

      if (transformed.generatedMixinVar) {
        path.scope.push({
          id: t.identifier(mixinVarName),
          kind: options.useES6
            ? 'let'
            : 'var'
        });
      }
    }
  }
});

function generateScopeVar(name, path, options) {
  let varName;

  do {
    varName = path.scope.generateUid(name);
  } while (options.unscopables.indexOf(varName) !== -1);

  return varName;
}
