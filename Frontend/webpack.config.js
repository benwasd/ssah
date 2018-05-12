const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const path = require('path')

const isDev = true;
const bundleFilename = isDev ? 'static/js/bundle.js' : 'static/js/bundle.[hash:8].js'
const cssFilename = isDev ? 'static/css/[name].css' : 'static/css/[name].[hash:8].css'
const cssClassName = '[local]'

const extractLess = new ExtractTextPlugin({
    filename: cssFilename
});

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

module.exports = {
    entry: "./src/index.tsx",
    mode: isDev ? "development" : "production",
    output: {
        filename: bundleFilename,
        path: path.resolve('./dist/'),
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            '../../theme.config$': path.resolve('./src/', 'styling/theme.config'),
            heading: path.resolve('./src/', 'styling/heading.less'),
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
                    path.resolve('./src/', 'components'),
                ],
                use: extractLess.extract({
                    publicPath: Array(cssFilename.split('/').length).join('../'),
                    use: [
                        {
                            loader: require.resolve('css-loader'),
                            options: {
                                importLoaders: 1,
                                minimize: !isDev,
                                sourceMap: true
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
                    ]
                }),
            },
            {
                test: /\.less$/,
                include: [
                    path.resolve('./src/', 'components'),
                ],
                use: extractLess.extract({
                    use: [
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            localIdentName: cssClassName,
                            modules: true,
                            minimize: !isDev,
                            sourceMap: true,
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
                    { loader: require.resolve('less-loader') }
                  ],
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