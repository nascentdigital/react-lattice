module.exports = ({ config }) => {
    config.module.rules.push({
        test: /\.tsx?$/,
        use: [
            {
                loader: require.resolve("babel-loader"),
                options: {
                    presets: [
                        require.resolve("@babel/preset-env"),
                        require.resolve("@babel/preset-typescript"),
                        require.resolve("@babel/preset-react")
                    ]
                }
            },
            require.resolve("react-docgen-typescript-loader")
        ]
    });

    config.resolve.extensions.push(".ts", ".tsx");

    return config;
};
