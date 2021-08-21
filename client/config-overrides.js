const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
    addWebpackAlias({
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@commonse': path.resolve(__dirname, 'src/commons'),
        "@pages": path.resolve(__dirname, 'src/pages'),
        "@src": path.resolve(__dirname, 'src'),
        "@hoc": path.resolve(__dirname, 'src/hoc'),
        "@redux": path.resolve(__dirname, 'src/redux'),
        "@actions": path.resolve(__dirname, 'src/redux/modules'),
        "@dispatch": path.resolve(__dirname, 'src/redux/hooks'),
    }),
);
