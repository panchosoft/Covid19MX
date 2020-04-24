module.exports = {
  pwa: {
    name: "COVID-19 MX",
    themeColor: "#232f3e",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    // configure the workbox plugin
    workboxPluginMode: "GenerateSW",
    iconPaths: {
      favicon32: "img/icons/favicon-32x32.png",
      favicon16: "img/icons/favicon-16x16.png",
      appleTouchIcon: "img/icons/apple-touch-icon-152x152.png",
      maskIcon: "img/icons/safari-pinned-tab.svg",
      msTileImage: "img/icons/msapplication-icon-150x150.png"
    },
    workboxOptions: {
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: "/data/",
          handler: 'NetworkFirst',
          options: {
            // Use a custom cache name for this route.
            cacheName: 'data-cache',
            // Configure custom cache expiration.
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 300, // 30 days
              // Automatically cleanup if quota is exceeded.
              purgeOnQuotaError: true,
            },
          },
        },
      ]
    }
  },
  configureWebpack: {
    // optimization: {
    //   splitChunks: {
    //     minSize: 20000,
    //     maxSize: 250000
    //   }
    // }
  }
};
