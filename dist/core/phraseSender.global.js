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

  // src/core/phraseSender.ts
  async function sendPhrasesToServer(phrases) {
    const { apiEndpoint, projectId, token } = getConfig();
    const payload = {
      projectId,
      phrases
    };
    try {
      await fetch(`${apiEndpoint}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...token ? { "Authorization": `Bearer ${token}` } : {}
        },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      if (getConfig().debug) console.warn("Failed to send phrases", e);
    }
  }
})();
