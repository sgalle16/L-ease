/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    reactStrictMode: true,
    webpack: config => {
        config.externals.push("pino-pretty", "lokijs", "encoding");
        return config;
    },

  };
  
module.exports = nextConfig;
  