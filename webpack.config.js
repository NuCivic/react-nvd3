module.exports = {
  entry: './src/index.js',
  output: {
    library: 'NVD3Chart',
    libraryTarget: 'umd',
    filename: 'react-nvd3.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-runtime']
        }
      }
    ]
  },
  externals: [
    {react: {root: 'React', amd: 'react', commonjs: 'react', commonjs2: 'react'}},
    {d3: 'd3'},
    {nvd3: {root: 'nv', amd: 'nvd3', commonjs: 'nvd3', commonjs2: 'nvd3'}}
  ]
};
