import "../chunk-TQEAZGIX.mjs";
import {
  getConfig
} from "../chunk-66EZAPNT.mjs";
import "../chunk-QOZR7PL7.mjs";
import "../chunk-ZV4UZCWJ.mjs";
import "../chunk-K2HAZIZO.mjs";

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
export {
  sendPhrasesToServer
};
