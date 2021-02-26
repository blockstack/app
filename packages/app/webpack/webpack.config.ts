import * as path from 'path';
import * as webpack from 'webpack';

import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { getSegmentKey, getGithubDetails } from './utils';
import { ESBuildPlugin } from 'esbuild-loader';

// I am not sure why these fail. @hank can you try to fix this ts error?
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import HtmlWebpackPlugin from 'html-webpack-plugin';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CopyWebpackPlugin from 'copy-webpack-plugin';

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const EXT_ENV = process.env.EXT_ENV || 'web';
export const WEB_BROWSER = process.env.WEB_BROWSER ? process.env.WEB_BROWSER : 'chrome';
export const SEGMENT_KEY = process.env.SEGMENT_KEY || getSegmentKey();
export const STATS_URL = process.env.STATS_URL || 'https://stats.blockstack.xyz';
export const IS_DEV = NODE_ENV === 'development' || NODE_ENV === 'test';

export const SRC_ROOT_PATH = path.join(__dirname, '../', 'src');
export const DIST_ROOT_PATH = path.join(__dirname, '../', 'dist');

const { version, branch, commit } = getGithubDetails();

const config: webpack.Configuration = {
  entry: {
    background: path.join(SRC_ROOT_PATH, 'extension', 'background', 'index.ts'),
    inpage: path.join(SRC_ROOT_PATH, 'extension', 'inpage.ts'),
    'message-bus': path.join(SRC_ROOT_PATH, 'extension', 'content-scripts', 'message-bus.ts'),
    index: path.join(SRC_ROOT_PATH, 'index.tsx'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json', '.d.ts'],
    plugins: [new TsconfigPathsPlugin() as any],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      vm: require.resolve('vm-browserify'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              babelrc: false,
              presets: ['@babel/preset-typescript', '@babel/preset-react'],
              plugins: [IS_DEV && require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              target: 'es2015',
            },
          },
        ],
      },
    ],
  },
  watch: false,
  plugins: [
    new webpack.ProgressPlugin(),
    new ESBuildPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(SRC_ROOT_PATH, '../', 'public', 'html', 'index.html'),
      inject: 'body',
      filename: 'index.html',
      title: 'Stacks Wallet',
      chunks: ['index', 'common'],
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(SRC_ROOT_PATH, '../', 'public', 'assets'),
        to: path.join(DIST_ROOT_PATH, 'assets'),
        test: /\.(jpg|jpeg|png|gif|svg)?$/,
      },
      {
        from: path.join(SRC_ROOT_PATH, 'manifest.json'),
        to: path.join(DIST_ROOT_PATH, 'manifest.json'),
        toType: 'file',
        transform(content: any) {
          const csrTag = '<% DEV_CSR %>';
          const objectSrcTag = '<% DEV_OBJECT_SRC %>';
          const versionTag = '<% VERSION %>';
          content = content.toString();
          if (NODE_ENV === 'development') {
            content = content.replace(csrTag, " 'unsafe-eval'");
            content = content.replace(objectSrcTag, "'self'"); // to enable fast refresh in dev mode
          } else {
            content = content.replace(csrTag, '');
            content = content.replace(objectSrcTag, "'none'"); // important security for prod
          }
          const fullVersion = version;
          console.log('Extension Version:', fullVersion);
          content = content.replace(versionTag, fullVersion);
          return Buffer.from(content);
        },
      },
    ] as any),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      WEB_BROWSER: JSON.stringify(WEB_BROWSER),
      EXT_ENV: JSON.stringify(EXT_ENV),
      SEGMENT_KEY: JSON.stringify(SEGMENT_KEY),
      STATS_URL: JSON.stringify(STATS_URL),
      VERSION: JSON.stringify(version),
      COMMIT_SHA: JSON.stringify(commit),
      BRANCH: JSON.stringify(branch),
      'process.env.USERNAMES_ENABLED': JSON.stringify(process.env.USERNAMES_ENABLED || 'false'),
      'process.env.NODE_ENV': `'${NODE_ENV}'`,
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
      fetch: 'cross-fetch',
    }),
  ].filter(Boolean),
};

export default config;