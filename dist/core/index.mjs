import {
  registerPhrases
} from "../chunk-DK2RCS2C.mjs";
import "../chunk-TQEAZGIX.mjs";
import {
  getConfig
} from "../chunk-66EZAPNT.mjs";
import "../chunk-QOZR7PL7.mjs";
import "../chunk-ZV4UZCWJ.mjs";
import "../chunk-K2HAZIZO.mjs";
import {
  extractPhrases
} from "../chunk-3LS3YBKE.mjs";

// src/core/index.ts
async function scan(root = document.body) {
  const allPhrases = extractPhrases(root);
  const newPhrases = registerPhrases(allPhrases);
  if (newPhrases.length > 0) {
    console.log(`Found ${newPhrases.length} new phrases to send:`, newPhrases);
  }
}
async function send(phrases) {
  const { apiEndpoint, projectId, token, debug } = getConfig();
  if (!phrases.length || !apiEndpoint || !projectId) {
    if (debug) console.warn("Missing config or empty phrase list");
    return;
  }
  try {
    await fetch(`${apiEndpoint}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...token ? { Authorization: `Bearer ${token}` } : {}
      },
      body: JSON.stringify({ projectId, phrases })
    });
  } catch (err) {
    if (debug) console.warn("Failed to send phrases:", err);
  }
}
var hello = () => console.log("Core!");
export {
  hello,
  scan,
  send
};
