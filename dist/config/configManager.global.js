"use strict";
(() => {
  // src/config/defaultConfig.ts
  var defaultConfig = {
    language: "en",
    defaultLanguage: "en",
    apiEndpoint: "https://api.example.com/translations"
  };

  // src/config/configManager.ts
  var config = {
    ...defaultConfig
  };
  var getConfig = () => config;
  var setConfig = (newConfig) => {
    config = { ...config, ...newConfig };
  };
})();
