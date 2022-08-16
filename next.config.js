/** @type {import('next').NextConfig} */
// const nextConfig = {
//   // reactStrictMode: true,
//   // swcMinify: true,
//   webpack(config) {
//     config.module.rules.push(
//         {
//           test: /\.svg$/,
//           issuer: {
//             test: /\.(js|ts)x?$/,
//           },
//           use: ['@svgr/webpack'] // Используем загрузчик такой для svg файлов
//         }
//     );
//     return config;
//   }
// };

module.exports = {
    images: {
        domains: ['courses-top.ru'] // Разрешенные домены для загрузки картинок
    },
    webpack(config) {
        config.module.rules.push(
            {
                test: /\.svg$/,
                issuer:  /\.(js|ts)x?$/,
                use: ['@svgr/webpack'] // Используем загрузчик такой для svg файлов
            }
        );
        return config;
    }
};