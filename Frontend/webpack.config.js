const autoprefixer = require('autoprefixer');
// Options for autoPrefixer
const autoprefixerOptions = {
    browsers: [
      '>1%',
      'last 4 versions',
      'Firefox ESR',
      'not ie < 9', // React doesn't support IE8 anyway
    ],
    flexbox: 'no-2009',
};

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path')
const paths = require('./paths')

const isDev = process.env.NODE_ENV === 'development'
const cssFilename = 'static/css/[name].css'
const cssClassName = isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:5]'

// Heads up!
// We use ExtractTextPlugin to extract LESS content in production environment,
// we will still use fallback to style-loader in development.
const extractLess = new ExtractTextPlugin({
    filename: cssFilename,
    disable: isDev
});

console.log(paths.servedPath);

// ExtractTextPlugin expects the build output to be flat.
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// However, our output is structured with css, js and media folders.
// To have this structure working with relative paths, we have to use custom options.
const extractTextPluginOptions = { publicPath: Array(cssFilename.split('/').length).join('../') };

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.NODE_ENV === 'production' && process.env.GENERATE_SOURCEMAP !== 'false'

module.exports = {
    entry: paths.appIndexTsx,
    mode: "development",
    output: {
        filename: "bundle.js",
        path: paths.dist
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            '../../theme.config$': path.resolve(paths.appSrc, 'styling/theme.config'),
            heading: path.resolve(paths.appSrc, 'styling/heading.less'),
        }
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { 
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader" 
            },
            {
                test: /\.less$/,
                exclude: [
                    path.resolve(paths.appSrc, 'components'),
                ],
                use: extractLess.extract({
                    use: [
                        {
                            loader: require.resolve('css-loader'),
                            options: {
                                importLoaders: 1,
                                minimize: process.env.NODE_ENV === 'production',
                                sourceMap: shouldUseSourceMap
                            },
                        },
                        {
                            loader: require.resolve('postcss-loader'),
                            options: {
                                // Necessary for external CSS imports to work
                                // https://github.com/facebookincubator/create-react-app/issues/2677
                                ident: 'postcss',
                                plugins: () => [
                                    require('postcss-flexbugs-fixes'),
                                    autoprefixer(autoprefixerOptions),
                                ],
                            },
                        },
                        { 
                            loader: require.resolve('less-loader')
                        }
                    ],
                    ...extractTextPluginOptions
                }),
            },
            // "url" loader works like "file" loader except that it embeds assets
            // smaller than specified limit in bytes as data URLs to avoid requests.
            // A missing `test` is equivalent to a match.
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            // "file" loader makes sure assets end up in the `build` folder.
            // When you `import` an asset, you get its filename.
            {
                test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
                loader: require.resolve('file-loader'),
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    plugins: [
        extractLess
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};