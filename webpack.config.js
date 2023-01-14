import path from 'path';

export default {
  mode: 'production',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        include: [path.resolve(process.cwd(), 'src')],
        exclude: [
            '/node_modules/',
            '/dist/',
            // '/__tests__/',
        ],
      },
    ],
  },
  target: "node",
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.cjs',
    path: path.resolve(process.cwd(), 'dist'),
  },
};
