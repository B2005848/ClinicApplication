module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv", // Đặt plugin trong mảng
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@src": "./src", // Đặt alias cho thư mục src
            "@assets": "./assets",
          },
        },
      ],
    ],
  };
};
